Zepto(function($){
  // DEV ONLY JS - NOT FOR PROD
  $('.film__vids-link, .film__news-link').each(function(index){
    if($(this).attr('class') === 'film__vids-link' ) {
      var idVar = 'vids'+index;
      $(this).attr('href','#'+idVar).closest('.film').find('.vids').attr('id',idVar) ;
    } else {
      var idVar = 'news'+index;
      $(this).attr('href','#'+idVar).closest('.film').find('.news').attr('id',idVar) ;
    }
  });
  // END OF DEV ONLY JS





  function transitionEndEventName () {
    var i,
    undefined,
    el = document.createElement('div'),
    transitions = {
      'transition':'transitionend',
      'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    };

    for (i in transitions) {
      if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
        return transitions[i];
      }
    }
      //TODO: throw 'TransitionEnd event is not supported in this browser';
  }


  function theFunctionToInvoke (e) {
    console.log('invoked');
    if($(this).hasClass('closed')){
    } else {
      $(this).css('max-height', 'none');
    }
  }

  var transitionEnd = transitionEndEventName();
  var current_open = null;

  $('.vids, .news').each(function(index){
    $(this).addClass('closed');
    this.addEventListener(transitionEnd, theFunctionToInvoke, false);
  });

  $('.film__vids-link, .film__news-link').each(function(index){
    $(this).addClass('closed on').on('click', function(e){
      e.preventDefault(e);
      var myTarget = $(this).attr('href');
      var myTarget_h = $(myTarget).find('.container').height();
      // opening up
      if($(this).hasClass('closed')) {
        $(this).removeClass('closed');
        $(myTarget).css('max-height',myTarget_h).removeClass('closed');
        // if there is a current_open, and this isn't it, close the current_open
        if(!!current_open) {
          var COTarget = $(current_open).attr('href');
          var COTarget_h = $(COTarget).find('.container').height();
          $(COTarget).css('max-height',COTarget_h).addClass('closed');
          $(current_open).addClass('closed');
          setTimeout(function(){
            $(COTarget).css('max-height',0);
          },10);
        }
        // since opened, set current_open to this
        current_open = $(this);
      } else {
        // closing down
        $(myTarget).css('max-height',myTarget_h).addClass('closed');
        $(this).addClass('closed');
        setTimeout(function(){
          $(myTarget).css('max-height',0);
        },10);
        current_open = null;
      }
    });

  });




























});
