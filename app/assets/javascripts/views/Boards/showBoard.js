TrelloClone.Views.ShowBoard = Backbone.CompositeView.extend({
  template: JST['boardShow'],
  className: 'boardShowContainer',

  initialize: function (options) {
    this.board = options.board;
    this.listenTo(this.board, 'sync', this.render);
    this.listenTo(this.board.lists(), 'remove', this.deleteList);
  },

  events: {
    "click a.indexReturn": "indexReturn",
    "click button.deleteBoard": "deleteBoard",
  },

  render: function () {
    this.$el.html(this.template({board: this.board}));
    var lists = this.board.lists();

    if (lists) {
      this.board.lists().sort().each(function(list){
        this.addList(list);
      }.bind(this));
    };

    this.listsDraggable();
    this.cardsDraggable();
    return this;
  },

  addList: function (list) {
    var listView = new TrelloClone.Views.BoardsList({list: list})
    this.addSubview("ul.board-lists", listView);
  },

  listsDraggable: function () {
    $("li.listListItem").draggable({
      revert: true,
      drop: function() {
        console.log("Landed at: " + $(this).position());
      }
    });
    $("ul.board-lists").droppable({
      accept: "li.listListItem"
    })
  },

  cardsDraggable: function () {
      $("li.cardListItem").draggable({
        revert: true,
        drop: function() {
          console.log("Landed at: " + $(this).position());
        }
      });
      $("ul.list-cards").droppable({
        accept: "li.cardListItem"
      })
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

  deleteList: function (model) {
    this.removeModelSubview("ul.board-lists", model);
    this.render();
  },

  deleteBoard: function (e) {
    e.preventDefault();
    this.board.destroy();
    Backbone.history.navigate("", { trigger: true });
  },
})
