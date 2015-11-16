require.config({
  paths: {
    "jquery": "jquery-1.7.1"
  }
});
require(['jquery'], function ($) {
  $('#kic').addClass('ak47');
});
require(['math'], function (math) {
  var d = math.add(1, 2);
  console.log(d);
})