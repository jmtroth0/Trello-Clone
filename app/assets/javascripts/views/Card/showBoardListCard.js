TrelloClone.Views.ListCard = Backbone.View.extend({
  template: JST['boardShowListCard'],
  tagName: 'li',
  className: 'cardListItem',

  events: {
    "click button.deleteCard": "destroyCard",
    "dblclick a.displayCard": "toggleCardShow",
    "click button.cancelShowCard": "removeCardShow"
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

  toggleCardShow: function () {
    var currentShow = $("div.cardShow")
    if (currentShow && currentShow.data('id') === this.card.id){
      this.removeCardShow();
      return;
    } else if (currentShow) {
      this.removeCardShow();
    };
    var cardTemplate = JST['cardShow'];
    var $cardContainer = $("<div class='cardShow' data-id=" + this.card.id + ">");
    $cardContainer.html(cardTemplate({card: this.card}));
    $("body").append($("<div class=background>"))
    $("body").append($cardContainer);
    return this;
  },

  removeCardShow: function () {
    debugger;
    $("div.cardShow").remove();
    $("div.background").remove();
  }

})
