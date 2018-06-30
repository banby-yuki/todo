$(function() {
  'use strict';

  $('new_todo').focus();

  //update
  $("#todos").on('click', '.update_todo', function() {
    // id 取得
      var id = $(this).parents('li').data('id');
    //ajax処理
      $.post('_ajax.php', {
        id: id,
        mode: 'update',
        token: $('#token').val()
      }, function(res) {
        if (res.state === '1') {
          $('#todo_' + id).find('.todo_title').addClass('done');
        } else {
          $('#todo_' + id).find('.todo_title').removeClass('done');
        }
      })
  });

  //delete
  $("#todos").on('click', '.delete_todo', function() {
    // id 取得
      var id = $(this).parents('li').data('id');
    //ajax処理
    if (confirm('are you sure?')){
        $.post('_ajax.php', {
          id: id,
          mode: 'delete',
          token: $('#token').val()
        }, function() {
        $('#todo_' + id).fadeOut(800);
      });
    }
  });
  //create
  $('#new_todo_form').on('submit', function() {
    // title 取得
      var title = $('#new_todo').val();
    //ajax処理
      $.post('_ajax.php', {
        title: title,
        mode: 'create',
        token: $('#token').val()
      }, function(res) {
        //liを追加
        var $li = $('#todo_template').clone();
        $li
        //id属性に、resオブジェクトで帰ってきた中の、idを’todo_’にくっつければOK。
          .attr('id', 'todo_' + res.id)
        //data属性のidにresオブジェクトで帰ってきた中の、idをくっつける。
          .data('id', res.id)
        //findでclass="todo_title"を探して、入力されたtitleを入れてあげる。
        .find('.todo_title').text(title);
        //id="todos"の上に(prepend)追加。
        $('#todos').prepend($li.fadeIn());
        //id="new_todo"の値を空にしてあげて、フォーカスを当てる。
        $('new_todo').val('').focus();
    });
    return false;
  });
});
