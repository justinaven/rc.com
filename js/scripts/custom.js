Zepto(function($){
  var port = $('.port-grid');
  if(port.length>0){
    $('body').append('<div class="port-item-slide-overlay"></div><div class="port-item-slide-wrap"><div class="close-port container"><div class="close-port__wrap">Close <span class="close-x">&times;</span></div></div><div class="port-item-slide-inner"></div></div>');

    $('.close-port').on('click', function(){
      $('html').removeClass('modal');
      var close_target = $(this).closest('.port-item-slide-wrap').find('.load-wrapper.on');
      setTimeout(function(){
        close_target.removeClass('block');
      },350);
      close_target.removeClass('on');
    });

    port.find('.port-grid__item-wrap').on('click', function(e){
      e.preventDefault();
      var target_a = $(this).attr('href').split('/');
      var target = '';
      for (i = target_a.length-1; i >= 0; i--) {
        if(target_a[i].length>0){target = target_a[i]; break}
      }

      if($('#'+target).length>0){
        $('#'+target).addClass('on').addClass('block');
        $('html').addClass('modal');
      }else{
        $('.port-item-slide-inner').append('<div id="'+target+'" class="container load-wrapper on block"></div>').find('#'+target).load('/portfolio/'+target+' .port-item');

      }
      $('html').addClass('modal');
    }); // end on click
  }

});
