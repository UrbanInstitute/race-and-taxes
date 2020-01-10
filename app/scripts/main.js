//TODO
// print styles
// social intents
// links for both

// svgs - need to use "object", I think. Change font definitions in each one.
//create resize event and set the form-illo's height again



$(document).ready(function() {
  var spacingUnit = 60;

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

  var headerHeight = $('#header-pinned').outerHeight();
  $('div.title-content').css('margin-top', headerHeight + spacingUnit);

  //fix svg container div height for IE
  var illoWidth = $('#form-illo > svg').width(),
    aspectRatio = 4.534952263311797,
    newHeight = illoWidth * aspectRatio;
  $('#form-illo').height(newHeight);
  
  //h/t: https://stackoverflow.com/questions/49636727/why-is-scroll-behaviorsmooth-not-working-but-javascript-window-scroll-smooth-is?newreg=472532a8017f4bc59a4965f7dcf5a84b
  window.smoothScrollTo = function(endX, endY, duration) {
    let startX = window.scrollX || window.pageXOffset,
    startY = window.scrollY || window.pageYOffset,
    distanceX = endX - startX,
    distanceY = endY - startY,
    startTime = new Date().getTime();
    console.log('start ' + startY + ' end ' + endY)
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

    $(lineItemG).children().children().toggleClass('active-hover');
    $('div.card-header').removeClass('active-hover');
    $(cardHeader).addClass('active-hover');
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
  $('g#line-items > g > g').mouseenter(function(){
    var lineItem = '#' + $(this.parentElement).attr('id').replace('-boxes', '');
    mouseoverHilite(lineItem);
  });

  $('g#line-items > g > g').mouseleave(function(){
    var lineItem = '#' + $(this.parentElement).attr('id').replace('-boxes', ''),
      cardHeader = lineItem + '-info';
    mouseoverHilite(lineItem);
    $(cardHeader).removeClass('active-hover');
  });

  //underline the text on mouseover
  //note: .st4 = bold text, .st6 = light text
  $('g#line-items > g > g > text').mouseenter(function() {
    var formCat = $(this.parentElement.parentElement).attr('id');
    $('#' + formCat + '> g').css('text-decoration', 'underline')
  });

  $('g#line-items > g > g > text').mouseleave(function() {
    var formCat = $(this.parentElement.parentElement).attr('id');
    $('#' + formCat + '> g').css('text-decoration', 'none')
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
    $('g#line-items > g > g').children().removeClass('active-click');

    if (drawerOpen){
      $('div.card-header').removeClass('active-click');
   //  history.pushState('', document.title, window.location.pathname + window.location.search);

    } else {
      $(lineItemG).children().children().addClass('active-click');
      $(cardHeader + ' > span' ).addClass('rotate-arrow-to-up');
   //   history.pushState('', '', sectionID)
    }

    $(section).on('shown.bs.collapse', function(){
      let pos = document.querySelector(sectionID).offsetTop;
      smoothScrollTo(0, pos, 500); 
    })
  }

  $('.btn-link').on('click', function(event){
    event.preventDefault();
    var formCat = this.getAttribute('data-target').replace('-section','')
    clickHilite(formCat);
  })
   
  $('.form-link').on('click', function(event){
    event.preventDefault();
    var formCat = '#' + this.getAttribute('data-target').replace('-section', '')
    clickHilite(formCat);
  });

  // function print() {
  //     // getting the tag element I want to print
  //     // cloning the content so it doesn't get messed
  //     // remove all the possible scripts that could be embed
  //     var printContents = $('body').clone().find('script').remove().end().html();

  //     // get all <links> and remove all the <script>'s from the header that could run on the new window
  //     var allLinks = $('head').clone().find('script').remove().end().html();

  //     // open a new window
  //     var popupWin = window.open('', '_blank');
  //     // ready for writing
  //     popupWin.document.open();

  //     // -webkit-print-color-adjust to keep colors for the printing version
  //     var keepColors = '<style>body {-webkit-print-color-adjust: exact !important; }</style>';

  //     // writing
  //     // onload="window.print()" to print straigthaway
  //     popupWin.document.write('<html><head>' + keepColors + allLinks + '</head><body onload="window.print()">' + printContents + '</body></html>');

  //     // close for writing
  //     popupWin.document.close();

  $( window ).resize(function() {
      var illoWidth = $('#form-illo > svg').width(),
      aspectRatio = 4.534952263311797,
      newHeight = illoWidth * aspectRatio;
    $('#form-illo').height(newHeight);
  });


});




