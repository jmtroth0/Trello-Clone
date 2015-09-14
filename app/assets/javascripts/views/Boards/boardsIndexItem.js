TrelloClone.Views.BoardsIndexItem = Backbone.View.extend({
  template: JST['boardsIndexItem'],
  tagName: 'li',
  className: 'indexListItem group',

  events: {
    "click button.delete": "destroyBoard",
  },

  initialize: function (options) {
    this.board = options.board;
    this.collection = options.boards;
    this.listenTo(this.board, 'sync', this.render);
  },

  render: function () {
    this.$el.html(this.template({board: this.board}));
    return this;
  },

  destroyBoard: function () {
    this.board.destroy();
  },
})
