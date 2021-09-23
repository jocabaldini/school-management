const studentSchemas = require('./student-schemas')

module.exports = (application) => [
	{
		path: '/v1/student',
		method: 'GET',
		config: {
			description: 'Return all students',
			notes: 'No extra notes',
			tags: ['student', 'get', 'api', 'v1'],
			handler: (req, res) => {
				try {
					const ret = application.getStudents()
					return res.response(ret.data).code(ret.statusCode)
				} catch (erro) {
					return res.response('Internal error').code(500)
				}
			},
		},
	},
	{
		path: '/v1/student/{id}',
		method: 'GET',
		config: {
			description: 'Return a student by his id',
			notes: 'No extra notes',
			tags: ['student', 'get', 'api', 'v1'],
			handler: (req, res) => {
				try {
					const ret = application.getStudents(req.params.id)
					return res.response(ret.data).code(ret.statusCode)
				} catch (erro) {
					return res.response('Internal error').code(500)
				}
			},
		},
	},
	{
		path: '/v1/student',
		method: 'POST',
		config: {
			description: 'Create a new student',
			notes: 'No extra notes',
			tags: ['student', 'create', 'api', 'v1'],
			handler: (req, res) => {
				try {
					const ret = application.createStudent(req.payload)
					return res.response(ret.data).code(ret.statusCode)
				} catch (erro) {
					return res.response('Internal error').code(500)
				}
			},
		},
	},
	{
		path: '/v1/student/{id}',
		method: 'PUT',
		config: {
			description: 'Update a student',
			notes: 'No extra notes',
			tags: ['student', 'update', 'api', 'v1'],
			handler: (req, res) => {
				try {
					const ret = application.updateStudent(req.params.id, req.payload)
					return res.response(ret.data).code(ret.statusCode)
				} catch (erro) {
					return res.response('Internal error').code(500)
				}
			},
		},
	},
]