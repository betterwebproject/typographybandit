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
  
  // Calculate total size based on the current orientation
  let totalSize = Array.from(items).reduce((acc, item) => acc + (isVertical ? item.offsetHeight : item.offsetWidth), 0);

  if (isMobile) {
    page.style.width = '100%';
    page.style.height = '100%';
    page.style.overflow = 'auto';
    page.style.transform = 'none';
    document.body.style.overflow = 'hidden';
  } else {
    // Adjust the page size and overflow based on orientation
    page.style.width = isVertical ? '100%' : `${totalSize}px`;
    page.style.height = isVertical ? `${totalSize}px` : '100%';
    page.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    updateScroll();
  }
}

function updateScroll() {
  if (isMobile) return;
  
  // Calculate the maximum scroll position
  let maxPos = isVertical ? page.scrollHeight - window.innerHeight : page.scrollWidth - window.innerWidth;
  
  // Clamp the current position within the allowed range
  currentPos = Math.max(0, Math.min(currentPos, maxPos));
  
  // Apply the transform based on the current position and orientation
  page.style.transform = isVertical ? `translateY(${-currentPos}px)` : `translateX(${-currentPos}px)`;
}

function handleScroll(event) {
  if (isMobile) return;
  
  // Update the current position based on scroll events
  currentPos += isVertical ? event.deltaY : (event.deltaY + event.deltaX);
  updateScroll();
  event.preventDefault();
}

function handleTouchStart(event) {
  if (isMobile) return;
  
  // Start touch handling
  isTouching = true;
  startTouchPos = isVertical ? event.touches[0].clientY : event.touches[0].clientX;
  startPos = currentPos;
  touchVelocity = 0;
  lastTouchPos = startTouchPos;
}

function handleTouchMove(event) {
  if (isMobile) return;
  if (!isTouching) return;
  
  // Calculate the delta from touch movement
  let currentTouchPos = isVertical ? event.touches[0].clientY : event.touches[0].clientX;
  let delta = startTouchPos - currentTouchPos;
  
  // Update the current position and touch velocity
  currentPos = startPos + delta;
  touchVelocity = lastTouchPos - currentTouchPos;
  lastTouchPos = currentTouchPos;
  
  // Request an animation frame to update the scroll
  requestAnimationFrame(updateScroll);
  event.preventDefault();
}

function handleTouchEnd() {
  if (isMobile) return;
  
  // End touch handling
  isTouching = false;
}

function animate() {
  if (isMobile) return;
  
  // Apply momentum scrolling when not touching
  if (!isTouching) {
    currentPos += touchVelocity;
    touchVelocity *= 0.95; // Damping factor to simulate friction
    
    // Stop scrolling when velocity is very low
    if (Math.abs(touchVelocity) < 0.1) touchVelocity = 0;
    updateScroll();
  }
  
  // Request the next animation frame
  requestAnimationFrame(animate);
}

function handleResize() {
  // Reinitialize on resize
  init();
}

// Attach event listeners
window.addEventListener('resize', handleResize);
document.addEventListener('wheel', handleScroll, { passive: false });
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });

// Initialize and start animation loop
init();
requestAnimationFrame(animate);