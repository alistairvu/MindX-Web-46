// Sử dụng các hàm đọc, ghi file đồng bộ để hoàn thiện các yêu cầu sau
const fs = require("fs")
const dataString = fs.readFileSync("data.json", "utf8")
const data = JSON.parse(dataString)

interface Student {
  _id: string
  name: string
  mark: number
}

// lấy thông tin học sinh có _id là jubuq3lfmjjmp0wrdeupt
function getDetailStudent(): Student {
  const idStudent = data.find(
    (x: Student) => x["_id"] === "jubuq3lfmjjmp0wrdeupt"
  )
  return idStudent
}

// Lấy số lượng học sinh có từ Nguyễn
function getCountStudentWithLastName(): number {
  return data.reduce((prev: number, curr: Student) => {
    const { name } = curr
    return name.includes("Nguyễn") ? prev + 1 : prev
  }, 0)
}

// Tính điểm trung bình của toàn bộ sinh viên (làm tròn đến một chữ số sau dấu phẩy)
function calAverageMark(): number {
  const studentCount = data.length
  const scoreTotal = data.reduce((prev: number, curr: Student) => {
    const { mark } = curr
    return prev + mark
  }, 0)
  return Math.round((scoreTotal / studentCount) * 10) / 10
}

// Ghi ra số lượng học sinh đạt điểm 10 ra file output.txt (sử dụng hàm ghi đồng bộ);
function writeCountStudentGet10MarkToFile(): void {
  const result = data.filter((x: Student) => x.mark === 10).length
  fs.writeFileSync("output.txt", `${result}`)
}

module.exports = {
  getDetailStudent,
  getCountStudentWithLastName,
  calAverageMark,
  writeCountStudentGet10MarkToFile,
}
