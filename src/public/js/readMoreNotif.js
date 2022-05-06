$(document).ready(function () {
  $('#link-read-more-notif').bind('click', function () {
    let skipNumber = $('ul.list-notifications').find('li').length

    $('#link-read-more-notif').css('display', 'none')
    $('.lds-ripple').css('display', 'inline-block')

    $.get(
      `notification/read-more/?skipNumber=${skipNumber}`,
      function (notifications) {
        if (!notifications.length) {
          alertify.notify('Bạn đã đọc hết thông báo mới.', 'error', 5)
          $('#link-read-more-notif').css('display', 'inline-block')
          $('.lds-ripple').css('display', 'none')
          return false
        }
        notifications.forEach(function (e) {
          $('ul.list-notifications').append(`<li>${e}</li>`)
        })
        $('#link-read-more-notif').css('display', 'inline-block')
        $('.lds-ripple').css('display', 'none')
      }
    )
  })
})
