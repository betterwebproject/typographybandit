var startX;

var handleTouchStart = function(event) {
  startX = event.touches[0].clientX;
}

var handleTouchMove = function(event) {
  if (!startX) {
    return;
  }

  var x = event.touches[0].clientX;
  var deltaX = startX - x;
  startX = x;

  this.scrollLeft += deltaX;
  event.preventDefault();
}

var handleTouchEnd = function(event) {
  startX = null;
}

var scroll = function( e ) {
  var width = window.innerWidth;
  if(width <= 1024) return;
      
  e.preventDefault();
  if ( Math.abs( e.deltaY ) >= Math.abs( e.deltaX ) ) {
      this.scrollLeft += ( e.deltaY * 2 );
  } else {
      this.scrollLeft -= ( e.deltaX * 2 );
  }
}

document.documentElement.addEventListener('touchstart', handleTouchStart, { passive: true });
document.documentElement.addEventListener('touchmove', handleTouchMove, { passive: false });
document.documentElement.addEventListener('touchend', handleTouchEnd, { passive: true });

document.documentElement.addEventListener('wheel', scroll);