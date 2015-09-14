TrelloClone.Views.NewBoard = Backbone.View.extend({
  template: JST["_boardForm"],
  className: "newBoard",

  initialize: function (options) {
    this.board = options.board;
    this.boards = options.boards;
    this.listenTo(this.board, 'sync', this.render);
  },

  events: {
    'submit form': 'submit'
  },

  render: function () {
    this.$el.html(this.template({ board: this.board }));
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    this.board.save(attrs, {
      success: function () {
        this.boards.add(this.board);
        Backbone.history.navigate('', { trigger: true });
      }.bind(this),

      error: function(model, response) {
        $('.errors').empty();
        response.responseJSON.forEach(function (el) {
          var $li = $('<li>');
          $li.text(el);
          $('.errors').append($li);
        }.bind(this));
      }.bind(this),
    })
  }
})
