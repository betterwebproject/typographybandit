var scroll = function(e) {
  var width = window.innerWidth;
  if (width < 1024) return;

  e.preventDefault();
  if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
    this.scrollLeft += (e.deltaY * 2);
  } else {
    this.scrollLeft -= (e.deltaX * 2);
  }
};

var startX, scrollLeft;

var touchStart = function(e) {
  var width = window.innerWidth;
  if (width < 1024) return;

  startX = e.touches[0].pageX;
  scrollLeft = this.scrollLeft;
};

var touchMove = function(e) {
  var width = window.innerWidth;
  if (width < 1024) return;

  var x = e.touches[0].pageX;
  var walk = (startX - x) * 2; //scroll-fast
  this.scrollLeft = scrollLeft + walk;
  e.preventDefault();
};

document.documentElement.addEventListener('wheel', scroll);
document.documentElement.addEventListener('touchstart', touchStart);
document.documentElement.addEventListener('touchmove', touchMove);