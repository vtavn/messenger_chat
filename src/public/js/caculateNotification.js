function decreaseNumberNotificationt(c) {
  let currentValue = +$(`.${c}`).text()
  currentValue -= 1

  if (currentValue === 0) {
    $(`.${c}`).css("display", "none").html("")
  } else {
    $(`.${c}`).css("display", "block").html(currentValue)
  }
}

function increaseNumberNotification(c) {
  let currentValue = +$(`.${c}`).text()
  currentValue += 1

  if (currentValue === 0) {
    $(`.${c}`).css("display", "none").html("")
  } else {
    $(`.${c}`).css("display", "block").html(currentValue)
  }
}
