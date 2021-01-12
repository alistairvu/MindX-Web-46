function doAsync(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}

const run = async () => {
  try {
    const data = await doAsync("https://api.github.com/users/itzy")
    console.log(data)
  } catch (e) {
    console.error(e)
  }
}

run()
