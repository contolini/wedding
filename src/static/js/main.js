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
        $this.css('font-size', fontSize > 72 ? 72 : fontSize );
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

var BV = new $.BigVideo({useFlashForFirefox:false});

$(function(){

  // Video.js config
  videojs.options.flash.swf = "/video-js.swf";

  // Set up bigvideo.js for full-screen bg video
  var isMobile = $.browser.mobile,
      volume = 1,
      bg;

  BV.init();

  bg = isMobile ? '/static/img/hBqv0KrQ6pa.gif' : '/static/vid/hBqv0KrQ6pa.mp4';
  BV.show( bg, { altSource: bg.replace('mp4', 'ogv') } );

  // Nav, yo
  $('nav').fitText(1.5);

  $('nav a').on('click', function( ev ){

    var target = $(this).attr('class').replace(' active', '');

    // toggle active class
    $( this ).addClass('active').siblings().removeClass('active');

    // hide, mute and pause all vids
    $('section').removeClass('active');

    // show, unmute and play selected vid
    $( 'section.' + target ).addClass('active');

    // Change vid/pic
    bg = isMobile ? $( this ).attr('data-pic') : $( this ).attr('data-vid');
    BV.show( bg, { altSource: bg.replace('mp4', 'ogv') } );

    // Focus if on RSVP form
    if ( $(this).hasClass('rsvp') ) {
      $('#name').focus();
    }

    ev.preventDefault();

  });

  // toggle audio on click
  $('#big-video-vid').on('click', function(){

    BV.getPlayer().volume( volume ^= 1 );

  });

  // toggle audio on click
  $('#attending').on('change', function(){

    var $deets = $('.additional-details');

    if ( $( this ).val() === 'Yes' ) {
      $deets.show();
    } else {
      $deets.hide();
    }

  });

  // RSVP submission
  $('form.rsvp').on('submit', function(){

    var $req = $('.required'),
        $name = $('#name'),
        $attending = $('#attending');

    if ( $name.val().length < 3 ) {
      $name.addClass('missing').attr('placeholder', '').focus();
      return false;
    }

    if ( $attending.val().length < 2 ) {
      $attending.addClass('missing').focus();
      return false;
    }

  });


});