

function toggle_visibility(id) {
  var e = document.getElementById(id);
  if (e.style.display == 'inline-block')
      e.style.display = 'none';
  else
      e.style.display = 'inline-block';
}

$(document).ready(function() {

  var spacingUnit = 60,
      headerHeight = $('#header-pinned').outerHeight();
  $('div.title-content').css('margin-top', headerHeight + spacingUnit);

    //h/t: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
  var isAboveViewport = function(element){
    var bounding = element.getBoundingClientRect(); 
      return bounding.top <= 0 
  }

  var isBelowViewPort = function(element){
    var bounding = element.getBoundingClientRect(); 
      return bounding.bottom >= (window.innerHeight || document.documentElement.clientHeight)
  }

  function isWayfindingNeeded(lineItemGs){
    var els = $(lineItemGs);

    for (var i = 0; i < els.length; i++){
      if (isAboveViewport(els[i])){
        $('#up-arrow-wayfinder').css('opacity', 0.7)
      } else if (isBelowViewPort(els[i])){
        $('#down-arrow-wayfinder').css('opacity', 0.7)
      }
    }

    window.setTimeout(function(){
      $('#down-arrow-wayfinder, #up-arrow-wayfinder').css('opacity', 0)
    }, 2000)
  }

  //now mess with URL
  function parseQueryString(query) {
          var obj = {},
              qPos = query.indexOf('?'),
        tokens = query.substr(qPos + 1).split('&'),
        i = tokens.length - 1;
    if (qPos !== -1 || query.indexOf('=') !== -1) {
      for (; i >= 0; i--) {
        var s = tokens[i].split('=');
        obj[unescape(s[0])] = s.hasOwnProperty(1) ? unescape(s[1]) : null;
      };
    }
    return obj;
  }

  var section = window.location.hash,
    anchor = section + '-section',
    divHeader = section + '-info',
    box = section + '-boxes';

  $(anchor).collapse('toggle');

  //the form hilites need to match the open dropdown section
  if (window.location.hash != ''){
    $(box).children().children().addClass('active-click');
    $(divHeader).toggleClass('active-click');
    $(divHeader + ' > span' ).addClass('rotate-arrow-to-up');
    isWayfindingNeeded(box);
  }

  var parameters = parseQueryString(window.location.search);

  if(parameters.hasOwnProperty('print')){
    $('body').addClass('print');
  }

  //fix svg container div height for IE
  var illoWidth = $('#form-illo > svg').width(),
    aspectRatio = 4.534952263311797,
    newHeight = illoWidth * aspectRatio;
  $('#form-illo').height(newHeight);

  $(window).resize(function() {
      var illoWidth = $('#form-illo > svg').width(),
      aspectRatio = 4.534952263311797,
      newHeight = illoWidth * aspectRatio;
    $('#form-illo').height(newHeight);
  });

  //h/t: https://stackoverflow.com/questions/49636727/why-is-scroll-behaviorsmooth-not-working-but-javascript-window-scroll-smooth-is?newreg=472532a8017f4bc59a4965f7dcf5a84b
  window.smoothScrollTo = function(endX, endY, duration) {
    let startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();
  
    // Easing function
    let easeInOutQuart = function(time, from, distance, duration) {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    let timer = window.setInterval(function() {
        let time = new Date().getTime() - startTime,
        newX = easeInOutQuart(time, startX, distanceX, duration),
        newY = easeInOutQuart(time, startY, distanceY, duration);
        if (time >= duration) {
            window.clearInterval(timer);
        }
        window.scrollTo(newX, newY);
    }, 1000 / 60); // 60 fps
  };

  //*********MOUSEOVER **********//
  function mouseoverHilite(sectionID){
    var lineItemG = sectionID + '-boxes',
        cardHeader = sectionID + '-info';

    $(lineItemG + '> a > rect').toggleClass('active-hover');   
    $(cardHeader).toggleClass('active-hover');
  };

  $('.card-header').mouseenter(function(){
    var lineItem = '#' + this.getAttribute('data-box').replace('-boxes','');
    mouseoverHilite(lineItem);
  });

  $('.card-header').mouseleave(function(){
    var lineItem = '#' + this.getAttribute('data-box').replace('-boxes','');
    mouseoverHilite(lineItem);
    $(this).removeClass('active-hover');
  });

  //highlight form box on mouseover and highlight corresponding drawer
  $('g.form-link').mouseenter(function(){
    var lineItem = '#' + $(this).attr('id').replace('-boxes', '');
    mouseoverHilite(lineItem);
  });

  $('g.form-link').mouseleave(function(){
    var lineItem = '#' + $(this).attr('id').replace('-boxes', ''),
      cardHeader = lineItem + '-info';
    mouseoverHilite(lineItem);
    $(cardHeader).removeClass('active-hover');
  });

  //*********CLICK ********//
  function clickHilite(sectionID){

    var lineItemG = sectionID + '-boxes',
      cardHeader = sectionID + '-info',
      section = sectionID + '-section',
      isAnchorClick = $(event.currentTarget).hasClass('btn'),
      drawerOpen = $(section).hasClass('show'); 

    if(!isAnchorClick){
      $(sectionID + '-section').collapse('toggle');
    }

    //deselect all card-headers & hilite selected
    $('div.card-header').removeClass('active-click');
    $(cardHeader).addClass('active-click');
    //rotate any turned arrow back to original down position
    $('div.card-header > span' ).removeClass('rotate-arrow-to-up');
    //deselect boxes on form
    $('g.form-link > a > rect').removeClass('active-click');
    $('g.form-link > a > rect').addClass('super-not-selected');
    //take off active class from button/header text and arrow
    $('div.card-header > span').removeClass('click-arrow');

    if (drawerOpen){
      $('div.card-header').removeClass('active-click');
      $('g.form-link > a > rect').removeClass('super-not-selected');
      history.pushState('', document.title, window.location.pathname + window.location.search);
    } else {
      $(lineItemG).children().children().addClass('active-click');
      $(lineItemG).children().children().addClass('super-not-selected');
      $(cardHeader + ' > span' ).addClass('rotate-arrow-to-up');
      history.pushState('', '', sectionID)
    }

    $(section).on('shown.bs.collapse', function(){
      let pos = document.querySelector(sectionID).offsetTop;
      smoothScrollTo(0, pos, 500); 
      isWayfindingNeeded(lineItemG);
    })
  }

  $('.card-header').on('click', function(event){
    event.preventDefault();
    var formCat = this.getAttribute('data-target').replace('-section','')
    clickHilite(formCat);
  })
   
  $('.form-link').on('click', function(event){
    event.preventDefault();
    var formCat = '#' + this.getAttribute('data-target').replace('-section', '')
    clickHilite(formCat);
  });

});




