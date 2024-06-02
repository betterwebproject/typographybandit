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
document.documentElement.addEventListener( 'wheel', scroll);