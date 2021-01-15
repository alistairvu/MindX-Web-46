const fs = require("fs")
let dataString

try {
  dataString = fs.readFileSync("input.txt", "utf8")
} catch (err) {
  console.log(err)
}

const numbers = dataString.split(" ").map((x) => parseInt(x.trim()))
const result = numbers.reduce(
  (count, curr) => (curr % 2 !== 0 ? count + 1 : count),
  0
)

try {
  fs.writeFileSync("./output.txt", `${result}`)
} catch (err) {
  console.log(err)
}
