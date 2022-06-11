const slider = tns({
    container: '.slider__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
	nav: false, 
	navPosition: false,
	controls: false,
	responsive: {
		320: {
			nav: true,
			navPosition: "bottom"
			
		  }
	}
});

document.querySelector('.prev').addEventListener('click', function () { //подключить наши кнопки к кнопкам по умолчанию
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

(function($) {
	$(function() {
	  
	  $('ul.offer__tabs').on('click', 'li:not(.offer__tab_active)', function() {
		$(this)
		  .addClass('offer__tab_active').siblings().removeClass('offer__tab_active')
		  .closest('div.container').find('div.offer__content').removeClass('offer__content_active').eq($(this).index()).addClass('offer__content_active');
	  });
	  
	  function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault(); //отменяет инструкции по умолчанию
				$('.offer-item__content').eq(i).toggleClass('offer-item__content_active'); //меняет классы активности
				$('.offer-item__list').eq(i).toggleClass('offer-item__list_active');
			})
		})
	  };
	  toggleSlide('.offer-item__link'); //запуск функции
	  toggleSlide('.offer-item__back');
	});

	//modal

	$('[data-model=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');
	});

	//крестик

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	//связь покупки с конкретной карточкой товара
	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.offer-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	//валидация форм

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 5
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов!")
				},
				phone: "Пожалуйста, введите номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Адрес должен содержать name@domain.com"
				}
			  }
		});	
	};

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	//маска ввода номера телефона
	$('input[name=phone]').mask("+7 (999) 999-99-99");

	//отправка заявок на почту

	$('form').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");


			$('form').trigger('reset');
		});
		return false;
	})

})(jQuery);
