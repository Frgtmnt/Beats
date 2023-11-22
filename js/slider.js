const slider = $(".slider__list").bxSlider({
  pager : false,
  controls : false
});

$('.slider__arrow--direction--prev').click(e =>{
  e.preventDefault();
  slider.goToPrevSlide();
});

$('.slider__arrow--direction--next').click(e =>{
  e.preventDefault();
  slider.goToNextSlide();
})