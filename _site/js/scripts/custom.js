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
    console.log(this);
  }


  var transitionEnd = transitionEndEventName();
  var current_open = null;
  $('.vids, .news').each(function(index){
    $(this).addClass('closed');
    this.addEventListener(transitionEnd, theFunctionToInvoke, false);
  });
  $('.film__vids-link, .film__news-link').each(function(index){
    $(this).addClass('on closed').on('click', function(e){
      e.preventDefault(e);
      var myTarget = $(this).attr('href');
      if(!$(this).hasClass('closed')) {
        console.log('1 add closed');
        $(this).addClass('closed');
        $(myTarget).addClass('closed');
        current_open = null;
      } else {
        console.log('2 remove closed');
        $(this).removeClass('closed');
        $(myTarget).removeClass('closed');
        if(!!current_open) {
          console.log('3 add closed');
          current_open.addClass('closed');
          $(current_open.attr('href')).addClass('closed');
        }
        current_open = $(this);
      }
    });

  });




























});
