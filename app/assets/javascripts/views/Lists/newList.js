TrelloClone.Views.NewList = Backbone.View.extend({
  template: JST["listForm"],

  initialize: function (options) {
    this.board = options.board;
    this.list = options.list;
    this.lists = options.lists;
    this.listenTo(this.list, 'sync', this.render);
  },

  events: {
    'submit form': 'submit',
  },

  render: function () {
    this.$el.html(this.template({ list: this.list }));
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.target).serializeJSON();
    attrs['board_id'] = this.board.id;
    this.list.set(attrs)

    this.list.save({}, {
      success: function () {
        Backbone.history.navigate(
          'boards/' + this.board.id,
          { trigger: true }
        );
      }.bind(this),

      error: function(model, response) {
        this.lists.remove(this.list)
        $('.errors').empty();
        response.responseJSON.forEach(function (el) {
          var $li = $('<li>');
          $li.text(el);
          $('.errors').append($li);
        }.bind(this));
      }.bind(this),
    })
  }
})
