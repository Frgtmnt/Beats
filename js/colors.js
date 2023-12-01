const measureWidth = item => {
  const screenWidth = $(window).width();
  const container = item.closest('.colors-menu');
  const title = container.find('.colors-menu__title');
  const titleWidth = title.width();
  const titlesWidth = title.width() * title.length;

  const isTablet = window.matchMedia("(max-width: 768px)").matches;
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  if (isTablet){
    return screenWidth - titlesWidth;
  }else if (isMobile){
    return screenWidth - titleWidth;
  }else {
    return 500;
  }
}


const openColorItem = item => {
  const container = item.closest('.colors-menu__item');
  const content = container.find('.colors-menu__content');
  const contentText = content.find('.colors-menu__text');
  // const contentTextWidth = contentText.innerWidth();
  const contentTextWidth = measureWidth(item);

  console.log(contentTextWidth);

  item.addClass('active');
  content.width(contentTextWidth);
}

const closeAllColorItems = container => {
  const content = container.find('.colors-menu__content');
  const title = container.find('.colors-menu__title');

  title.removeClass('active');
  content.width(0);
}

$('.colors-menu__title').click(e => {
  $this = $(e.currentTarget);
  const container = $this.closest('.colors-menu');

  if ($this.hasClass('active')){
    closeAllColorItems(container);
  }else {
    closeAllColorItems(container);
    openColorItem($this);
  }
})