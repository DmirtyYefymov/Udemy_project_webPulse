// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1200,
//         adaptiveHeight: true,
//         prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"> <img src="icons/right.png"></button>',
//         responsive: [
//             {
//             breakpoint: 992,
//             settings: {
//                 dots: true,
//                 arrows: false
//               }
//             }
//         ]
//     });
// });

// $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
//     $(this)
//         .addClass('catalog__tab_active).siblings().removeClass('catalog__tab_active')
//         .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
// });


const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});



// (function($) {
//     $(function() {
      
//       $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
//         $(this)
//           .addClass('catalog__tab_active).siblings().removeClass('catalog__tab_active')
//           .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
//       });
      
//     });
// });


(function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    //Modal
    $('[data-model=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut();
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function valideForms(form){
        $(form).validate({
            rules: {
               name: "required",
               phone: "required",
               email: {
                   require: true,
                   email: true
               }
            },
            messages: {
                name: "Please specify your name",
                email: {
                  required: "We need your email address to contact you",
                  email: "Your email address must be in the format of name@domain.com"
                }
            }
        });
    };

    valideForms('#consultation-form');
    valideForms('#consultation feed feed_mt25');
    valideForms('#order feed feed_mt25');


    // $('input[name=phone]').mask("+7(999)999-99-99")

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        });
        return false
    });


    $(window).scroll(function(){
        if($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });


    new WOW().init();
})(jQuery);
    