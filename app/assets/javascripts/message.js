$(function(){
  function buildHTML(message) {
    var img = message.image? `<img src="${message.image}">` : "";
    var html =
      `<div class="message" data-message-id=${message.id}>
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text__content">
              ${message.content}
            </p>
              ${img} 
          </div>
        </div>`
      return html; 
  }
  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
      $('#new_message')[0].reset();  
    })
    .fail(function(){
      alert('error');
    });
    return false;
  });

  $(function() {
    setInterval(reloadMessages, 5000);
  });
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data('message-id');
    var group_id = $('.main-header__left-box__current-group').data('group-id');
    var url1 = `/groups/${group_id}/api/messages`
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: url1,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
      insertHTML = buildHTML(message);         
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
      });
    })
    .fail(function() {
      ('error');
    });
  }
});