/**
 *
 */
App.UserAdapter = App.Adapter.extend(
{
  buildURL: function(type, id)
  {
    return this._super(type, id) + '.json';
  }
});

/**
 *
 */
App.UserSerializer = App.Serializer.extend({});

/**
 *
 */
App.UserController = Ember.ObjectController.extend(
{
  needs: ['user', 'application'],

  actions:
  {
    /**
     * Performs a standard login to the server
     */
    auth: function(glomeid, password)
    {
      var self = this;
      var url = App.apiHost + App.loginPost;
      var data =
      {
        user:
        {
          glomeid: glomeid,
          password: password
        }
      };
      return Ember.$.ajax(
      {
        url: url,
        data: data,
        type: 'post',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: function(data, textStatus, jqXHR)
        {
          console.log('status in user.auth: ' + textStatus);
        }
      }).then(function(data)
      {
        console.log('normal login completed: ' + data.glomeid);
        window.localStorage.setItem('loggedin', true);
        window.localStorage.setItem('glomeid', data.glomeid);
        self.get('controllers.application').send('setGlobals');
        self.transitionToRoute('products');
      });
    },
    /**
     * Performs login to the server via a backdoor
     */
    secretAuth: function(self, glomeid)
    {
      // hmm, request the secret login
      Ember.$.ajax(
      {
        url: App.apiHost + App.backdoorGet,
        type: 'GET',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        beforeSend: function(jqxhr)
        {
          jqxhr.setRequestHeader('X-Glome-Application-Token', Ember.$('div#glome-integration').attr('data-application-token'));
          jqxhr.setRequestHeader('X-Glome-Id', glomeid);
        }
      }).then(function(data)
      {
        console.log('backdoor login completed: ' + data.glomeid);
        window.localStorage.setItem('loggedin', true);
        window.localStorage.setItem('glomeid', data.glomeid);
        self.get('controllers.application').send('setGlobals');
        self.transitionToRoute('products');
      });
    },
    /**
     * Terminates the user session at the server
     */
    logout: function()
    {
      var self = this;
      var url = App.apiHost + App.logoutGet;
      return Ember.$.getJSON(url).then(function(data)
      {
        window.localStorage.setItem('loggedin', false);
        self.get('controllers.application').send('setGlobals');
        self.transitionToRoute('auth');
      });
    },
    /**
     * Shows user's history
     */
    history: function()
    {
      self.transitionToRoute('history');
    }
  }
});
