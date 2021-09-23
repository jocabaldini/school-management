const helpers = require('../helpers')
const student = require('./student')

const dependencies = {
	helpers,
}


module.exports = () => ({
	getStudents: student(dependencies).getStudents,
	createStudent: student(dependencies).createStudent,
	updateStudent: student(dependencies).updateStudent,
})