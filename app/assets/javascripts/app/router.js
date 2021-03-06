app.Router = Backbone.Router.extend({
  routes: {
    "activity": "stream",
    "stream": "stream",

    "participate": "stream",
    "explore": "stream",

    "aspects": "stream",
    "aspects:query": "stream",

    "commented": "stream",
    "liked": "stream",
    "mentions": "stream",
    "people/:id": "stream",
    "people/:id/photos": "photos",
    "u/:name": "stream",
    "followed_tags": "stream",
    "tags/:name": "stream",

    "posts/new" : "composer",
    "posts/:id": "singlePost",
    "p/:id": "singlePost",
    "framer": "framer"
  },

  stream : function() {
    app.stream = new app.models.Stream();
    app.stream.fetch();
    app.page = new app.views.Stream({model : app.stream});
    app.publisher = app.publisher || new app.views.Publisher({collection : app.stream.items});

    var streamFacesView = new app.views.StreamFaces({collection : app.stream.items});

    $("#main_stream").html(app.page.render().el);
    $('#selected_aspect_contacts .content').html(streamFacesView.render().el);
  },

  photos : function() {
    app.photos = new app.models.Stream([], {collection: app.collections.Photos});
    app.page = new app.views.Photos({model : app.photos});


    $("#main_stream").html(app.page.render().el);
  },

  composer : function(){
    var page = new app.pages.Composer();
    $("#container").html(page.render().el)
  },

  framer : function(){
    var page = new app.pages.Framer();
    $("#container").html(page.render().el)
  },

  singlePost : function(id) {
    var page = new app.pages.PostViewer({ id: id });
    $("#container").html(page.el);
   }
});

