/* This is FitText.js 1.1. I'm sticking it here so I can modify it.
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        var fontSize = Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize));
        //console.log(fontSize);
        $this.css('font-size', fontSize > 72 ? 72 : fontSize );
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );


$(function(){

  // Video.js config
  videojs.options.flash.swf = "/video-js.swf";

  // Set up big.js for full-screen bg video
  var BV = new $.BigVideo(),
      isMobile = $.browser.mobile,
      bg;

  BV.init();

  if ( isMobile ) {
    bg = '/static/img/hBqv0KrQ6pa.gif';
  } else {
    bg = '/static/vid/hBqv0KrQ6pa.mp4';
  }
  BV.show( bg );

  // Nav, yo
  $('nav').fitText(1.99);

  $('nav a').on('click', function(){

    var target = $(this).attr('class').replace(' active', '');

    // toggle active class
    $( this ).addClass('active').siblings().removeClass('active');

    // hide, mute and pause all vids
    $('section').removeClass('active');

    // show, unmute and play selected vid
    $( 'section.' + target ).addClass('active');

    // Change vid/pic
    if ( !isMobile ) {
      bg = $( this ).attr('data-pic');
    } else {
      bg = $( this ).attr('data-vid');
    }
    BV.show( bg );

  });

  // toggle audio on click
  $('#big-video-vid').on('click', function(){
    if ( $(this).hasClass('muted') ) {
      BV.getPlayer().volume(1);
      $(this).removeClass('muted');
    } else {
      BV.getPlayer().volume(0);
      $(this).addClass('muted');
    }
  });









/*
  $('nav a').on('click', function(){

    var target = $(this).attr('class').replace(' active', '');

    // toggle active class
    $( this ).addClass('active').siblings().removeClass('active');

    // hide, mute and pause all vids
    $('section').removeClass('active').find('video').prop('muted', true).each(function(){
      $(this).get(0).pause();
    });

    // show, unmute and play selected vid
    $( 'section.' + target ).addClass('active').find('video').prop('muted', false).get(0).play();

  });

  // video stuff
  $('section').not('.active').find('video').prop('muted', true);

  // toggle audio on click
  $('video').on('click', function(){
    $(this).prop('muted', function( i, val ) {
      return !val;
    });
  });
*/
});