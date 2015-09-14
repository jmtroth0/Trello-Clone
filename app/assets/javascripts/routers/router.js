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
    "lists/:list_id/cards/new": "newCard",
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

  newCard: function (listId){
    var newCard = new TrelloClone.Models.Card();
    var list = this.lists.getOrFetch(listId);
    var newCardView = new TrelloClone.Views.NewCard({
      list: list,
      card: newCard,
      cards: list.cards(),
    });
    this._swapView(newCardView);
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
