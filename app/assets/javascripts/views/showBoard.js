TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST['boardShow'],
  className: 'boardShowContainer',

  initialize: function (options) {
    this.board = options.board;
    this.listenTo(this.board, 'sync destroy remove', this.render)
  },

  events: {
    "click a.indexReturn": "indexReturn",
    "click button.deleteBoard": "deleteBoard",
  },

  render: function () {
    this.$el.html(this.template({board: this.board}));
    var lists = this.board.lists();

    if (lists) {
      this.board.lists().each(function(list){
        this.addList(list);
      }.bind(this));
    };

    return this;
  },

  addList: function (list) {
    var listView = new TrelloClone.Views.BoardsList({list: list})
    this.addSubview("ul.board-lists", listView);
  },

  indexReturn: function (e) {
    e.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  },

  makeNewList: function (e) {
    e.preventDefault();
    Backbone.history.navigate(
      "/boards/" + this.board.id + "/lists/new/",
      {trigger: true}
    );
  },

  deleteBoard: function (e) {
    e.preventDefault
    this.board.destroy();
    Backbone.history.navigate("", { trigger: true });
  },
})
