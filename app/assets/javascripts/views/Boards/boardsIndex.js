TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boardsIndex'],

  initialize: function (options) {
    this.boards = options.boards;
    this.listenTo(this.boards, 'sync remove', this.render.bind(this));
  },

  events: {
    "click a.newBoard": "popUpBoardForm",
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
  },

  popUpBoardForm: function (e) {
    e.preventDefault();
    // $newBoardEl = this.$el.find("div.newBoardContainer")
    var newBoardView = new TrelloClone.Views.NewBoard({
      board: new TrelloClone.Models.Board(),
      boards: this.boards
    });
    // $newBoardEl.html(newBoardView.render().$el)
    this.addSubview("div.newBoardContainer", newBoardView);
    return this;
  },
})
