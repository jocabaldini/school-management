module.exports = (dependencies) => ({
	getStudents: (id) => {
		const data = id ? `Retornando estudante #${id}` : 'Retornando estudantes'
		return dependencies.helpers.makeReturn(200, data)
	},
	createStudent: (student) => {
		const data = 'Created a new student'
		return dependencies.helpers.makeReturn(201, data)
	},
	updateStudent: (student) => {
		const data = 'Updated a student'
		return dependencies.helpers.makeReturn(200, data)
	}
})