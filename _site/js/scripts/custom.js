Zepto(function($){
  $('html').addClass('js');

  // initialize all modals & modal-links on page load
  if($('.modal-link').length>0){
    $('.modal-link').each(function(){
        var $this = $(this);
        var target = $this.attr('href');
        $this.on('click', function(e){
          e.preventDefault();
          openModal(target);
      });
    });
    // to open modal
    function openModal(target_id){
      $('html').addClass('modal-on');
      $(target_id).addClass('on');
    }
    // close modal if anywhere other than modal is clicked or if ESC key pressed
    $('.modal__container, .modal__container .modal__wrapper, .modal__container .modal__close').on('click', function(){
      $('html').removeClass('modal-on');
      $(this).removeClass('on').find('.modal__container.on').removeClass('on');
    });
    $(document).keyup(function(e) {
      if (e.keyCode == 27) { $('.modal__container.on').removeClass('on'); }
    });
  }

  // Film Summary toggle
  $('.film__summary .film__info__label').on('click', function(){
    $(this).toggleClass('show');
    $('.film__summary-toggle').toggleClass('show');
  });






  // $(window).resize(function(e) {

  // });


});
