const main = $('.main');
const sections = $('section');

sections.first().addClass('active');

const mobileDetect = new MobileObject(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

const performTransition = sectionEq => {
  if (inScroll === false){
    inScroll = true;
    const position = sectionEq * -100;
    
    main.css({
      transform : `translateY(${position}%)`
    })
    
    sections.eq(sectionEq).addClass('active').siblings().removeClass('active');
    
    const fixedMenu = $('.fixed-menu__list');
    const fixedMenuItems = fixedMenu.find('.fixed-menu__item');
    fixedMenuItems.eq(sectionEq).addClass('fixed-menu__item--active').siblings().removeClass('fixed-menu__item--active');

    setTimeout(() => {
      inScroll = false
    }, 1000)
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  
  if (direction == 'next' && nextSection.length){
    performTransition(nextSection.index());
  }

  if (direction == 'prev' && prevSection.length){
    performTransition(prevSection.index());
  }
};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0){
    scrollViewport('next');
  }

  if (deltaY < 0){
    scrollViewport('prev');
  }
});

$(window).on('keydown', e => {
  switch (e.keyCode) {
    case 38:
      scrollViewport('prev'); 
      break;
    
    case 40:
      scrollViewport('next');
      break;
  }
});

$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

if (isMobile) {
  $('body').swipe({
    swipe: function(event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = '';
  
      if (direction == 'up') scrollDirection = 'next';
      if (direction == 'down') scrollDirection = 'prev';
  
      scroller[scrollDirection]();
    }
  })
}
