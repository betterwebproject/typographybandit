var scroll = function( e ) {
  e.preventDefault();
  if ( Math.abs( e.deltaY ) >= Math.abs( e.deltaX ) ) {
    this.scrollLeft += ( e.deltaY * 2 );
  } else {
    this.scrollLeft -= ( e.deltaX * 2 );
  }
}

var isTouchScreen = function() {
  return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

var applyScroll = function() {
  var width = window.innerWidth;
  if (isTouchScreen() && width >= 1024) {
    document.documentElement.addEventListener('wheel', scroll);
  } else {
    document.documentElement.removeEventListener('wheel', scroll);
  }
}

// Initial check
applyScroll();

// Add event listener to reapply scroll behavior on resize
window.addEventListener('resize', applyScroll);