const buildApi = async function () {
  if (!!process.env.NODE_ENV ||
    ['development', 'test'].includes(process.env.NODE_ENV)) {
    require('dotenv').config()
  }
  const multer = require('fastify-multer')
  const fastify = require('fastify')({
    logger: true // process.env.NODE_ENV !== 'test'
  })
  const jwtOptions = require('./plugins/jwt/jwt-options')
  const oauthOptions = require('./plugins/oauth/options')
  await fastify
    .setErrorHandler(require('./errors/error-handler'))
    .register(require('middie'))
    .register(require('fastify-swagger'), require('./plugins/swagger/swagger-options'))
    .register(require('fastify-cookie'))
    .register(require('fastify-cors'), require('./plugins/cors/cors-options'))
    .register(require('fastify-jwt'), jwtOptions)
    .register(multer.contentParser)
    .register(require('./plugins/mongoose/fastify-mongoose'), require('./plugins/mongoose/mongoose-options'))
    .register(require('./plugins/ws/fastify-ws'), {
      jwt: jwtOptions,
      pingInterval: require('./plugins/ws/scaleout-options').pingInterval,
      scaleout: require('./plugins/ws/scaleout-options').scaleout,
      handler: require('./routes/ws/ws-handler'),
      dispatcher: require('./routes/ws/ws-dispatcher')
    })
  if (oauthOptions.facebook) {
    await fastify.register(require('fastify-oauth2'), oauthOptions.facebook)
  }
  if (oauthOptions.google) {
    await fastify.register(require('fastify-oauth2'), oauthOptions.google)
  }
  if (oauthOptions.github) {
    await fastify.register(require('fastify-oauth2'), oauthOptions.github)
  }
  if (oauthOptions.linkedin) {
    await fastify.register(require('fastify-oauth2'), oauthOptions.linkedin)
  }
  await fastify
    .decorate('authenticate', async (request, reply) => {
      if (request.cookies.token) {
        const user = await fastify.jwt.verify(request.cookies.token, jwtOptions)
        request.user = user
      } else {
        await request.jwtVerify(jwtOptions)
      }
    })
    .decorate('verifyToken', async (request, reply) => {
      const userService = require('./services/user/user-service')
      await userService.verify(request.user.user)
    })
    .after(() => {
      // register routes
      const routes = require('./routes')
      routes.forEach((route) => {
        if (route.authenticate) {
          route.preValidation = [
            fastify.authenticate,
            fastify.verifyToken
          ]
        }
        fastify.route(route)
      })
    })

  return fastify
}

module.exports = buildApi
