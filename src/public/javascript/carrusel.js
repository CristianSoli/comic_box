window.addEventListener("DOMContentLoaded", function () {
    var slideIndex = 0;
    var slides = document.getElementsByClassName("seccionesimg-elemento");
    var timer;

    function showSlide(index) {
        if (index < 0) {
            slideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            slideIndex = 0;
        }

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex].style.display = "block";
    }

    function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
    }

    function previousSlide() {
        slideIndex--;
        showSlide(slideIndex);
    }

    function startCarousel() {
        timer = setInterval(function () {
            nextSlide();
        }, 3000);
    }

    function stopCarousel() {
        clearInterval(timer);
    }

    showSlide(slideIndex);

    var nextButtons = document.getElementsByClassName("nextButton");
    var prevButtons = document.getElementsByClassName("prevButton");

    for (var i = 0; i < nextButtons.length; i++) {
        nextButtons[i].addEventListener("click", function () {
            nextSlide();
            stopCarousel();
        });
    }

    for (var i = 0; i < prevButtons.length; i++) {
        prevButtons[i].addEventListener("click", function () {
            previousSlide();
            stopCarousel();
        });
    }

    startCarousel();
});







//------
window.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('.carousel');
    var carouselItems = document.querySelectorAll('.carousel-item');
    var carouselWidth = carousel.offsetWidth;
  
    var position = 0;
    var slidesToShow = 4;
    var slideWidth = carouselWidth / slidesToShow;
  
    function moveCarousel() {
      carousel.style.transform = 'translateX(' + position + 'px)';
    }
  
    function slideNext() {
      position -= slideWidth;
      if (position < -(carouselItems.length - slidesToShow) * slideWidth) {
        position = 0;
      }
      moveCarousel();
    }
  
    function slidePrev() {
      position += slideWidth;
      if (position > 0) {
        position = -(carouselItems.length - slidesToShow) * slideWidth;
      }
      moveCarousel();
    }
  
    var nextButton = document.createElement('div');
    nextButton.classList.add('carousel-next');
    nextButton.addEventListener('click', slideNext);
    carousel.parentNode.appendChild(nextButton);
  
    var prevButton = document.createElement('div');
    prevButton.classList.add('carousel-prev');
    prevButton.addEventListener('click', slidePrev);
    carousel.parentNode.appendChild(prevButton);
  
    window.addEventListener('resize', function() {
      carouselWidth = carousel.offsetWidth;
      slideWidth = carouselWidth / slidesToShow;
      moveCarousel();
    });
  });
  
