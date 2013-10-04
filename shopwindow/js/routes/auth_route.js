"use strict";

/**
 *
 */
App.AuthRoute = Ember.Route.extend(
{
  setupController: function(controller)
  {
    controller.get('controllers.application').send('setGlobals');
    //~ App.glomeid = window.localStorage.getItem('glomeid');
    //~ App.loggedin = window.localStorage.getItem('loggedin') == 'true';
    //~ App.addon = window.localStorage.getItem('addon') == 'true';

    if (App.loggedin)
    {
      console.log(2.5);
      this.transitionTo('products');
    }

    console.log('0 is addon available: ' + App.addon);
    console.log('0 is glomeid set: ' + App.glomeid);
    console.log('0 is loggedin set: ' + App.loggedin);
  },
  renderTemplate: function()
  {
    if (App.addon)
    {
      this.render('auth-with-addon');
    }
    else
    {
      if (App.glomeid)
      {
        this._super();
      }
      else
      {
        this.render('no-glome-id');
      }
    }
  }
});