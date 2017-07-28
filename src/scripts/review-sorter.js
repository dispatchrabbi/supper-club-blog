$(function() {
  const sortOptions = $('.review-sort-option');
  sortOptions.click(function() {
    sortOptions.removeClass('active');
    $(this).addClass('active');
  });
});
