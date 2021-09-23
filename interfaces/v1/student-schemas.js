const joi = require('joi')

module.exports = {
	post: {
		payload: {
			full_name: joi.string().required(true),
			address: {
				street: joi.string().required(true),
				number: joi.string().required(true),
				complement: joi.string().required(true),
				neighborhood: joi.string().required(true),
				city: joi.string().required(true),
				state: joi.string().required(true),
				zip_code: joi.string().required(true),
				country: joi.string().required(true),
			},
			birthday: joi.string().required(true),
			guardians:[
				{
					name: joi.string().required(true),
				}
			]
		}
	},
	put: {
		payload: {
			full_name: joi.string().required(true),
			address: {
				street: joi.string().required(true),
				number: joi.string().required(true),
				complement: joi.string().required(true),
				neighborhood: joi.string().required(true),
				city: joi.string().required(true),
				state: joi.string().required(true),
				zip_code: joi.string().required(true),
				country: joi.string().required(true),
			},
			birthday: joi.string().required(true),
			guardians:[
				{
					name: joi.string().required(true),
				}
			]
		}
	}
}