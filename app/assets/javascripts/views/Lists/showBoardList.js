TrelloClone.Views.BoardsList = Backbone.CompositeView.extend({
  template: JST['boardShowList'],
  tagName: 'li',
  className: 'listListItem',

  events: {
    "click button.deleteList": "destroyList",
    "click button.addCard": "popUpCardForm",
  },

  initialize: function (options) {
    this.list = options.list;
    this.listenTo(this.list, 'sync', this.render);
    this.listenTo(this.list.cards(), 'add', this.addCard);
    this.listenTo(this.list.cards(), 'remove', this.render)
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
    this.addSubview("ul.list-cards", cardView);
    if (this.newCardView){
      this.removeSubview("div.newCardContainer", this.newCardView);
      this.newCardView = null;
    };
  },

  destroyList: function () {
    this.list.destroy();
  },

  popUpCardForm: function (e) {
    this.newCardView = new TrelloClone.Views.NewCard({
      card: new TrelloClone.Models.Card(),
      cards: this.cards,
      list: this.list
    });
    this.addSubview("div.newCardContainer", this.newCardView);
    return this;
  },
})
