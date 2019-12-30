
//TODO
//DONEhover event to boxes - shows name
//DONEclick event to boxes - opens drawer
//add transition to the active classes
// print styles
// place share stuff on each card :(
// a little arrow on the drawers

var spacingUnit = 60;

$(document).ready(function() {
    var section = window.location.hash,
      anchor = section + '-section',
      divHeader = section + '-info';

    $(anchor).collapse('toggle');

    //the form hilites need to match the open dropdown section
    if (window.location.hash != ''){
      hiliteForm(section, 'active-click')
      $(divHeader).toggleClass('active-click')
    }

    var headerHeight = $('#header-pinned').outerHeight();
    $('div.title-content').css('margin-top', headerHeight + spacingUnit);

    $('div.collapse').collapse({
      toggle: true
    })
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
  var formCat = this.getAttribute('data-target').replace('-section', '-boxes'),
      selectedRects = formCat + ' > g > rect',
      selectedText = formCat + ' > g > text',
      drawerOpen = $(this.parentElement.parentElement.parentElement.parentElement.lastElementChild).hasClass('show');
  //close all drawers
  $('div.card-header').removeClass('active-click');
  $('text.active-click').removeClass('active-click');
  $('rect.active-click').removeClass('active-click');

  if (drawerOpen){
    //close the drawer
    $(selectedRects + ', ' + selectedText).removeClass('active-click');
  } else {
    //open drawer and shade in the header
    $(selectedRects + ', ' + selectedText).addClass('active-click');
    $(this.parentElement.parentElement.parentElement).addClass('active-click');
  }
})

//highlight form box on mouseover
$('g#line-items > g > g > rect').mouseenter(function(){
  $(this).addClass('active-hover');
  $(this).siblings().addClass('active-hover');
})

$('g#line-items > g > g > rect').mouseleave(function(){
  $(this).removeClass('active-hover');
  $(this).siblings().removeClass('active-hover');
})

//clicking box on form opens corresponding drawer
$('g#line-items > g > g > rect').on('click', function(){
  var formCat = $(this.parentElement.parentElement).attr("id"),
      header = formCat.replace("-boxes", "-info"),
      card = '#' + formCat.replace("-boxes", "-section");

  //handle custom changes - remove shading from all card headers, apply to just selected
  $('div.card-header').removeClass('active-click');
  $('div.card-header#' + header).addClass('active-click');

  //let jquery do the rest
  $(card).collapse('toggle');
});







