/**
 * @typedef {import('../domain/model').IStudent} Student
 * @typedef {import('..').IDependencies} Dependencies
 */

/**
 *
 * @param {Dependencies} dependencies All dependencies needed by this module
 */
module.exports = () => {
  const availableSpaces = {
    1: 10,
    2: 20,
    3: 20,
    4: 25,
    5: 25,
    6: 10,
  }
  const students = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  }
  return {
    getAvailableSpaces: (room) => availableSpaces[room] - students[room].length,
    createStudent: (student) =>  students[student.room].push(student),
    updateStudent: (student) =>  students[student.room].push(student),
    getStudents: (room) => room ? students[room] : students,
    getStudentById: (id) => students.map((value) => {
      return value.map((v) => {
        return v.id = id
      })
    })
  }
}
