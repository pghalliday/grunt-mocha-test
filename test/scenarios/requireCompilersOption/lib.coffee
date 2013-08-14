module.exports = class Test
  constructor: (@name) ->

  sayHello: =>
    'Hello, ' + @name