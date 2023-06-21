class Carousel {
    constructor(carousel,isloop) {
      // find elements
      this.carousel = carousel;
      this.buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
      this.buttonNext = carousel.querySelector('[data-carousel-button-next]');
      this.slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
  
      // state
      this.currentSlide = 0;
      this.numSlides = this.slidesContainer.children.length;
  
      // add events
      this.buttonPrevious.addEventListener('click', this.handlePrevious.bind(this));
      this.buttonNext.addEventListener('click', this.handleNext.bind(this));

      if(isloop){
        //this.nextLoop();
      }
    }
    modulo(number, mod) {
      let result = number % mod;
      if (result < 0) {
        result += mod;
      }
      return result;
    }
    handleNext() {
      this.currentSlide = this.modulo(this.currentSlide + 1, this.numSlides);
      this.carousel.style.setProperty('--current-slide', this.currentSlide);
    }
  
    handlePrevious() {
      this.currentSlide = this.modulo(this.currentSlide - 1, this.numSlides);
      this.carousel.style.setProperty('--current-slide', this.currentSlide);
    }
    nextLoop(time){

      let nextfun=this.handleNext.bind(this)
      setInterval(nextfun, 7000);
    }
  }

  fetch('https://api.themoviedb.org/3/movie/14/reviews?api_key='+api_key,{method: "GET"})
  .then(response =>response.json())
  .then(data => reveiwMov(data))
                .catch(err => console.log(err));
  


function reveiwMov(reveiws){

    const slidesContainer = document.querySelector('[data-review-carousel-container]');
    const reveiwCarousel = document.querySelector('[data-review-carousel]');

    reveiwHtml=''

    reveiws["results"].forEach(result => {
        reveiwHtml+=`<!-- reveiw content -->
        <!-- slide may require -->
        <div class="reveiw-slide">
          <div class="reveiw-author">
            <div class="author-avatar">
              <img  class="author-avatar-img" src="https://image.tmdb.org/t/p/original${result.author_details.avatar_path}" alt="author avatar">
            </div>
            <div class="author-details">
              <div class="author-name">
                ${result.author}
              </div>
              <div class="reveiw-date">
                ${result.created_at}
              </div>
            </div>
          </div>
          <div class="reveiw-content">
            <p class="reveiw-text">
              ${result.content}
            </p>
          </div>
        </div>`
    });

    slidesContainer.innerHTML=reveiwHtml
    let carousel= new Carousel(reveiwCarousel,true)

}