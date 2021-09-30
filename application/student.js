module.exports = (dependencies) => ({
  getStudents: (id) => {
    if (id) {
      const existStudent = dependencies.domain.studentExist(id)
      if (existStudent === false) {
        return dependencies.helpers.makeReturn(404, {
          message: "Student not found",
        })
      }
    }
    const data = dependencies.infrastructure.studentRepository.getStudents(id)

    return dependencies.helpers.makeReturn(200, data)
  },
  createStudent: (student) => {
    const validStudent = dependencies.domain.validateStudentCreation(student)
    if (validStudent === false) {
      return dependencies.helpers.makeReturn(400, {
        message: "Student is not valid",
      })
    }
    const data =
      dependencies.infrastructure.studentRepository.createStudent(student)

    return dependencies.helpers.makeReturn(201, data)
  },
  updateStudent: (id, student) => {
    const existStudent = dependencies.domain.studentExist(id)
    if (existStudent === false) {
      return dependencies.helpers.makeReturn(404, {
        message: "Student not found",
      })
    }
    const validStudent = dependencies.domain.validateStudentCreation(student)
    if (validStudent === false) {
      return dependencies.helpers.makeReturn(400, {
        message: "Student is not valid",
      })
    }
    const data = dependencies.infrastructure.studentRepository.updateStudent(
      id,
      student
    )

    return dependencies.helpers.makeReturn(200, data)
  },
  deleteStudent: (id, student) => {
    const existStudent = dependencies.domain.studentExist(id)
    if (existStudent === false) {
      return dependencies.helpers.makeReturn(404, {
        message: "Student not found",
      })
    }
    const data = dependencies.infrastructure.studentRepository.deleteStudent(id)

    return dependencies.helpers.makeReturn(200, data)
  },
})
