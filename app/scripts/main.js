
//TODO 
//- improve: adjust height of the page when you swtich categories
// print styles
// place share stuff on each card :(
// a little arrow on the drawers

var spacingUnit = 60;

$(document).ready(function() {
    var section = window.location.hash,
      anchor = section + "-section",
      divHeader = section + "-info";

    $(anchor).collapse("toggle");

    //the form hilites need to match the open dropdown section
    if (window.location.hash != ""){
      hiliteForm(section, "active-click")
      $(divHeader).toggleClass("active-click")
    }

    var headerHeight = $("#header-pinned").outerHeight();
    $("div.title-content").css("margin-top", headerHeight + spacingUnit);
});

function hiliteForm(sectionID, newClass){
  var selectedRects = sectionID + " > g > rect",
      selectedText = sectionID + " > g > text";

  $(selectedRects + ", " + selectedText).toggleClass(newClass);
}

$(".card-header").mouseenter(function(){
  var formCat = "#" + this.getAttribute("data-box");
  hiliteForm(formCat, "active-hover");
  $(this).addClass("active-hover")
})

$(".card-header").mouseleave(function(){
  var formCat = "#" + this.getAttribute("data-box");
  hiliteForm(formCat, "active-hover");
  $(this).removeClass("active-hover");
})

$(".btn-link").on("click", function(){
  var formCat = this.getAttribute("data-target").replace("-section", "-boxes"),
      selectedRects = formCat + " > g > rect",
      selectedText = formCat + " > g > text",
      drawerOpen = $(this.parentElement.parentElement.parentElement.parentElement.lastElementChild).hasClass("show"); 

  $("div.card-header").removeClass("active-click");
  $("text.active-click").removeClass("active-click");
  $("rect.active-click").removeClass("active-click");

  if (drawerOpen){
    $(selectedRects + ", " + selectedText).removeClass("active-click");

  } else {
    $(selectedRects + ", " + selectedText).addClass("active-click");
    $(this.parentElement.parentElement.parentElement).addClass("active-click");
  }

})



function toggle_visibility(id) {
    var e = document.getElementById(id);
    if (e.style.display == 'inline-block')
        e.style.display = 'none';
    else
        e.style.display = 'inline-block';
}



