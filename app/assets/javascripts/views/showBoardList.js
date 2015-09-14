TrelloClone.Views.BoardsList = Backbone.CompositeView.extend({
  template: JST['boardShowList'],
  tagName: 'li',
  className: 'listListItem',

  events: {
    "click button.deleteList": "destroyList",
  },

  initialize: function (options) {
    this.list = options.list;
    this.listenTo(this.list, 'sync', this.render);
  },
 
  render: function () {
    this.$el.html(this.template({list: this.list}));
    var cards = this.list.cards();

    if (cards) {
      cards.sort().each(function (card) {
        this.addCard(card);
      }.bind(this));
    };

    return this;
  },

  addCard: function (card) {
    var cardView = new TrelloClone.Views.ListCard( { card: card })
    this.addSubview("ul.list-cards", cardView)
  },

  destroyList: function () {
    this.list.destroy();
  }
})
