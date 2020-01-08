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
  var lineItem = '#' + $(this.parentElement).attr('id').replace('-boxes', ''),
    cardHeader = lineItem + '-info';
  mouseoverHilite(lineItem);
  $(cardHeader).removeClass('active-hover');
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
function clickHilite(sectionID, event){
  event.preventDefault();
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
    //deselect card headers
    $('div.card-header').removeClass('active-click');
  } else {
    $(lineItemG).children().children().addClass('active-click');
    $(cardHeader + ' > span' ).addClass('rotate-arrow-to-up');
  }

  $(section).on('shown.bs.collapse', function(event){
    
    var navHeight = $('#header-pinned > div.title').outerHeight();
    window.scroll({
      top: $(cardHeader).offset().top - navHeight,
      behavior: 'smooth'
    })
  })
}

$('.btn-link').on('click', function(event){
  var formCat = this.getAttribute('data-target').replace('-section','')
  clickHilite(formCat, event);
})
 
$('.form-link').on('click', function(event){
  var formCat = '#' + this.getAttribute('data-target').replace('-section', '')
  clickHilite(formCat, event);
});







