$(document).ready(function() {
  var modalButton = $("[data-toggle=modal]");
  var modalCloseBtn = $(".modal-close");
  var modalWindow = $(".modal");
  var modalOverlay = $(".overlay");
  var body = $("body");

  // закрыть модальное окно на esc
  $(document).on("keydown", function(e) {
    if (e.keyCode == 27) {
      var modalOverlay = $(".overlay");
      var modalWindow = $(".modal");
      modalOverlay.removeClass("overlay--show");
      modalWindow.removeClass("modal--active");
      body.removeClass("overflow");
    }
  })

  // закрыть модальное окно по щелчку вне окна
  $(document).click(function(e) {
    if (!modalButton.is(e.target) && modalWindow.is(e.target) && modalWindow.has(e.target).length === 0) 
    {
      modalOverlay.removeClass("overlay--show");
      modalWindow.removeClass("modal--active");
      body.removeClass("overflow");
    }
  })

  function openModal() {
    modalOverlay.addClass("overlay--show");
    modalWindow.addClass("modal--active");
    body.addClass("overflow");
  }

  function closeModal(event) {
    event.preventDefault();
    modalOverlay.removeClass("overlay--show");
    modalWindow.removeClass("modal--active");
    body.removeClass("overflow");
  }

  modalButton.on("click", openModal);
  modalCloseBtn.on("click", closeModal);

  // кнопка прокрутки в начало страницы
  $(function() {

    // scroll to top
    $(".to-top").click(function() {
      $("html, body").animate({ scrollTop: 0 }, 500);
      return false;
    });

    //show to-top button
    $(document).scroll(function() {
      var y = $(this).scrollTop();
      if (y > 900) {
        $(".to-top").addClass("to-top--visible");
    } else {
      $(".to-top").removeClass("to-top--visible");
      }
    });
  });

  $("#olimp").on("submit", function(e) {
    e.preventDefault();
    $.ajax({
      url: '/send.php',
      method: 'post',
      data: $('#olimp').serialize()        
    }).done(function(response) {
        $('#olimp').parent().append("<div class='response' style='text-align: center'>" + response + "</div>");
        $('#olimp').fadeOut(400, function () {
          $('#olimp').parent().find(".response").fadeIn();
        });
      });
  })


   // валидация формы с номером телефона
   $(function() {
 
    //Маска для номера телефона
    $('.modal-form_tel').inputmask({
      mask: '+9{1,3} (9{2,3}) 9{3}-9{3,4}',
      // mask: '+7 (999) 999-99-99',
      showMaskOnHover: true,
      inputmode: 'tel',
      onincomplete: function () {
        checkValue($(this));
      },
      oncomplete: function () {
        checkValue($(this));
      }
    });
   
    //Функция валидации номера телефона
    var checkValue = function(input) {
      var $th = $(input);
      var phone = $th.val();	//Введенное значение
      var isValid = Inputmask.isValid(phone , { mask: '+9{1,3} (9{2,3}) 9{3}-9{3,4}'});	//Проверяем на валидность
      var $btn = $th.closest('#olimp').find('.modal-form_button');	//Ищем кнопку отправки формы
      var $error = $th.parent().find('.js-warning');	//Ищем ошибку
   
      if (!isValid) {
        //Если не валидно, то:
        $btn.prop('disabled', true); //Меняем атрибут disabled в значение true (делаем кнопку неактивной)
        $error.fadeIn(); //Показываем ошибку
      } else {
        $btn.prop('disabled', false); //Меняем атрибут disabled в значение false (делаем кнопку активной)
        $error.fadeOut(); //Скрываем ошибку
      }
    }
   
  });


});