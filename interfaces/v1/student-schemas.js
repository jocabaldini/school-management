const joi = require("joi")
const guardian = joi.object().keys({
  name: joi.string().required(true),
})
module.exports = {
  post: {
    payload: joi.object({
      full_name: joi.string().required(true),
      address: joi.object({
        street: joi.string().required(true),
        number: joi.string().required(true),
        complement: joi.string().allow(""),
        neighborhood: joi.string().required(true),
        city: joi.string().required(true),
        state: joi.string().required(true),
        zip_code: joi.string().required(true),
        country: joi.string().required(true),
      }),
      birthday: joi.string().required(true),
      guardians: joi.array().items(guardian).required(true),
    }),
  },
  put: {
    payload: joi.object({
      full_name: joi.string().required(true),
      address: joi.object({
        street: joi.string().required(true),
        number: joi.string().required(true),
        complement: joi.string().allow(""),
        neighborhood: joi.string().required(true),
        city: joi.string().required(true),
        state: joi.string().required(true),
        zip_code: joi.string().required(true),
        country: joi.string().required(true),
      }),
      birthday: joi.string().required(true),
      guardians: joi.array().items(guardian).required(true),
    }),
  },
}
