const findReview = data => {
  return $('.reviews__single').filter((ndx, item) => {
    return $(item).attr("data-review") == data;
  });
};

$('.reviews__link').click(e => {
  e.preventDefault();
  $this = $(e.currentTarget);
  const currentItem = $this.closest('.reviews__item');
  const target = currentItem.attr("data-link");
  const showReview = findReview(target);

  showReview.addClass("review--active").siblings().removeClass("review--active");
  currentItem.addClass("reviews__item--active").siblings().removeClass("reviews__item--active");
})