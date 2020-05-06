class UserValidation {
  checkUser = async (ctx, next) => {
    ctx.checkBody({
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Invalid Email',
        },
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }]
        },
        errorMessage: 'Invalid Password', // Error message for the parameter
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

module.exports = UserValidation
