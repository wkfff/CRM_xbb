/*解决当前页面高度动态展示问题
* 解决当前页面点击菜单列的相关页面数据时，在ifrem框架加载当前展示的功能页面
*/
var height=  document.documentElement.clientHeight - 60;
$('.main').find('iframe').css({"height":height+'px'});
$('.sidebar').on('click','#iframename',function(){
  var href = $(this).attr("data-href");
  $('.main').find('iframe').attr("src",href);
})
