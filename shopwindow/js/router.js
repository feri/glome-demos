/**
 *
 */
App.Router.map(function()
{
  this.route('auth', { path: '/auth' });
  this.route('logout', { path: '/logout' });
  this.route("products", { path: '/products' });
  this.route("history", { path: '/history' });
});
