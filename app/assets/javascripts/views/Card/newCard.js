TrelloClone.Views.NewCard = Backbone.View.extend({
  template: JST["_cardForm"],
  className: "newCard",

  initialize: function (options) {
    this.card = options.card;
    this.cards = options.cards;
    this.list = options.list
    this.listenTo(this.card, 'sync', this.render);
  },

  events: {
    'submit form': 'submit',
  },

  render: function () {
    this.$el.html(this.template({ card: this.card }));
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    attrs['list_id'] = this.list.id
    this.card.save(attrs, {
      success: function () {
        this.list.cards().add(this.card);

      }.bind(this),

      error: function (model) {
      }
    });
  },
})
