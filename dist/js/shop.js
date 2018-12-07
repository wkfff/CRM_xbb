/** 
 * create author name xiaominzhang
 * create time 2018/8/18
*/
var vue = new Vue({
  el:"#app",
  mounted(){
      var crm_url = '/tstypegroup/getTypegroupNoSession';
      var labelurl = '/crm/shop/getList';
      var clienturl = '/crm/customer/getList';
      var lxrurl = '/crm/contacts/getList';
      var brand_url = '/crm/dictionary/getList';
      var url = this.vueUrl();
      this.shopType(url+crm_url);//店铺类型
      this.shopGrade(url+crm_url);  //店铺等级
      this.shopOpen(url+crm_url); //开店时间
      this.brand(url+brand_url);  //品牌机会数据
      this.getData(url+labelurl,this.select,1,10);
      var urluser = url+'/tsuser/getTSUsers?pageSize=-1';
      this.request(urluser); //请求用户信息 
      this.localdata(); //获取浏览器的数据
  },
  data:{
    form:{
        typeId:''
    },
    input: '',
    pageSize : '', //分页
    total : '' ,//总数
    tableData:[],  //表单数据
    crmsshopGrade : [], //店铺等级
    crmsshoptype : [], //店铺类型
    crmsbrand : [], //主营品牌
    crmsopenshop : [], //开店时间
    clientDetail : [],//客户信息
    crmsshopLabel : [],//店铺标签
    shopShow : [], //商店信息
    options1 : [], //公司成员
    customerDetail : [],//联系人信息
    followbrand : [], //跟进机会
    crmssaleChance : [], //销售阶段
    visit : [], //跟进方式
    commentInfo : [], //评论信息
    branddata : [],//品牌数据
    followData : [],//跟进记录信息
    brandShow : [],//品牌详情
    dpxtr : [],  //店铺协同人
    collaborusershop : [], //店铺协同人数据展示
    sellbrand : [], //店铺销售品牌数据
    sellData : [], //销售数据
    https : '',//请求接口前缀
    isopenshop : [{name:"开店",id:1},{name:"关店",id:0}],//是否开店
    importance : [{typename:"五星",id:'5'},{typename:"四星",id:'4'},{typename:"三星",id:'3'},{typename:"二星",id:'2'},{typename:"一星",id:'1'}],//重要程度
    formLabelWidth: '120px',
    crms_hzpt : '',crms_khlx : '',crms_khzt : '',crms_khjb : '',crms_khqmd : '',crms_khbq : '',crms_khly : '',crms_brand : '',
    crms_frm_start : '',crms_frm_end : '',crms_fzr : '',last_time : '',creat_time : '',first_time : '',currentPage: 1,dialogCostoms: false,currentPageSingle : 1,totalSingle : '',
    activeName : 'first',
    activebrand : 'first',
    dialogChance : false,
    branddetail : false, //品牌机会
    shoprespible : false, //店铺负责人
    shopaid : false, //店铺助理
    isA: false,
    isB: false,
    shopxtr : false, // 店铺协同人
    //店铺显示与隐藏
    show_shopbrand:false,show_shoptype:false,show_shoplevel:false,show_shoprank:false,show_shopdsr:false,show_shopfans:false,show_shopwtao:false,   show_shopnum:false,show_shopprice:false,show_shopgoods:false,show_shoptel:false,show_shopdate:false,show_shoplocation:false,   show_shopcategories:false,show_shoptag:false,show_shopsales:false,show_shopremark:false,show_shopisclose:false,
    //复选框选中
    shopbrand:false,shoptype:false,shoplevel:false,shoprank:false,shopdsr:false,shopfans:false,shopwtao:false,shopnum:false,shopprice:false,shopgoods:false,shoptel:false,shopdate:false,shoplocation:false,shopcategories:false,shoptag:false,shopsales:false,shopremark:false,shopisclose:false,
    //店铺详情展示判断是否是潜客
    sell_show : true,
    //店铺表头信息
    title_shop: {
      add_shop:'新增店铺',
      edit_shop: "编辑店铺"
    },
    ShopStatus : '',
    //品牌机会表头信息
    title_brand: {
      add_brand:'新增品牌合作机会',
      edit_brand: "编辑品牌合作机会"
    },
    BrandStatus : '',

    //筛选条件
    select : {
      name : '',
      shop_type : '',
      shop_level : '',
      main_brand : '',
      open_shop_date : '',
      unit_price : '',
    },

    pickerOptions1: {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [{
        text: '今天',
        onClick(picker) {
          picker.$emit('pick', new Date());
        }
      }, {
        text: '昨天',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      }, {
        text: '一周前',
        onClick(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', date);
        }
      }]
    }, //首次合作日期

    //新增表单提交
    shop : {
      id : '',
      name : '',
      customer_id : '',
      store_customer_type : '',
      shop_type : '',
      shop_level : '',
      main_brand : '',
      category_rank : '',
      average_monthly_sales : '',
      taobaocode : '',
      link :'',
      dsr : '',
      shop_fans : '',
      wtao_fans : '',
      good_num : '',
      unit_price : '',
      goods_num : '',
      service_tel : '',
      location : '',
      main_categories : '',
      open_shop_date : '',
      shop_tag : '',
      isclose_shop : '',
      remark : ''
    },

    rules: {//必填项提示
      name: [{required: true, message: '请输入店铺名称', trigger: 'blur'}],
      taobaocode : [{required: true, message: '请输入旺旺号', trigger: 'blur'}],
      shop_type : [{required: true, message: '请选择店铺类型', trigger: 'blur'}]
    },

    //跟进记录数据表单
    records :{
      id : '',
      customer_id : '',
      contacts_id : '',
      follow_up_way : '',
      follow_up_play : '',
      follow_up_on_date : '',
      leader_instructions : '',
      remark : ''
    },

    //移交店铺负责人
    shopresdata : {
      id :'',
      principal_id : '',
      principal_name : ''
    },

    //店铺助理
    shopaiddata : {
      id :'',
      assistant_id  : '',
      assistant_name  : ''
    },

    //店铺协同人
    collaborshop : {
      shop_id : '',
      user_id : '',
      type : 'dp_xtr'
    },

    //跟进记录评论
    textarea : {
      theme_id : '',
      context : '',
      type : '跟进记录'
    },

    //添加品牌合作机会
    brandChance : {
      id : '',
      brand_name : '',
      brand_plan_code : '',
      customer_id : '',
      principal_id : '',
      policymaker_id : '',
      sales_stage : '',
      degree_of_importance : '',
      plan_cooperation_date : '',
      last_follow_up_date : '',
      estimated_amount : ''
    },

    rules_brand: {//必填项提示
      brand_name: [{required: true, message: '请输入品牌机会名称', trigger: 'blur'}],
      policymaker_id : [{required: true, message: '请选择负责人', trigger: 'blur'}],
      principal_id: [{required: true, message: '请选择决策人', trigger: 'blur'}],
      sales_stage : [{required: true, message: '请选择销售阶段', trigger: 'blur'}],
      degree_of_importance : [{required: true, message: '请选择重要程度', trigger: 'blur'}],
      last_follow_up_date : [{required: true, message: '请选择最后跟进时间', trigger: 'blur'}],
      estimated_amount : [{type: 'number', message: '预计金额必须数字'}]
    },

    //修改品牌机会的销售机会
    upChanceData : {
      id : '',
      sales_stage : ''
    },

    //销售情况筛选信息
    sellselect : {
      brandcode : '',
      data1 : '',
      data2 : ''
    },

    //单品情况
    singleselect : {
      data1 : '',
      data2 : ''
    },

    height:{height:''},
    height1:{height:'',overflow:'auto'},
    height3:{height:'',overflow:'auto'},
    followheight:{height:'',overflow:'auto'},
    brandheight : {height:'',overflow:'auto'},
    heightselect : {height:''},
    width : {width:'',left:''},
    width1 : {width:''},
    width2 : {width:''},
    sellheight : {height:''},
    singleheight : '',
    tableHeight : '' //表单的最大高度设置
  },
  created(){
    this.hh();
    this.ww();
    const that = this
    window.onresize = () => {
        return (() => {
          this.hh();
          this.ww();
        })();
    }
  },
  methods:{
    hh(){
      this.height.height=window.innerHeight+'px';
      this.height1.height = window.innerHeight-200+'px';
      this.height3.height = window.innerHeight-100+'px';
      this.followheight.height =window.innerHeight-450+'px';
      this.sellheight.height = window.innerHeight-250+'px'
      this.brandheight.height = window.innerHeight-230+'px';
      this.singleheight = window.innerHeight-400;
      this.tableHeight = window.innerHeight - 80;
    },
    //获取页面宽度
    ww(){
      if(window.innerWidth<=1000){
        this.heightselect.height = '160px';
        this.width.width='95%';
        this.width.left = '5%';
        this.width1.width = '120px';
        this.width2.width = '43px';
        this.isB = true;
        this.isA = false;
        $('.brandhtml').find(".el-dialog").css({"width":this.width.width});
        $('.shophtml').find(".el-dialog").css({"width":this.width.width});
        $('.customerhtml').find(".el-dialog").css({"width":this.width.width});
       
      }else if(window.innerWidth<=1500 && window.innerWidth>1000){
        this.heightselect.height = 'auto';
        this.width.width='85%';
        this.width.left = '15%';
        this.width1.width = '120px';
        this.width2.width = '43px';
        this.isB = true;
        this.isA = false;
        $('.brandhtml').find(".el-dialog").css({"width":this.width.width});
        $('.shophtml').find(".el-dialog").css({"width":this.width.width});
        $('.customerhtml').find(".el-dialog").css({"width":this.width.width});
      
      }else{
        this.heightselect.height = 'auto';
        this.width.width='70%';
        this.width.left = '30%';
        this.width1.width = '210px';
        this.width2.width = '90px';
        this.isB = false;
        this.isA = true;
        $('.brandhtml').find(".el-dialog").css({"width":this.width.width});
        $('.shophtml').find(".el-dialog").css({"width":this.width.width});
        $('.customerhtml').find(".el-dialog").css({"width":this.width.width});

      }
    },
   
    //获取当前页面的url路径
    vueUrl(){
      var url = location.href.split('/rhmcrm')[0];
      //处理时间段的问题
      this.sellselect.data1 = this.time(3);
      this.sellselect.data2 = this.time(2);
      //单品管理
      this.singleselect.data1 = this.time(3);
      this.singleselect.data2 = this.time(2);
      
      if(url == "http://test.runhemei.com/maochao_test"){
        url = "http://test.runhemei.com/maochao"
        this.https = url;
        return url;
      }else{
        this.https = url;
        return url;
      }
    },

    //时间段处理
    time : function(date) {
      var myDate = new Date();
      //获取当前年
      var year=myDate.getFullYear();
      //获取当前月
      var month=myDate.getMonth()+1;
      month = month<10?'0'+month:month;
      //获取当前日
      var day=myDate.getDate(); 
      day=day<10?'0'+day:day;
      if(date == 1){
          return year+'-'+month+'-'+day;
      }else if(date == 2){
          return year+'-'+month;
      }else if(date == 3){
          var o = new Date(myDate.getTime()-180*24*60*60*1000);
          var oyear = o.getFullYear();
          var omonth = o.getMonth()+1;
          omonth = omonth<10?'0'+omonth:omonth;
          return oyear+'-'+omonth;
      }
  },

    //店铺类型
    shopType(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_dplx'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsshoptype = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //店铺等级
    shopGrade(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_dpdj'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsshopGrade = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //开店时间shopOpen
    shopOpen(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_kdsj'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsopenshop = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //店铺标签
    shopLabel(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_dpbj'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsshopLabel = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //联系人
    customerData:function(url,id){
      var data = {
        "a.customer_id" : "='"+id+"'"
      }
      var para = {
        pageSize: -1,
        paramsJson : JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.customerDetail = res.data.data.result;
      })
      .catch(function(res) {
        console.log(res)
      }) 
    },

    //跟进方式
    visitWay(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_bffs'
      }}).then((res) => {  //.then() 返回成功的数据
        this.visit = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //品牌请求
    brand(url){
      let para = {
        paramsJson : JSON.stringify({
          dict_type:"='mc_brand_u8'"
        })
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.crmsbrand = res.data.data.result;
      }).catch(function(res) {
          console.log(res)
      }) 
    },

    //销售机会
    saleChance(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_xsjh'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmssaleChance = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //客户信息
    clientName(url){
      //请求页面表单数据
      let para = {
        pageSize: -1
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
      this.clientDetail = res.data.data.result;
      })
      .catch(function(res) {
        console.log(res)
      }) 
    },

    //获取当前登录用户的信息
    getUserInfo(url){
      this.$http.get(url).then((res) => {  //.then() 返回成功的数据
        this.brandChance.principal_id = res.data.data.userId;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //判断提交数据为有空的对象，去除空对象，同时返回新的对象
    dealElement : function(obj){
      var param = {};
      if ( obj === null || obj === undefined || obj === "" ) return param;
      for ( var key in obj ){
          if ( obj[key] !== null && obj[key] !== undefined && obj[key] !== "" ){
              param[key] = obj[key];
          }
      }
      return param;
    },

    //日期格式转换
    dateFormat:function(row, column) { 
      var date = row[column.property]; 
      if (date == undefined) { 
        return ""; 
      } 
      return moment(date.time).format("YYYY-MM-DD"); 
    },

    //点击弹出信息
    handleEdit(data1,data2,data3) {
      $('.detail-bg').show();
      $('.detail').show();
      //退出遮盖层
      $('.detail-bg').on('click',function(){
        $('.detail').hide();
        $('.detail-bg').hide();
      });
      //点击按钮，退出遮盖层
      $('.cancel').on('click',function(){
        $('.detail').hide();
        $('.detail-bg').hide();
      });
      var url = this.https+'/crm/shop/getDataById';
      this.$options.methods.shopbackData.bind(this)(url,data1);
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.visitWay(crm_url); //跟进方式
      var lxrurl = this.https+'/crm/contacts/getList';
      this.customerData(lxrurl,data3); //联系人人信息
      //展示店铺协同人信息
      this.showcollaborShop(data1);
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.saleChance(crm_url); //销售机会
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);  //客户信息
    },

    //修改销售机会
    upChance : function(id,sales_stage){
      this.upChanceData.id = id;
      this.upChanceData.sales_stage = sales_stage;
      var para = {
        dataJson : JSON.stringify(this.upChanceData)
      }
      this.$confirm('您确认要修改销售阶段吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var id = this.brandShow.id;
        var url = this.https+'/crm/cbCooperation/updateData'; 
        var labelurl = this.https+'/crm/cbCooperation/getList';
        var urlshow = this.https+'/crm/cbCooperation/getDataById';

        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('修改品牌合作机会成功');
            //调用列表接口
            this.$options.methods.brandbackData.bind(this)(urlshow,id);
            this.$options.methods.closebrand.bind(this)();//清空数据
            this.dialogChance=false;
          }else{
            this.$message('修改品牌合作机会失败');
          }
        
        })
        .catch(function(res) {
          this.$message('创建品牌合作机会失败');
        }) 
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      }); 
    },
    
    //获取table数据
    getData:function(url,data,pageNum,pageSize){
      //请求页面表单数据
      let para = {
          page: pageNum,
          pageSize: pageSize,
          paramsJson : JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.tableData = res.data.data.result;
        this.pageSize = res.data.data.pageSize;
        this.total = res.data.data.totalCount;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

     //把首次默认展示数据提交到localstorng中
     firstlocaldata : function(){
      localStorage.setItem("shopbrand",true);localStorage.setItem("show_shopbrand",true);//主营品牌
      localStorage.setItem("shoptype",true);localStorage.setItem("show_shoptype",true);//店铺类型
      localStorage.setItem("shoplevel",false);localStorage.setItem("show_shoplevel",false); //店铺等级
      localStorage.setItem("shoprank",false);localStorage.setItem("show_shoprank",false);//类目排名
      localStorage.setItem("shopdsr",false);localStorage.setItem("show_shopdsr",false);  //DSR
      localStorage.setItem("shopfans",false);localStorage.setItem("show_shopfans",false); //店铺粉丝数
      localStorage.setItem("shopwtao",false);localStorage.setItem("show_shopwtao",false); //微淘粉丝数
      localStorage.setItem("shopnum",false);localStorage.setItem("show_shopnum",false); //好评数量
      localStorage.setItem("shopprice",true);localStorage.setItem("show_shopprice",true); //客单价
      localStorage.setItem("shopgoods",true);localStorage.setItem("show_shopgoods",true); //宝贝数
      localStorage.setItem("shoptel",true);localStorage.setItem("show_shoptel",true); //客服电话
      localStorage.setItem("shopdate",false);localStorage.setItem("show_shopdate",false); //开店日期
      localStorage.setItem("shoplocation",false);localStorage.setItem("show_shoplocation",false); //所在地区
      localStorage.setItem("shopcategories",true);localStorage.setItem("show_shopcategories",true); //主营类目
      localStorage.setItem("shoptag",false);localStorage.setItem("show_shoptag",false); //店铺标签
      localStorage.setItem("shopsales",false);localStorage.setItem("show_shopsales",false); //销售额
      localStorage.setItem("shopremark",false);localStorage.setItem("show_shopremark",false); //备注
      localStorage.setItem("shopisclose",true);localStorage.setItem("show_shopisclose",true); //是否开店
      this.localdata();//加载展示数据
    },

    //表单数据展示与隐藏设置
    showHide : function(show){
      switch(show){
        case 'show_shopbrand' : if(this.show_shopbrand == false){localStorage.setItem("shopbrand",true);localStorage.setItem("show_shopbrand",true);this.shopbrand = true;return this.show_shopbrand = true;}else{localStorage.setItem("shopbrand",false);localStorage.setItem("show_shopbrand",false); this.shopbrand = false;return this.show_shopbrand = false; }break;
        case 'show_shoptype' :if(this.show_shoptype === false){localStorage.setItem("shoptype","true");localStorage.setItem("show_shoptype","true");this.shoptype = true;return this.show_shoptype = true;}else{localStorage.setItem("shoptype","false");localStorage.setItem("show_shoptype","false");this.shoptype = false;return this.show_shoptype = false;} break;
        case 'show_shoplevel' : if(this.show_shoplevel === false){localStorage.setItem("shoplevel","true");localStorage.setItem("show_shoplevel","true"); this.shoplevel = true;return this.show_shoplevel = true;}else{localStorage.setItem("shoplevel","false");localStorage.setItem("show_shoplevel","false");this.shoplevel = false;return this.show_shoplevel = false;}break;
        case 'show_shoprank' : if(this.show_shoprank === false){localStorage.setItem("shoprank","true");localStorage.setItem("show_shoprank","true");this.shoprank = true;return this.show_shoprank = true;}else{localStorage.setItem("shoprank","false");localStorage.setItem("show_shoprank","false");this.shoprank = false;return this.show_shoprank = false;}break;
        case 'show_shopdsr' : if(this.show_shopdsr === false){localStorage.setItem("shopdsr","true");localStorage.setItem("show_shopdsr","true");this.shopdsr = true; return this.show_shopdsr = true;}else{localStorage.setItem("shopdsr","false");localStorage.setItem("show_shopdsr","false");this.shopdsr = false;return this.show_shopdsr = false;}break;
        case 'show_shopfans' : if(this.show_shopfans === false){localStorage.setItem("shopfans","true"); localStorage.setItem("show_shopfans","true");this.shopfans = true;return this.show_shopfans = true;}else{localStorage.setItem("shopfans","false");localStorage.setItem("show_shopfans","false"); this.shopfans = false;return this.show_shopfans = false;} break;
        case 'show_shopwtao' : if(this.show_shopwtao === false){localStorage.setItem("shopwtao","true"); localStorage.setItem("show_shopwtao","true");this.shopwtao = true;return this.show_shopwtao = true;}else{localStorage.setItem("shopwtao","false");localStorage.setItem("show_shopwtao","false"); this.shopwtao = false;return this.show_shopwtao = false;} break;
        case 'show_shopnum' : if(this.show_shopnum === false){localStorage.setItem("shopnum","true"); localStorage.setItem("show_shopnum","true");this.shopnum = true;return this.show_shopnum = true;}else{localStorage.setItem("shopnum","false");localStorage.setItem("show_shopnum","false"); this.shopnum = false;return this.show_shopnum = false;} break;
        case 'show_shopprice' : if(this.show_shopprice === false){localStorage.setItem("shopprice","true"); localStorage.setItem("show_shopprice","true");this.shopprice = true;return this.show_shopprice = true;}else{localStorage.setItem("shopprice","false");localStorage.setItem("show_shopprice","false"); this.shopprice = false;return this.show_shopprice = false;} break;
        case 'show_shopgoods' : if(this.show_shopgoods === false){localStorage.setItem("shopgoods","true"); localStorage.setItem("show_shopgoods","true");this.shopgoods = true;return this.show_shopgoods = true;}else{localStorage.setItem("shopgoods","false");localStorage.setItem("show_shopgoods","false"); this.shopgoods = false;return this.show_shopgoods = false;} break;
        case 'show_shoptel' : if(this.show_shoptel === false){localStorage.setItem("shoptel","true"); localStorage.setItem("show_shoptel","true");this.shoptel = true;return this.show_shoptel = true;}else{localStorage.setItem("shoptel","false");localStorage.setItem("show_shoptel","false"); this.shoptel = false;return this.show_shoptel = false;} break;
        case 'show_shopdate' : if(this.show_shopdate === false){localStorage.setItem("shopdate","true"); localStorage.setItem("show_shopdate","true");this.shopdate = true;return this.show_shopdate = true;}else{localStorage.setItem("shopdate","false");localStorage.setItem("show_shopdate","false"); this.shopdate = false;return this.show_shopdate = false;} break;
        case 'show_shoplocation' : if(this.show_shoplocation === false){localStorage.setItem("shoplocation","true"); localStorage.setItem("show_shoplocation","true");this.shoplocation = true;return this.show_shoplocation = true;}else{localStorage.setItem("shoplocation","false");localStorage.setItem("show_shoplocation","false"); this.shoplocation = false;return this.show_shoplocation = false;} break;
        case 'show_shopcategories' : if(this.show_shopcategories === false){localStorage.setItem("shopcategories","true"); localStorage.setItem("show_shopcategories","true");this.shopcategories = true;return this.show_shopcategories = true;}else{localStorage.setItem("shopcategories","false");localStorage.setItem("show_shopcategories","false"); this.shopcategories = false;return this.show_shopcategories = false;} break;
        case 'show_shoptag' : if(this.show_shoptag === false){localStorage.setItem("shoptag","true"); localStorage.setItem("show_shoptag","true");this.shoptag = true;return this.show_shoptag = true;}else{localStorage.setItem("shoptag","false");localStorage.setItem("show_shoptag","false"); this.shoptag = false;return this.show_shoptag = false;} break;
        case 'show_shopsales' : if(this.show_shopsales === false){localStorage.setItem("shopsales","true"); localStorage.setItem("show_shopsales","true");this.shopsales = true;return this.show_shopsales = true;}else{localStorage.setItem("shopsales","false");localStorage.setItem("show_shopsales","false"); this.shopsales = false;return this.show_shopsales = false;} break;
        case 'show_shopremark' : if(this.show_shopremark === false){localStorage.setItem("shopremark","true"); localStorage.setItem("show_shopremark","true");this.shopremark = true;return this.show_shopremark = true;}else{localStorage.setItem("shopremark","false");localStorage.setItem("show_shopremark","false"); this.shopremark = false;return this.show_shopremark = false;} break;
        case 'show_shopisclose' : if(this.show_shopisclose === false){localStorage.setItem("shopisclose","true"); localStorage.setItem("show_shopisclose","true");this.shopisclose = true;return this.show_shopisclose = true;}else{localStorage.setItem("shopisclose","false");localStorage.setItem("show_shopisclose","false"); this.shopisclose = false;return this.show_shopisclose = false;} break;
      }
    },

    //请求刘篮球的localstrong中的数据
    localdata : function(){
      var key = localStorage.getItem("show_shopbrand");
      if(key != null){
        //判断主营品牌显示或隐藏
        if(localStorage.show_shopbrand=='true'){this.show_shopbrand=true;this.shopbrand=true;}else{this.show_shopbrand=false;this.shopbrand=false;}
        //判断店铺类型显示或隐藏
        if(localStorage.show_shoptype=='true'){this.show_shoptype=true;this.shoptype=true;}else{this.show_shoptype=false;this.shoptype=false;}
        //判断店铺等级显示或隐藏
        if(localStorage.show_shoplevel=='true'){this.show_shoplevel=true;this.shoplevel=true;}else{this.show_shopleve=false;this.shoplevel=false;}
        //判断类目排名显示或隐藏
        if(localStorage.show_shoprank=='true'){this.show_shoprank=true;this.shoprank=true;}else{this.shoprank=false;this.show_shoprank=false;}
        //判断DSR显示或隐藏
        if(localStorage.show_shopdsr == 'true'){this.show_shopdsr = true;this.shopdsr =  true;}else{this.shopdsr = false;this.show_shopdsr = false;}
        //判断店铺粉丝数显示或隐藏
        if(localStorage.show_shopfans=='true'){this.show_shopfans=true;this.shopfans = true;}else{this.shopfans = false;this.show_shopfans = false;}
        //判断微淘粉丝数显示或隐藏
        if(localStorage.show_shopwtao=='true'){this.show_shopwtao=true;this.shopwtao = true;}else{this.show_shopwtao = false;this.shopwtao = false;}
        //判断好评数量显示或隐藏
        if(localStorage.show_shopnum == 'true'){this.show_shopnum = true;this.shopnum =  true;}else{this.show_shopnum = false;this.shopnum =  false;}
        //判断客单价显示或隐藏
        if(localStorage.show_shopprice=='true'){this.show_shopprice=true;this.shopprice=true;}else{this.show_shopprice=false;this.shopprice=false;}
        //判断宝贝数显示或隐藏
        if(localStorage.show_shopgoods=='true'){this.show_shopgoods=true;this.shopgoods=true;}else{this.shopgoods=false;this.show_shopgoods=false;}
        //判断客服电话显示或隐藏
        if(localStorage.show_shoptel == 'true'){this.show_shoptel = true;this.shoptel =  true;}else{this.shoptel = false;this.show_shoptel =  false;}
        //判断开店日期显示或隐藏
        if(localStorage.show_shopdate == 'true'){this.show_shopdate = true;this.shopdate=true;}else{this.shopdate=false;this.show_shopdate = false;}
        //判断所在地区显示或隐藏
        if(localStorage.show_shoplocation == 'true'){this.show_shoplocation = true;this.shoplocation =  true;}else{this.show_shoplocation = false;this.shoplocation =  false;}
        //判断主营类目显示或隐藏
        if(localStorage.show_shopcategories == 'true'){this.show_shopcategories = true;this.shopcategories =  true;}else{this.show_shopcategories = false;this.shopcategories =  false;}
        //判断店铺标签显示或隐藏
        if(localStorage.show_shoptag == 'true'){this.show_shoptag = true;this.shoptag =  true;}else{this.show_shoptag = false;this.shoptag =  false;}
        //判断销售额显示或隐藏
        if(localStorage.show_shopsales=='true'){this.show_shopsales=true;this.shopsales =true;}else{this.shopsales=false;this.show_shopsales=false;}
        //判断备注显示或隐藏
        if(localStorage.show_shopremark == 'true'){this.show_shopremark = true;this.shopremark =  true;}else{this.shopremark = false;this.show_shopremark =  false;}
        //判断是否开店显示或隐藏
        if(localStorage.show_shopisclose == 'true'){this.show_shopisclose = true;this.shopisclose =  true;}else{this.shopisclose = false;this.show_shopisclose =  false;}
      }else{
        this.firstlocaldata();
      }
    },
    
    //表单性别数据处理
    sexColumn(row, column) {
      switch(row.sex){
          case 1:
          return '男';
          break;
          case 2:
          return '女';
          break;
          default:
          return '未知';
      }
    },

    //品牌合作机会联系方式
    content_phone(row){
      for(var i=0;i<this.customerDetail.length;i++){
        if(row == this.customerDetail[i].id){
          return  this.$options.methods.customerWay.bind(this)(this.customerDetail[i].contact_way); //品牌机会联系方式
        }
      }
    },

    //联系方式转换
    customerWay : function(data){
      if(data !='' && data != undefined){
        var contact = JSON.parse(data);
        if(typeof(contact) == "object"){
          try{
            return (contact.type?contact.type:'')+' '+(contact.val?contact.val:'-');
          }catch(error){
            return data;
          }
        }else{
          return contact;
        }
      }else{
        return '-';
      }
    },

    //表单离职数据处理
    dimissionColumn(row, column) {
      switch(row.isdimission){
          case 0:
          return '在职';
          break;
          case 1:
          return '已离职';
          break;
          default:
          return '未知';
      }
    },

    //店铺等级
    shoplevel:function(num){
      switch(num){
        case 1:
        return '普通';
        break;
        case 2:
        return '青铜';
        break;
        case 3:
        return '白银';
        break;
        case 4:
        return '黄金';
        break;
        case 5:
        return '白金';
        break;
        case 6:
        return '钻石';
        break;
        default:
        return '-';
      }
    },

    //请求数据的prims数据
    primsData : function(){
      var name = this.select.name?" LIKE "+"'%"+this.select.name+"%'":'',
          shop_type = this.select.shop_type?"='"+this.select.shop_type+"'":'',
          shop_level = this.select.shop_level?"='"+this.select.shop_level+"'":'',
          main_brand = this.select.main_brand?"='"+this.select.main_brand+"'":'',
          open_shop_date = this.select.open_shop_date?this.select.open_shop_date:'',
          unit_price = this.select.unit_price?"='"+this.select.unit_price+"'":'';
      if(open_shop_date!=''){
        open_shop_date = ">='"+this.$options.methods.getNowFormatDate.bind(this)(open_shop_date)+"'";
      }
      return paramsJson ={
        "a.name" : name,
        "a.shop_type" : shop_type,
        "a.shop_level" : shop_level,
        "a.main_brand" : main_brand,
        "a.open_shop_date" : open_shop_date,
        "a.unit_price" : unit_price
      };
    },

    //日期获取
    getNowFormatDate : function(num) {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear()-num;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate+' 23:59:59';
      return currentdate;
    },

    //添加店铺数据信息
    shopPrimsData : function(){
      var id = this.shop.id,
      name = this.shop.name?this.shop.name:'',
      customer_id = this.shop.customer_id?this.shop.customer_id:'',
      store_customer_type  = this.shop.store_customer_type?this.shop.store_customer_type:'',
      taobaocode = this.shop.taobaocode?this.shop.taobaocode:'',
      link = this.shop.taobaocode?'https://shopsearch.taobao.com/search?app=shopsearch&q='+this.shop.taobaocode:'',
      shop_type = this.shop.shop_type?this.shop.shop_type:'',
      shop_level = this.shop.shop_level?this.shop.shop_level:'',
      main_brand = this.shop.main_brand?this.shop.main_brand.join(','):'',
      category_rank = this.shop.category_rank?this.shop.category_rank:'',
      average_monthly_sales = this.shop.average_monthly_sales?this.shop.average_monthly_sales:'',
      dsr = this.shop.dsr?this.shop.dsr:'',
      shop_fans = this.shop.shop_fans?this.shop.shop_fans:'',
      wtao_fans = this.shop.wtao_fans?this.shop.wtao_fans:'',
      good_num = this.shop.good_num?this.shop.good_num:'',
      unit_price = this.shop.unit_price?this.shop.unit_price:'',
      goods_num = this.shop.goods_num?this.shop.goods_num:'',
      service_tel = this.shop.service_tel?this.shop.service_tel:'',
      location = this.shop.location?this.shop.location:'',
      main_categories = this.shop.main_categories?this.shop.main_categories:'',
      open_shop_date =this.shop.open_shop_date?moment(this.shop.open_shop_date.time).format("YYYY-MM-DD"):'',
      shop_tag = this.shop.shop_tag?this.shop.shop_tag.join(','):'',
      isclose_shop = this.shop.isclose_shop?this.shop.isclose_shop:'',
      customer_name = '',
      remark = this.shop.remark? this.shop.remark:'',
      principal_orgcode = ''; //组织机构编码
      
      //获取客户名称
      for(var i=0;i<this.clientDetail.length;i++){
        if(customer_id == this.clientDetail[i].id){
          customer_name = this.clientDetail[i].name;
          principal_orgcode =  this.clientDetail[i].principal_orgcode;
          
        }
      }

      var data = {
        id: id,
        name : name,
        customer_id : customer_id,
        store_customer_type : store_customer_type,
        shop_type : shop_type,
        shop_level : shop_level,
        main_brand : main_brand,
        category_rank : category_rank,
        taobaocode : taobaocode,
        link : link,
        average_monthly_sales : average_monthly_sales,
        dsr : dsr,
        shop_fans : shop_fans,
        wtao_fans: wtao_fans,
        good_num : good_num,
        unit_price : unit_price,
        goods_num : goods_num,
        service_tel : service_tel,
        location : location,
        main_categories : main_categories,
        open_shop_date : open_shop_date,
        shop_tag : shop_tag,
        isclose_shop : isclose_shop,
        customer_name : customer_name,
        remark : remark,
        principal_orgcode : principal_orgcode
      };

      if(name != "" && shop_type !="" && taobaocode !=""){
        return this.dealElement(data);
      }else{
        //判断旺旺号
        if(taobaocode == ""){
          this.$message('旺旺号不能为空');
        }
        //判断店铺类型
        if(shop_type==""){
          this.$message('店铺类型不能为空');
        }
        
        //判断店铺名称
        if(name == ""){
          this.$message('店铺名称不能为空');
        }
      } 
    },

    //店铺等级
    levelColumn(row, column) {
      switch(row.shop_level){
          case 1:
          return '普通';
          break;
          case 2:
          return '青铜';
          break;
          case 3:
          return '白银';
          break;
          case 4:
          return '黄金';
          break;
          case 5:
          return '白金';
          break;
          case 6:
          return '钻石';
          break;
          default:
          return row.shop_level;
      }
    },

    //通用店铺等级
    levelshop:function(row) {
      switch(row){
          case 1:
          return '普通';
          break;
          case 2:
          return '青铜';
          break;
          case 3:
          return '白银';
          break;
          case 4:
          return '黄金';
          break;
          case 5:
          return '白金';
          break;
          case 6:
          return '钻石';
          break;
          default:
            if(row == null){
              return '-';
            }else{
              return row;
            }
      }
    },

    //是否关店数据处理
    openColumn(row, column) {
      switch(row.isclose_shop){
          case 1:
          return '开店';
          break;
          default:
          return '关店';
      }
    },

    //公司成员请求
    request(url){
      this.$http.get(url).then((res) => {  //.then() 返回成功的数据
        this.options1 = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //日期转换函数
    changeTime : function(val){
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear()-val;
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      return  "<='" + year + seperator1 + month + seperator1 + strDate+"'";
    },

    //导出数据
    downloaddp : function(){
      var url = this.https+'/crm/shop/downloadList?paramsJson='+JSON.stringify(this.$options.methods.primsData.bind(this)()); 
      window.location.href = url;
    },

    //监听搜索条件的变化
    change:function() {
      var labelurl = this.https+'/crm/shop/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),this.currentPage,this.pageSize);  //方法相互调用
    },

    //每页显示数据量变更
    handleSizeChange: function(val) {
      var labelurl = this.https+'/crm/shop/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),this.currentPage, val);
    },

    //页码变更
    handleCurrentChange: function(val) {
      var pageNo = this.currentPage;
      var pageSize = this.pageSize;
      var labelurl = this.https+'/crm/shop/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),val,this.pageSize);
    },

    //点击新增按钮，请求相关数据
    newShop(){
      this.$options.methods.closeshop.bind(this)();//清空数据
      this.ShopStatus = "add_shop";
      this.dialogCostoms = true;
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);  //客户信息
      var brand_url = this.https+'/crm/dictionary/getList';
      this.brand(brand_url);  //品牌机会数据
      crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.shopLabel(crm_url);  //标签信息
    },

    //添加店铺表单信息
    dialogAdd : function(){
      if(this.shop.id == ''){
        this.shopAdd();
      }else{
        this.shopEdit();
      }
    },

    //添加店铺表单信息
    shopAdd : function(){
      var url = this.https+'/crm/shop/insertData'; 
      var labelurl = this.https+'/crm/shop/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.shopPrimsData.bind(this)())
      };
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('创建店铺成功');
            //调用列表接口
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
            this.$options.methods.closeshop.bind(this)();//清空数据
            this.dialogCostoms=false;
          }else{
            this.$message('创建店铺失败');
          }
         
        })
        .catch(function(res) {
          this.$message('创建店铺失败');
        }) 
      }
    },

    closeshop : function(){
      this.shop.id = '';
      this.shop.name = '';
      this.shop.customer_id= '';
      this.shop.store_customer_type= '';
      this.shop.shop_type= '';
      this.shop.shop_level= '';
      this.shop.main_brand= [];
      this.shop.category_rank= '';
      this.shop.average_monthly_sales= '';
      this.shop.dsr= '';
      this.shop.shop_fans= '';
      this.shop.wtao_fans= '';
      this.shop.good_num= '';
      this.shop.unit_price= '';
      this.shop.goods_num= '';
      this.shop.service_tel= '';
      this.shop.location= '';
      this.shop.main_categories= '';
      this.shop.open_shop_date= '';
      this.shop.label= '';
      this.shop.isclose_shop= '';
      this.shop.remark = '';
      this.shop.taobaocode = '';
      this.shop.shop_tag = [];
    },

    //删除店铺数据
    deleteShop:function(id){
      this.$confirm('此操作将删除此店铺, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = this.https+'/crm/shop/delData';
        var labelurl = this.https+'/crm/shop/getList';
        this.$http.post(url,{"id":id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          this.$message('删除数据成功');
          $('.detail-bg').hide();
          $('.detail').hide();
          this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
        }).catch(function(res) {
            console.log(res)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });     
    },

    //修改店铺负责人信息
    updateshopres : function(id){
      this.shoprespible = true;
      this.shopresdata.id = id;
    },

    //提交店铺负责人信息
    shoprespiblebtn : function(){
      var id = this.shopShow.id;
      var url = this.https+'/crm/shop/updateData'; 
      var labelurl = this.https+'/crm/shop/getList';
      for(var i=0;i<this.customerDetail.length;i++){
        if(this.shopresdata.principal_id == this.customerDetail[i].id){
          this.shopresdata.principal_name =this.customerDetail[i].name;
        }
      }
      
      //数据整合
      var data = {
        id : this.shopresdata.id,
        principal_id : this.shopresdata.principal_id,
        principal_name : this.shopresdata.principal_name
      };

      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(data)
      };

      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "success"){
          this.$message('修改店铺负责人');
          //调用列表接口
          this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
          this.shoprespible = false;
          var urlenterprise = this.https+'/crm/shop/getDataById';
          this.$options.methods.shopbackData.bind(this)(urlenterprise,id);
        }else{
          this.$message('修改店铺负责人');
        }
      })
      .catch(function(res) {
        this.$message('修改店负责人');
      });
    },

    //修改店铺助理信息
    updateshopaid : function(id){
      this.shopaid = true;
      this.shopaiddata.id = id;
    },

    //店铺助理提交
    shopaidbtn : function(){
      var id = this.shopShow.id;
      var url = this.https+'/crm/shop/updateData'; 
      var labelurl = this.https+'/crm/shop/getList';
      for(var i=0;i<this.customerDetail.length;i++){
        if(this.shopaiddata.assistant_id == this.customerDetail[i].id){
          this.shopaiddata.assistant_name =this.customerDetail[i].name;
        }
      }
      
      //数据整合
      var data = {
        id : this.shopaiddata.id,
        assistant_id : this.shopaiddata.assistant_id,
        assistant_name  : this.shopaiddata.assistant_name 
      };

      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(data)
      };

      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "success"){
          this.$message('修改店铺助理');
          //调用列表接口
          this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
          this.shopaid = false;
          var urlenterprise = this.https+'/crm/shop/getDataById';
          this.$options.methods.shopbackData.bind(this)(urlenterprise,id);
        }else{
          this.$message('修改店铺助理');
        }
      })
      .catch(function(res) {
        this.$message('修改店助理');
      });
    },

    //店铺协同人展示
    showcollaborShop : function(id){
      var url = this.https+'/crm/customerUser/getList';
      var data = {
        "data_id" : "='"+id+"'",
        "type" : "='dp_xtr'" 
      }
      var para = {
        paramsJson : JSON.stringify(data)
      }
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "success"){
          this.collaborusershop = res.data.data.result;
          this.dpxtr.length=0;
          //遍历协同人图片
          for(var i=0;i<this.options1.length;i++){
            for(var j=0;j<this.collaborusershop.length;j++){
              if(this.collaborusershop[j].user_id == this.options1[i].id){
                this.dpxtr.push({id:this.collaborusershop[j].id,user_id:this.options1[i].id,img:this.options1[i].ding_user_avatar,name:this.options1[i].firstname});
              }
            }
          }
        }
      })
      .catch(function(res) {
          console.log(res)
      })  
    },

    //删除店铺协同人
    collaDelShop : function(id,shopid){
      var url = this.https+'/crm/customerUser/delData';
      var labelurl = this.https+'/crm/customerUser/getList';
      this.$http.post(url,{"id":id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "success"){
          this.$message('删除店铺协同人数据成功');
          this.$options.methods.showcollaborShop.bind(this)(shopid);
        }else{
          this.$message('删除店铺协同人数据失败');
        }
        
      }).catch(function(res) {
          console.log(res)
      })
    },

    //添加店铺协同人
    shopresxtrbtn : function(id){
      this.shopxtr = true;
      this.collaborshop.shop_id = id;
    },

    //店铺协同人数据整合
    collaborprimesShop :function(){
      var shop_id = this.collaborshop.shop_id,
          user_id = this.collaborshop.user_id,
          type = this.collaborshop.type; 
      //处理重复的协同人数据操作
      for(var i=0;i<this.collaborusershop.length;i++){
        for(var j=0;j<user_id.length;j++){
          if(this.collaborusershop[i].user_id == user_id[j]){
            user_id.splice(j,1);
          }
        }
      }

      var data = {
        data_id : shop_id,
        user_id : user_id,
        type : type,
      };
      
      //判断协同人数据不为空
      if(user_id!=''){
        return data;
      }else{
        this.$message('请添店铺加协同人信息或店铺协同人数据重复');
      }
    },

    //添加协同人信息
    shopxtrbtn : function(){
      //获取协同人数据信息
      var data = this.$options.methods.collaborprimesShop.bind(this)();
      var length = data.user_id.length;
      var user = data.user_id;
      var shopShow = this.shopShow.id;
      var url = this.https+'/crm/customerUser/insertData'; 
      if(data != undefined){
        //数据提交
        for(var i=0;i<length;i++){
          var data = {
            data_id : data.data_id,
            user_id : user[i],
            type : data.type,
          };
          //新增页面表单数据提交
          let para = {
            dataJson : JSON.stringify(data)
          };
          //判断false
          this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
            this.$message('添加店铺协同人成功');
            //调用列表接口
            this.$options.methods.showcollaborShop.bind(this)(shopShow);
            this.shopxtr = false;
          })
          .catch(function(res) {
            this.$message('添加店铺协同人失败');
          }); 
        }
       
      }
    },

    //店铺信息回写
    editShop:function(id){
      this.ShopStatus = "edit_shop";
      this.dialogCostoms=true;
      this.shop.id = this.shopShow.id;
      this.shop.name =this.shopShow.name;
      this.shop.customer_id = this.shopShow.customer_id;
      this.shop.store_customer_type = this.shopShow.store_customer_type;
      this.shop.shop_type = this.shopShow.shop_type;
      this.shop.taobaocode = this.shopShow.taobaocode;
      this.shop.shop_level = this.shopShow.shop_level?this.shopShow.shop_level.toString():'';
      this.shop.main_brand = this.shopShow.main_brand?this.shopShow.main_brand.split(','):[];//?this.shop.main_brand.join(','):'',
      this.shop.category_rank = this.shopShow.category_rank;
      this.shop.average_monthly_sales = this.shopShow.average_monthly_sales;
      this.shop.dsr = this.shopShow.dsr;
      this.shop.shop_fans = this.shopShow.shop_fans;
      this.shop.wtao_fans = this.shopShow.wtao_fans;
      this.shop.good_num = this.shopShow.good_num;
      this.shop.unit_price = this.shopShow.unit_price;
      this.shop.goods_num = this.shopShow.goods_num;
      this.shop.service_tel = this.shopShow.service_tel;
      this.shop.location = this.shopShow.location;
      this.shop.main_categories = this.shopShow.main_categories;
      this.shop.open_shop_date = this.shopShow.open_shop_date?moment(this.shopShow.open_shop_date).format("YYYY-MM-DD"):'';
      this.shop.isclose_shop = this.shopShow.isclose_shop;
      customer_name = this.shopShow.customer_name;
      this.shop.remark = this.shopShow.remark;
      this.shop.shop_tag = this.shopShow.shop_tag?this.shopShow.shop_tag.split(','):[];//?this.shop.label.join(','):'',
      
    },

    //店铺信息回写请求
    shopbackData:function(url,id){
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);  //客户信息
      var brand_url = this.https+'/crm/dictionary/getList';
      this.brand(brand_url);  //品牌机会数据
      crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.shopLabel(crm_url);  //标签信息

      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.shopShow = res.data.data;

        //此判断,是处理页面展示销售情况tab页
        if(this.shopShow.prospect == '0'){
          this.sell_show = true;
        }else{
          this.sell_show = false;
        }
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,this.shopShow.customer_id);
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,this.shopShow.customer_id);
      })
      .catch(function(res) {
          console.log(res)
      })
    },

    //修改店铺数据提交
    shopEdit : function(){
      var id = this.shopShow.id;
      var url = this.https+'/crm/shop/updateData'; 
      var labelurl = this.https+'/crm/shop/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.shopPrimsData.bind(this)())
      };
      
      //判断false
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('修改店铺成功');
            //调用列表接口
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
            this.dialogCostoms=false;
            this.$options.methods.closeshop.bind(this)();//清空数据
            var urlenterprise = this.https+'/crm/shop/getDataById';
            this.$options.methods.shopbackData.bind(this)(urlenterprise,id);
          }else{
            this.$message('修改店铺失败');
          }
        })
        .catch(function(res) {
          this.$message('修改店铺失败');
        });
      }
    },

    //选项卡展示
    handleClick(tab, event) {
      var id = this.shopShow.customer_id;
      //请求数据信息，更具tab的信息
      if(tab.name == 'first'){
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,id);
        //跟进机会
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,id);
      }else if(tab.name == 'second'){
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,id);
      }else if(tab.name == 'third'){
        var sellurl = this.https+'aaa';
        let data = {
          starttime : this.sellselect.data1,
          endtime : this.sellselect.data2
        }
        //根据时间获取品牌的数据
        this.selltime(sellurl,data);
      }else if(tab.name == 'fourth'){
        var singleurl = this.https+'';
        this.singletable(singleurl,1,10);
      }
    },


    /** 
     * 店铺模块跟进记录
    */

    //跟进记录
    followgetData : function(url,id){
      let para = {
        pageSize: -1,
        paramsJson : JSON.stringify({"a.customer_id":"='"+id+"'"})
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.followData = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //请求合作品牌数据
    brandgetData:function(url,id){
      var data = {
        "a.customer_id": "='"+id+"'"
      }
      var para = {
        pageSize: -1,
        paramsJson : JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.branddata = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //整合提交跟进记录信息
    followPrimse(){
      var customer_id = this.shopShow.customer_id?this.shopShow.customer_id:'', //客户id
          contacts_id = this.records.contacts_id?this.records.contacts_id:'', //联系人id
          follow_up_way = this.records.follow_up_way?this.records.follow_up_way:'', //跟进方式
          follow_up_plan = this.records.follow_up_plan?this.records.follow_up_plan:'', //跟进计划品牌机会ID
          follow_up_on_date = this.records.follow_up_on_date?this.records.follow_up_on_date:'', //跟进时间
          leader_instructions = this.records.leader_instructions?this.records.leader_instructions:'',  //领导批示
          remark = this.records.remark?this.records.remark:'',  //跟进备注
          customer_name = '', //客户名称
          contacts_name = ''; //联系人名称
       
      
      //判断客户名称
      if(customer_id){
        for(var i=0; i<this.clientDetail.length;i++){
          if(customer_id == this.clientDetail[i].id){
              customer_name = this.clientDetail[i].name;
              
          }
        }
      }


      //判断联系人名称
      if(contacts_id){
        for(var i=0; i<this.customerDetail.length;i++){
          if(contacts_id == this.customerDetail[i].id){
            contacts_name = this.customerDetail[i].name;
          }
        }
      }
      
      //数据整合
      var data = {
          customer_id : customer_id, //客户id
          contacts_id : contacts_id, //联系人id
          follow_up_way : follow_up_way, //跟进方式
          follow_up_plan : follow_up_plan, //跟进计划品牌机会ID
          follow_up_on_date : moment(follow_up_on_date.time).format("YYYY-MM-DD HH:mm:ss"), //跟进时间
          leader_instructions : leader_instructions,  //领导批示
          remark : remark,  //跟进备注
          customer_name : customer_name, //客户名称
          contacts_name : contacts_name //联系人名称
      }
      if(customer_id!='' && contacts_id != '' && follow_up_way != '' && follow_up_on_date!=''){
        return data;
      }else{
        //判断客户不能为空
        if(customer_id == ''){
          this.$message('客户不能为空');
        }

        //判断联系人不能为空
        if(contacts_id == ''){
          this.$message('联系人不能为空');
        }

        //判断跟进方式不能为空
        if(follow_up_way == ''){
          this.$message('跟进方式不能为空');
        }

        //判断跟进时间不能为空
        if(follow_up_on_date == ''){
          this.$message('跟进时间不能为空');
        }
      }
    },

    //添加跟进记录
    addfollow : function(){
      var url = this.https+'/crm/followRecords/insertData';
      let para = {
        dataJson : JSON.stringify(this.$options.methods.followPrimse.bind(this)())
      };

      //判断false
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('新增跟进记录成功');
            //调用列表接口
            var labelurl = this.https+'/crm/followRecords/getList';
            this.$options.methods.followgetData.bind(this)(labelurl,this.shopShow.customer_id);  //方法相互调用
            this.$options.methods.closefollow.bind(this)();//清空数据
          }else{
            this.$message('新增跟进记录失败');
          }
        })
        .catch(function(res) {
          this.$message('新增跟进记录失败');
        });
      }
    },

    //清空跟进记录信息
    closefollow : function(){
      this.records.id = ''; //id
      this.records.customer_id = ''; //客户id
      this.records.contacts_id = ''; //联系人id
      this.records.follow_up_way = ''; //跟进方式
      this.records.follow_up_plan = ''; //跟进计划品牌机会ID
      this.records.follow_up_on_date = ''; //跟进时间
      this.records.leader_instructions = '';  //领导批示
      this.records.remark = '';  //跟进备注
    },

    //展示评论信息
    showToggle:function(index,id){
      $('.followData').eq(index).find('.followInfo').toggle();
      var url = this.https+'/crm/comment/getList';
      this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
    },

    //展示跟进记录的评论
    showTogglebrand:function(index,id){
      $('.followDatabrand').eq(index).find('.followInfobrand').toggle();
      var url = this.https+'/crm/comment/getList';
      this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
    },

    //评论数据展示
    commentPrimse : function(){
      var theme_id =  this.textarea.theme_id,
        type = this.textarea.type,
        context = this.textarea.context;
      var data = {
        theme_id : theme_id,
        type : type,
        context : context
      }
      //判断评论内容不为空
      if(context == ''){
        this.$message('请填写评论内容');
      }else{
        return data;
      }
    },
    //添加评论
    comment : function(id){
      var url = this.https+'/crm/comment/insertData';
      this.textarea.theme_id = id;   //获取跟进记录的id
      let para = {
        dataJson : JSON.stringify(this.$options.methods.commentPrimse.bind(this)())
      };
        
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          this.$message('添加评论成功');
          this.$options.methods.closecomment.bind(this)();
          //调用列表接口
          var url = this.https+'/crm/comment/getList';
          this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
        })
        .catch(function(res) {
          this.$message('添加评论失败');
        });
      }
    },

    //展示评论信息
    showComment : function(url,theme_id,type){
      var data = {
        "a.theme_id" : "='"+theme_id+"'",
        "a.type":"='"+type+"'"
      };
      var para = {
        pageSize : '-1',
        paramsJson : JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        //调用列表接口
        this.commentInfo = res.data.data.result;
      })
      .catch(function(res) {
        this.$message('请求失败');
      });
    },

    //评论数据清空
    closecomment : function(){
      this.textarea.id = '';
      this.textarea.context = '';
    },


    /**
     * 品牌机会相关操作
     * 1、品牌详情回写
     * 2、删除品牌机会功能
     * 3、修改品牌功能
     * 4、添加跟进记录功能
     * 5、展示、隐藏跟进记录评论功能
     * 6、新增品牌合作机会
    */
   
    //添加品牌合作机会
    addbrand : function(id){
      this.closeChance();
      this.BrandStatus = "add_brand";
      var urluser = this.https+'/tsuser/getTSUsers?pageSize=-1';
      this.request(urluser); //请求用户信息
      var userurl = this.https+'/survey/json/getUserInfo.json';
      this.getUserInfo(userurl); //获取当前登陆用户
      this.dialogChance = true;
      this.brandChance.customer_id = id;
    },

    //添加品牌计划
    brandPrimsData : function(){
      var id = this.brandChance.id,
          brand_name = this.brandChance.brand_name,
          brand_plan_code = this.brandChance.brand_plan_code,
          policymaker_id = this.brandChance.policymaker_id,
          customer_id = this.brandChance.customer_id,
          principal_id = this.brandChance.principal_id,
          sales_stage = this.brandChance.sales_stage,
          degree_of_importance = this.brandChance.degree_of_importance,
          plan_cooperation_date = this.brandChance.plan_cooperation_date?moment(this.brandChance.plan_cooperation_date).format("YYYY-MM-DD HH:MM:SS"):'',
          last_follow_up_date = this.brandChance.last_follow_up_date?moment(this.brandChance.last_follow_up_date).format("YYYY-MM-DD HH:MM:SS"):'',
          estimated_amount  = this.brandChance.estimated_amount?this.brandChance.estimated_amount:'',
          brand_plan_code = '',
          customer_name = '',
          principal_name = '',
          policymaker = '';

      //动态生成商品编码
      if(brand_plan_code == ''){
        brand_plan_code = this.$options.methods.brandCode.bind(this)();
      }

      //获取负责人名称
      for(var i=0;i<this.options1.length;i++){
        if(principal_id == this.options1[i].id){
          principal_name = this.options1[i].firstname;
        }
      }

      //获取联系人名称
      for(var i=0;i<this.clientDetail.length;i++){
        if(customer_id == this.clientDetail[i].id){
          customer_name = this.clientDetail[i].name;
        }
      }

      //获取决策人信息
      for(var i=0;i<this.customerDetail.length;i++){
        if(policymaker_id == this.customerDetail[i].id){
          policymaker = this.customerDetail[i].name;
        }
      }

      var data = {
        id : id,
        brand_name : brand_name,
        brand_plan_code : brand_plan_code,
        customer_id : customer_id,
        principal_id : principal_id,
        policymaker_id : policymaker_id,
        sales_stage : sales_stage,
        degree_of_importance : degree_of_importance,
        plan_cooperation_date : plan_cooperation_date,
        last_follow_up_date : last_follow_up_date,
        estimated_amount  : estimated_amount,
        brand_plan_code : brand_plan_code,
        customer_name : customer_name,
        principal_name : principal_name,
        policymaker : policymaker
      }

      //判断品牌合作机会名称不能为空
      if(brand_name !='' && customer_id != '' && policymaker_id != '' && principal_id != '' && sales_stage != '' && degree_of_importance != '' && last_follow_up_date != ''){
        return this.dealElement(data);
      }else{
        if(last_follow_up_date == ''){
          this.$message('最后跟进时间不能为空');
        }
        if(degree_of_importance == ''){
          this.$message('重要程度不能为空');
        }
        if(sales_stage == ''){
          this.$message('销售机会不能为空');
        }
        if(principal_id == ''){
          this.$message('负责人不能为空');
         
        }
        if(policymaker_id == ''){
          this.$message('决策人不能为空');
        }
        if(customer_id == ''){
          this.$message('客户不能为空');
        }
        if(brand_name == ''){
          this.$message('品牌合作机会名称不能为空');
        }
      }
    },

    //动态生成品牌编码
    brandCode :function(){
      var oDate = new Date(); //实例一个时间对象；
      var times = moment(oDate).format("YYYYMMDDHHMMSS");
      return 'RHM'+times;
    },

    //判断品牌合作机会是新增还是修改
    addChance : function(){
     if(this.brandChance.id==''){
      this.addNewBrand();
     }else{
      this.dialogedit();
     }
    },

    //提交品牌机会数据
    addNewBrand : function(){
      var url = this.https+'/crm/cbCooperation/insertData'; 
      var labelurl = this.https+'/crm/cbCooperation/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.brandPrimsData.bind(this)())
      };
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('创建品牌合作机会成功');
            //调用列表接口
            this.$options.methods.closeChance.bind(this)();//清空数据
            this.dialogChance = false;
          }else{
            this.$message('创建品牌合作机会失败');
          }
        })
        .catch(function(res) {
          this.$message('创建品牌合作机会失败');
        }) 
      }
    },
    
    //清除数据
    closeChance : function(){
      this.brandChance.id = '';
      this.brandChance.brand_name = '';
      this.brandChance.brand_plan_code = '';
      this.brandChance.policymaker_id = '';
      this.brandChance.customer_id = '';
      this.brandChance.principal_id = '';
      this.brandChance.sales_stage = '';
      this.brandChance.degree_of_importance = '';
      this.brandChance.plan_cooperation_date = '';
      this.brandChance.last_follow_up_date = '';
      this.brandChance.estimated_amount = '';
    },

    //点击品牌合作机会展示详情
    brandhtml : function(id,name){
      this.branddetail = true;
      var $this = $('.brandhtml').find(".el-dialog");
      $this.css({"margin-top":"0vh","width":this.width.width,"height":this.height.heightbrand,"float":"right"});
      $this.find(".el-dialog__header").hide();
      var url = this.https+'/crm/cbCooperation/getDataById';
      this.$options.methods.brandbackData.bind(this)(url,id);
    },

    //请求品牌合作机会回写
    brandbackData : function(url,id){
      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.brandShow = res.data.data;
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,this.brandShow.customer_id);
        this.$options.methods.policymaker.bind(this)(this.brandShow.customer_id);
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //删除品牌合作机会的数据
    deleteBrand : function(id){
      this.$confirm('此操作将删除此品牌合作机会, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = this.https+'/crm/cbCooperation/delData';
        var labelurl = this.https+'/crm/cbCooperation/getDataById';
        this.$http.post(url,{"id":id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('删除数据成功');
            this.branddetail = false;
          }else{
            this.$message('删除数据失败');
          }
         
        }).catch(function(res) {
            console.log(res)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      }); 
    },

    //整合提交跟进记录信息
    followbrandPrimse(){
      var customer_id = this.brandShow.customer_id?this.brandShow.customer_id:'', //客户id
          contacts_id = this.brandShow.policymaker_id?this.brandShow.policymaker_id:'', //联系人id
          follow_up_way = this.records.follow_up_way?this.records.follow_up_way:'', //跟进方式
          follow_up_plan = this.brandShow.id, //跟进计划品牌机会ID
          follow_up_on_date = this.records.follow_up_on_date?this.records.follow_up_on_date:'', //跟进时间
          leader_instructions = this.records.leader_instructions?this.records.leader_instructions:'',  //领导批示
          remark = this.records.remark?this.records.remark:'',  //跟进备注
          customer_name = '', //客户名称
          contacts_name = this.brandShow.policymaker?this.brandShow.policymaker:''; //联系人名称
      
      //判断客户名称
      if(customer_id){
        for(var i=0; i<this.clientDetail.length;i++){
          if(customer_id == this.clientDetail[i].id){
              customer_name = this.clientDetail[i].name;
          }
        }
      }

      //判断联系人名称
      if(contacts_id){
        for(var i=0; i<this.customerDetail.length;i++){
          if(contacts_id == this.customerDetail[i].id){
            contacts_name = this.customerDetail[i].name;
          }
        }
      }
      
      //数据整合
      var data = {
          customer_id : customer_id, //客户id
          contacts_id : contacts_id, //联系人id
          follow_up_way : follow_up_way, //跟进方式
          follow_up_plan : follow_up_plan, //跟进计划品牌机会ID
          follow_up_on_date : moment(follow_up_on_date.time).format("YYYY-MM-DD HH:mm:ss"), //跟进时间
          leader_instructions : leader_instructions,  //领导批示
          remark : remark,  //跟进备注
          customer_name : customer_name, //客户名称
          contacts_name : contacts_name //联系人名称
      };
      if(customer_id!='' && contacts_id != '' && follow_up_way != '' && follow_up_on_date!=''){
        return data;
      }else{
        //判断客户不能为空
        if(customer_id == ''){
          this.$message('客户不能为空');
        }

        //判断联系人不能为空
        if(contacts_id == ''){
          this.$message('当前品牌机会的决策人为空,请修改决策人信息');
        }

        //判断跟进方式不能为空
        if(follow_up_way == ''){
          this.$message('跟进方式不能为空');
        }

        //判断跟进时间不能为空
        if(follow_up_on_date == ''){
          this.$message('跟进时间不能为空');
        }
      }
    },

    //添加跟进记录
    addbrandfollow : function(){
      var url = this.https+'/crm/followRecords/insertData';
      let para = {
        dataJson : JSON.stringify(this.$options.methods.followbrandPrimse.bind(this)())
      };

      //判断false
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('新增跟进记录成功');
            var followurl = this.https+'/crm/followRecords/getList';
            this.$options.methods.followgetData.bind(this)(followurl,this.brandShow.customer_id);
            this.$options.methods.closeChance.bind(this)();//清空数据
          }else{
            this.$message('新增跟进记录失败');
          }
        
        })
        .catch(function(res) {
          this.$message('新增跟进记录失败');
        });
      }
    },

    //合作机会回写到修改页面中
    editBrand : function(id){
      this.BrandStatus = "edit_brand";
      var urluser = this.https+'/tsuser/getTSUsers?pageSize=-1';
      this.request(urluser); //请求用户信息
      var userurl = this.https+'/survey/json/getUserInfo.json';
      this.getUserInfo(userurl); //获取当前登陆用户
      this.dialogChance=true;
      this.brandChance.id = id;
      this.brandChance.brand_name = this.brandShow.brand_name;
      this.brandChance.brand_plan_code = this.brandShow.brand_plan_code;
      this.brandChance.customer_id = this.brandShow.customer_id;
      this.brandChance.policymaker_id = this.brandShow.policymaker_id;
      this.brandChance.principal_id = this.brandShow.principal_id;
      this.brandChance.sales_stage = this.brandShow.sales_stage;
      this.brandChance.degree_of_importance = this.brandShow.degree_of_importance;
      this.brandChance.plan_cooperation_date = this.brandShow.plan_cooperation_date?moment(this.brandShow.plan_cooperation_date.time).format("YYYY-MM-DD HH:MM:SS"):'',
      this.brandChance.last_follow_up_date = this.brandShow.last_follow_up_date?moment(this.brandShow.last_follow_up_date.time).format("YYYY-MM-DD HH:MM:SS"):'',
      this.brandChance.estimated_amount = this.brandShow.estimated_amount;
      this.brandChance.brand_plan_code = this.brandShow.brand_plan_code;
      this.brandChance.customer_name = this.brandShow.customer_name;
      this.brandChance.principal_name = this.brandShow.principal_name;
    },

    //提交修改合作品牌数据信息
    dialogedit : function(){
      var id = this.brandShow.id;
      var url = this.https+'/crm/cbCooperation/updateData'; 
      var labelurl = this.https+'/crm/cbCooperation/getList';
      var urlshow = this.https+'/crm/cbCooperation/getDataById';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.brandPrimsData.bind(this)())
      };
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('修改品牌合作机会成功');
            //调用列表接口
            this.$options.methods.brandbackData.bind(this)(urlshow,id);
            this.$options.methods.closebrand.bind(this)();//清空数据
            this.dialogChance=false;
          }else{
            this.$message('修改品牌合作机会失败');
          }
          
        })
        .catch(function(res) {
          this.$message('创建品牌合作机会失败');
        }) 
      }
    },

    //清除品牌机会数据
    closebrand : function(){
      this.brandChance.id = '';
      this.brandChance.brand_name = '';
      this.brandChance.brand_plan_code = '';
      this.brandChance.customer_id = '';
      this.brandChance.policymaker_id = '';
      this.brandChance.principal_id = '';
      this.brandChance.sales_stage = '';
      this.brandChance.degree_of_importance = '';
      this.brandChance.plan_cooperation_date = '';
      this.brandChance.last_follow_up_date = '';
      this.brandChance.estimated_amount = '';
    },


    /** 
     * 销售情况相关处理
     * creat time on 2018/11/28
     * Another zhangxiaomin
    */

    selltime : function(url,data){
      this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.data.length>0){
          this. sellselect.brandcode  = res.data.data[0];
          this.sellbrand = res.data.data;
          //销售情况表单数据
          this.selltabledata();
        }
      })
      .catch(function(res) {
        this.$message('暂无数据');
      });
    },

    //监听时间框输入变化
    changetime : function(){
      var sellurl = this.https+'/aaa';
      let data = {
        starttime : this.sellselect.data1,
        endtime : this.sellselect.data2
      }
      this.selltime(sellurl,data)
    },

    //查询销售情况表单数据
    selltabledata : function(){
      let selltableurl = this.https+'/bb';
      let pre = {
        brand : this.sellselect.brandcode,
        starttime : this.sellselect.data1,
        endtime : this.sellselect.data2
      };
      this.$http.post(selltableurl,pre,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.data.length>0){
          this.sellData = res.data.data;
          //销售情况表单数据
          this.sellechart(this.sellData);
        }
      })
      .catch(function(res) {
        this.$message('暂无数据');
      });
    },

    //处理销售情况图表
    sellechart : function(data){
      var mychartsell= echarts.init(document.getElementById('mychartsell'));
          // 指定图表的配置项和数据
          option = {
              tooltip : {
                  trigger: 'axis'
              },
              legend: {
                y : 'bottom',
                  data:['销售数量','销售金额']
              },
              toolbox: {
                  show : true,
                  feature : {
                      mark : {show: true},
                      dataView : {show: true, readOnly: false},
                      magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                      restore : {show: true},
                      saveAsImage : {show: true}
                  }
              },
              calculable : true,
              xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : ['2018-06','2018-07','2018-08','2018-09','2018-10','2018-11']
                  }
              ],
              yAxis : [
                  {
                      name: '个数',
                      type : 'value',
                      scale:true,
                  },{
                      name: '金额',
                      type: 'value',
                      scale:true,
                  }
              ],
              series : [ {
                name:'销售数量',
                type:'line',
                stack: '',
                yAxisIndex: 1,
                data: [120, 132, 101, 134, 90, 230, 210],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            positiong: 'top'
                        }
                    }
                }
            },{
              name:'销售金额',
              type:'line',
              stack: '',
              yAxisIndex: 1,
              data:[1201, 1132, 1101, 1134, 190, 1230, 2210],
              itemStyle: {
                  normal: {
                      label: {
                          show: true,
                          positiong: 'top'
                      }
                  }
              }
          }]
          };        
  
          // 使用刚指定的配置项和数据显示图表。
          mychartsell.setOption(option);
          window.addEventListener("resize",function(){
            mychartsell.resize(); 
          });
    },

    /** 
     * 单品情况相关处理
    */

    //监听时间变化
    changesingle : function(){
      var labelurl = this.https+'';
      this.$options.methods.singletable.bind(this)(labelurl,1, 10);
    },
    //每页显示数据量变更
    singleSizeChange: function(val) {
      var labelurl = this.https+'';
      this.$options.methods.singletable.bind(this)(labelurl,this.currentPage, val);
    },

    //页码变更
    singleCurrentChange: function(val) {
      var pageNo = this.currentPage;
      var pageSize = this.pageSize;
      var labelurl = this.https+'';
      this.$options.methods.singletable.bind(this)(labelurl,val,this.pageSize);
    },

    //单品情况数据
    singletable : function(url,page,pagesize){
      console.log(url,page,pagesize);
    }
    
  }
});