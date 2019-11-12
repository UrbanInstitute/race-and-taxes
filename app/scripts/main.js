console.log('\'Allo \'Allo!');

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });

$(document).ready(function() {
    var anchor = window.location.hash + "-section"
    $(anchor).collapse("toggle")
});

$(".main-form rect").addClass("inactive")
$(".main-form text").css("display", "none")


$(".st0").mouseenter(
	function() {
    $(this).removeClass()
    $(this).addClass("selected")
  })

$(".st0").mouseleave(
	function() {
    $(this).removeClass()
    $(this).addClass("st0")
  })


