
//TODO
//DONEhover event to boxes - shows name
//DONEclick event to boxes - opens drawer
//DONEadd transition to the active classes
//DONEunderline .line-items on mouseover
// DONEa little arrow on the drawers
// print styles
// social intents
// links for both
// group together what makes it


var spacingUnit = 60;

$(document).ready(function() {
    var section = window.location.hash,
      anchor = section + '-section',
      divHeader = section + '-info',
      box = section + '-boxes';

    $(anchor).collapse('toggle');

    //the form hilites need to match the open dropdown section
    if (window.location.hash != ''){
      hiliteForm(box, 'active-click');
      $(divHeader).toggleClass('active-click');
      $(divHeader + ' > span' ).addClass('rotate-arrow-to-up');
    }

    var headerHeight = $('#header-pinned').outerHeight();
    $('div.title-content').css('margin-top', headerHeight + spacingUnit);

    // $('div.collapse').collapse({
    //   toggle: true
    // })
});

function hiliteForm(sectionID, newClass){
  var selectedRects = sectionID + ' > g > rect',
      selectedText = sectionID + ' > g > text';
  $(selectedRects + ', ' + selectedText).toggleClass(newClass);
}

$('.card-header').mouseenter(function(){
  var formCat = '#' + this.getAttribute('data-box');
  hiliteForm(formCat, 'active-hover');
  $(this).addClass('active-hover')
})

$('.card-header').mouseleave(function(){
  var formCat = '#' + this.getAttribute('data-box');
  hiliteForm(formCat, 'active-hover');
  $(this).removeClass('active-hover');
})

$('.btn-link').on('click', function(){
      //get the name of the line item and append suffix
  var formCat = this.getAttribute('data-target'),
      box = formCat.replace('-section', '-boxes'),
      cardHeader = formCat.replace('-section', '-info'),
      selectedRects = box + ' > g > rect',
      selectedText = box + ' > g > text',
      drawerOpen = $(this.parentElement.parentElement.parentElement.parentElement.lastElementChild).hasClass('show');

  //close all drawers
  $('div.card-header').removeClass('active-click');
  $('text.active-click').removeClass('active-click');
  $('rect.active-click').removeClass('active-click');

  if (drawerOpen){
    //close the drawer
    $(selectedRects + ', ' + selectedText).removeClass('active-click');
    $(cardHeader + ' > span' ).removeClass('rotate-arrow-to-up')
  } else {
    //open drawer and shade in the header
    $(selectedRects + ', ' + selectedText).addClass('active-click');
    $(this.parentElement.parentElement.parentElement).addClass('active-click');
    //rotate arrow
    $(cardHeader + ' > span' ).addClass('rotate-arrow-to-up');
  }
})

//highlight form box on mouseover and highlight corresponding drawer
$('g#line-items > g > g').mouseenter(function(){
  var box = $(this.parentElement).attr('id'),
    cardHeader = box.replace('-boxes','-info');

  $(this).children().addClass('active-hover');

  $('div.card-header').removeClass('active-hover');
  $('#' + cardHeader).addClass('active-hover');
});

$('g#line-items > g > g').mouseleave(function(){
  $(this).children().removeClass('active-hover');
  $('div.card-header').removeClass('active-hover');
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
  // ...if line-item is already selected
  if ($(this).children('.active-click').length > 0){
    $('#form-illo rect, #form-illo text').removeClass('active-click');
    $('div.card-header').removeClass('active-click');
    $(header + ' > span' ).removeClass('rotate-arrow-to-up');
  } else {
    $('#form-illo rect, #form-illo text').removeClass('active-click');
     $(this).children().addClass('active-click');
     $(header + ' > span' ).addClass('rotate-arrow-to-up');
  }

  //let jquery do the rest
  $(card).collapse('toggle');
});







