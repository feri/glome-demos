/**
 *
 */
App.ApplicationRoute = Ember.Route.extend(
{
  actions:
  {
    auth: function(password)
    {
      this.controller.get('controllers.user').send('auth', App.glomeid, password);
    },
    logout: function ()
    {
      this.controller.get('controllers.user').send('logout');
    },
    history: function ()
    {
      this.controller.get('controllers.user').send('history');
    },
    products: function ()
    {
      this.transitionTo('products');
    },
    error: function(reason, transition)
    {
      if (typeof reason.status !== 'undefined')
      {
        console.log('status: ' + reason.status + ', transition: ' + transition);
        if (reason.status === 403)
        {
          window.localStorage.setItem('loggedin', false);
        }
        //this.controller.get('controllers.application').set(error, reason.status);
        this.transitionTo('auth');
      }
    }
  },
  setupController: function(controller)
  {
    controller.get('controllers.application').send('setGlobals');

    if (App.glomeid && App.glomeid != '')
    {
      this.store.find('user', App.glomeid).then(function(data)
      {
        window.localStorage.setItem('loggedin', true);
        controller.get('controllers.application').set('loggedin', true);
      });
    }
    controller.set('title', "Shop Window");
  }
});