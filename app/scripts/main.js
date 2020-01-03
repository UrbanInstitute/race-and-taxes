//TODO
// print styles
// social intents
// links for both
// how do you serve fonts here?

var spacingUnit = 60;

$(document).ready(function() {
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

});

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
  var lineItem = '#' + $(this.parentElement).attr('id').replace('-boxes', '');
  mouseoverHilite(lineItem);
});

//underline the text on mouseover
//note: .st4 = bold text, .st6 = light text
$('g#line-items > g > g > text').mouseenter(function() {
  var formCat = $(this.parentElement.parentElement).attr('id');
  $('#' + formCat + '> g > text').css('text-decoration', 'underline')
});

$('g#line-items > g > g > text').mouseleave(function() {
  var formCat = $(this.parentElement.parentElement).attr('id');
  $('#' + formCat + '> g > text').css('text-decoration', 'none')
});

//*********CLICK ********//
function clickHilite(sectionID){
    var lineItemG = sectionID + '-boxes',
      cardHeader = sectionID + '-info',
      section = sectionID + '-section',
      isAnchorClick = $(event.currentTarget).hasClass('btn'),
      drawerOpen = $(section).hasClass('show'); 

  //deselect all card-headers & hilite selected
  $('div.card-header').removeClass('active-click');
  $(cardHeader).addClass('active-click');

  //rotate any turned arrow back to original down position
  $('div.card-header > span' ).removeClass('rotate-arrow-to-up');

  if (drawerOpen){
    //deselect boxes and text on form
    $(lineItemG).children().children().removeClass('active-click');
    //deselect card headers
    $('div.card-header').removeClass('active-click');
  } else {
    $(lineItemG).children().children().addClass('active-click');
    $(cardHeader + ' > span' ).addClass('rotate-arrow-to-up');
  }

  if(!isAnchorClick){
    //set URL
    window.location.assign(sectionID);
    //let jQuery do the rest w the accordion
    $(sectionID + '-section').collapse('toggle');
  }
}

$('.btn-link').on('click', function(){
  var formCat = this.getAttribute('data-target').replace('-section','')
  clickHilite(formCat);
})
 
$('g#line-items > g > g').on('click', function(){
  var formCat = '#' + $(this.parentElement).attr('id').replace('-boxes', '');
  clickHilite(formCat);
});







