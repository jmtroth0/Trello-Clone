TrelloClone.Collections.Lists = Backbone.Collection.extend({
  url: 'api/lists',
  model: TrelloClone.Models.List,

  initialize: function (models, options) {
    this.board = options.board
  },

  comparator: function (list) {
    return list.get('ord');
  },
});
