/**
 *
 */
App.Product = DS.Model.extend(
{
  title: DS.attr('string'),
  page: DS.attr('string'),
  content: DS.attr('string')
});


App.Product.reopenClass(
{
  /* retrieve records */
  all: function(store)
  {
    //console.log(store);
    return store.findAll('product').then(function(data)
    {
      var items = [];
      data.forEach(function (item)
      {
        items.push(item);
      });

      return items;
    });
  }
});