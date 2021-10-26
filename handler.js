module.exports = {
  handleError: (request, h, err) => {
    console.log("caiu aqui no handler")
    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const invalidItem = err.details[0];
        return h.response(`Data Validation Error. Schema violation. <${invalidItem.path}> \nDetails: ${JSON.stringify(err.details)}`)
            .code(400)
            .takeover();
    }

    return h.response(err)
        .takeover()
  }
}