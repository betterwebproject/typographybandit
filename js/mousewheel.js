let items = document.querySelectorAll(".section");
let page = document.querySelector(".page");
let currentPos = 0;
let isVertical = window.innerWidth < 1024;
let isTouching = false;
let startTouchPos = 0;
let startPos = 0;
let touchVelocity = 0;
let lastTouchPos = 0;
let isMobile = /Mobi|Android/i.test(navigator.userAgent);

function init() {
  isVertical = window.innerWidth < 1024;
  let totalSize = Array.from(items).reduce((acc, item) => acc + (isVertical ? item.offsetHeight : item.offsetWidth), 0);

  if (isMobile) {
    page.style.width = '100%';
    page.style.height = '100%';
    page.style.overflow = 'auto';
    page.style.transform = 'none';
    document.body.style.overflow = 'hidden';
  } else {
    page.style.width = isVertical ? '100%' : `${totalSize}px`;
    page.style.height = isVertical ? `${totalSize}px` : '100%';
    page.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    updateScroll();
  }
}

function updateScroll() {
  if (isMobile) return;
  let maxPos = isVertical ? page.scrollHeight - window.innerHeight : page.scrollWidth - window.innerWidth;
  currentPos = Math.max(0, Math.min(currentPos, maxPos));
  page.style.transform = isVertical ? `translateY(${-currentPos}px)` : `translateX(${-currentPos}px)`;
}

function handleScroll(event) {
  if (isMobile) return;
  currentPos += isVertical ? event.deltaY : (event.deltaY + event.deltaX);
  updateScroll();
  event.preventDefault();
}

function handleTouchStart(event) {
  if (isMobile) return;
  isTouching = true;
  startTouchPos = isVertical ? event.touches[0].clientY : event.touches[0].clientX;
  startPos = currentPos;
  touchVelocity = 0;
  lastTouchPos = startTouchPos;
}

function handleTouchMove(event) {
  if (isMobile) return;
  if (!isTouching) return;
  let currentTouchPos = isVertical ? event.touches[0].clientY : event.touches[0].clientX;
  let delta = startTouchPos - currentTouchPos;
  currentPos = startPos + delta;
  touchVelocity = lastTouchPos - currentTouchPos;
  lastTouchPos = currentTouchPos;
  requestAnimationFrame(updateScroll);
  event.preventDefault();
}

function handleTouchEnd() {
  if (isMobile) return;
  isTouching = false;
}

function animate() {
  if (isMobile) return;
  if (!isTouching) {
    currentPos += touchVelocity;
    touchVelocity *= 0.95; // Damping factor to simulate friction
    if (Math.abs(touchVelocity) < 0.1) touchVelocity = 0;
    updateScroll();
  }
  requestAnimationFrame(animate);
}

function handleResize() {
  init();
}

window.addEventListener('resize', handleResize);
document.addEventListener('wheel', handleScroll, { passive: false });
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });

init();
requestAnimationFrame(animate);