class EventValidation {
  checkEvent = async (ctx, next) => {
    ctx.checkBody({
      title: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
        },
        errorMessage: 'Invalid title', // Error message for the parameter
      },
      description: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
        },
        errorMessage: 'Invalid description', // Error message for the parameter
      },
      price: {
        notEmpty: true,
        isInt: {
          errorMessage: 'Invalid price',
        },
      },
      date: {
        notEmpty: true,
        errorMessage: 'Invalid date', // Error message for the parameter
      },
    })

    let errors = await ctx.validationErrors()

    if (errors) {
      ctx.body = errors
      ctx.status = 422
      return
    }

    await next()
  }
}

module.exports = EventValidation
