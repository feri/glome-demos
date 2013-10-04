/**
 * Master Glome App
 */
var GlomeApp = Ember.Application.extend(
{
  error: null,
  currentUser: null,
  apiHost: 'http://shopwindow.glome.me/api',
  loginPost: '/users/login.json',
  logoutGet: '/users/logout.json',
  productsIndex: 'products.json',
  backdoorGet: '/users/backdoor.json'
});

/**
 * Current App
 */
var App = GlomeApp.create(
{
  LOG_TRANSITIONS: true, // basic logging of successful transitions
  LOG_TRANSITIONS_INTERNAL: true // detailed logging of all routing steps
});

/**
 *
 */
App.Serializer = DS.RESTSerializer.extend(
{
  extractSingle: function(store, type, payload, id, requestType)
  {
    var o = {};
    switch (type)
    {
      case App.User:
        o['user'] = payload
        break;
      case App.Product:
        o['product'] = payload
        break;
      default:
        alert(type);
    };
    console.log('extractSingle from server');
    return this._super(store, type, o, id, requestType);
  },
  extractArray: function(store, primaryType, payload)
  {
    var o = {};
    switch (primaryType)
    {
      case App.User:
        o['users'] = payload
        break;
      case App.Product:
        o['products'] = payload
        break;
      default:
        alert(primaryType);
    };
    console.log('extractArray from server');
    return this._super(store, primaryType, o);
  }
});

/**
 *
 */
App.Adapter = DS.RESTAdapter.extend(
{
  host: App.apiHost
});

/**
 *
 */
App.Store = DS.Store.extend(
{
  adapter: App.Adapter
});
