function removeRequestContact() {
  $('.user-remove-request-contact').bind('click', function () {
    let targetId = $(this).data('uid')
    $.ajax({
      url: '/contact/remove-request',
      type: 'delete',
      data: { uid: targetId },
      success: function (data) {
        if (data.success) {
          $('#find-user')
            .find(`div.user-remove-request-contact[data-uid = ${targetId}]`)
            .hide()
          $('#find-user')
            .find(`div.user-add-new-contact[data-uid = ${targetId}]`)
            .css('display', 'inline-block')
          decreaseNumberNotifContact('count-request-contact-sent')

          $('#request-contact-sent').find(`li[data-uid = ${targetId}]`).remove()

          //realtime
          socket.emit('remove-request-contact', { contactId: targetId })
        }
      },
    })
  })
}

socket.on('response-remove-request-contact', function (user) {
  // delete items popup
  $('.noti_content').find(`div[data-uid = ${user.id}]`).remove()
  $('ul.list-notifications')
    .find(`li>div[data-uid = ${user.id}]`)
    .parent()
    .remove()

  $('#request-contact-received').find(`li[data-uid = ${user.id}]`).remove()

  decreaseNumberNotificationt('count-request-contact-received')

  decreaseNumberNotificationt('noti_contact_counter', 1)
  decreaseNumberNotificationt('noti_counter', 1)
})
