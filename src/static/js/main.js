$(function(){

  // Video.js config
  videojs.options.flash.swf = "/video-js.swf";

  // Set up big.js for full-screen bg video
  var BV = new $.BigVideo();
  BV.init();
  BV.show('http://video-js.zencoder.com/oceans-clip.mp4');

  // nav
  $('nav').fitText(1.99);

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

});