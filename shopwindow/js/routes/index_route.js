/**
 * Redirect to products
 */
App.IndexRoute = Ember.Route.extend(
{
  redirect: function()
  {
    if (window.localStorage.getItem('loggedin') == 'true')
      this.transitionTo('products');
    else
      this.transitionTo('auth');
  }
});