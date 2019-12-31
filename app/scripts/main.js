
//TODO
//DONEhover event to boxes - shows name
//DONEclick event to boxes - opens drawer
//DONEadd transition to the active classes
//DONEunderline .line-items on mouseover
// DONEa little arrow on the drawers
// print styles
// social intents
// links for both


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

//*********MOUSEOVER WORLD**********//
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

//*********CLICK WORLD********//
//TODO - refactor: bring click stuff into one function, started here
// function clickHilite(sectionID, isAnchorClick){
//     var lineItemG = sectionID + '-boxes',
//       cardHeader = sectionID + '-info',
//       drawerOpen;
//   //deselect all card-headers
//   $('div.card-header').removeClass('active-click');
//   //hilite selected header
//   $(cardHeader).addClass('active-click');

//   if (drawerOpen){
//     //deselect boxes and text on form
//     $(lineItemG).children().removeClass('active-click');
//     //deselect card headers
//     $('div.card-header').removeClass('active-click');
//     //rotate arrow back to original down position
//     $(cardHeader + ' > span' ).removeClass('rotate-arrow-to-up');
//   } else {
//     $(lineItemG).children().addClass('active-click');
//     $(cardHeader + ' > span' ).addClass('rotate-arrow-to-up');
//   }

//   if(!isAnchorClick){
//     //set URL
//     window.location.assign(sectionID);
//     //let jQuery do the rest w the accordion
//     $(sectionID + '-section').collapse('toggle');
//   }
// }

$('.btn-link').on('click', function(){
      //get the name of the line item and append suffix
  var formCat = this.getAttribute('data-target'),
      box = formCat.replace('-section', '-boxes'),
      cardHeader = formCat.replace('-section', '-info'),
      selectedRects = box + ' > g > rect',
      selectedText = box + ' > g > text',
      drawerOpen = $(this.parentElement.parentElement.parentElement.parentElement.lastElementChild).hasClass('show');

  //close all drawers, deactivate all text
  $('div.card-header').removeClass('active-click');
  $('text.active-click').removeClass('active-click');
  $('rect.active-click').removeClass('active-click');

  //the up/down arrow depends on whether a drawer is being closed or opened
  //not just whether an open drawer is being clicked on
  $('span.rotate-arrow-to-up').removeClass('rotate-arrow-to-up');
  $(cardHeader + '> span').addClass('rotate-arrow-to-up');

  if (drawerOpen){
    //close the drawer
    $(selectedRects + ', ' + selectedText).removeClass('active-click');
    $(cardHeader + '> span').removeClass('rotate-arrow-to-up');
  } else {
    //open drawer and shade in the header
    $(selectedRects + ', ' + selectedText).addClass('active-click');
    $(this.parentElement.parentElement.parentElement).addClass('active-click');

  }
})

//clicking box on form opens corresponding drawer
$('g#line-items > g > g').on('click', function(){
  var formCat = $(this.parentElement).attr('id'),
      header = formCat.replace('-boxes', '-info'),
      card = '#' + formCat.replace('-boxes', '-section'),
      url = card.replace('-section', '');

  //set URL
  window.location.assign(url);
  //custom changes - remove shading from all card headers, apply to just selected...
  $('div.card-header').removeClass('active-click');
  $('div.card-header#' + header).addClass('active-click');

  //rotate arrow
  $('span.rotate-arrow-to-up').removeClass('rotate-arrow-to-up');
  $('#' + header + '> span').addClass('rotate-arrow-to-up');

  // ...if line-item is already selected
  if ($(this).children('.active-click').length > 0){
    $('#form-illo rect, #form-illo text').removeClass('active-click');
    $('div.card-header').removeClass('active-click');
     $('#' + header + '> span').removeClass('rotate-arrow-to-up');
  } else {
    $('#form-illo rect, #form-illo text').removeClass('active-click');
     $(this).children().addClass('active-click');
  }
  //let jquery do the rest
  $(card).collapse('toggle');
});







