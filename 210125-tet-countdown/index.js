const numberToDisplayString = (num) => (num < 10 ? `0${num}` : `${num}`)

$(document).ready(() => {
  setInterval(() => {
    const now = Math.floor(new Date().valueOf() / 1000)
    const tetStart = new Date("02/08/2021").valueOf() / 1000
    const days = numberToDisplayString(
      Math.floor((tetStart - now) / (3600 * 24))
    )
    const hours = numberToDisplayString(
      Math.floor(((tetStart - now) % (3600 * 24)) / 3600)
    )
    const minutes = numberToDisplayString(
      Math.floor(((tetStart - now) % 3600) / 60)
    )
    const seconds = numberToDisplayString(Math.floor((tetStart - now) % 60))

    $("#countdown").html(
      `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`
    )
  }, 1000)
})
