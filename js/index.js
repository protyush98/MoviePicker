//Carousel

  
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
        this.nextLoop();
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

  fetch('https://api.themoviedb.org/3/trending/movie/day?api_key='+api_key,{method: "GET"})
  .then(response =>response.json())
  .then(data => insertTrendings(data))
                .catch(err => console.log(err));
  

  function insertTrendings(trends){
    
    const slidesContainer = document.querySelector('[data-trending-carousel-container]');
    const trendingCarousel = document.querySelector('[data-trending-carousel]');
    
    let trendrings=trends.results;
    let trendingHtml='';
    trendrings.forEach(function(trending){
      trendingHtml+='<div class="slide" style="background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('+'https://image.tmdb.org/t/p/original'+trending.backdrop_path+')">'+
                    '<div class="align-center movie-description">'+
                    '<div class="movie-name" >'+
                    trending.original_title+
                    '</div>'+
                    '<div class="movie-text">'+
                    '<button class="slide-btn"><span class="know-more">Know More</span></button>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
      
    })

    slidesContainer.innerHTML= trendingHtml;
    let carousel= new Carousel(trendingCarousel,true);
  }
  

  //search

  const searchMovieInpt=document.querySelector("#search-movie");
  const searchResSec= document.querySelector("#search-result");

  searchMovieInpt.addEventListener("keyup",function(evnt){
    // console.log(evnt)
    // console.log(this.value)
    if(evnt.key == "Enter")
      evnt.preventDefault();
    if(this.value != ""){
      fetch('https://api.themoviedb.org/3/search/movie?api_key='+api_key+'&query='+this.value,{method: "GET"})
      .then(response =>response.json())
      .then(data => searchResult(data))
      .catch(err => console.log(err));
    }
    else{
      searchResult([]);
    }
  });

  function searchResult(data){

    let resMov="";
    srchResBlck=document.querySelector("#search-result");
    if(data.length == 0){
      srchResBlck.style.height="0vh";
      console.log("Nothing");
      resMov="";
    }
    else{
      
      srchResBlck.style.height="70vh";
      resultArr=data.results.slice(0,3);
      
      resultArr.forEach(function(movie){
        let adult='';
        let voteRGB="";
        let voteColor="";
        if(movie.adult){
          adult=`<div class="mov-adult v-alng">
            <span class="material-icons">
              18_up_rating
              </span>
            </div>`;
            console.log(adult)
        }
        
        if(parseFloat(movie.vote_average)>7.9){
          voteRGB="rgb(74, 165, 81)";
        }
        else if(parseFloat(movie.vote_average)<=7.9 && parseFloat(movie.vote_average)>5.0){
          voteRGB="rgb(40, 221, 12)";
        }
        else if(parseFloat(movie.vote_average)<=5.0 && parseFloat(movie.vote_average)>4.0){
          voteRGB="rgb(222, 236, 115)";
        }
        else{
          voteRGB="rgb(228, 87, 26)";
        }

        voteColor=`style="background-color: ${voteRGB}"`;

        resMov = resMov+ `<div class="mov-grid-box">
        <div class="mov">
          <div class="mov-image" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster_path}');">
          </div>
          <div class="mov-description">
            <div class="mov-title">
              ${movie.original_title}<span class="mov-year">(${movie.release_date.slice(0,4)})</span>
            </div>
            <div class="mov-info">
              <div class="mov-lang v-alng">
                <span class="material-icons">
                  language
                </span>
                <span class="lang-text">${movie.original_language.toUpperCase()}</span>
              </div>
              <div class="mov-vote v-alng" ${voteColor}>
                <span class="material-icons">
                  star
                </span>
                <span class="rating-number">${movie.vote_average}</span>
              </div>
              ${adult}
            </div>
            <button class="slide-btn mov-btn"><span class="know-more">Know More</span></button>
          </div>
        </div>
      </div>
      `;
      })
      console.log(resMov);
      
    }
    searchResSec.innerHTML= resMov;

  }

  //movie

  