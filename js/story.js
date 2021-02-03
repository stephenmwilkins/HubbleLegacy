function initComparisons() {
  var x, i;
  /* Find all elements with an "overlay" class: */
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /* Once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function: */
    compareImages(x[i]);
    console.log(i);
  }
  
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /* Get the width and height of the img element */
    w = img.offsetWidth;
    h = img.offsetHeight;
    /* Set the width of the img element to 50%: */
    img.style.width = (w *0.9) + "px";
    /* Create slider: */
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /* Insert slider */
    img.parentElement.insertBefore(slider, img);
    /* Position the slider in the middle: */
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w *0.9) - (slider.offsetWidth / 2) + "px";
    /* Execute a function when the mouse button is pressed: */
    slider.addEventListener("mousedown", slideReady);
    /* And another function when the mouse button is released: */
    window.addEventListener("mouseup", slideFinish);
    /* Or touched (for touch screens: */
    slider.addEventListener("touchstart", slideReady);
     /* And released (for touch screens: */
    window.addEventListener("touchend", slideFinish);
    function slideReady(e) {
      /* Prevent any other actions that may occur when moving over the image: */
      e.preventDefault();
      /* The slider is now clicked and ready to move: */
      clicked = 1;
      /* Execute a function when the slider is moved: */
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /* The slider is no longer clicked: */
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /* If the slider is no longer clicked, exit this function: */
      if (clicked == 0) return false;
      /* Get the cursor's x position: */
      pos = getCursorPos(e)
      /* Prevent the slider from being positioned outside the image: */
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /* Execute a function that will resize the overlay image according to the cursor: */
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /* Get the x positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x coordinate, relative to the image: */
      x = e.pageX - a.left;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /* Resize the image: */
      img.style.width = x + "px";
      /* Position the slider: */
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}




//
//
//
// (function($) {
//
//   "use strict";
//
//   /* Page Loader active
//   ========================================================*/
//   $('#preloader').fadeOut();
//
//   /*
//   CounterUp
//   ========================================================================== */
//   $('.counter').counterUp({
//     time: 500
//   });
//
//   /*
//   MixitUp
//   ========================================================================== */
//   $('#portfolio').mixItUp();
//
//   /*
//    Screens Crouserl
//    ========================================================================== */
//     $('#carousel-screen').carousel({
//       num: 5,
//       maxWidth: 450,
//       maxHeight: 300,
//       distance: 50,
//       scale: 0.6,
//       animationTime: 1000,
//       showTime: 4000
//     });
//
//   /*
//    Clients Sponsor
//    ========================================================================== */
//     var owl = $("#clients-scroller");
//     owl.owlCarousel({
//       items:5,
//       itemsTablet:3,
//       margin:90,
//       stagePadding:90,
//       smartSpeed:450,
//       itemsDesktop : [1199,4],
//       itemsDesktopSmall : [980,3],
//       itemsTablet: [768,3],
//       itemsTablet: [767,2],
//       itemsTabletSmall: [480,2],
//       itemsMobile : [479,1],
//     });
//
//   /* Testimonials Carousel
//   ========================================================*/
//   var owl = $("#testimonials");
//     owl.owlCarousel({
//       navigation: false,
//       pagination: true,
//       slideSpeed: 1000,
//       stopOnHover: true,
//       autoPlay: true,
//       items: 1,
//       itemsDesktop : [1199,1],
//       itemsDesktopSmall : [980,1],
//       itemsTablet: [768,1],
//       itemsTablet: [767,1],
//       itemsTabletSmall: [480,1],
//       itemsMobile : [479,1],
//     });
//
//   /*
//    Touch Owl Carousel
//    ========================================================================== */
//     var owl = $(".touch-slider");
//     owl.owlCarousel({
//       navigation: false,
//       pagination: true,
//       slideSpeed: 1000,
//       stopOnHover: true,
//       autoPlay: true,
//       items: 4,
//       itemsDesktopSmall: [1024, 4],
//       itemsTablet: [600, 2],
//       itemsMobile: [479, 1]
//     });
//
//     $('.touch-slider').find('.owl-prev').html('<i class="lni-arrow-left"></i>');
//     $('.touch-slider').find('.owl-next').html('<i class="lni-arrow-right"></i>');
//
//     /* Screens Shot Slider
//     =============================*/
//      var owl = $(".screens-slider");
//       owl.owlCarousel({
//         navigation: false,
//         pagination: true,
//         slideSpeed: 1000,
//         stopOnHover: true,
//         autoPlay: true,
//         addClassActive: true,
//         items: 3,
//         itemsDesktopSmall: [1024, 3],
//         itemsTablet: [600, 1],
//         itemsMobile: [479, 1]
//       });
//
//   /*
//    Sticky Nav
//    ========================================================================== */
//     $(window).on('scroll', function() {
//         if ($(window).scrollTop() > 100) {
//             $('.header-top-area').addClass('menu-bg');
//         } else {
//             $('.header-top-area').removeClass('menu-bg');
//         }
//     });
//
//   /*
//  VIDEO POP-UP
//  ========================================================================== */
//   $('.video-popup').magnificPopup({
//       disableOn: 700,
//       type: 'iframe',
//       mainClass: 'mfp-fade',
//       removalDelay: 160,
//       preloader: false,
//       fixedContentPos: false,
//   });
//
//   /*
//    Back Top Link
//    ========================================================================== */
//     var offset = 200;
//     var duration = 500;
//     $(window).scroll(function() {
//       if ($(this).scrollTop() > offset) {
//         $('.back-to-top').fadeIn(400);
//       } else {
//         $('.back-to-top').fadeOut(400);
//       }
//     });
//
//     $('.back-to-top').on('click',function(event) {
//       event.preventDefault();
//       $('html, body').animate({
//         scrollTop: 0
//       }, 600);
//       return false;
//     })
//
//   /*
//    One Page Navigation & wow js
//    ========================================================================== */
//     //Initiat WOW JS
//     new WOW().init();
//
//     $(window).on('load', function() {
//
//         $('body').scrollspy({
//             target: '.navbar-collapse',
//             offset: 195
//         });
//
//         $(window).on('scroll', function() {
//             if ($(window).scrollTop() > 100) {
//                 $('.fixed-top').addClass('menu-bg');
//             } else {
//                 $('.fixed-top').removeClass('menu-bg');
//             }
//         });
//
//     });
//
//   /* Auto Close Responsive Navbar on Click
//   ========================================================*/
//   function close_toggle() {
//       if ($(window).width() <= 768) {
//           $('.navbar-collapse a').on('click', function () {
//               $('.navbar-collapse').collapse('hide');
//           });
//       }
//       else {
//           $('.navbar .navbar-inverse a').off('click');
//       }
//   }
//   close_toggle();
//   $(window).resize(close_toggle);
//
//   /* Nivo Lightbox
//   ========================================================*/
//    $('.lightbox').nivoLightbox({
//     effect: 'fadeScale',
//     keyboardNav: true,
//   });
//
// }(jQuery));
