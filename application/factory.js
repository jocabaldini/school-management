const helpers = require('../helpers')
const student = require('./student')

const dependencies = {
	helpers,
}
dependencies.infrastructure = require('../infrastructure')(dependencies)
dependencies.domain = require('../domain')(dependencies)


module.exports = () => ({
	getStudents: student(dependencies).getStudents,
	createStudent: student(dependencies).createStudent,
	updateStudent: student(dependencies).updateStudent,
	deleteStudent: student(dependencies).deleteStudent,
})