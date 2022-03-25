function decreaseNumberNotifContact(c) {
  let currentValue = +$(`.${c}`).find("em").text()
  currentValue -= 1

  if (currentValue === 0) {
    $(`.${c}`).html("")
  } else {
    $(`.${c}`).html(`(<em>${currentValue}</em>)`)
  }
}

function increaseNumberNotifContact(c) {
  let currentValue = +$(`.${c}`).find("em").text()
  currentValue += 1

  if (currentValue === 0) {
    $(`.${c}`).html("")
  } else {
    $(`.${c}`).html(`(<em>${currentValue}</em>)`)
  }
}
