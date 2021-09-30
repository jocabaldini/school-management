const student = require("./student")

module.exports = (dependencies) => ({
  studentExist: student(dependencies).studentExist,
  validateStudentCreation: student(dependencies).validateStudentCreation,
})
