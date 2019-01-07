/** 
 * create author name xiaominzhang
 * create time 2018/8/15
*/
var vue = new Vue({
  el:"#app",
  mounted:function(){
    var labelurl = '/crm/customer/getList';
    var crm_url = '/tstypegroup/getTypegroupNoSession';
    var url = '/tsuser/getTSUsers?pageSize=-1';
    var https = this.vueUrl();
    this.geturldata();//获取url参数信息
   // this.getData(https+labelurl,this.change(),1,10); //获取列表数据
    this.request(https+url); //请求用户信息 
    this.clientStatic(https+crm_url); //客户状态
    this.clientRank(https+crm_url);  //客户级别
    this.clientIntimacy(https+crm_url); //亲密度
    this.getCityData(); //省市县三级联动
    this.localdata(); //展示默认数据
  },
  data:{
    form:{
        typeId:''
    },
    input: '',
    browser : '', //浏览器版本
    crmsplatform : [], //合作平台
    crmsclientType : [], //客户类型 
    crmsclientStatic : [], //RFM分层
    crmsclientRank : [],//客户级别
    crmsclientIntimacy : [], //客户亲密度
    crmsclientLabel : [],//客户标签
    crmsshopLabel : [],//店铺标签
    crmsclientform : [], //客户来源
    options1: [],  //公司员工数据
    clientShow : [], //客户回写
    crmsbrand : [], //品牌
    customer : [], //联系人信息
    shopdata:[], //店铺信息
    branddata : [],//合作品牌信息
    visit : [], //跟进方式
    crmssaleChance : [], //销售阶段
    crmsshoptype : [], //店铺类型
    crmsshopGrade : [],//店铺等级
    followData : [],//跟进记录信息
    commentInfo : [], //评论信息
    policymakers:[],//继决策人
    respible : [],//当前负责人
    collaborData : [],//协同人
    collaboruser : [],//协同人数据遍历后
    xtrname : [],//协同人名称
    clientDetail : [],//客户信息
    brandShow : [],//品牌数据回写
    shopShow : [], //商店信息
    customerShow : [], //联系人详情
    policymakerName : [], //决策人信息
    pcustomer : [], //母公司
    https : '',//请求接口前缀
    province : [],  //省  
    shi1: [],//市
    qu1: [],//县
    dpxtr : [],  //店铺协同人
    collaborusershop : [], //店铺协同人数据展示
    duty : [], //职务级别
    group : [],//已进入的群
    stockDetail : {//进货详情
      money : '',
      oneYearRfm : [],
      threeMonthRfm : [],
      brandRfm : []
    }, 
    isopenshop : [{name:"开店",id:"1"},{name:"关店",id:"0"}],//是否开店
    importance : [{typename:"五星",id:'5'},{typename:"四星",id:'4'},{typename:"三星",id:'3'},{typename:"二星",id:'2'},{typename:"一星",id:'1'}],//重要程度
    crmsiscooperation : [{name:'未签约',id:'0'},{name:"已签约",id:'1'}], //是否签约
    sex : [{name:"男",id:1},{name:"女",id:2},{name:"未知",id:3}], //性别数据
    departure :[{name:"在职",id:"0"},{name:"离职",id:"1"}],
    contacts : [{name:"手机",id:"手机"},{name:"电话",id:"电话"},{name:"家庭",id:"家庭"},{name:"公司",id:"公司"},{name:"其他",id:"其他"}],//联系方式
    companyType : [   //客户方式
      {name : '企业客户'},{name : '个人客户'}
    ], 
    pageSize : '', //分页
    total : '' ,//总数
    pickerOptions2: {shortcuts: [{
        text: '最近一周',
        onClick:function(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
        }, {
          text: '最近一个月',
          onClick:function(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
        text: '最近三个月',
        onClick:function(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
    }]},  //日期控件
    pickerOptions1: {
      disabledDate:function(time) {
        return time.getTime() > Date.now();
      },
      shortcuts: [{
        text: '今天',
        onClick:function(picker) {
          picker.$emit('pick', new Date());
        }
      }, {
        text: '昨天',
        onClick:function(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      }, {
        text: '一周前',
        onClick:function(picker) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', date);
        }
      }]
    }, //首次合作日期
    tableData:[],  //表单数据
    formLabelWidth: '120px',
    crms_hzpt : '',crms_khlx : '',crms_khzt : '',crms_khjb : '',crms_khqmd : '',crms_khbq : '',crms_khly : '',crms_brand : '',
    crms_frm_start : '',crms_frm_end : '',crms_fzr : '',last_time : '',creat_time : '',first_time : '',currentPage: 1,dialogCostoms: false,
    dialogChance : false,
    dialogShop : false,
    dialogCustomer : false,
    dialogrespible : false, 
    dialogcollabor : false,
    activeName: 'first',
    activebrand : 'first',
    activeshop : 'first',
    activecust : 'first',
    customertail : false,
    branddetail : false,
    shopdetails : false,
    shoprespible : false, //店铺负责人
    shopaid : false, //店铺助理
    shopxtr : false,  //店铺协同人
    smsdialog : false, //批量发送短信
    wechatdialog : false, //批量发送微信
    turnover : false, //移交客户

    //表单数据隐藏与现实  true是隐藏，false是显示
    show_legals:false,show_brand : true,show_deposit : false,show_cooperation : true,show_rfms : true,show_yearsales : true,show_name : true,show_tel : true,show_level : false,show_status : true,show_importance : true,show_province : false,show_district : false,show_address : true,show_source : true,show_intimacy : false,show_createor : false,show_label : false,show_synergy : true,show_receive : false,show_u8 : false,show_pname : false,show_create : false,show_type : true,show_charter : false,show_city:false,show_consignee:false,show_iscoper:false,show_index:false,show_erosion : false,show_capital:false,show_size:false,show_receivephone:false,

    //多选框按钮 true是勾选，false取消勾选
    showlegals:false,showbrand : true,showdeposit : false,showcooperation : true,showrfms:true,showyearsales:true,showname : true,showtel : true,showlevel : false,showstatus : true,showimportance : true,showprovince : false,showdistrict : false,showaddress : true,showsource : true,showintimacy : false,showcreateor : false,showlabel : false,showsynergy : true,showreceive : false,showu8 : false,showpname : false,showcreate : false,showtype : true,showcharter : false,showcity:false,showconsignee:false,showiscoper:false,showindex:false,showerosion:false,showcapital:false,showsize:false,showreceivephone:false,

    //客户表头信息
    title_enterprise: {
      add_enterprise:'新增客户',
      edit_enterprise: "编辑客户"
    },
    EnterpriseStatus : '',

    //联系人表头信息
    title_customer: {
      add_customer:'新增联系人',
      edit_customer: "编辑联系人"
    },
    CustomerStatus : '',

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
      introduce : '',
      cooperative_brand : '',
      customer_status : '',
      customer_level : '',
      now_principal_id : '',
      last_follow_up_date : '',
      create_date : ''
    },

    //新增表单提交
    client : {
      id : '',
      //右侧
      company_type : '',
      legal_person : '',
      consignee :'',
      receive_phone : '',
      contacts_name : '',
      p_id : '',
      u8_code : '',
      cooperative_brand : '',
      customer_type : '',
      label : '',
      iscooperation : '',
      first_cooperation_date : '',
      erosion_index : '',
      registered_capital : '',
      //右侧
      introduce : '',
      name : '',
      charter : '',
      now_principal_id : '',
      receive_address : '',
      contacts_tel : '',
      deposit : '',
      importance : '',
      cooperation_platform : '',
      intimacy : '',
      customer_source : '',
      team_size : '',
      first_contact_sales : '',
      erosion_cause : '',
      annual_sales_volume : '',
    
      //下边
      province : '',
      city : '',
      district : '',
      address : '',
    },
    rules: {//必填项提示
      companyType : [{required: true, message: '请选择客户类型', trigger: 'blur'}],
      introduce : [{required: true, message: '请输入客户全称', trigger: 'blur'}],
      name: [{required: true, message: '请输入客户名称', trigger: 'blur'}],
      legal_person : [{required: true, message: '请输入法人代表', trigger: 'blur'}],
      consignee :[{required: true, message: '请输入收货人', trigger: 'blur'}],
      receive_phone : [{required: true, message: '请输入收货电话', trigger: 'blur' }],
      now_principal_id : [{required: true, message: '请选择负责人', trigger: 'blur'}],
      charter : [{required: true, message: '请输入营业执照', trigger: 'blur'}],
      receive_address : [{required: true, message: '请输入收货地址', trigger: 'blur'}]
    },

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
    //跟进记录评论
    textarea : {
      theme_id : '',
      context : '',
      type : '跟进记录'
    },

    //新增店铺表单提交
    shop : {
      id : '',
      name : '',
      customer_id : '',
      store_customer_type : '',
      shop_type : '',
      shop_level : '',
      main_brand : '',
      taobaocode : '',
      link : '',
      category_rank : '',
      average_monthly_sales : '',
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
    rules2: {//必填项提示
      name: [{required: true, message: '请输入店铺名称', trigger: 'blur'}],
      taobaocode : [{required: true, message: '请输入旺旺号', trigger: 'blur'}],
      shop_type : [{required: true, message: '请选择店铺类型', trigger: 'blur'}]
    },
    
    //添加品牌合作机会
    brandChance : {
      id : '',
      brand_name : '',
      brand_plan_code : '',
      customer_id : '',
      policymaker_id : '',
      customer_name : '',
      principal_id : '',
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
    //添加联系人信息
    customerdata : {
      id : '',
      name : '',
      position_level : '',
      customer_id : '',
      duty : '',
      flock : '',
      sex : '',
      birthday : '',
      hobby : '',
      significance : '',
      intimacy : '',
      decision_relation : '',
      client_tag : '',
      isdimission : '',
      ding_num : '',
      wx_num : '',
      wx_name : '',
      qq : '',
      email : '',
      boss_remark : '',
    },

    rules1: {//必填项提示
      name: [{required: true, message: '请输入联系人名称', trigger: 'blur'}],
      customer_id : [{required: true, message: '客户不能为空', trigger: 'blur'}],
      sex :  [{required: true, message: '性别不能为空', trigger: 'blur'}],
      significance :  [{required: true, message: '重要程度不能为空', trigger: 'blur'}]
    },

    //移交负责人
    respibledata : {
      id : '',
      now_principal_id : '',
      now_principal_name : ''
    },

    //添加协同人
    collabor : {
      customer_id : '',
      user_id : '',
      type : 'kh_xtr'
    },

    //店铺协同人
    collaborshop : {
      shop_id : '',
      user_id : '',
      type : 'dp_xtr'
    },

    contact : {
      contactinfo :'',
      contact_way : ''
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

    dynamicValidateForm: {
      domains: [{
        value: ''
      }],
      email: ''
    },

    //客户移交处理
    clienthandover : {
      moveid : '',
      handid : ''
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
    tableHeight : '', //表单的最大高度设置
    stockheighttable : ''
  },
  created:function(){
    this.hh();
    this.ww();
    const that = this;
    this.getBrowserInfo();
    if(this.browser != 'IE' || this.browser!='safari'){
        window.onresize = () => {
        return (() => {
          this.hh();
          this.ww();
        })();
      };
    }
    
  },
  methods:{
    getBrowserInfo : function(){
      var Sys = {};
      var ua = navigator.userAgent.toLowerCase();
      var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
      var m = ua.match(re);
      Sys.browser = m[1].replace(/version/, "'safari");
      Sys.ver = m[2];
      this.browser=Sys.browser;
    },
    hh:function(){
      this.height.height=window.innerHeight+'px';
      this.height1.height = window.innerHeight-200+'px';
      this.height3.height = window.innerHeight-100+'px';
      this.followheight.height =window.innerHeight-450+'px';
      this.brandheight.height = window.innerHeight-230+'px';
      this.tableHeight = window.innerHeight - 80;
      this.stockheighttable =  window.innerHeight - 200;
    },

    //获取页面宽度
    ww:function(){
      if(window.innerWidth<=1000){
        this.heightselect.height = '190px';
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
      var url = location.href.split('/maochao')[0];
      this.https = url+'/maochao';
      return this.https;
    },

    //获取url的参数，并且进行查询数据
    geturldata:function(){
      let time = this.getQueryString('time');
      let type = this.getQueryString('type');
      let name = this.getQueryString('name');
      if(time!=null){
        var time1 = time+' 00:00:00',time2 = time+' 23:59:59';
        this.select.create_date=[time1,time2];
        this.change();
      }
      if(type=='个人客户'){
        this.select.name = name;
        this.change();
      }else{
        this.select.introduce = name;
        this.change();
      }
    },

    //判断详情中tag是否为空
    tagIf : function(data){
      if(data!=null){
        return '1';
      }else{
        return '0';
      }
    },

    //处理潜在客户列表联系电话
    contactstel : function(row){
      if(typeof(row) == "object"){
        if(row.contacts_tel!=null){
          return row.contacts_tel.replace(/\+86-/, "");
        }
      }else{
        return row.replace(/\+86-/, "");
      }
    },
    //处理潜在客户列表收货电话
    receivephone : function(row){
      if(typeof(row) == "object"){
        if(row.receive_phone!=null){
          return row.receive_phone.replace(/\+86-/, "");
        }
      }else{
        return row.replace(/\+86-/, "");
      }
    },
    
    //截取url参数
    getQueryString : function(name){
      //获取url参数
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return decodeURI(r[2]);
      }
      return null;
    },

    //公司成员请求
    request:function(url){
      this.$http.get(url).then((res) => {  //.then() 返回成功的数据
        for(var i=0;i<res.data.data.result.length;i++){
          if(res.data.data.result[i].ding_user_avatar ==null){
            res.data.data.result[i].ding_user_avatar = '../../dist/img/mrhead.png';
            this.options1 = res.data.data.result;
          }else{
            this.options1 = res.data.data.result;
          }
        }
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //把首次默认展示数据提交到localstorng中
    firstlocaldata : function(){
      localStorage.setItem("showlegals",false);localStorage.setItem("show_legals",false);//法人
      localStorage.setItem("showbrand",true);localStorage.setItem("show_brand",true);//品牌合作机会
      localStorage.setItem("showdeposit",false);localStorage.setItem("show_deposit",false);//保证金
      localStorage.setItem("showcooperation",false);localStorage.setItem("show_cooperation",false); //合作平台
      localStorage.setItem("showname",true);localStorage.setItem("show_name",true);//联系人
      localStorage.setItem("showtel",true);localStorage.setItem("show_tel",true);  //联系电话
      localStorage.setItem("showlevel",false);localStorage.setItem("show_level",false); //客户级别
      localStorage.setItem("showstatus",true);localStorage.setItem("show_status",true); //客户状态
      localStorage.setItem("showimportance",true);localStorage.setItem("show_importance",true); //主要程度
      localStorage.setItem("showprovince",false);localStorage.setItem("show_province",false); //省
      localStorage.setItem("showdistrict",false);localStorage.setItem("show_district",false); //区县
      localStorage.setItem("showaddress",true);localStorage.setItem("show_address",true); //地址
      localStorage.setItem("showsource",false);localStorage.setItem("show_source",false); //客户来源
      localStorage.setItem("showintimacy",false);localStorage.setItem("show_intimacy",false); //亲密度
      localStorage.setItem("showcreateor",false);localStorage.setItem("show_createor",false); //创建人
      localStorage.setItem("showlabel",false);localStorage.setItem("show_label",false); //客户标签
      localStorage.setItem("showsynergy",true);localStorage.setItem("show_synergy",true); //协同人
      localStorage.setItem("showreceive",false);localStorage.setItem("show_receive",false); //首次付款时间
      localStorage.setItem("showu8",true);localStorage.setItem("show_u8",true); //u8
      localStorage.setItem("showpname",false);localStorage.setItem("show_pname",false); //修改时间
      localStorage.setItem("showcreate",false);localStorage.setItem("show_create",false); //创建时间
      localStorage.setItem("showtype",false);localStorage.setItem("show_type",false); //客户类型
      localStorage.setItem("showcharter",false);localStorage.setItem("show_charter",false); //上月RFM指数
      localStorage.setItem("showcity",false);localStorage.setItem("show_city",false); //市
      localStorage.setItem("showrfms",true);localStorage.setItem("show_rfms",true);//RFM
      localStorage.setItem("showyearsales",true);localStorage.setItem("show_yearsales",true);//年销售额
      localStorage.setItem("showconsignee",false);localStorage.setItem("show_consignee",false);//收货人
      localStorage.setItem("showreceivephone",false);localStorage.setItem("show_receivephone",false); //收货电话
      localStorage.setItem("showiscoper",false);localStorage.setItem("show_iscoper",false);//是否签约
      localStorage.setItem("showindex",false);localStorage.setItem("show_index",false);//流失指数
      localStorage.setItem("showerosion",false);localStorage.setItem("show_erosion",false);//流失原因
      localStorage.setItem("showcapital",false);localStorage.setItem("show_capital",false);//流失原因
      localStorage.setItem("showsize",false);localStorage.setItem("show_size",false);//团队规模
      this.localdata();//加载浏览器的数据信息
    },

    //表单数据展示与隐藏设置
    showHide : function(show){
      switch(show){
        case 'show_legals' : if(this.show_legals == false){localStorage.setItem("showlegals",true);localStorage.setItem("show_legals",true); this.showlegals = true;return this.show_legals = true;}else{localStorage.setItem("showlegals",false);localStorage.setItem("show_legals",false);this.showlegals = false;return this.show_legals = false;}
            break;
        case 'show_brand' : if(this.show_brand == false){localStorage.setItem("showbrand",true);localStorage.setItem("show_brand",true); this.showbrand = true;return this.show_brand = true;}else{localStorage.setItem("showbrand",false);localStorage.setItem("show_brand",false);this.showbrand = false;return this.show_brand = false;}
            break;
        case 'show_deposit' :if(this.show_deposit === false){localStorage.setItem("showdeposit","true");localStorage.setItem("show_deposit","true");this.showdeposit = true;return this.show_deposit = true;}else{
          localStorage.setItem("showdeposit","false");localStorage.setItem("show_deposit","false");
          this.showdeposit = false; return this.show_deposit = false;}
            break;
        case 'show_cooperation' : if(this.show_cooperation === false){localStorage.setItem("showcooperation","true");localStorage.setItem("show_cooperation","true");this.showcooperation = true; return this.show_cooperation = true;}else{localStorage.setItem("showcooperation","false");localStorage.setItem("show_cooperation","false");this.showcooperation = false;return this.show_cooperation = false;}
          break;
        case 'show_name' : if(this.show_name === false){localStorage.setItem("showname","true");localStorage.setItem("show_name","true");this.showname = true;return this.show_name = true;}else{localStorage.setItem("showname","false");localStorage.setItem("show_name","false");this.showname = false;return this.show_name = false;}
            break;
        case 'show_tel' : if(this.show_tel === false){localStorage.setItem("showtel","true");localStorage.setItem("show_tel","true");this.showtel = true;return this.show_tel = true;}else{localStorage.setItem("showtel","false");localStorage.setItem("show_tel","false");this.showtel = false;return this.show_tel = false;}
            break;
        case 'show_level' : if(this.show_level === false){localStorage.setItem("showlevel","true");localStorage.setItem("show_level","true");this.showlevel = true;return this.show_level = true;}else{localStorage.setItem("showlevel","false");localStorage.setItem("show_level","false");this.showlevel = false;return this.show_level = false;}
        break;
        case 'show_status' : if(this.show_status === false){localStorage.setItem("showstatus","true");localStorage.setItem("show_status","true");this.showstatus = true;return this.show_status = true;}else{localStorage.setItem("showstatus","false");localStorage.setItem("show_status","false");this.showstatus = false;return this.show_status = false;}    
           break;
        case 'show_importance' : if(this.show_importance === false){localStorage.setItem("showimportance","true");localStorage.setItem("show_importance","true");this.showimportance = true;return this.show_importance = true;}else{localStorage.setItem("showimportance","false");localStorage.setItem("show_importance","false");this.showimportance = false;return this.show_importance = false;}
            break;
        case 'show_province' : if(this.show_province === false){localStorage.setItem("showprovince","true");localStorage.setItem("show_province","true");this.showprovince = true;return this.show_province = true;}else{localStorage.setItem("showprovince","false");localStorage.setItem("show_province","false");this.showprovince = false;return this.show_province = false;}
            break;
        case 'show_district' : if(this.show_district === false){localStorage.setItem("showdistrict","true");localStorage.setItem("show_district","true");this.showdistrict = true;return this.show_district = true;}else{localStorage.setItem("showdistrict","false");localStorage.setItem("show_district","false");this.showdistrict = false;return this.show_district = false;}
            break;
        case 'show_address' : if(this.show_address === false){localStorage.setItem("showaddress","true");localStorage.setItem("show_address","true");this.showaddress = true;return this.show_address = true;}else{localStorage.setItem("showaddress","false");localStorage.setItem("show_address","false");this.showaddress = false;return this.show_address = false;}
            break;
        case 'show_source' :  if(this.show_source === false){localStorage.setItem("showsource","true");localStorage.setItem("show_source","true");this.showsource = true;return this.show_source = true;}else{localStorage.setItem("showsource","false");localStorage.setItem("show_source","false");this.showsource = false;return this.show_source = false;}
            break;
        case 'show_intimacy' :if(this.show_intimacy === false){localStorage.setItem("showintimacy","true");localStorage.setItem("show_intimacy","true");this.showintimacy = true;return this.show_intimacy = true;}else{localStorage.setItem("showintimacy","false");localStorage.setItem("show_intimacy","false");this.showintimacy = false;return this.show_intimacy = false;}
            break;
        case 'show_createor' :if(this.show_createor === false){localStorage.setItem("showcreateor","true");localStorage.setItem("show_createor","true");this.showcreateor = true;return this.show_createor = true;}else{ localStorage.setItem("showcreateor","false");localStorage.setItem("show_createor","false");this.showcreateor = false;return this.show_createor = false;}
            break;
        case 'show_label' : if(this.show_label === false){localStorage.setItem("showlabel","true");localStorage.setItem("show_label","true");this.showlabel = true;return this.show_label = true;}else{localStorage.setItem("showlabel","false");localStorage.setItem("show_label","false");this.showlabel = false;return this.show_label = false;}
            break;
        case 'show_synergy' : if(this.show_synergy === false){localStorage.setItem("showsynergy","true");localStorage.setItem("show_synergy","true");this.showsynergy = true; return this.show_synergy = true;}else{localStorage.setItem("showsynergy","false");localStorage.setItem("show_synergy","false");this.showsynergy = false;return this.show_synergy = false;}
            break;
        case 'show_receive' : if(this.show_receive === false){localStorage.setItem("showreceive","true");localStorage.setItem("show_receive","true");this.showreceive = true;return this.show_receive = true;}else{localStorage.setItem("showreceive","false");localStorage.setItem("show_receive","false"); this.showreceive = false; return this.show_receive = false;}
            break;
        case 'show_u8' : if(this.show_u8 === false){localStorage.setItem("showu8","true");localStorage.setItem("show_u8","true"); this.showu8 = true;return this.show_u8 = true;}else{localStorage.setItem("showu8","false");localStorage.setItem("show_u8","false");this.showu8 = false;return this.show_u8 = false;}
            break;
        case 'show_pname' : if(this.show_pname === false){localStorage.setItem("showpname","true");localStorage.setItem("show_pname","true");this.showpname = true; return this.show_pname = true;}else{localStorage.setItem("showpname","false");localStorage.setItem("show_pname","false");this.showpname = false;return this.show_pname = false;}
            break;
        case 'show_create' : if(this.show_create === false){localStorage.setItem("showcreate","true");localStorage.setItem("show_create","true");this.showcreate = true;return this.show_create = true;}else{localStorage.setItem("showcreate","false");localStorage.setItem("show_create","false");this.showcreate = false;return this.show_create = false;}
            break;
        case 'show_type' :if(this.show_type === false){localStorage.setItem("showtype","true");localStorage.setItem("show_type","true");this.showtype = true;return this.show_type = true;}else{localStorage.setItem("showtype","false"); localStorage.setItem("show_type","false");this.showtype = false;return this.show_type = false;}
            break;
        case 'show_charter' : if(this.show_charter === false){localStorage.setItem("showcharter","true");localStorage.setItem("show_charter","true"); this.showcharter = true;return this.show_charter = true;}else{localStorage.setItem("showcharter","false");localStorage.setItem("show_charter","false");this.showcharter = false;return this.show_charter = false;}
            break;
        case 'show_city' : if(this.show_city === false){localStorage.setItem("showcity","true");localStorage.setItem("show_city","true");this.showcity = true;return this.show_city = true;}else{localStorage.setItem("showcity","false");localStorage.setItem("show_city","false"); this.showcity = false; return this.show_city = false;}
            break;
        case 'show_rfms' : if(this.show_rfms == false){localStorage.setItem("showrfms",true);localStorage.setItem("show_rfms",true); this.showrfms = true;return this.show_rfms = true;}else{localStorage.setItem("showrfms",false);localStorage.setItem("show_rfms",false);this.showrfms = false;return this.show_rfms = false;}
        break;
        case 'show_yearsales' : if(this.show_yearsales == false){localStorage.setItem("showyearsales",true);localStorage.setItem("show_yearsales",true); this.showyearsales = true;return this.show_yearsales = true;}else{localStorage.setItem("showyearsales",false);localStorage.setItem("show_yearsales",false);this.showyearsales = false;return this.show_yearsales = false;}
        break;
        case 'show_consignee' : if(this.show_consignee == false){localStorage.setItem("showconsignee",true);localStorage.setItem("show_consignee",true); this.showconsignee = true;return this.show_consignee = true;}else{localStorage.setItem("showconsignee",false);localStorage.setItem("show_consignee",false);this.showconsignee = false;return this.show_consignee = false;}
        break;
        case 'show_iscoper' : if(this.show_iscoper == false){localStorage.setItem("showiscoper",true);localStorage.setItem("show_iscoper",true); this.showiscoper = true;return this.show_iscoper = true;}else{localStorage.setItem("showiscoper",false);localStorage.setItem("show_iscoper",false);this.showiscoper = false;return this.show_iscoper = false;}
        break;
        case 'show_index' : if(this.show_index == false){localStorage.setItem("showindex",true);localStorage.setItem("show_index",true); this.showindex = true;return this.show_index = true;}else{localStorage.setItem("showindex",false);localStorage.setItem("show_index",false);this.showindex = false;return this.show_index = false;}
        break;
        case 'show_erosion' : if(this.show_erosion == false){localStorage.setItem("showerosion",true);localStorage.setItem("show_erosion",true); this.showerosion = true;return this.show_erosion = true;}else{localStorage.setItem("showerosion",false);localStorage.setItem("show_erosion",false);this.showerosion = false;return this.show_erosion = false;}
        break;
        case 'show_capital' : if(this.show_capital == false){localStorage.setItem("showcapital",true);localStorage.setItem("show_capital",true); this.showcapital = true;return this.show_capital = true;}else{localStorage.setItem("showcapital",false);localStorage.setItem("show_capital",false);this.showcapital = false;return this.show_capital = false;}
        break;
        case 'show_size' : if(this.show_size == false){localStorage.setItem("showsize",true);localStorage.setItem("show_size",true); this.showsize = true;return this.show_size = true;}else{localStorage.setItem("showsize",false);localStorage.setItem("show_size",false);this.showsize = false;return this.show_size = false;}
        break;
        case 'show_receivephone' :  if(this.show_receivephone == false){localStorage.setItem("showreceivephone",true);localStorage.setItem("show_receivephone",true); this.showreceivephone = true;return this.show_receivephone = true;}else{localStorage.setItem("showreceivephone",false);localStorage.setItem("show_receivephone",false);this.showreceivephone = false;return this.show_receivephone = false;}
        break;
      }
    },

    //请求刘篮球的localstrong中的数据
    localdata : function(){
      var key = localStorage.getItem("show_brand");
      if(key != null){
         //法人
         if(localStorage.show_legals == 'true'){this.show_legals = true;this.showlegals = true;}else{this.show_legals = false;this.showlegals =  false;}
        //收货电话
        if(localStorage.show_receivephone == 'true'){this.show_receivephone = true;this.showreceivephone = true;}else{this.show_receivephone = false;this.showreceivephone =  false;}
        //判断品牌机会显示或隐藏
        if(localStorage.show_brand == 'true'){this.show_brand = true;this.showbrand =  true;}else{this.show_brand = false;this.showbrand =  false;}
        //判断保证金显示或隐藏
        if(localStorage.show_deposit == 'true'){this.show_deposit = true;this.showdeposit =  true;}else{this.show_deposit = false;this.showdeposit =  false;}
        //判断合作平台显示或隐藏
        if(localStorage.show_cooperation == 'true'){this.show_cooperation = true;this.showcooperation =  true;}else{this.show_cooperation = false;this.showcooperation =  false;}
        //判断联系人显示或隐藏
        if(localStorage.show_name == 'true'){this.show_name = true;this.showname =  true;}else{this.showname = false;this.show_name =  false;}
        //判断合作品牌显示或隐藏
        if(localStorage.show_brand == 'true'){this.show_brand = true;this.showbrand =  true;}else{this.showbrand = false;this.show_brand =  false;}
        //判断联系电话显示或隐藏
        if(localStorage.show_tel == 'true'){this.show_tel = true;this.showtel =  true;}else{this.showtel = false;this.show_tel =  false;}
        //判断客户级别显示或隐藏
        if(localStorage.show_level == 'true'){this.show_level = true;this.showlevel =  true;}else{this.showlevel = false;this.show_level =  false;}
        //判断客户级别显示或隐藏
        if(localStorage.show_status == 'true'){this.show_status = true;this.showstatus =  true;}else{this.showstatus = false;this.show_status =  false;}
        //判断主要程度显示或隐藏
        if(localStorage.show_importance == 'true'){this.show_importance = true;this.showimportance =  true;}else{this.showimportance = false;this.show_importance =  false;}
        //判断省显示或隐藏
        if(localStorage.show_province == 'true'){this.show_province = true;this.showprovince =  true;}else{this.showprovince = false;this.show_province =  false;}
        //判断县显示或隐藏
        if(localStorage.show_district == 'true'){this.show_district = true;this.showdistrict =  true;}else{this.showdistrict = false;this.show_district =  false;}
        //判断地址显示或隐藏
        if(localStorage.show_address == 'true'){this.show_address = true;this.showaddress =  true;}else{this.showaddress = false;this.show_address =  false;}
        //判断客户来源显示或隐藏
        if(localStorage.show_source == 'true'){this.show_source = true;this.showsource =  true;}else{this.showsource = false;this.show_source =  false;}
        //判断主要程度显示或隐藏
        if(localStorage.show_intimacy == 'true'){this.show_intimacy = true;this.showintimacy =  true;}else{this.showintimacy = false;this.show_intimacy =  false;}
        //判断创建人显示或隐藏
        if(localStorage.show_createor == 'true'){this.show_createor = true;this.showcreateor =  true;}else{this.showcreateor = false;this.show_createor =  false;}
        //判断标签显示或隐藏
        if(localStorage.show_label == 'true'){this.show_label = true;this.showlabel =  true;}else{this.showlabel = false;this.show_label =  false;}
        //判断协同人显示或隐藏
        if(localStorage.show_synergy == 'true'){this.show_synergy = true;this.showsynergy =  true;}else{this.showsynergy = false;this.show_synergy =  false;}
        //判断首次付款时间显示或隐藏
        if(localStorage.show_receive == 'true'){this.show_receive = true;this.showreceive =  true;}else{this.showreceive = false;this.show_receive =  false;}
        //判断最后跟进时间显示或隐藏
        if(localStorage.show_u8 == 'true'){this.show_u8 = true;this.showu8 =  true;}else{this.showu8 = false;this.showu8 =  false;}
        //判断跟新时间显示或隐藏
        if(localStorage.show_pname == 'true'){this.show_pname = true;this.showpname =  true;}else{this.showpname = false;this.show_pname =  false;}
        //判断创建时间显示或隐藏
        if(localStorage.show_create == 'true'){this.show_create = true;this.showcreate =  true;}else{this.showcreate = false;this.show_create =  false;}
        //判断客户类型显示或隐藏
        if(localStorage.show_type == 'true'){this.show_type = true;this.showtype =  true;}else{this.showtype = false;this.show_type =  false;}
        //判断RFM指数显示或隐藏
        if(localStorage.show_charter == 'true'){this.show_charter = true;this.showcharter =  true;}else{this.showcharter = false;this.show_charter =  false;}
        //判断市显示或隐藏
        if(localStorage.show_city == 'true'){this.show_city = true;this.showcity =  true;}else{this.showcity = false;this.show_city =  false;}
        //RFM显示与隐藏
        if(localStorage.show_rfms == 'true'){this.show_rfms = true;this.showrfms =  true;}else{this.show_rfms = false;this.showrfms =  false;}
        //指数
        if(localStorage.show_index == 'true'){this.show_index = true;this.showindex =  true;}else{this.show_index = false;this.showindex =  false;}
        //年销售额
        if(localStorage.show_yearsales == 'true'){this.show_yearsales = true;this.showyearsales =  true;}else{this.show_yearsales = false;this.showyearsales =  false;}
        //注册资本
        if(localStorage.show_capital == 'true'){this.show_capital = true;this.showcapital =  true;}else{this.show_capital = false;this.showcapital =  false;}
        //规模
        if(localStorage.show_size == 'true'){this.show_size = true;this.showsize =  true;}else{this.show_size = false;this.showsize =  false;}
      }else{
        this.firstlocaldata();
      }
    },

    //获取当前登录用户的信息
    getUserInfo(url){
      this.$http.get(url).then((res) => {  //.then() 返回成功的数据
        this.client.now_principal_id = res.data.data.userId;
        this.brandChance.principal_id = res.data.data.userId;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //决策人
    policymaker(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_jcgx'
      }}).then((res) => {  //.then() 返回成功的数据
        this.policymakers = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    // 加载china地点数据，三级联动地址
    getCityData:function(){
      var that = this;
      this.$http.get('../../dist/js/map.json').then(function(response){
        if (response.status==200) {
            that.province = [];
            that.city = [];
            that.block = [];
          var data = response.data
          // 省市区数据分类
          for (var item in data) {
            if (item.match(/0000$/)) {//省
              this.province.push({id: item, value: data[item], children: []})
            } else if (item.match(/00$/)) {//市
              this.city.push({id: item, value: data[item], children: []})
            } else {//区
              this.block.push({id: item, value: data[item]})
            }
          }
          // 分类市级
          for (var index in this.province) {
            for (var index1 in that.city) {
              if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                that.province[index].children.push(that.city[index1])
              }
            }
          }
          // 分类区级
          for(var item1 in this.city) {
            for(var item2 in that.block) {
              if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                that.city[item1].children.push(that.block[item2])
              }
            }
          }
        }
        else{
          console.log(response.status)
        }
      }).catch(function(error){console.log(typeof+ error)})
    },

    //添加千分位
    toThousands : function(num,cent) {
      var isThousand=true;
      num = num.toString().replace(/\$|\,/g,'');
      // 检查传入数值为数值类型
      if(isNaN(num))num = "0";
      // 获取符号(正/负数)
      var sign = (num == (num = Math.abs(num)));
      num = Math.floor(num*Math.pow(10,cent)+0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
      var cents = num%Math.pow(10,cent);       // 求出小数位数值
      num = Math.floor(num/Math.pow(10,cent)).toString();  // 求出整数位数值
      cents = cents.toString();        // 把小数位转换成字符串,以便求小数位长度
      // 补足小数位到指定的位数
      while(cents.length<cent)cents = "0" + cents;
      if(isThousand) {
          // 对整数部分进行千分位格式化.
          for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
              num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
      }
      if (cent > 0)
          return (((sign)?'':'-') + num + '.' + cents);
      else
          return (((sign)?'':'-') + num);
    },

    // 选省
    choseProvince:function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children
          this.client.city = this.province[index2].children[0].id
          this.qu1 =this.province[index2].children[0].children
          this.client.district = this.province[index2].children[0].children[0].id
          this.E = this.qu1[0].id
        }
      }
    },

    // 选市
    choseCity:function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children
          this.client.district = this.city[index3].children[0].id
          this.E = this.qu1[0].id
          // console.log(this.E)
        }
      }
    },

    // 选区
    choseBlock:function(e) {
      this.E=e;
      // console.log(this.E)
    },

    //详情展示省
    province_fun(data){
      if(!isNaN(data)){
        for (var index2 in this.province) {
          if (data === this.province[index2].id) {
            return this.province[index2].value;
          }
        }
      } else{
         return data;
      }
    },

    //详情展示市
    city_fun(data){
      if(!isNaN(data)){
        for (var index3 in this.city) {
          if (data === this.city[index3].id) {
            return  this.city[index3].value;
          }
        }
      }else{
        return data;
      }
    },

    //详情展示县、区
    district_fun(data1,data2,data3){
      var city = new Array();
      var district = new Array();
      if(!isNaN(data1)){
        for (var index2 in this.province) {
          if (data1 === this.province[index2].id) {
            city = this.province[index2].children;
            this.shi1 = this.province[index2].children;
          }
        }
        for(var index3 in  city){
          if (data2 ===city[index3].id) {
            district = city[index3].children;
            this.qu1 = city[index3].children;
          }
        }
        for(var index4 in  district){
          if (data3 === district[index4].id) {
            return district[index4].value;
          }
        }
      }else{
        return data3;
      }
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

    //合作平台
    platform(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_hzpt'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsplatform = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //客户类型
    clientType(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_chlx'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsclientType = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //RFM分层
    clientStatic(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'customer_status'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsclientStatic = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //客户级别
    clientRank(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'customer_level'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsclientRank = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //客户亲密度
    clientIntimacy(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_khqm'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsclientIntimacy = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //客户标签
    clientLabel(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_khbq'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsclientLabel = res.data.data.result;
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

    //客户来源
    clientform(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_khly'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsclientform = res.data.data.result;
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

    //决策人信息
    policymake : function(id) {
      this.policymakerName.length = 0;
      for(var i=0;i<this.tableData.length;i++){
        if(id == this.tableData[i].customer_id){
          this.policymakerName.push(this.tableData[i]);
        }
      }
    },

    //联系方式转换
    customerWay : function(data){
      if(data !='' && data != undefined && typeof(data)=="string"){
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
        return data;
      }
    },

    //品牌合作机会联系方式
    content_phone(row){
      for(var i=0;i<this.customer.length;i++){
        if(row == this.customer[i].id){
          return  this.$options.methods.customerWay.bind(this)(this.customer[i].contact_way); //品牌机会联系方式
        }
      }
    },

    //性别详情展示
    sexshow(row) {
      switch(row){
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

    //是否签约
    signed : function(row){
      switch(row){
        case '0':
        return '未签约';
        break;
        case '1':
        return '已签约';
        break;
        default:
        return '-';
      }
    },

    //表单离职数据处理
    dimissioninfo:function(row) {
      switch(row){
          case 0:
          return '在职';
          break;
          case 1:
          return '已离职';
          break;
          default:
          return '-';
      }
    },

    //决策关系
    decisionRelation : function(decision_relation){
      for(var i=0;i<this.policymakers.length;i++){
        if(this.policymakers[i].typecode == decision_relation){
          return this.policymakers[decision_relation].typename
        }else{
          return '-';
        }
      }
    },

    //联系人
    customerData:function(url){
      //请求页面表单数据
      let para = {
        pageSize: -1
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.customerDetail = res.data.data.result;
      })
      .catch(function(res) {
        console.log(res)
      }) 
    },

    //日期格式转换
    dateFormat:function(row, column) { 
      var date = row[column.property]; 
      if (date == undefined) { 
        return ""; 
      } 
      return moment(date.time).format("YYYY-MM-DD HH:mm"); 
    },

    //导出数据
    downloadkh : function(){
      var url = this.https+'/crm/customer/downloadList?paramsJson='+JSON.stringify(this.$options.methods.primsData.bind(this)()); 
      window.location.href = url;
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

    //请求页面表单数据
    getData:function(url,data,pageNum,pageSize){
      let para = {
          page: pageNum?pageNum:1,
          pageSize: pageSize?pageSize:10,
          paramsJson : JSON.stringify(data),
          searchPotentialCus : this.getQueryString('searchPotentialCus')
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.tableData = res.data.data.result;
        this.pageSize = res.data.data.pageSize;
        this.total = res.data.data.totalCount;
        this.pcustomerData();   //    请求母公司数据信息
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //母公司信息
    pcustomerData : function(){
      let labelurl = this.https+'/crm/customer/getList';
      let para = {
        page:1,
        pageSize: -1,
      };
      this.$http.post(labelurl,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.pcustomer = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //批量发送短信
    SMS : function(){
      this.smsdialog = true;
    },

    //下载短信模板
    donwSMS : function(){
      const SMSurl = this.https;
      window.location.href = SMSurl.split('/')[1]+ '/hhr/adminLTE/template/template6.xls';
    },

    //判断上传文件是否是excel文件
    fileUp : function(file){
      if(file!=''){
        var filextension = file.substring(file.lastIndexOf("."), file.length);
        filextension = filextension.toLowerCase();
        var file = file.split("\\");
        return file[file.length-1];
        if(filextension != '.xls' && filextension != '.xlsx'){
          this.$message('系统支持上传xls,xlsx格式文件');
        }
      }
    },

    //提交短信内容
    smsbtn : function(){
      //展示提示信息
      var data;
      var MSM = {
        content : $('#reply-content').val(),
        file : $('#file-import').val(),
        fileName : this.fileUp($('#file-import').val())
      };
      $.ajaxFileUpload({
        url :this.https+'/crm/msg/batchSendMessage',
        secureuri : false,
        type:"POST",
        data: MSM, 
        fileElementId : 'file-import',
        dataType : 'json',
        success : function(data, status) {
          if(data.status=="success"){
            alert("上传成功");
            $('#reply-content').val("");
            $('#file-import').val("");
            $('.cancelsms').click();
          }else{
            alert(data.message);
          } 
        },
        error : function(data, status, e) {
          var message = JSON.parse(data.responseText);
          if(message.status != "success"){
            alert("上传异常");
          }
        }
      });
    },
  
    //批量发送微信
    wechat : function(){
      this.wechatdialog = true;
    },

    //下载微信模板
    donwWechat : function(){
      const SMSurl = this.https;
      window.location.href = SMSurl.split('/')[1]+ '/hhr/adminLTE/template/template5.xls';
    },

    //提交微信内容
    wechatbtn : function(){
       //展示提示信息
       var wechar = {
         content : $('#reply-content1').val(),
         file : $('#file-import1').val(),
         fileName : this.fileUp($('#file-import1').val())
       };
       $.ajaxFileUpload({
         url :this.https+'/crm/msg/batchWireSendMessage',
         secureuri : false,
         type:"POST",
         data: wechar, 
         fileElementId : 'file-import1',
         dataType : 'json',
         success : function(data, status) {
           if(data.status=="success"){
             alert("上传成功");
             $('#reply-content').val("");
             $('#file-import').val("");
             $('.cancelwechar').click();
           }else{
             alert(data.message);
           } 
         },
         error : function(data, status, e) {
          //  var message = JSON.parse(data.responseText);
          //  if(message.status != "success"){
          //    alert("上传异常");
          //  }
         }
       });
    },

    //移交客户页面弹出
    moveclient : function(){
      this.turnover = true;
    },

    //移交客户功能
    moveTo : function(){
      var url = this.https+'/crm/customer/handOverCustomer';
      var labelurl = this.https+'/crm/customer/getList';
      //移交客户表单数据提交
      this.$http.post(url,this.moveToprimse(),{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.$message('移交客户成功');
        //调用列表接口
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
        this.turnover=false;
        this.$options.methods.closemoveToprimse.bind(this)();//清空数据
      })
      .catch(function(res) {
        this.$message('移交客户失败');
      });
    },

    //移交客户数据处理
    moveToprimse : function(){
      var moveid = this.clienthandover.moveid,
          movename = '',
          toid = this.clienthandover.handid,
          toname = '';
      for(var i=0;i<this.options1.length;i++){
        if(moveid == this.options1[i].id){
          movename = this.options1[i].firstname
        }
        if(toid == this.options1[i].id){
          toname = this.options1[i].firstname
        }
      }

      //处理数据
      var data  = {
        move_now_principal_id : moveid,
        move_principal_name : movename,
        to_now_principal_id : toid,
        to_principal_name : toname
      }

      return data;
    },

    //消除移交信息
    closemoveToprimse : function(){
      this.clienthandover.moveid = '';
      this.clienthandover.handid = '';
    },

    //点击弹出信息
    handleEdit(data1,data2) {
      this.visit.length = 0;
      this.branddata.length =0;
      $('.detail-bg').show();
      $('.detail').show();
      this.policymake(data1); //联系人列表中获取给客户下的联系人信息数据整理
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
      var id = this.clientShow.id;
      var url = this.https+'/crm/customer/getDataById';
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      var brand = this.https+'/crm/cbCooperation/getList';
      var brand_url = this.https+'/crm/dictionary/getList';
      this.$options.methods.enterprisebackData.bind(this)(url,data1);
      this.visitWay(crm_url);  //跟进方式
      var brand = this.https+'/crm/cbCooperation/getList';
      this.$options.methods.brandgetData.bind(this)(brand,data1); //品牌机会
      var stockurl = this.https+'/crm/customer/stockDetail';
      this.stoclgetData(stockurl,data1);
      this.clientLabel(crm_url);  //客户标签
      this.clientform(crm_url);  //客户来源
      this.platform(crm_url); //客户合作平台
      this.brand(brand_url);  //合作品牌
      this.clientType(crm_url);  //客户类型
      this.dutylevel(crm_url);  //职务级别
      this.groupIn(crm_url);
    },

    //客户信息回写
    enterprisebackData:function(url,id){
      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.clientShow = res.data.data;
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,id);
        var customer = this.https+'/crm/contacts/getList';
        this.$options.methods.suetomergetData.bind(this)(customer,id);
        this.$options.methods.showcollabor.bind(this)(id);
        var shop = this.https+'/crm/shop/getList';
        this.$options.methods.shopgetData.bind(this)(shop,id);
        //获取负责人名称以及图片
        if(this.clientShow.now_principal_id!=null){
          for(var i=0;i<this.options1.length;i++){
            if(this.clientShow.now_principal_id == this.options1[i].id){
              if(this.options1[i].ding_user_avatar!=''){
                this.respible = this.options1[i];
              }else{
                 this.options1[i].ding_user_avatar = '../../dist/img/mrhead.png';
                 this.respible = this.options1[i];
              }
            }
          }
        }else{
          this.respible = this.imgdata[0];
        }
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //移交负责人
    updaterespible : function(id){
      this.dialogrespible = true;
      this.respibledata.id = id;
    },

    //修改负责人信息数据整合
    respibleprimse : function(){
      var id = this.respibledata.id,
          now_principal_id = this.respibledata.now_principal_id;
          now_principal_name = '';
      //获取负责人人名称
      for(var i=0;i<this.options1.length;i++){
        if(now_principal_id == this.options1[i].id){
          now_principal_name = this.options1[i].firstname
        }
      }
      
      //数据整合
      var data = {
        id : id,
        now_principal_id :now_principal_id,
        now_principal_name : now_principal_name
      }
      return data;
    },

    //提交负责人信息
    respiblebtn : function(){
      var id = this.clientShow.id;
      var url = this.https+'/crm/customer/updateData'; 
      var labelurl = this.https+'/crm/customer/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.respibleprimse.bind(this)())
      };
      
      //判断false
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          this.$message('移交负责人成功');
          //调用列表接口
          this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
          this.dialogrespible=false;
          var urlenterprise = this.https+'/crm/customer/getDataById';
          this.$options.methods.enterprisebackData.bind(this)(urlenterprise,id);
          this.$options.methods.closerespible.bind(this)();//清空数据
        })
        .catch(function(res) {
          this.$message('移交负责人失败');
        });
      }
    },

    //清空移交数据
    closerespible:function(){
      this.respibledata.now_principal_id = '';
      this.respibledata.now_principal_name = '';
    },

    //协同人展示
    showcollabor : function(id){
      var url = this.https+'/crm/customerUser/getList';
      var data = {
        "data_id" : "='"+id+"'",
        "type" : "='kh_xtr'" 
      }
      var para = {
        paramsJson : JSON.stringify(data)
      }
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "success"){
          this.collaborData = res.data.data.result;
          this.collaboruser.length=0;
          //遍历协同人图片
          for(var i=0;i<this.options1.length;i++){
            for(var j=0;j<this.collaborData.length;j++){
              if(this.collaborData[j].user_id == this.options1[i].id){
                this.collaboruser.push({id:this.collaborData[j].id,user_id:this.options1[i].id,img:this.options1[i].ding_user_avatar,name:this.options1[i].firstname});
              }
            }
          }
        }
      })
      .catch(function(res) {
          console.log(res)
      })  
    },

    //添加协同人
    collaboration : function(id){
      this.dialogcollabor = true;
      this.collabor.customer_id = id;
    },

    //协同人数据整合
    collaborprimes :function(){
      var customer_id = this.collabor.customer_id,
          user_id = this.collabor.user_id,
          type = this.collabor.type; 
      //处理重复的协同人数据操作
      for(var i=0;i<this.collaboruser.length;i++){
        for(var j=0;j<user_id.length;j++){
          if(this.collaboruser[i].user_id == user_id[j]){
            user_id.splice(j,1);
          }
        }
      }

      this.$options.methods.respiblename.bind(this)();  

      var data = {
        data_id : customer_id,
        user_id : user_id,
        type : type,
      };
      
      //判断协同人数据不为空
      if(user_id!=''){
        return data;
      }else{
        this.$message('请添加协同人信息或协同人重复');
      }
    },

    //提交协同人名称
    respiblename : function(){
      //获取协同人名称去重
      this.xtrname.length=0;
      var data1 = this.collaboruser;
      var data2 = this.collabor;
      for(var i=0;i<this.options1.length;i++){
        for(var j=0;j<data1.length;j++){
          if(data1[j].user_id == this.options1[i].id){
            this.xtrname.push(this.options1[i].firstname);
          }
        }
      }
      for(var i=0;i<this.options1.length;i++){
        for(var m=0;m<data2.user_id.length;m++){
          if(data2.user_id[m] == this.options1[i].id){
            this.xtrname.push(this.options1[i].firstname);
          }
        }
      }

      var id = this.clientShow.id;
      var url = this.https+'/crm/customer/updateData'; 
      var labelurl = this.https+'/crm/customer/getList';
      var dataname = {
        id : id,
        data_id : this.clientShow.now_principal_id,
        synergy_names : this.xtrname.join(',')
      };
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(dataname)
      };
      console.log(para);
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.$message('列表协同人添加成功');
        //调用列表接口
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
        this.dialogrespible=false;
        var urlenterprise = this.https+'/crm/customer/getDataById';
        this.$options.methods.enterprisebackData.bind(this)(urlenterprise,id);
        this.$options.methods.closerespible.bind(this)();//清空数据
      })
      .catch(function(res) {
        this.$message('列表协同人添加失败');
      });
    },

    //协同人数据数据提交
    collaborbtn : function(){
      //获取协同人数据信息
      var now_principal_id = this.clientShow.now_principal_id;
      var data = this.$options.methods.collaborprimes.bind(this)();
      var id = this.clientShow.id;
      var length = data.user_id.length;
      var user = data.user_id;
      var clientShow = this.collabor.customer_id;
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
          console.log(para.dataJson);
          //判断false
          this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
            this.$message('添加协同人成功');
            //调用列表接口
            this.$options.methods.showcollabor.bind(this)(clientShow);
            this.dialogcollabor = false;
          })
          .catch(function(res) {
            this.$message('添加协同人失败');
          }); 
        }
       
      }
    },

    //删除列表的协同人信息
    delxtr: function(dataid){
      var name = new Array();
      for(var i=0;i<this.collaboruser.length;i++){
        if(dataid == this.collaboruser[i].id){
          this.collaboruser.splice(i,1);
        } 
      }
      //获取名称
      for(var i=0;i<this.collaboruser.length;i++){
        name.push(this.collaboruser[i].name);
      }

      var id = this.clientShow.id;
      var url = this.https+'/crm/customer/updateData'; 
      var labelurl = this.https+'/crm/customer/getList';
      var now_principal_id = this.clientShow.now_principal_id;
      var dataname = {
        id : id,
        now_principal_id : now_principal_id,
        synergy_names : name.join(',')
      };
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(dataname)
      };
      console.log(para);
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        //调用列表接口
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
        this.dialogrespible=false;
        var urlenterprise = this.https+'/crm/customer/getDataById';
        this.$options.methods.enterprisebackData.bind(this)(urlenterprise,id);
        this.$options.methods.closerespible.bind(this)();//清空数据
      })
      .catch(function(res) {
        if(res.data.status == 'error')
        this.$message('列表协同人添加失败');
      });
    },

    //删除协同人
    collaDel : function(id,clientShow){
      var url = this.https+'/crm/customerUser/delData';
      var labelurl = this.https+'/crm/customerUser/getList';
      this.$http.post(url,{"id":id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "success"){
          this.$message('删除协同人数据成功');
          this.$options.methods.showcollabor.bind(this)(clientShow);
          this.$options.methods.delxtr.bind(this)(id);
        }
       
      }).catch(function(res) {
          console.log(res)
      })
    },

    //请求数据的prims数据
    primsData : function(){
      var name =  this.select.name?" LIKE "+"'%"+this.select.name+"%'":'',
          introduce = this.select.introduce?" LIKE "+"'%"+this.select.introduce+"%'":'',
          cooperative_brand = this.select.cooperative_brand?" LIKE "+"'%"+this.select.cooperative_brand+"%'":'',
          customer_status = this.select.customer_status?"='"+this.select.customer_status+"'":'',
          customer_level = this.select.customer_level?"='"+this.select.customer_level+"'":'',
          now_principal_id = this.select.now_principal_id?"='"+this.select.now_principal_id+"'":'',
          last_follow_up_date_start = this.select.last_follow_up_date?moment(this.select.last_follow_up_date[0]).format("YYYY-MM-DD HH:MM:SS"):'',
          last_follow_up_date_end = this.select.last_follow_up_date?moment(this.select.last_follow_up_date[1]).format("YYYY-MM-DD HH:MM:SS"):'',
          create_date_start = this.select.create_date?moment(this.select.create_date[0]).format("YYYY-MM-DD HH:MM:SS"):'',
          create_date_end = this.select.create_date?moment(this.select.create_date[1]).format("YYYY-MM-DD HH:MM:SS"):'';

      //判断最后联系时间
      var last_follow_up_date = '';
      if(last_follow_up_date_start){
        last_follow_up_date = ' BETWEEN '+"'"+last_follow_up_date_start+"'"+' AND '+"'"+last_follow_up_date_end+"'";
      }

      //创建时间
      var create_date = '';
      if(create_date_start){
        create_date = ' BETWEEN '+"'"+create_date_start+"'"+' AND '+"'"+create_date_end+"'";
      }
      //判断创建时间
      if(create_date ==" BETWEEN 'Invalid date' AND 'Invalid date'"){
        create_date = '';
      }

      //获取id信息
      var ids = this.getQueryString('id');
      if(ids){
        return paramsJson ={
          "a.name" : name,
          "a.introduce" : introduce,
          "a.cooperative_brand" : cooperative_brand,
          "a.customer_status" : customer_status,
          "a.now_principal_id" : now_principal_id,
          "a.customer_level" : customer_level,
          "a.last_follow_up_date" :last_follow_up_date,
          "a.create_date" :create_date,
          "a.first_cooperation_date" :  " is not null",
          "a.id in " : '('+ids+')'
        }
      }else{
        return paramsJson ={
          "a.name" : name,
          "a.introduce" : introduce,
          "a.cooperative_brand" : cooperative_brand,
          "a.customer_status" : customer_status,
          "a.now_principal_id" : now_principal_id,
          "a.customer_level" : customer_level,
          "a.last_follow_up_date" :last_follow_up_date,
          "a.create_date" :create_date,
          "a.first_cooperation_date" :  " is not null"
        }
      }
    },

    //监听搜索条件的变化
    change:function() {
      var labelurl = this.https+'/crm/customer/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),this.currentPage,this.pageSize);  //方法相互调用
    },

    //每页显示数据量变更
    handleSizeChange: function(val) {
      var labelurl = this.https+'/crm/customer/getList';
      if(val == 'NaN'){
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),this.currentPage, '-1');
      }else{
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),this.currentPage, val);
      }
      
    },

    //页码变更
    handleCurrentChange: function(val) {
      var pageNo = this.currentPage;
      var pageSize = this.pageSize;
      var labelurl = this.https+'/crm/customer/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),val,this.pageSize);
    },

    //添加客户表单信息
    clientprimsData : function(){
      var id = this.client.id, 
      name = this.client.company_type == '个人客户'?this.client.name:'',
      introduce  = this.client.company_type != '个人客户'?this.client.introduce:'',
      deposit  = this.client.deposit,
      contacts_name = this.client.contacts_name,
      contacts_tel  = this.client.contacts_tel,
      importance  = this.client.importance,
      last_month_rfm  = this.client.last_month_rfm,
      u8_code  = this.client.u8_code,
      cooperative_brand  = this.client.cooperative_brand?this.client.cooperative_brand.join(','):'',
      cooperation_platform  = this.client.cooperation_platform?this.client.cooperation_platform.join(','):'',
      customer_type  = this.client.customer_type,
      customer_status  = this.client.customer_status,
      customer_level  = this.client.customer_level,
      intimacy  = this.client.intimacy,
      label  = this.client.label?this.client.label.join(','):'',
      customer_source  = this.client.customer_source,
      now_principal_id  = this.client.now_principal_id,
      now_principal_name  = this.client.now_principal_name,
      iscooperation  = this.client.iscooperation,
      province  = this.client.province,
      city  = this.client.city,
      district  = this.client.district,
      address  = this.client.address1,
      first_cooperation_date  = this.client.first_cooperation_date?moment(this.client.first_cooperation_date).format("YYYY-MM-DD  HH:mm:ss"):'',
      first_contact_sales  = this.client.first_contact_sales,
      erosion_index  = this.client.erosion_index,
      erosion_cause  = this.client.erosion_cause,
      legal_person  = this.client.company_type != '个人客户'?this.client.legal_person:'',
      registered_capital = this.client.registered_capital,
      annual_sales_volume  = this.client.annual_sales_volume,
      team_size  = this.client.team_size;
      //新增字段
      receive_address = this.client.receive_address;
      charter =  this.client.company_type != '个人客户'?this.client.charter:'';
      p_id = this.client.p_id;
      receive_phone = this.client.receive_phone;
      consignee = this.client.consignee;
      company_type = this.client.company_type;
      p_name = '';

      //获取母公司名称
      for(let b=0;b<this.pcustomer.length;b++){
        if(p_id = this.pcustomer[b].id){
          p_name = this.pcustomer[b].introduce;
        }
      }
     
      //获取负责人人名称
      for(var i=0;i<this.options1.length;i++){
        if(now_principal_id == this.options1[i].id){
          now_principal_name = this.options1[i].firstname
        }
      }
      
      //数据整理
      var data = {
        id : id,
        name : name,
        introduce : introduce,
        deposit  : deposit,
        contacts_name : contacts_name,
        contacts_tel : contacts_tel,
        importance : importance,
        last_month_rfm : last_month_rfm,
        u8_code : u8_code,
        cooperative_brand : cooperative_brand,
        cooperation_platform : cooperation_platform,
        customer_type : customer_type,
        customer_status : customer_status,
        customer_level : customer_level,
        intimacy : intimacy,
        label : label,
        customer_source : customer_source,
        now_principal_id :now_principal_id,
        now_principal_name : now_principal_name,
        iscooperation : iscooperation,
        address : address,
        first_cooperation_date : first_cooperation_date,
        first_contact_sales : first_contact_sales,
        erosion_index : erosion_index,
        erosion_cause : erosion_cause,
        legal_person : legal_person,
        registered_capital : registered_capital,
        annual_sales_volume : annual_sales_volume,
        team_size : team_size,
        province : province,
        city : city,
        district : district, //省市县
        //修改后添加的字段
        receive_address : receive_address,
        charter : charter,
        p_id : p_id,
        receive_phone : receive_phone,
        consignee : consignee,
        company_type : company_type,
        p_name : p_name
      };

      console.log(data);
      if(company_type !=''){
        //判断必填项数据
        if(company_type == '企业客户'){
          if(legal_person!='' && consignee!='' && receive_phone!='' && introduce!='' && charter!='' && now_principal_id!='' && receive_address!=''){

            return this.dealElement(data);
          }else{
            this.$message('必填项不能为空!');
            return false;
          }
        }else{
          if(name!='' && consignee!='' && receive_phone!='' && now_principal_id!='' && receive_address!=''){
            return this.dealElement(data);
          }else{
            this.$message('必填项不能为空!');
            return false;
          }
        }
      }else{
        this.$message('必填项不能为空!');
      }
    },

    //正则表达式处理
    Trim : function(str,is_global){
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g")
        {
          result = result.replace(/\s/g,"");
         }
        return result;
    },

    //点击添加客户按钮
    addNewEnterprise : function(){
      this.EnterpriseStatus = "add_enterprise";
      this.closeDialog();
      var userurl = this.https+'/survey/json/getUserInfo.json';
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      var brand_url = this.https+'/crm/dictionary/getList';
      this.platform(crm_url); //客户合作平台
      this.brand(brand_url);  //合作品牌
      this.clientLabel(crm_url);  //客户标签
      this.clientform(crm_url);  //客户来源
      this.clientType(crm_url);  //客户类型
      this.getUserInfo(userurl); //获取当前登陆用户
      this.dialogCostoms = true;

    },
    
    //客户提交数据
    dialogAdd : function(){
      if(this.client.id == ''){
        this.enterpriseAdd();
      }else{
        this.enterpriseedit();
      }
    },

    //提交客户数据
    enterpriseAdd : function(){
      var url = this.https+'/crm/customer/insertData'; 
      var labelurl = this.https+'/crm/customer/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.clientprimsData.bind(this)(''))
      };
      if(para.dataJson != false){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('创建客户成功');
            //调用列表接口
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
            this.$options.methods.closeDialog.bind(this)();//清空数据
            this.dialogCostoms=false;
          }else{
            this.$message('创建客户失败');
          }
        })
        .catch(function(res) {
          if(res.data.status == "error"){
            this.$message('创建客户失败');
          }
        }) 
      }
    },

    closeDialog : function(){
      this.client.id = '';
      this.client.company_type = '';
      this.client.consignee = '';
      this.client.receive_phone = '';
      this.client.charter = '';
      this.client.p_id = '';
      this.client.name = '';
      this.client.introduce = '';
      this.client.deposit = '';
      this.client.receive_address = '';
      this.client.contacts_name = '';
      this.client.contacts_tel = '';
      this.client.importance = '';
      this.client.last_month_rfm = '';
      this.client.u8_code = '';
      this.client.cooperative_brand = [];
      this.client.cooperation_platform = [];
      this.client.customer_type = '';
      this.client.customer_status = '';
      this.client.customer_level = '';
      this.client.intimacy = '';
      this.client.label = [];
      this.client.customer_source = '';
      this.client.now_principal_id = '';
      this.client.now_principal_name = '';
      this.client.iscooperation = '';
      this.client.address = '';
      this.client.address1 = '';
      this.client.first_cooperation_date = '';
      this.client.first_contact_sales = '';
      this.client.erosion_index = '';
      this.client.erosion_cause = '';
      this.client.legal_person = '';
      this.client.registered_capital = '';
      this.client.annual_sales_volume = '';
      this.client.team_size = '';
      this.client.province = '';
      this.client.city = '';
      this.client.district = ''; 
    },

    //删除客户数据
    deleteEnterprise:function(id){
      this.$confirm('此操作将删除此客户,请查看该客户是否有联系人、品牌合作机会、店铺,有则不会删除，否则删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = this.https+'/crm/customer/delData';
        var labelurl = this.https+'/crm/customer/getList';
        this.$http.post(url,{"id":id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('删除数据成功');
            $('.detail-bg').hide();
            $('.detail').hide();
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
          }else{
            var message = "该客户下还有";
            if(res.data.message.dpCount>0){
              message += " 店铺"; 
            }
            if(res.data.message.lxrCount>0){
              message += " 联系人"; 
            }
            if(res.data.message.ppjhCount>0){
              message += " 品牌合作机会"; 
            }
            message+="等信息，无法删除";
            this.$message(message);
          }
        
        }).catch(function(res) {
            console.log(res)
        }) 
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      }); 
    },

    //修改客户数据
    editEnterprise : function(id){
      this.EnterpriseStatus = "edit_enterprise";
      this.dialogCostoms=true;
      this.client.id = id;
      this.client.name = this.clientShow.name?this.clientShow.name:'';
      this.client.introduce = this.clientShow.introduce?this.clientShow.introduce:'';
      this.client.charter =  this.clientShow.charter?this.clientShow.charter:'';
      this.client.deposit = this.clientShow.deposit?this.clientShow.deposit:'';
      this.client.contacts_name = this.clientShow.contacts_name?this.clientShow.contacts_name:'';
      this.client.contacts_tel = this.clientShow.contacts_tel?this.clientShow.contacts_tel.replace(/\+86-/, ""):'';
      this.client.importance = this.clientShow.importance?this.clientShow.importance:'';
      this.client.last_month_rfm = this.clientShow.last_month_rfm?this.clientShow.last_month_rfm:'';
      this.client.u8_code = this.clientShow.u8_code?this.clientShow.u8_code:'';
      this.client.customer_type = this.clientShow.customer_type?this.clientShow.customer_type:'';
      this.client.customer_status = this.clientShow.customer_status?this.clientShow.customer_status:'';
      this.client.customer_level = this.clientShow.customer_level?this.clientShow.customer_level:'';
      this.client.intimacy = this.clientShow.intimacy?this.clientShow.intimacy:'';
      this.client.customer_source = this.clientShow.customer_source?this.clientShow.customer_source:'';
      this.client.now_principal_id = this.clientShow.now_principal_id?this.clientShow.now_principal_id:'';
      this.client.now_principal_name = this.clientShow.now_principal_name?this.clientShow.now_principal_name:'';
      this.client.iscooperation = this.clientShow.iscooperation?this.clientShow.iscooperation:'';
      this.client.province = this.clientShow.province;
      this.client.city = this.clientShow.city;
      this.client.district = this.clientShow.district;
      this.client.address = this.clientShow.address?this.clientShow.address:'';
      this.client.first_cooperation_date = this.clientShow.first_cooperation_date?moment(this.clientShow.first_cooperation_date.time).format("YYYY-MM-DD"):'';
      this.client.first_contact_sales = this.clientShow.first_contact_sales?this.clientShow.first_contact_sales:'';
      this.client.erosion_index = this.clientShow.erosion_index?this.clientShow.erosion_index:'';
      this.client.erosion_cause = this.clientShow.erosion_cause?this.clientShow.erosion_cause:'';
      this.client.legal_person = this.clientShow.legal_person?this.clientShow.legal_person:'';
      this.client.registered_capital = this.clientShow.registered_capital?this.clientShow.registered_capital:'';
      this.client.annual_sales_volume = this.clientShow.annual_sales_volume?this.clientShow.annual_sales_volume:'';
      this.client.team_size = this.clientShow.team_size?this.clientShow.team_size:'';
      this.client.label = this.clientShow.label?this.clientShow.label.split(','):[];
      this.client.cooperative_brand = this.clientShow.cooperative_brand?this.clientShow.cooperative_brand.split(','):[]; //品牌
      this.client.cooperation_platform = this.clientShow.cooperation_platform?this.clientShow.cooperation_platform.split(','):[]; //店铺
      this.client.receive_address = this.clientShow.receive_address?this.clientShow.receive_address:'';
      this.client.company_type = this.clientShow.company_type?this.clientShow.company_type:'';
      this.client.p_id = this.clientShow.p_id?this.clientShow.p_id:'';
      this.client.receive_phone =this.clientShow.receive_phone?this.clientShow.receive_phone.replace(/\+86-/, ""):'';
      this.client.consignee = this.clientShow.consignee?this.clientShow.consignee:'';
    },

    //修改数据提交
    enterpriseedit : function(){
      var id = this.clientShow.id;
      var url = this.https+'/crm/customer/updateData'; 
      var labelurl = this.https+'/crm/customer/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.clientprimsData.bind(this)())
      };
      
      //判断false
      if(para.dataJson != false){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
          //调用列表接口
            this.$message('修改客户成功');
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
            this.dialogCostoms=false;
            var urlenterprise = this.https+'/crm/customer/getDataById';
            this.$options.methods.enterprisebackData.bind(this)(urlenterprise,id);
            this.$options.methods.closeDialog.bind(this)();//清空数据
          }else{
            this.$message('修改客户失败');
          }  
        })
        .catch(function(res) {
          this.$message('创建客户失败');
        });
      }
    },

    //选项卡展示
    handleClick(tab, event) {
      var id = this.clientShow.id;
      console.log(tab.name);
      //请求数据信息，更具tab的信息
      if(tab.name == 'first'){
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,id);
        //跟进机会
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,id);
      }else if(tab.name == 'second'){
        var customer = this.https+'/crm/contacts/getList';
        this.$options.methods.suetomergetData.bind(this)(customer,id);
      }else if(tab.name == 'third'){
        var shop = this.https+'/crm/shop/getList';
        this.$options.methods.shopgetData.bind(this)(shop,id);
      }else if(tab.name == 'four'){
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,id);
        var customer = this.https+'/crm/contacts/getList';
        this.$options.methods.suetomergetData.bind(this)(customer,id);
      }else if(tab.name == 'five'){
        var stockurl = this.https+'/crm/customer/stockDetail';
        this.stoclgetData(stockurl,id);
      }
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

    //请求店铺人数据
    shopgetData:function(url,id){
      var data = {
        "a.customer_id" : "='"+id+"'"
      }
      var para = {
        pageSize: -1,
        paramsJson : JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.shopdata = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //请求合作品牌数据
    brandgetData:function(url,id){
      var data = {
        "a.customer_id" : "='"+id+"'"
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

    //整合提交跟进记录信息
    followPrimse(){
      var customer_id = this.clientShow.id?this.clientShow.id:'', //客户id
          contacts_id = this.records.contacts_id?this.records.contacts_id:'', //联系人id
          follow_up_way = this.records.follow_up_way?this.records.follow_up_way:'', //跟进方式
          follow_up_plan = this.records.follow_up_plan?this.records.follow_up_plan:'', //跟进计划品牌机会ID
          follow_up_on_date = this.records.follow_up_on_date?this.records.follow_up_on_date:'', //跟进时间
          leader_instructions = this.records.leader_instructions?this.records.leader_instructions:'',  //领导批示
          customer_name = this.clientShow.name?this.clientShow.name:'';
          remark = this.records.remark?this.records.remark:'',  //跟进备注
          contacts_name = ''; //联系人名称

      //判断联系人名称
      if(contacts_id){
        for(var i=0; i<this.customer.length;i++){
          if(contacts_id == this.customer[i].id){
            contacts_name = this.customer[i].name;
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
            this.$options.methods.followgetData.bind(this)(labelurl,this.clientShow.id);  //方法相互调用
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

    //评论数据数据整合
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
          if(res.data.status == "success"){
            this.$message('添加评论成功');
            this.$options.methods.closecomment.bind(this)();
            //调用列表接口
            var url = this.https+'/crm/comment/getList';
            this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
          }else{
            this.$message('添加评论失败');
          }
        })
        .catch(function(res) {
          this.$message('添加评论失败');
        });
      }
    },

    //展示评论信息
    showToggle:function(index,id){
      $('.followData').eq(index).find('.followInfo').toggle();
      var url = this.https+'/crm/comment/getList';
      this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
    },

    //职务级别
    dutylevel(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_duty'
      }}).then((res) => {  //.then() 返回成功的数据
        this.duty = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //已进的群
    groupIn(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'crms_group'
      }}).then((res) => {  //.then() 返回成功的数据
        this.group = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    /** 
     * 跟进记录功能整理
     * clear time on 2018/9/28
    */

    //联系人跟进记录
    showTogglecustom:function(index,id){
      $('.followDatacustom').eq(index).find('.followInfocustome').toggle();
      var url = this.https+'/crm/comment/getList';
      this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
    },
    //品牌机会跟进记录
    showTogglebrand:function(index,id){
      $('.followDatabrand').eq(index).find('.followInfobrand').toggle();
      var url = this.https+'/crm/comment/getList';
      this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
    },
    //店铺跟进记录
    showToggleshop:function(index,id){
      $('.followDatashop').eq(index).find('.followInfoshop').toggle();
      var url = this.https+'/crm/comment/getList';
      this.$options.methods.showComment.bind(this)(url,id,'跟进记录');//局部刷新评论信息
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
     * 品牌详情展示数据开始
     * 1、品牌详情回写
     * 2、删除品牌机会功能
     * 3、修改品牌功能
     * 4、添加跟进记录功能
     * 5、展示、隐藏跟进记录评论功能
     * 6、clear time on 2018/9/29
    */

    //添加品牌合作机会
    addbrand : function(id,name){
      this.BrandStatus = "add_brand";
      this.closeChance();
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      var userurl = this.https+'/survey/json/getUserInfo.json';
      this.getUserInfo(userurl); //获取当前登陆用户
      this.visitWay(crm_url); //销售阶段
      this.saleChance(crm_url); //销售机会
      this.dialogChance = true;
      this.brandChance.customer_id = id;
      this.brandChance.customer_name = name;
    },

    //添加品牌机会
    brandPrimsData : function(){
      var id = this.brandChance.id,
          brand_name = this.brandChance.brand_name,
          brand_plan_code = this.brandChance.brand_plan_code,
          customer_id = this.brandChance.customer_id,
          policymaker_id = this.brandChance.policymaker_id,
          principal_id = this.brandChance.principal_id,
          sales_stage = this.brandChance.sales_stage,
          degree_of_importance = this.brandChance.degree_of_importance,
          plan_cooperation_date = this.brandChance.plan_cooperation_date?moment(this.brandChance.plan_cooperation_date).format("YYYY-MM-DD HH:MM:SS"):'',
          last_follow_up_date = this.brandChance.last_follow_up_date?moment(this.brandChance.last_follow_up_date).format("YYYY-MM-DD HH:MM:SS"):'',
          estimated_amount  = this.brandChance.estimated_amount,
          brand_plan_code = '',
          customer_name =  this.brandChance.customer_name,
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

      //获取决策人名称
      for(var i=0;i<this.customer.length;i++){
        if(policymaker_id == this.customer[i].id){
          policymaker = this.customer[i].name;
        }
      }

      var data = {
        id : id,
        brand_name : brand_name,
        brand_plan_code : brand_plan_code,
        customer_id : customer_id,
        policymaker_id : policymaker_id,
        principal_id : principal_id,
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

    //判断新增、修改品牌机会
    addChance : function(){
      if(this.brandChance.id == ''){
        this.addNewChance();
      }else{
        this.updatebrand();
      }
    },

    //提交品牌机会数据
    addNewChance : function(){
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
            this.dialogChance = false;
            //调用列表接口
            this.$options.methods.closeChance.bind(this)();//清空数据
          }else{
            this.$message('创建品牌合作机会失败');
          }
        })
        .catch(function(res) {
          this.$message('创建品牌合作机会失败');
        }) 
      }
    },

    //清除品牌机会数据
    closeChance : function(){
      this.brandChance.id = '';
      this.brandChance.brand_name = '';
      this.brandChance.brand_plan_code = '';
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
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.saleChance(crm_url); //销售机会
    },

    //请求品牌合作机会回写
    brandbackData : function(url,id){
      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.brandShow = res.data.data;
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,this.brandShow.customer_id);
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
        for(var i=0; i<this.tableData.length;i++){
          if(customer_id == this.tableData[i].id){
              customer_name = this.tableData[i].name;
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
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.saleChance(crm_url); //销售机会
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
    updatebrand : function(){
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
            this.$options.methods.closeDialog.bind(this)();//清空数据
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

    /**
     * 店铺详情展示数据开始
     * 1、店铺详情回写
     * 2、删除店铺会功能
     * 3、修改店铺功能
     * 4、添加跟进记录功能
     * 5、展示、隐藏跟进记录评论功能
     * 6、clear time on 2018/9/29
    */

    //展示店铺
    addshop : function(id,name){
      this.ShopStatus = "add_shop";
      this.closeShop();
      var brand_url = this.https+'/crm/dictionary/getList';
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.brand(brand_url);
      this.shopType(crm_url);//店铺类型
      this.shopGrade(crm_url);  //店铺等级
      this.shopLabel(crm_url); //店铺标签
      this.dialogShop = true;
      this.shop.customer_id = id;
      this.shop.customer_name = name;
    },

    //添加店铺数据信息
    shopPrimsData : function(){
      var id = this.shop.id?this.shop.id:'',
      name = this.shop.name?this.shop.name:'',
      customer_id = this.shop.customer_id?this.shop.customer_id:'',
      store_customer_type  = this.shop.store_customer_type?this.shop.store_customer_type:'',
      shop_type = this.shop.shop_type?this.shop.shop_type:'',
      shop_level = this.shop.shop_level?this.shop.shop_level:'',
      main_brand = this.shop.main_brand?this.shop.main_brand.join(','):'',
      taobaocode  = this.shop.taobaocode?this.shop.taobaocode:'',
      link = this.shop.taobaocode?'https://shopsearch.taobao.com/search?app=shopsearch&q='+this.shop.taobaocode:'',
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
      open_shop_date =this.shop.open_shop_date?moment(this.shop.open_shop_date.time).format("YYYY-MM-DD  HH:mm:ss"):'',
      shop_tag = this.shop.shop_tag?this.shop.shop_tag.join(','):'',
      isclose_shop = this.shop.isclose_shop?this.shop.isclose_shop:'',
      customer_name = this.shop.customer_name?this.shop.customer_name:'',
      principal_orgcode = this.clientShow.principal_orgcode?this.clientShow.principal_orgcode:'', //组织机构编码
      remark = this.shop.remark? this.shop.remark:'';
      
      var data = {
        id : id,
        name : name,
        customer_id : customer_id,
        store_customer_type : store_customer_type,
        shop_type : shop_type,
        shop_level : shop_level,
        main_brand : main_brand,
        link : link,
        taobaocode : taobaocode,
        category_rank : category_rank,
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
        principal_orgcode : principal_orgcode,
        remark : remark
      };

      if(name != "" && taobaocode != "" && shop_type !=""){

        return this.dealElement(data);
      }else{
        //旺旺号
        if(taobaocode == ""){
          this.$message('旺旺号不能为空');
        }
        //判断标签
        if(shop_type==""){
          this.$message('店铺类型不能为空');
        }
          //判断店铺名称
          if(name == ""){
          this.$message('店铺名称不能为空');
        }
      } 
    },

    //判断新增还是修改
    addShop : function(){
      if(this.shop.id == ''){
        this.addNewShop();
      }else{
        this.shopEdit();
      }
    },

    //提交数据信息
    addNewShop : function(){
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
            this.$options.methods.closeShop.bind(this)();//清空数据
            this.dialogShop=false;
          }else{
            this.$message('创建店铺失败');
          }
          
        })
        .catch(function(res) {
          this.$message('创建店铺失败');
        }) 
      }
    },

    //店铺数据清除
    closeShop : function(){
      this.shop.name = '';
      this.shop.customer_id= '';
      this.shop.store_customer_type= '';
      this.shop.shop_type= '';
      this.taobaocode = '';
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
      this.shop.shop_tag= [];
      this.shop.isclose_shop= '';
      this.shop.remark;
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
            this.$options.methods.closeDialog.bind(this)();//清空数据
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

    //修改店铺负责人信息
    updateshopres : function(id){
      this.shoprespible = true;
      this.shopresdata.id = id;
    },

    //提交店铺负责人信息
    shoprespiblebtn : function(){
      var id = this.shopShow.id;
      var url = this.https+'/crm/shop/updateData'; 
      for(var i=0;i<this.customer.length;i++){
        if(this.shopresdata.principal_id == this.customer[i].id){
          this.shopresdata.principal_name =this.customer[i].name;
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

    //修改店铺负责人信息
    updateshopaid : function(id){
      this.shopaid = true;
      this.shopaiddata.id = id;
    },

    //提交店铺助理信息
    shopaidbtn : function(){
      var id = this.shopShow.id;
      var url = this.https+'/crm/shop/updateData'; 
      for(var i=0;i<this.customer.length;i++){
        if(this.shopaiddata.assistant_id == this.customer[i].id){
          this.shopaiddata.assistant_name =this.customer[i].name;
        }
      }

      //数据整合
      var data = {
        id : this.shopaiddata.id,
        assistant_id : this.shopaiddata.assistant_id,
        assistant_name : this.shopaiddata.assistant_name
      };

      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(data)
      };

      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "success"){
          this.$message('修改店铺助理成功');
          //调用列表接口
          this.shopaid = false;
          var urlenterprise = this.https+'/crm/shop/getDataById';
          this.$options.methods.shopbackData.bind(this)(urlenterprise,id);
        }else{
          this.$message('修改店铺助理失败');
        }
      })
      .catch(function(res) {
        this.$message('修改店负助理失败');
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
    
    //店铺详情展示
    shophtml : function(id){
      this.shopdetails = true;
      var $this = $('.shophtml').find(".el-dialog");
      $this.css({"margin-top":"0vh","width":this.width.width,"height":this.height.heightbrand,"float":"right"});
      $this.find(".el-dialog__header").hide();
      var url = this.https+'/crm/shop/getDataById';
      this.$options.methods.shopbackData.bind(this)(url,id);
      this.showcollaborShop(id);
    },

    //店铺信息回写
    shopbackData:function(url,id){
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);  //客户信息
      var brand_url = this.https+'/crm/dictionary/getList';
      this.brand(brand_url);  //品牌机会数据
      crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.shopLabel(crm_url);  //标签信息

      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.shopShow = res.data.data;
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,this.shopShow.customer_id);
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,this.shopShow.customer_id);
      })
      .catch(function(res) {
          console.log(res)
      })
    },

    //店铺信息回写
    editShop:function(id){
      this.ShopStatus = "edit_shop";
      var crm_url = '/tstypegroup/getTypegroupNoSession';
      this.shopType(this.https+crm_url);//店铺类型
      this.shopGrade(this.https+crm_url);  //店铺等级
      this.shopLabel(this.https+crm_url);  //标签信息
      var brand_url = this.https+'/crm/dictionary/getList';
      this.brand(brand_url);  //主营品牌
      this.dialogShop = true;
      this.shop.id = id;
      this.shop.name =this.shopShow.name;
      this.shop.customer_id = this.shopShow.customer_id;
      this.shop.store_customer_type = this.shopShow.store_customer_type;
      this.shop.shop_type = this.shopShow.shop_type;
      this.shop.shop_level =  this.shopShow.shop_level?this.shopShow.shop_level.toString():'';
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
      this.shop.open_shop_date = this.shopShow.open_shop_date?moment(this.shopShow.open_shop_date.time).format("YYYY-MM-DD"):'';
      this.shop.isclose_shop = this.shopShow.isclose_shop?this.shopShow.isclose_shop.toString():'';
      customer_name = this.shopShow.customer_name;
      this.shop.remark = this.shopShow.remark;
      if(this.shopShow.shop_tag!=null){
        this.shop.shop_tag = this.shopShow.shop_tag?this.shopShow.shop_tag.split(','):[];//?this.shop.label.join(','):'',
      }
    },

    //店铺信息回写
    shopbackData:function(url,id){
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);  //客户信息
      var brand_url = this.https+'/crm/dictionary/getList';
      this.brand(brand_url);  //品牌机会数据
      crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.shopLabel(crm_url);  //标签信息
      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.shopShow = res.data.data;
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,this.shopShow.customer_id);
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,this.shopShow.customer_id);
      })
      .catch(function(res) {
          console.log(res)
      })
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
          this.shopdetails = false;
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
            this.dialogShop=false;
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
      this.$options.methods.closeDialog.bind(this)();//清空数据
    },
    
    /**
     * 联系人详情展示数据开始
     * 1、联系人详情回写
     * 2、删除联系人功能
     * 3、修改联系人功能
     * 4、添加跟进记录功能
     * 5、展示、隐藏跟进记录评论功能
     * 6、clear time on 2018/9/29
    */

    //请求联系人数据
    suetomergetData:function(url,id){
      var data = {
        "a.customer_id" : "='"+id+"'"
      }
      var para = {
        pageSize: -1,
        paramsJson : JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.customer = res.data.data.result;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //点击展示联系人添加弹出框
    addcustomer : function(id,name){
      this.CustomerStatus = "add_customer";
      this.closecustomer();
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.policymaker(crm_url);   //决策人
      this.clientLabel(crm_url); //标签
      this.dutylevel(crm_url);  //职务级别
      this.groupIn(crm_url);
      this.customerdata.customer_id = id;
      this.customerdata.customer_name = name;
      this.dialogCustomer =true;
    },

    //添加联系人数据
    customAddData : function(){
      var id =  this.customerdata.id;
        name = this.customerdata.name,
        position_level = this.customerdata.position_level,
        customer_id =this.customerdata.customer_id,
        customer_name =this.customerdata.customer_name,
        contact_way = this.contact.contact_way?this.contact.contact_way:'-',
        contactinfo = this.contact.contactinfo?this.contact.contactinfo:'-',
        duty = this.customerdata.duty,
        flock = this.customerdata.flock?this.customerdata.flock.join(','):'-',
        sex = this.customerdata.sex,
        birthday = this.customerdata.birthday?moment(this.customerdata.birthday).format("YYYY-MM-DD HH:MM:SS"):'',
        hobby = this.customerdata.hobby,
        significance = this.customerdata.significance,
        intimacy = this.customerdata.intimacy,
        decision_relation = this.customerdata.decision_relation,
        isdimission = this.customerdata.isdimission,
        ding_num = this.customerdata.ding_num,
        wx_num = this.customerdata.wx_num,
        wx_name = this.customerdata.wx_name,
        qq = this.customerdata.qq,
        email = this.customerdata.email,
        remark = this.customerdata.remark,
        boss_remark =this.customerdata.boss_remark;
      var client_tag = '';

      if(this.customerdata.client_tag != ''){
        client_tag = this.customerdata.client_tag.join(',');
      }

      var contactdata = {
        type : contact_way,
        val : contactinfo
      };

      var data = {
          id : id,
          name : name,
          position_level : position_level,
          customer_id : customer_id,
          contact_way : JSON.stringify(contactdata),
          duty : duty,
          flock : flock,
          sex : sex,
          birthday : birthday,
          hobby : hobby,
          significance : significance,
          intimacy : intimacy,
          decision_relation : decision_relation,
          client_tag : client_tag,
          isdimission : isdimission,
          ding_num : ding_num,
          wx_num : wx_num,
          wx_name : wx_name,
          qq : qq,
          email : email,
          remark : remark,
          boss_remark : boss_remark,
          customer_name : customer_name
      };

      if(name!='' && customer_id!='' && sex!='' && significance!=''){
        return this.dealElement(data);
      }else{
        //判断性别不能为空
        if(significance==''){
          this.$message('重要程度不能为空不能为空');
        }
        //判断性别不能为空
        if(sex==''){
          this.$message('性别不能为空');
        }
        //判断标签不能为空
        if(customer_id==''){
          this.$message('客户不能为空');
        }
        //判断联系人名称不能为空
        if(name ==''){
          this.$message('名称不能为空');
        }
      }
     
    },

    //添加联系人
    addCustomer : function(){
      if(this.customerdata.id == ''){
        this.addNewCustomer();
      }else{
        this.CustomerEdit();
      }
    },

    //添加联系人
    addNewCustomer : function(){
      var url =this.https+'/crm/contacts/insertData'; 
      var labelurl = this.https+'/crm/contacts/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.customAddData.bind(this)())
      };
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('创建联系人成功');
            this.$options.methods.closecustomer.bind(this)();//清空数据
            this.dialogCustomer=false;
          }else{
            this.$message('创建联系人失败');
          }
        })
        .catch(function(res) {
          this.$message('创建联系人失败');
        }) 
      }  
    },

    //清除联系人数据
    closecustomer : function(){
      this.customerdata.id = '';
      this.customerdata.name = '';
      this.customerdata.position_level = '';
      this.customerdata.customer_id = '';
      this.customerdata.duty = '';
      this.customerdata.flock = [];
      this.customerdata.sex = '';
      this.customerdata.birthday = '';
      this.customerdata.hobby = '';
      this.customerdata.significance = '';
      this.customerdata.intimacy = '';
      this.customerdata.decision_relation = '';
      this.customerdata.client_tag = [];
      this.customerdata.isdimission = '';
      this.customerdata.ding_num = '';
      this.customerdata.wx_num = '';
      this.customerdata.wx_name = '';
      this.customerdata.qq = '';
      this.customerdata.email = '';
      this.customerdata.remark = '';
      this.customerdata.boss_remark = '';
      this.contact.contact_way = '';
      this.contact.contactinfo = '';
    },

    //联系人详情展示
    customhtml : function(id,data3){
      this.customertail = true;
      var $this = $('.customerhtml').find(".el-dialog");
      $this.css({"margin-top":"0vh","width":this.width.width,"height":this.height.heightbrand,"float":"right"});
      $this.find(".el-dialog__header").hide();
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      var lxrurl =  this.https+'/crm/contacts/getList';
      this.clientIntimacy(crm_url);  //客户亲密度
      this.policymaker(crm_url);   //决策人
      this.clientLabel(crm_url);  //标签信息
      this.visitWay(crm_url); //跟进方式
      this.customerData(lxrurl);  //联系人信息
      var url = this.https+'/crm/contacts/getDataById';
      this.$options.methods.customerbackData.bind(this)(url,id);
    },

    //删除客户数据
    deleteCustomer:function(id){
      this.$confirm('此操作将删除此联系人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = this.https+'/crm/contacts/delData';
        var labelurl = this.https+'/crm/contacts/getList';
        this.$http.post(url,{"id":id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('删除数据成功');
            this.customertail = false;
          }
        }).catch(function(res) {
            console.log(res)
        }) 
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      }); 
    },

    //客户信息回写
    customerbackData:function(url,id){
      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.customerShow = res.data.data;
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,this.customerShow.customer_id);
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,this.customerShow.customer_id);
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },
    
    //客户信息回写
    editCustomer:function(id){
      this.CustomerStatus = "edit_customer";
      this.dialogCustomer=true;
      this.customerdata.id = id;
      this.customerdata.name = this.customerShow.name?this.customerShow.name:'';
      this.customerdata.position_level = this.customerShow.position_level?this.customerShow.position_level:'';
      this.customerdata.customer_id = this.customerShow.customer_id?this.customerShow.customer_id:'';
      this.customerdata.duty = this.customerShow.duty?this.customerShow.duty:'';
      this.customerdata.flock = this.customerShow.flock?this.customerShow.flock.split(','):[];
      this.customerdata.sex = this.customerShow.sex?this.customerShow.sex:'';
      this.customerdata.birthday = this.customerShow.birthday?moment(this.customerShow.birthday.time).format("YYYY-MM-DD"):''; 
      this.customerdata.hobby = this.customerShow.hobby?this.customerShow.hobby:'';
      this.customerdata.significance = this.customerShow.significance?this.customerShow.significance:'';
      this.customerdata.intimacy = this.customerShow.intimacy?this.customerShow.intimacy:'';
      this.customerdata.decision_relation = this.customerShow.decision_relation?this.customerShow.decision_relation:'';
      this.customerdata.client_tag = this.customerShow.client_tag?this.customerShow.client_tag.split(','):[];
      this.customerdata.isdimission = this.customerShow.isdimission;
      this.customerdata.ding_num = this.customerShow.ding_num?this.customerShow.ding_num:'';
      this.customerdata.wx_num = this.customerShow.wx_num?this.customerShow.wx_num:'';
      this.customerdata.wx_name = this.customerShow.wx_name?this.customerShow.wx_name:'';
      this.customerdata.qq = this.customerShow.qq?this.customerShow.qq:'';
      this.customerdata.email = this.customerShow.email?this.customerShow.email:'';
      this.customerdata.boss_remark = this.customerShow.boss_remark?this.customerShow.boss_remark:'';

      if(this.customerShow.contact_way!=""){
        try{
          if(JSON.parse(this.customerShow.contact_way).val){
            this.contact.contactinfo =  this.customerShow.contact_way?JSON.parse(this.customerShow.contact_way).val:'';
            this.contact.contact_way =  this.customerShow.contact_way?JSON.parse(this.customerShow.contact_way).type:'';
          }else{
            this.contact.contactinfo = this.customerShow.contact_way;
            this.contact.contact_way =  "手机";
          }
        }catch(error){
          if(this.customerShow.contact_way){
            this.contact.contactinfo = this.customerShow.contact_way;
            this.contact.contact_way =  "手机";
          }else{
            this.contact.contactinfo =  '';
            this.contact.contact_way =  '';
          }
         
        }
      }else{
        this.contact.contactinfo = '';
        this.contact.contact_way = '';
      }
    },

    //修改联系人数据提交
    CustomerEdit : function(){
      var id = this.customerShow.id;
      var url = this.https+'/crm/contacts/updateData'; 
      var labelurl = this.https+'/crm/contacts/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.customAddData.bind(this)())
      };
      
      //判断false
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('修改联系人成功');
            //调用列表接口
            this.dialogCustomer=false;
            var urlenterprise = this.https+'/crm/contacts/getDataById';
            this.$options.methods.customerbackData.bind(this)(urlenterprise,id);
            this.$options.methods.closeDialog.bind(this)();//清空数据
          }else{
            this.$message('修改联系人失败');
          }
        })
        .catch(function(res) {
          this.$message('修改联系人失败');
        });
      }
    },

    /** 
     * 进货情况
    */

    //请求进货情况数据
    stoclgetData : function(url,id){
      this.$http.post(url,{'id':id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        //数据处理
        if(res.data.data.oneYearRfm!=null){
          this.stock(res.data.data);
        }else{
          this.stockDetail.money = 0;
          this.stockDetail.oneYearRfm = {'R':0,'F':0,'M':0};
          this.stockDetail.threeMonthRfm = {'R':0,'F':0, 'M':0};
          this.stockDetail.brandRfm = [
            {brandname : '-',
            oneYearRfm : {'R':0,'F':0,'M':0},
            threeMonthRfm : {'R':0,'F':0,'M':0}}
          ]
        }
        
      })
      .catch(function(res) {
        this.$message('请求失败');
      });
    },

    //数据处理
    stock : function(data){
      // brandRfm : []
      this.stockDetail.brandRfm.length = 0;
      this.stockDetail.money = data.money;
      this.stockDetail.oneYearRfm = {
        'R':data.oneYearRfm.lastStockDate?data.oneYearRfm.lastStockDate:0,
        'F':data.oneYearRfm.count?data.oneYearRfm.count:0,
        'M':data.oneYearRfm.isum?data.oneYearRfm.isum:0
      };
      this.stockDetail.threeMonthRfm = {
        'R':data.threeMonthRfm.lastStockDate?data.threeMonthRfm.lastStockDate:0,
        'F':data.threeMonthRfm.count?data.threeMonthRfm.count:0,
        'M':data.threeMonthRfm.isum?data.threeMonthRfm.isum:0
      };
      for(let i=0;i<data.brandRfm.length;i++){
        this.stockDetail.brandRfm.push({brandname:data.brandRfm[i].brand, oneYearRfm : {
          'R':data.brandRfm[i].oneYearRfm.lastStockDate?data.brandRfm[i].oneYearRfm.lastStockDate:0,
          'F':data.brandRfm[i].oneYearRfm.count?data.brandRfm[i].oneYearRfm.count:0,
          'M':data.brandRfm[i].oneYearRfm.isum?data.brandRfm[i].oneYearRfm.isum:0
        },threeMonthRfm:{
          'R':data.brandRfm[i].threeMonthRfm.lastStockDate?data.brandRfm[i].threeMonthRfm.lastStockDate:0,
          'F':data.brandRfm[i].threeMonthRfm.count?data.brandRfm[i].threeMonthRfm.count:0,
          'M':data.brandRfm[i].threeMonthRfm.isum?data.brandRfm[i].threeMonthRfm.isum:0
        }});
      }
    }
  }
});
