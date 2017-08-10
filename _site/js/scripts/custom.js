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
    if(!$(this).hasClass('closed')){
      $(this).css('max-height', 'none');
        // console.log($(this).attr('id')+' Is Open and current_open = '+current_open.attr('href')+" "+
      // $(this).css('max-height'));
    } else {
      $(this).css('max-height', 0);
        // console.log($(this).attr('id')+' Is Closed and current_open = '+current_open.attr('href')+" "+
      // $(this).css('max-height'));
    }
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
      var myTarget_h = $(myTarget).find('.container').height();

      if(!$(this).hasClass('closed')) {
        console.log('1 Closing '+ myTarget_h);
        $(this).addClass('closed');
        $(myTarget).css('max-height', myTarget_h);
        setTimeout(function(){
          $(myTarget).addClass('closed').css('max-height', 0);
          console.log('timeup (1)');
        },15);
        // $(myTarget).css('max-height', 0);
        current_open = null;

      } else {
        console.log('2 Opening = '+$(this).attr('href'));
        $(this).removeClass('closed');
        $(myTarget).css('max-height',0); // and close
        $(myTarget).removeClass('closed').css('max-height', myTarget_h); // 350ish

        if(!!current_open) {
          console.log('3 Closing');
          current_open.addClass('closed');
          var coh = $(current_open.attr('href')).height();
          console.log(coh);
          $(current_open.attr('href')).css('max-height', coh);
          // $(current_open.attr('href')).css('max-height', $(current_open.attr('href')).height()); // 350ish
          setTimeout(function(){
            $(current_open.attr('href')).addClass('closed').css('max-height', 0); // and close
            console.log('timeup (3)');
          },15);

        }

        current_open = $(this);
      }
    });

  });




























});
