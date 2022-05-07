function decreaseNumberNotifContact(c, number) {
  let currentValue = +$(`.${c}`).find('em').text()
  currentValue += number

  if (currentValue === 0) {
    $(`.${c}`).html('')
  } else {
    $(`.${c}`).html(`(<em>${currentValue}</em>)`)
  }
}

function increaseNumberNotifContact(c, number) {
  let currentValue = +$(`.${c}`).find('em').text()
  currentValue -= number

  if (currentValue === 0) {
    $(`.${c}`).html('')
  } else {
    $(`.${c}`).html(`(<em>${currentValue}</em>)`)
  }
}
