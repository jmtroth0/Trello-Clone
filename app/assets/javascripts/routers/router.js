TrelloClone.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.boards = options.boards;
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "index",
    "boards/new": "newBoard",
    "boards/:id": "showBoard",
    "boards/:board_id/lists/new": "newList",
  },

  index: function () {
    var indexView = new TrelloClone.Views.BoardsIndex({
      boards: this.boards
    });
    this._swapView(indexView);
  },

  newBoard: function () {
    var newBoard = new TrelloClone.Models.Board();
    var newBoardView = new TrelloClone.Views.NewBoard({
      board: newBoard,
      boards: this.boards
    });
    this._swapView(newBoardView);
  },

  newList: function (boardId) {
    var newList = new TrelloClone.Models.List();
    var board = this.boards.getOrFetch(boardId);
    var newListView = new TrelloClone.Views.NewList({
      board: board,
      list: newList,
      lists: board.lists(),
    });
    this._swapView(newListView);
  },

  showBoard: function (id) {
    var board = this.boards.getOrFetch(id);
    var showBoardView = new TrelloClone.Views.ShowBoard({
      board: board,
    })
    this._swapView(showBoardView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
})
