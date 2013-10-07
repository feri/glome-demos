/**
 *
 */
App.ApplicationController = Ember.ArrayController.extend(
{
  needs: ['user', 'application'],
  glomeid: false,
  loggedin: false,
  addon: false,
  actions:
  {
    /**
     * Shows a notification message
     */
    notify: function(message)
    {
      console.log('Notification to show: ' + message);
      this.set('controllers.application.notification', 'Please login with the addon first.');
      Ember.$('div.server.notifications').fadeIn(400, function()
      {
        Ember.$('div.server.notifications').fadeOut(5000);
      });
    },
    /**
     * Set some variables used in all view
     */
    setGlobals: function()
    {
      console.log('start here ---');

      if (!  window.localStorage.getItem('loggedin'))
      {
        window.localStorage.setItem('loggedin', false);
      }
      if (!  window.localStorage.getItem('addon'))
      {
        window.localStorage.setItem('addon', false);
      }

      this.set('glomeid', window.localStorage.getItem('glomeid'));
      this.set('loggedin', window.localStorage.getItem('loggedin') == 'true');
      this.set('addon', window.localStorage.getItem('addon') == 'true');

      console.log('globals: glomeid: ' + this.glomeid + ', loggedin: ' + this.loggedin + ', addon: ' + this.addon);
    }
  },

  /**
   * Get started
   */
  init: function()
  {
    self = this;

    /**
     * Called when glomeid_ready is fired by the addon
     */
    document.addEventListener("glomeid_ready", function(event)
    {
      window.localStorage.setItem('addon', true);
      var glomeid = Ember.$('#glome-integration').attr('data-glomeid');

      if (! glomeid || glomeid == '')
      {
        console.log('did not receive Glome ID via the event');
        return;
      }

      window.localStorage.setItem('glomeid', glomeid);

      // set headers for every subsequent API requests
      App.Adapter.reopen(
      {
        headers:
        {
          'X-Glome-Application-Token': Ember.$('div#glome-integration').attr('data-application-token'),
          'X-Glome-Id': glomeid
        }
      });

      if (window.localStorage.getItem('loggedin') == 'false')
      {
        console.log('try to login via backdoor with glomeid: ' + glomeid);
        self.get('controllers.user').send('secretAuth', self, glomeid);
      }
    }, false, true);

    /**
     * Called when addon_loggedout is fired by the addon
     */
    document.addEventListener("addon_loggedout", function(event)
    {
      self.send('setGlobals');

      if (window.localStorage.getItem('loggedin') == 'false')
      {
        self.send('notify', 'Please login with the addon first.');
      }
    }, false, true);

    this._super();
  }
});
