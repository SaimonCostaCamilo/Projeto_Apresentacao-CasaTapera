// Mesma ideia da demonstração nativa, implementada separadamente com jQuery.
$(function () {
  const $list = $('#jquery-list');
  $('#jquery-add').on('click', function () {
    const value = $('#jquery-input').val().trim();
    if (!value) { $('#jquery-input').trigger('focus'); return; }
    const $item = $('<li>');
    $('<span>').text(value).appendTo($item);
    $('<button>', {type:'button', class:'button button-outline', text:'Remover'}).appendTo($item);
    $list.append($item);
    $('#jquery-input').val('').trigger('focus');
  });
  $list.on('click', 'button', function () { $(this).closest('li').remove(); });
});