/**
 *
 */
App.ProductsRoute = Ember.Route.extend(
{
  model: function()
  {
    return App.Product.all(this.get('store'));
  }
});