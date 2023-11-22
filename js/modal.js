$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name = 'name']");
  const phone = form.find("[name = 'phone']");
  const comment = form.find("[name = 'comment']");
  const to = form.find("[name = 'to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  const validateFields = (form, fieldsArray) => {

    fieldsArray.forEach(field => {
      field.removeClass("error");
      if (field.val().trim() === "") {
        field.addClass("error");
      }
    });

  const errorFields = form.find(".error");
  
  return errorFields.length === 0;
  }

  const isValid = validateFields(form, [name, phone, comment, to]);


if (isValid) {

  const request = $.ajax({
    url: " https://webdev-api.loftschool.com/sendmail",
    method: "POST",
    data: {
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val()
    },

    success: data => {},

    error: data => {}
  });

  request.done(data => {
    content.text(data.message);

    
  });

  request.fail(data => {
    content.text(data.responseJSON.message);
  });

  request.always(() => {
    modal.css('display', 'inline');
  })

e.target.reset();

}
})


$('.app-submit-button').click(e => {
  e.preventDefault();

  $('#modal').css('display', 'none');
})