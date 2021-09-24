const studentRepository = require('./student-repository')()

module.exports = () => ({
  studentRepository: {
    getAvailableSpaces: studentRepository.getAvailableSpaces,
    createStudent: studentRepository.createStudent,
    updateStudent: studentRepository.updateStudent,
    getStudents: studentRepository.getStudents,
    getStudentById: studentRepository.getStudentById,
  },
})
