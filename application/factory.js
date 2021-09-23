module.exports = () => ({
	getStudents: (id) => {
		return  {
			data: id ? `Retornando estudante #${id}` : 'Retornando estudantes',
			statusCode: 200,
		}
	},
	createStudent: (student) => {
		console.log(student)
		return {
			data: 'Created',
			statusCode: 201,
		}
	},
	updateStudent: (student) => {
		console.log(student)
		return {
			data: 'Updated',
			statusCode: 200,
		}
	}
})