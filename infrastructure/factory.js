const studentRepository = require('./student-repository')()

module.exports = () => ({
  studentRepository: {
    studentExist: studentRepository.studentExist,
    createStudent: studentRepository.createStudent,
    updateStudent: studentRepository.updateStudent,
    deleteStudent: studentRepository.deleteStudent,
    getStudents: studentRepository.getStudents,
  },
})
