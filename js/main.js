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


  //> убираем маску с селекта
  $(".modal-form_country").change(function () {
    var countryField = $(".modal-form_country");
    countryField.removeClass("modal-form_country--hint");
  });

  $(".modal-form_grade").change(function () {
    var countryField = $(".modal-form_grade");
    countryField.removeClass("modal-form_grade--hint");
  });

  $(".modal-form_part").change(function () {
    var countryField = $(".modal-form_part");
    countryField.removeClass("modal-form_part--hint");
  });


   //> валидация формы с номером телефона
   let phoneInput = $("input[name=tel]");
   phoneInput.mask("+7 (000) 000-00-00");
   $("select[name=countries]").on("change", function () {
       let maskOptions = {translation: {9: {pattern: "9", fallback: "9"}}};
       switch ($(this).val()) {
           case "ru":
           case "kz":
               phoneInput.mask("+7 (000) 000-00-00");
               phoneInput.val("+7 ");
               break;
           case "kg":
               phoneInput.mask("+996 (000) 000-0000", maskOptions);
               phoneInput.val("+996 ");
               break;
           case "uz":
               phoneInput.mask("+998 (00) 000-0000", maskOptions);
               phoneInput.val("+998 ");
               break;
           case "tg":
               phoneInput.mask("+992 (00) 000-0000", maskOptions);
               phoneInput.val("+992 ");
               break;
           case "tr":
               phoneInput.mask("+993 (00) 000-000", maskOptions);
               phoneInput.val("+993 ");
               break;
           case "other":
               customMask(phoneInput);
               phoneInput.val("+");
               break;
       }
   });

  function customMask(object) {
   let codes2 = ["992", "993", "998"];
   let codes3 = ["994", "995", "996"];
   let masks = ["+0 (000) 000-00-0000", "+00 (000) 000-00-000", "+000 (000) 000-00-00", "+000 (00) 000-0000", "+000 (000) 000-000"];
   let getMask = function (val) {
       let clearVal = val.replace(/\D+/g, "");
       let code = clearVal.substring(0, 3);
       if (codes2.includes(code)) {
           return masks[3];
       }
       if (codes3.includes(code)) {
           return masks[4];
       }
       return clearVal.length < 12 ? masks[0] : (clearVal.length === 12 ? masks[1] : masks[2]);
   };
   if (typeof object.val() !== "undefined") {
       object.mask(getMask(object.val()), {
           onKeyPress: function (val, e, field, options) {
               if (e.keyCode !== 8 && e.keyCode !== 46) { //backspace && delete
                   object.mask(getMask(val), options);
               }
           }
       });
    }
  }


});