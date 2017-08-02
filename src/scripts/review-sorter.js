$(function ready() {
  const sortOptions = $('.review-sort-option');
  sortOptions.click(function onClick() {
    sortOptions.removeClass('active');
    $(this).addClass('active');
  });
});
