/**
 *
 */
App.ApplicationView = Ember.View.extend(
{
  /**
   *
   */
  didInsertElement: function()
  {
    Ember.$(window).scroll(function()
    {
      if ($(this).scrollTop() > 150)
      {
        Ember.$('#back-top').fadeIn();
      } else {
        Ember.$('#back-top').fadeOut();
      }
    });

    Ember.$('.backtotop').click(function()
    {
      Ember.$('html, body').animate({scrollTop:0}, 'slow');
    });
  }
});