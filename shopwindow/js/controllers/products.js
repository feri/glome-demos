"use strict";

/**
 *
 */
App.ProductAdapter = App.Adapter.extend(
{
  buildURL: function(type, id)
  {
    return this._super(type, id) + '.json'
  }
});

/**
 *
 */
App.ProductSerializer = App.Serializer.extend({});

/**
 *
 */
App.ProductsController = Ember.ArrayController.extend(
{
  needs: ['user', 'application'],
  page: 0,
  per_page: 10,
  actions:
  {
    /**
     * Paging
     */
    page: function(num)
    {
      (num) ? num = num : num = 1;
      var self = this;
      var url = App.apiHost + App.productsIndex + '?page=' + num;
      return Ember.$.getJSON(url).then(function(data)
      {
        self.set('page', num);
      });
    }
  }
});
