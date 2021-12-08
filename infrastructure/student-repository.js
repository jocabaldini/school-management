/**
 * @typedef {import('../domain/model').IStudent} Student
 * @typedef {import('..').IDependencies} Dependencies
 */

/**
 *
 * @param {Dependencies} dependencies All dependencies needed by this module
 */
module.exports = () => {
  let students = []

  const getNextId = () => {
    let id = 0
    students.forEach((v) => {
      id = id < v.id ? (id = v.id) : id
    })

    return ++id
  }

  return {
    studentExist: async (id) => students.filter((v) => v.id === parseInt(id)).length > 0,
    createStudent: async (student) => {
      student.id = getNextId()
      students.push(student)
      return student
    },
    updateStudent: async (id, student) => {
      student.id = id
      students = students.map((v) => (id === v.id ? student : v))
      return student
    },
    getStudents: async (id) => {
      if (id) {
        const filtered = students.filter((v) => {
          return v.id === parseInt(id)
        })

        return filtered[0]
      }
      return students
    },
    deleteStudent: async (id) => {
      students = students.filter((v) => v.id !== parseInt(id))
      return true
    },
  }
}
