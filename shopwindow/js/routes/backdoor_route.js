/**
 *
 */
App.BackdoorRoute = Ember.Route.extend(
{
  model: function()
  {
    return this.store.find('user', 'backdoor').then(function(data)
    {
      // do something here?
    });
  }
});