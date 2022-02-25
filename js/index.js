//Carousel
function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
      result += mod;
    }
    return result;
  }
  
  function setUpCarousel(carousel) {
    function handleNext() {
      currentSlide = modulo(currentSlide + 1, numSlides);
      changeSlide(currentSlide);
    }
  
    function handlePrevious() {
      currentSlide = modulo(currentSlide - 1, numSlides);
      changeSlide(currentSlide);
    }
  
    function changeSlide(slideNumber) {
      carousel.style.setProperty('--current-slide', slideNumber);
    }
  
    // get elements
    const buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
    const buttonNext = carousel.querySelector('[data-carousel-button-next]');
    const slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
  
    // carousel state we need to remember
    let currentSlide = 0;
    const numSlides = slidesContainer.children.length;
  
    // set up events
    buttonPrevious.addEventListener('click', handlePrevious);
    buttonNext.addEventListener('click', handleNext);
  }
  
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(setUpCarousel);
  const mov1Carousel = document.querySelector('[data-mov-1]');
  const mov2Carousel = document.querySelector('[data-mov-2]');

  mov1Carousel.style.setProperty('background-image','linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(../img/dummy.jpg)')
  mov2Carousel.style.setProperty('background-image','linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(../img/dummy2.jpg)')
