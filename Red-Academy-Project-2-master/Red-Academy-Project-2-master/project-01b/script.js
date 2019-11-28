$(document).ready(function(){

/*  I didnt include an if/else statement for this because the e-mail form does that job well enough  */

$('.text-submit').on('submit',function(event) {
   event.preventDefault();
   alert ('Thanks for subscribing!')
});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 400);
        return false;
      }
    }
  });
});
});