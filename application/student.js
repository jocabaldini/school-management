module.exports = (dependencies) => ({
  getStudents: async (id) => {
    if (id) {
      const existStudent = await dependencies.domain.studentExist(id)
      if (existStudent === false) {
        return await dependencies.helpers.makeReturn(404, {
          message: "Student not found",
        })
      }
    }
    const data = await dependencies.infrastructure.studentRepository.getStudents(id)

    return await dependencies.helpers.makeReturn(200, data)
  },
  createStudent: async (student) => {
    const validStudent = await dependencies.domain.validateStudentCreation(student)
    if (validStudent === false) {
      return await dependencies.helpers.makeReturn(400, {
        message: "Student is not valid",
      })
    }
    const data =
      await dependencies.infrastructure.studentRepository.createStudent(student)

    return await dependencies.helpers.makeReturn(201, data)
  },
  updateStudent: async (id, student) => {
    const existStudent = await dependencies.domain.studentExist(id)
    if (existStudent === false) {
      return await dependencies.helpers.makeReturn(404, {
        message: "Student not found",
      })
    }
    const validStudent = await dependencies.domain.validateStudentCreation(student)
    if (validStudent === false) {
      return await dependencies.helpers.makeReturn(400, {
        message: "Student is not valid",
      })
    }
    const data = await dependencies.infrastructure.studentRepository.updateStudent(
      id,
      student
    )

    return await dependencies.helpers.makeReturn(200, data)
  },
  deleteStudent: async (id) => {
    const existStudent = await dependencies.domain.studentExist(id)
    if (existStudent === false) {
      return await dependencies.helpers.makeReturn(404, {
        message: "Student not found",
      })
    }
    const data = await dependencies.infrastructure.studentRepository.deleteStudent(id)

    return await dependencies.helpers.makeReturn(200, data)
  },
})
