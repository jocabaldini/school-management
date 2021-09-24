module.exports = (dependencies) => ({
	getStudents: (id) => {
		const data = dependencies.infrastructure.studentRepository.getStudents(id)

		return dependencies.helpers.makeReturn(200, data)
	},
	createStudent: (student) => {
		const data = dependencies.infrastructure.studentRepository.createStudent(student)
		
		return dependencies.helpers.makeReturn(201, data)
	},
	updateStudent: (student) => {
		const data = dependencies.infrastructure.studentRepository.updateStudent(student)

		return dependencies.helpers.makeReturn(200, data)
	}
})