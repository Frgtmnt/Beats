const openItem = item => {
  const container = item.closest('.team__item');
  const content = container.find('.team__content');
  const contentBlock = content.find('.team__content-block');
  const blockHeight = contentBlock.height();

  item.addClass("active");
  content.height(blockHeight);
}

const closeAllItems = container =>{
  const items = container.find('.team__content');
  const name = container.find('.team__name');

  name.removeClass("active");
  items.height(0);
}

$('.team__name').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');

  if($this.hasClass("active")){
    closeAllItems(container);
  }else {
    closeAllItems(container);
    openItem($this);
  }

})