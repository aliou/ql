module.exports = (app) ->
  class app.LinkController

    # GET /
    @index = (req, res) ->
      res.render 'index',
        view: 'index', app_url: process.env.APP_URL

