TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: 'api/boards',
  model: TrelloClone.Models.Board,

  getOrFetch: function (id) {
    var board = this.get(id);
    var boards = this;

    if (board) {
      board.fetch();
    } else {
      board = new TrelloClone.Models.Board({id: id});
      this.add(board);
      board.fetch({
        error: function() {
          boards.remove(board);
        }
      });
    };

    return board;
  },

  getOrFetchList: function (boardId, listId) {
    var board = this.get(boardId);
    var list;

    if (board) {
      list = board.lists().get(listId);
    } else {
      list = new TrelloClone.Models.List({id: listId});
    };

    return list;
  },


});
