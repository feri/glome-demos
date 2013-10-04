/**
 *
 */
App.User = DS.Model.extend(
{
  glomeid: DS.attr('string'),
  didLoad: function()
  {
    console.log('we have a current user: ' + this.get('glomeid'));
  }
});