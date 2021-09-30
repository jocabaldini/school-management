const Joi = require('joi')
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
			validate: {
				options: {
					allowUnknown: true,
				},
				payload: studentSchemas.post.payload,
				failAction: async (request, h, err) => {
					if (process.env.NODE_ENV === 'production') {
					  // In prod, log a limited error message and throw the default Bad Request error.
					  console.error('ValidationError:', err.message);
					  throw Boom.badRequest(`Invalid request payload input`);
					} else {
					  // During development, log and respond with the full error.
					  console.error(err);
					  throw err;
					}
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
			validate: {
				options: {
					allowUnknown: true,
				},
				params: {
					id: Joi.number()
					.required()
					.description('the id for the student'),
				},
				payload: studentSchemas.put.payload,
				failAction: async (request, h, err) => {
					if (process.env.NODE_ENV === 'production') {
					  // In prod, log a limited error message and throw the default Bad Request error.
					  console.error('ValidationError:', err.message);
					  throw Boom.badRequest(`Invalid request payload input`);
					} else {
					  // During development, log and respond with the full error.
					  console.error(err);
					  throw err;
					}
				  }
			},
		},
	},
	{
		path: '/v1/student/{id}',
		method: 'DELETE',
		config: {
			description: 'Delete a student',
			notes: 'No extra notes',
			tags: ['student', 'delete', 'api', 'v1'],
			handler: (req, res) => {
				try {
					const ret = application.deleteStudent(req.params.id)
					return res.response(ret.data).code(ret.statusCode)
				} catch (erro) {
					console.log(erro)
					return res.response('Internal error').code(500)
				}
			},
			validate: {
				options: {
					allowUnknown: true,
				},
				params: {
					id: Joi.number()
					.required()
					.description('the id for the student'),
				},
			},
		},
	},
]