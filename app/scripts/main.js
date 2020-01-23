//TODO
// print styles
// social intents
// links for both

// svgs - need to use "object", I think. Change font definitions in each one.
//create resize event and set the form-illo's height again

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
    // $(cardHeader + '> span.arrow-down').toggleClass('hover-arrow');
    // $(cardHeader + '> a > h5 > button').toggleClass('hover-button-text');
  };

  $('.card-header').mouseenter(function(){
    var lineItem = '#' + this.getAttribute('data-box').replace('-boxes','');
    mouseoverHilite(lineItem);
  });

  $('.card-header').mouseleave(function(){
    var lineItem = '#' + this.getAttribute('data-box').replace('-boxes','');
    mouseoverHilite(lineItem);
    $(this).removeClass('active-hover');

    // $('div.card-header > span.arrow-down').removeClass('hover-arrow');
    // $('div.card-header > a > h5 > button').removeClass('hover-button-text');
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

    // $('div.card-header > span.arrow-down').removeClass('hover-arrow');
    // $('div.card-header > a > h5 > button').removeClass('hover-button-text');
  });

  //underline the text on mouseover
  //note: .st4 = bold text, .st6 = light text
  // $('g.form-link').mouseenter(function() {
  //   var formCat = $(this.parentElement.parentElement).attr('id');
  //   $('#' + formCat + '> g').css('text-decoration', 'underline')
  // });

  // $('g.form-link').mouseleave(function() {
  //   var formCat = $(this.parentElement.parentElement).attr('id');
  //   $('#' + formCat + '> g').css('text-decoration', 'none')
  // });


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
    // $('div.card-header > a > h5 > button').removeClass('click-button-text');

    if (drawerOpen){

      $('div.card-header').removeClass('active-click');
      $('g.form-link > a > rect').removeClass('super-not-selected');
      history.pushState('', document.title, window.location.pathname + window.location.search);
    } else {

      $(lineItemG).children().children().addClass('active-click');
      $(lineItemG).children().children().addClass('super-not-selected');
      $(cardHeader + ' > span' ).addClass('rotate-arrow-to-up');
      // $(cardHeader + '> span').addClass('click-arrow');
      // $('div.card-header > a > h5 > button').removeClass('click-button-text');
      // $(cardHeader + '> a > h5 > button').addClass('click-button-text');
      history.pushState('', '', sectionID)
    }

    $(section).on('shown.bs.collapse', function(){
      let pos = document.querySelector(sectionID).offsetTop;
      smoothScrollTo(0, pos, 500); 
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




