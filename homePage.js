const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');

let currentIndex = 0; 
let slideInterval;    

// Show slide by index
function showSlide(index) {
  currentIndex = (index + slides.length) % slides.length; 

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentIndex);
    if (dots[i]) dots[i].classList.toggle('active', i === currentIndex);
  });
}

// Next/Prev functions
function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// Event listeners
nextButton.addEventListener('click', () => {
  clearInterval(slideInterval); 
  nextSlide();
  startAutoSlide(); 
});

prevButton.addEventListener('click', () => {
  clearInterval(slideInterval);
  prevSlide();
  startAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(slideInterval); 
    showSlide(index);
    startAutoSlide(); 
  });
});

// Auto slide
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3000); // 3 seconds
}

// Initialize
showSlide(currentIndex); 
startAutoSlide();