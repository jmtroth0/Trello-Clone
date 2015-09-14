// TrelloClone.Views.ListCard = Backbone.View.extend({
//   template: JST['boardShowListCard'],
//
//   events: {
//     "click button.deleteCard": "destroyCard",
//     "click a.displayCard": "renderCard",
//   },
//
//   initialize: function (options) {
//     this.card = options.card;
//     this.listenTo(this.card, 'sync remove destroy', this.render);
//   },
//
//   render: function () {
//     this.$el.html(this.template({card: this.card}));
//     return this;
//   },
//
//   destroyCard: function () {
//     this.card.destroy();
//   },
// })
