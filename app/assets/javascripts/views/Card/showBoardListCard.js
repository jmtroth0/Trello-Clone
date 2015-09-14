TrelloClone.Views.ListCard = Backbone.View.extend({
  template: JST['boardShowListCard'],
  tagName: 'li',
  className: 'cardListItem',

  events: {
    "click button.deleteCard": "destroyCard",
    "click a.displayCard": "renderCard",
  },

  initialize: function (options) {
    this.card = options.card;
    this.listenTo(this.card, 'sync', this.render);
  },

  render: function () {

    this.$el.html(this.template({card: this.card}));
    return this;
  },

  destroyCard: function () {
    this.card.destroy();
  },

  renderCard: function () {
    var cardTemplate = JST['cardShow'];
    var $cardContainer = $("<div class='cardShow'>");
    $cardContainer.append(cardTemplate({card: this.card}));
    this.$el.append($cardContainer);
    return this;
  },

})
