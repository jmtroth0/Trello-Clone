TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boardsIndex'],

  initialize: function (options) {
    this.boards = options.boards;
    this.listenTo(this.boards, 'sync remove', this.render.bind(this))
  },

  render: function () {
    this.$el.html(this.template());
    this.boards.each(function(board) {
      this.addBoard(board);
    }.bind(this));

    return this;
  },

  addBoard: function (board) {
    var boardView = new TrelloClone.Views.BoardsIndexItem({
      board: board,
      boards: this.boards,
    });
    
    this.addSubview("ul.indexList", boardView)
  }
})
