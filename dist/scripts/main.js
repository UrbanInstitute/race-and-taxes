"use strict";function toggle_visibility(e){var t=document.getElementById(e);"inline-block"==t.style.display?t.style.display="none":t.style.display="inline-block"}$(document).ready(function(){var e=$("#header-pinned").outerHeight();$("div.title-content").css("margin-top",e+60);var n=function(e){return e.getBoundingClientRect().top<=0},i=function(e){return e.getBoundingClientRect().bottom>=(window.innerHeight||document.documentElement.clientHeight)};function r(e){for(var t=$(e),o=0;o<t.length;o++)n(t[o])?$("#up-arrow-wayfinder").toggleClass("transition-w"):i(t[o])&&$("#down-arrow-wayfinder").toggleClass("transition-w");window.setTimeout(function(){$("#down-arrow-wayfinder.transition-w, #up-arrow-wayfinder.transition-w").toggleClass("transition-w")},1250)}var t=window.location.hash,o=t+"-info",a=t+"-boxes";$(t+"-section").collapse("toggle"),""!=window.location.hash&&($(a).children().children().addClass("active-click"),$(o).toggleClass("active-click"),$(o+" > span").addClass("rotate-arrow-to-up"),r(a)),function(e){var t={},o=e.indexOf("?"),n=e.substr(o+1).split("&"),i=n.length-1;if(-1!==o||-1!==e.indexOf("="))for(;0<=i;i--){var a=n[i].split("=");t[unescape(a[0])]=a.hasOwnProperty(1)?unescape(a[1]):null}return t}(window.location.search).hasOwnProperty("print")&&$("body").addClass("print");var s=4.534952263311797*$("#form-illo > svg").width();function l(e){var t=e+"-info";$(e+"-boxes"+"> a > rect").toggleClass("active-hover"),$(t).toggleClass("active-hover")}function c(t){var o=t+"-boxes",e=t+"-info",n=t+"-section",i=$(event.currentTarget).hasClass("btn"),a=$(n).hasClass("show");i||$(t+"-section").collapse("toggle"),$("div.card-header").removeClass("active-click"),$(e).addClass("active-click"),$("div.card-header > span").removeClass("rotate-arrow-to-up"),$("g.form-link > a > rect").removeClass("active-click"),$("g.form-link > a > rect").addClass("super-not-selected"),$("div.card-header > span").removeClass("click-arrow"),a?($("div.card-header").removeClass("active-click"),$("g.form-link > a > rect").removeClass("super-not-selected"),history.pushState("",document.title,window.location.pathname+window.location.search)):($(o).children().children().addClass("active-click"),$(o).children().children().addClass("super-not-selected"),$(e+" > span").addClass("rotate-arrow-to-up"),history.pushState("","",t)),$(n).on("shown.bs.collapse",function(){var e=document.querySelector(t).offsetTop;smoothScrollTo(0,e,500),window.setTimeout(function(){r(o)},200)})}$("#form-illo").height(s),$(window).resize(function(){var e=4.534952263311797*$("#form-illo > svg").width();$("#form-illo").height(e)}),window.smoothScrollTo=function(e,t,n){var i=window.scrollX||window.pageXOffset,a=window.scrollY||window.pageYOffset,r=e-i,s=t-a,l=(new Date).getTime(),c=function(e,t,o,n){return(e/=n/2)<1?o/2*e*e*e*e+t:-o/2*((e-=2)*e*e*e-2)+t},d=window.setInterval(function(){var e=(new Date).getTime()-l,t=c(e,i,r,n),o=c(e,a,s,n);n<=e&&window.clearInterval(d),window.scrollTo(t,o)},1e3/60)},$(".card-header").mouseenter(function(){l("#"+this.getAttribute("data-box").replace("-boxes",""))}),$(".card-header").mouseleave(function(){l("#"+this.getAttribute("data-box").replace("-boxes","")),$(this).removeClass("active-hover")}),$("g.form-link").mouseenter(function(){l("#"+$(this).attr("id").replace("-boxes",""))}),$("g.form-link").mouseleave(function(){var e="#"+$(this).attr("id").replace("-boxes",""),t=e+"-info";l(e),$(t).removeClass("active-hover")}),$(".card-header").on("click",function(e){e.preventDefault(),c(this.getAttribute("data-target").replace("-section",""))}),$(".form-link").on("click",function(e){e.preventDefault(),c("#"+this.getAttribute("data-target").replace("-section",""))})});