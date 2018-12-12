var data  = [
  {
    "regulate" : "首页",
    "href" : "./home/index.html",
    "fontpig" : "fa fa-home"
  },
  {
  "regulate" : "客户管理",
  "href" : "./enterprise/enterprise.html",
  "fontpig" : "fa fa-podcast"
  },{
    "regulate" : "店铺管理",
      "user" : "店铺管理",
      "href" : "./shop/shop.html",
      "fontpig" : "fa fa-group"
  },{
    "regulate" : "品牌合作机会",
    "href" : "./brand/brand.html",
    "fontpig" : "fa fa-university"
  },{
    "regulate" : "联系人信息",
      "user" : "联系人信息",
      "href" : "./customer/customer.html",
      "fontpig" : "fa fa-users"
   },{
    "regulate" : "跟进客户",
    "href" : "./follow/follow.html",
    "fontpig" : "fa fa-user"
   },{
    "regulate" : "员工首页",
    "href" : "./home/employee.html",
    "fontpig" : "fa fa-user"
   },{
    "regulate" : "经理首页",
    "href" : "./home/manager.html",
    "fontpig" : "fa fa-user"
   },{
    "regulate" : "销售管理",
    "href" : "./salesDetail/Itemquery.html",
    "fontpig" : "fa fa-user"
   },{
    "regulate" : "跟进计划",
    "href" : "./visit/visitPlay.html",
    "fontpig" : "fa fa-user"
   },{
    "regulate" : "潜客管理",
    "href" : "./enterprise/potential.html",
    "fontpig" : "fa fa-user"
   },{
    "regulate" : "客户线索",
    "href" : "./clues/clues.html",
    "fontpig" : "fa fa-user"
   }
];

var html = '<ul class="sidebar-menu" style="list-style-type:none;float:left;">';
for(var i=0;i<data.length;i++){
  if(data[i].regulateList){
    if(data[i].regulateList.length>0){
      html+='<li style="padding:10px;float:left;margin-left:10px;background: #409eff;cursor: pointer;">'+
      '<a style="text-decoration:none;color: #fff;background-color: #409EFF;border-color: #409EFF;">'+
      '<i class="'+data[i].fontpig+'"></i> <span>'+data[i].regulate+'</span>'+
      '<span class="pull-right-container">'+
      '<i class="fa fa-angle-left pull-right"></i>'+
      '</span>'+
      '</a>'+
      '<ul>'
      for(var j=0;j<data[i].regulateList.length;j++){
         html+='<li style="padding:0 20px;float:left;margin-left:10px;"><a data-href="'+data[i].regulateList[j].href+'" class="iframename"><i class="fa fa-circle-o"></i>'+data[i].regulateList[j].user+'</a></li>'
      }
      html+='</ul></li>'
    }
  }else{
    html+='<li style="padding:10px;float:left;margin-left:10px;background: #409eff;cursor: pointer;">'+
      '<a data-href="'+data[i].href+'" class="iframename" style="text-decoration:none;color: #fff;background-color: #409EFF;border-color: #409EFF;">'+
      '<i class="'+data[i].fontpig+'"></i> <span>'+data[i].regulate+'</span>'+
      '</span>'+
      '</a>'+
      '</li>'
  }
}
html+='</ul>'

$('.sidebar').append(html);

//获取当前页面高度
var height=  document.documentElement.clientHeight - 90;
$('#iframename').css({"height":height+'px'});
$('.content').find('#iframename').attr("src",'./home/index.html');
$('.sidebar').on('click','.iframename',function(){
  var href = $(this).attr("data-href");
  $('.content').find('#iframename').attr("src",href);
})
