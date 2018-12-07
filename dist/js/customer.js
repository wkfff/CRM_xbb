/** 
 * create author name xiaominzhang
 * create time 2018/8/17
*/
var vue = new Vue({
  el:"#app",
  mounted(){
    var url = this.vueUrl();
    var labelurl = '/crm/contacts/getList';
    this.getData(url+labelurl,this.select,1,10);
    var crm_url = url+'/tstypegroup/getTypegroupNoSession';
    this.dutylevel(crm_url); //职务级别
    this.localdata();//获取浏览器的local storage的保存数据
  },
  data:{
    form:{
        typeId:''
    },
    input: '',
    crmsclientIntimacy : [], //客户亲密度
    crmsclientLabel : [], //联系人标签
    sex : [{name:"男",id:1},{name:"女",id:2},{name:"未知",id:3}], //性别数据
    importance : [{typename:"五星",id:'5'},{typename:"四星",id:'4'},{typename:"三星",id:'3'},{typename:"二星",id:'2'},{typename:"一星",id:'1'}],//重要程度
    contacts : [{name:"手机",id:"手机"},{name:"电话",id:"电话"},{name:"家庭",id:"家庭"},{name:"公司",id:"公司"},{name:"其他",id:"其他"}],//联系方式
    departure :[{name:"在职",id:0},{name:"离职",id:1}],
    policymakers:[],//决策人
    clientDetail : [],//客户信息
    pageSize : '', //分页
    total : '' ,//总数
    pickerOptions2: {shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
    }]},  //日期控件
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
    tableData:[],  //表单数据
    customerShow : [], //联系人详情
    customerDetail : [],//联系人
    options1 : [],//公司员工信息
    followData : [],//跟进数据
    commentInfo : [],//跟进评论
    visit : [], //跟进方式
    brandShow : [],//品牌数据回写
    crmssaleChance : [], //销售阶段
    crmsshoptype : [], //店铺类型
    crmsshopGrade : [],//店铺等级
    crmsbrand : [],//主营品牌
    shopShow : [], //商店信息
    crmsshopLabel : [], //店铺标签
    policymakerName : [], //决策人信息
    dpxtr : [],  //店铺协同人
    collaborusershop : [], //店铺协同人数据展示
    duty : [],//职务级别
    group : [],//已进的群
    branddata : [], //品牌机会数据
    shopdata : [], //店铺数据
    https : '',//页面请求前缀
    isopenshop : [{name:"开店",id:"1"},{name:"关店",id:"0"}],//是否开店
    formLabelWidth: '120px',
    crms_hzpt : '',crms_khlx : '',crms_khzt : '',crms_khjb : '',crms_khqmd : '',crms_khbq : '',crms_khly : '',crms_brand : '',
    crms_frm_start : '',crms_frm_end : '',crms_fzr : '',last_time : '',creat_time : '',first_time : '',currentPage: 1,dialogCostoms: false,
    dialogChance : false,
    dialogShop : false,
    activeName: 'first',
    activebrand : 'first',
    activeshop : 'first',
    branddetail : false,
    shopdetails : false,
    shoprespible : false, //店铺负责人
    shopaid : false, //店铺助理
    shopxtr : false, // 店铺协同人
    smsdialog : false, //批量发送短信
    wechatdialog : false, //批量发送微信

    //设置框展示
    show_wxname:false,show_wxnum:false,show_dingnum:false,show_email:false,show_qq:false,show_duty:false,show_flock:false,show_sex:false, show_hobby:false,show_birthday:false,show_clienttag:false,show_isdimission:false,show_bossremark:false,
    //表单展示隐藏
    wxname:false,wxnum:false,dingnum:false,email:false,showqq:false,showduty:false,flock:false,sex:false,hobby:false,birthday:false,clienttag:false,isdimission:false,bossremark:false,
    
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
      customer_name : '',
      dyty : '',
      sex : '',
      contact_way : '',
      customer_level : '',
      intimacy : '',
      last_month_rfm_start : '',
      last_month_rfm_end : '',
      now_principal_id : '',
      last_follow_up_date : '',
      create_date : ''
    },

    //新增表单提交
    customer : {
      name : '',
      position_level : '',
      contact_way : '',
      contactinfo : '',
      customer_id : '',
      name : '',
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

    rules: {//必填项提示
      name: [{required: true, message: '请输入联系人名称', trigger: 'blur'}],
      customer_id: [{required: true, message: '请输入选择客户', trigger: 'blur'}],
      sex : [{required: true, message: '请选择性别', trigger: 'blur'}],
      significance: [{required: true, message: '请选择重要程度', trigger: 'blur'}]
    },

    //联系方式
    contact : {
      contactinfo : '',
      contact_way : ''
    },
      //更近记录
    records :{
      customer_id : '',
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

    //新增店铺表单提交
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
      link : '',
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

    rules1: {//必填项提示
      name: [{required: true, message: '请输入店铺名称', trigger: 'blur'}],
      taobaocode : [{required: true, message: '请输入旺旺号', trigger: 'blur'}],
      shop_type : [{required: true, message: '请选择店铺类型', trigger: 'blur'}]
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

    dynamicValidateForm: {
      domains: [{
        value: ''
      }],
      email: ''
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
      this.brandheight.height = window.innerHeight-230+'px';
      this.tableHeight = window.innerHeight - 80;
    },
    //获取页面宽度
    ww(){
      if(window.innerWidth<=1000){
        this.heightselect.height = '80px';
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
      if(url == "http://test.runhemei.com/maochao_test"){
        url = "http://test.runhemei.com/maochao"
        this.https = url;
        return url;
      }else{
        this.https = url;
        return url;
      }
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

    //联系人标签
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

    //联系人
    customerData:function(url){
      //请求页面表单数据
      let para = {
        pageSize: 50
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

    //公司成员请求
    request(url){
      this.$http.get(url).then((res) => {  //.then() 返回成功的数据
        this.options1 = res.data.data.result;
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

    //品牌合作机会联系方式
    content_phone(row){
      for(var i=0;i<this.policymakerName.length;i++){
        if(row == this.policymakerName[i].id){
          if(this.policymakerName[i].contact_way !=undefined){
            if(this.policymakerName[i].contact_way){
              return this.$options.methods.customerWay.bind(this)(this.policymakerName[i].contact_way); //品牌机会联系方式
            }else{
              return '-';
            }
          }else{
            return '-';
          }
          
        }
      }
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
          // var message = JSON.parse(data.responseText);
          // if(message.status != "success"){
          //   alert("上传异常");
          // }
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
    
    //点击弹出信息
    handleEdit(data1,data2,data3) {
      $('.detail-bg').show();
      $('.detail').show();
      this.policymake(data3); //联系人列表中获取给客户下的联系人信息数据整理
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
      //获取客户信息
      var clienturl = this.https+'/crm/customer/getList';
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      var lxrurl =  this.https+'/crm/contacts/getList';
      this.clientName(clienturl);  //客户信息
      this.clientIntimacy(crm_url);  //客户亲密度
      this.policymaker(crm_url);   //决策人
      this.clientLabel(crm_url);  //标签信息
      this.visitWay(crm_url); //跟进方式
      this.customerData(lxrurl);  //联系人信息
      var url = this.https+'/crm/contacts/getDataById';
      this.$options.methods.customerbackData.bind(this)(url,data1);
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);  //客户信息
      this.groupIn(crm_url); //已进的群
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

    //动态添加联系方式
    addCustomer : function(){
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      });
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

    //表单联系方式展示
    contact_customer(row, column){
      if(row.contact_way!=""){
        try{
          var contact = JSON.parse(row.contact_way);
          if(typeof(contact) == "object"){
            return (contact.type?contact.type:'')+' '+(contact.val?contact.val:'-');
          }else{
            return row.contact_way;
          }
        }catch(error){
          return row.contact_way;
        }
      }else{
        return '-';
      }
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

    //联系人信息回写
    editCustomer:function(id){
      this.CustomerStatus = "edit_customer";
      this.dialogCostoms=true;
      this.customer.id = id;
      this.customer.name = this.customerShow.name?this.customerShow.name:'';
      this.customer.position_level = this.customerShow.position_level?this.customerShow.position_level:'';
      this.customer.customer_id = this.customerShow.customer_id?this.customerShow.customer_id:'';
      this.customer.duty = this.customerShow.duty?this.customerShow.duty:'';
      this.customer.flock = this.customerShow.flock?this.customerShow.flock.split(','):[];
      this.customer.sex = this.customerShow.sex?this.customerShow.sex:'';
      this.customer.birthday = this.customerShow.birthday?moment(this.customerShow.birthday.time).format("YYYY-MM-DD"):''; 
      this.customer.hobby = this.customerShow.hobby?this.customerShow.hobby:'';
      this.customer.significance = this.customerShow.significance?this.customerShow.significance:'';
      this.customer.intimacy = this.customerShow.intimacy?this.customerShow.intimacy:'';
      this.customer.decision_relation = this.customerShow.decision_relation?this.customerShow.decision_relation:'';
      this.customer.client_tag = this.customerShow.client_tag?this.customerShow.client_tag.split(','):[];
      this.customer.isdimission = this.customerShow.isdimission;
      this.customer.ding_num = this.customerShow.ding_num?this.customerShow.ding_num:'';
      this.customer.wx_num = this.customerShow.wx_num?this.customerShow.wx_num:'';
      this.customer.wx_name = this.customerShow.wx_name?this.customerShow.wx_name:'';
      this.customer.qq = this.customerShow.qq?this.customerShow.qq:'';
      this.customer.email = this.customerShow.email?this.customerShow.email:'';
      this.customer.boss_remark = this.customerShow.boss_remark?this.customerShow.boss_remark:'';

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
    
    //获取信息
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
      localStorage.setItem("wxname",true);localStorage.setItem("show_wxname",true);//微信名称
      localStorage.setItem("wxnum",true);localStorage.setItem("show_wxnum",true);//微信账号
      localStorage.setItem("dingnum",true);localStorage.setItem("show_dingnum",true); //钉钉账号
      localStorage.setItem("email",true);localStorage.setItem("show_email",true);//邮箱
      localStorage.setItem("showqq",true);localStorage.setItem("show_qq",true);  //qq
      localStorage.setItem("showduty",false);localStorage.setItem("show_duty",false); //职务
      localStorage.setItem("flock",true);localStorage.setItem("show_flock",true); //已进入群
      localStorage.setItem("sex",true);localStorage.setItem("show_sex",true); //性别
      localStorage.setItem("hobby",false);localStorage.setItem("show_hobby",false); //爱好
      localStorage.setItem("birthday",false);localStorage.setItem("show_birthday",false); //生日
      localStorage.setItem("clienttag",true);localStorage.setItem("show_clienttag",true); //标签
      localStorage.setItem("isdimission",true);localStorage.setItem("show_isdimission",true); //是否离职
      localStorage.setItem("bossremark",false);localStorage.setItem("show_bossremark",false); //备注
      this.localdata();//加载展示数据
    },

    //表单数据展示与隐藏设置
    showHide : function(show){
      switch(show){
        case 'show_wxname' : if(this.show_wxname == false){localStorage.setItem("wxname",true);localStorage.setItem("show_wxname",true); 
          this.wxname = true;return this.show_wxname = true;}else{localStorage.setItem("wxname",false);localStorage.setItem("show_wxname",false); this.wxname = false;return this.show_wxname = false; }break;
        case 'show_wxnum' :if(this.show_wxnum === false){localStorage.setItem("wxnum","true");localStorage.setItem("show_wxnum","true");
          this.wxnum = true;return this.show_wxnum = true;}else{localStorage.setItem("wxnum","false");localStorage.setItem("show_wxnum","false");this.wxnum = false;return this.show_wxnum = false;}break;
        case 'show_dingnum' : if(this.show_dingnum === false){localStorage.setItem("dingnum","true");localStorage.setItem("show_dingnum","true"); this.dingnum = true;return this.show_dingnum = true;}else{localStorage.setItem("dingnum","false");localStorage.setItem("show_dingnum","false");this.dingnum = false;return this.show_dingnum = false;}break;
        case 'show_email' : if(this.show_email === false){localStorage.setItem("email","true");localStorage.setItem("show_email","true");this.email = true;return this.show_email = true;}else{localStorage.setItem("email","false");localStorage.setItem("show_email","false");this.email = false;return this.show_email = false;}break;
        case 'show_qq' : if(this.show_qq === false){localStorage.setItem("showqq","true");localStorage.setItem("show_qq","true");this.showqq = true; return this.show_qq = true;}else{localStorage.setItem("showqq","false");localStorage.setItem("show_qq","false");this.showqq = false;return this.show_qq = false;}break;
        case 'show_duty' : if(this.show_duty === false){localStorage.setItem("showduty","true"); localStorage.setItem("show_duty","true");this.showduty = true;return this.show_duty = true;}else{localStorage.setItem("showduty","false");localStorage.setItem("show_duty","false"); this.showduty = false;return this.show_duty = false;} break;
        case 'show_flock' : if(this.show_flock === false){localStorage.setItem("flock","true");localStorage.setItem("show_flock","true");this.flock = true;return this.show_flock = true;}else{localStorage.setItem("flock","false");localStorage.setItem("show_flock","false");this.flock = false;return this.show_flock = false;}break;
        case 'show_sex' : if(this.show_sex === false){localStorage.setItem("sex","true");localStorage.setItem("show_sex","true");this.sex = true;return this.show_sex = true;}else{localStorage.setItem("sex","false");localStorage.setItem("show_sex","false");this.sex = false;return this.show_sex = false;}break;
        case 'show_birthday' : if(this.show_birthday === false){localStorage.setItem("birthday","true");localStorage.setItem("show_birthday","true"); this.birthday = true;return this.show_birthday = true;}else{localStorage.setItem("birthday","false");localStorage.setItem("show_birthday","false");this.birthday = false;return this.show_birthday = false;}break;
        case 'show_clienttag' : if(this.show_clienttag === false){localStorage.setItem("clienttag","true");localStorage.setItem("show_clienttag","true");this.clienttag = true;return this.show_clienttag = true;}else{localStorage.setItem("clienttag","false");localStorage.setItem("show_clienttag","false");this.clienttag = false;return this.show_clienttag = false;}break;
        case 'show_isdimission' : if(this.show_isdimission === false){localStorage.setItem("isdimission","true");localStorage.setItem("show_isdimission","true");this.isdimission = true;return this.show_isdimission = true;
        }else{localStorage.setItem("isdimission","false");localStorage.setItem("show_isdimission","false");this.isdimission = false;return this.show_isdimission = false;}break;
        case 'show_hobby' : if(this.show_hobby === false){localStorage.setItem("hobby","true");localStorage.setItem("show_hobby","true");this.hobby = true;return this.show_hobby = true;
        }else{localStorage.setItem("hobby","false");localStorage.setItem("show_hobby","false");this.hobby = false;return this.show_hobby = false;}break;
        case 'show_bossremark' : if(this.show_bossremark === false){localStorage.setItem("bossremark","true");localStorage.setItem("show_bossremark","true");this.bossremark = true;return this.show_bossremark = true;
        }else{localStorage.setItem("bossremark","false");localStorage.setItem("show_bossremark","false");this.bossremark = false;return this.show_bossremark = false;}break;
      }
    },

    //请求刘篮球的localstrong中的数据
    localdata : function(){
      var key = localStorage.getItem("show_wxname");
      if(key != null){
        //判断微信昵称显示或隐藏
        if(localStorage.show_wxname == 'true'){this.show_wxname = true;this.wxname =  true;}else{this.show_wxname = false;this.wxname =  false;}
        //判断微信账号显示或隐藏
        if(localStorage.show_wxnum == 'true'){this.show_wxnum = true;this.wxnum =  true;}else{this.show_wxnum = false;this.wxnum =  false;}
        //判断钉钉账号显示或隐藏
        if(localStorage.show_dingnum == 'true'){this.show_dingnum = true;this.dingnum =  true;}else{this.show_dingnum = false;this.dingnum =  false;}
        //判断邮箱显示或隐藏
        if(localStorage.show_email == 'true'){this.show_email = true;this.email =  true;}else{this.email = false;this.show_email =  false;}
        //判断qq号显示或隐藏
        if(localStorage.show_qq == 'true'){this.show_qq = true;this.showqq =  true;}else{this.showqq = false;this.show_qq =  false;}
        //判断职务显示或隐藏
        if(localStorage.show_duty == 'true'){this.show_duty = true;this.showduty =  true;}else{this.showduty = false;this.show_duty =  false;}
        //判断进入的群别显示或隐藏
        if(localStorage.show_flock == 'true'){this.show_flock = true;this.flock =  true;}else{this.flock = false;this.show_flock =  false;}
        //判断性别显示或隐藏
        if(localStorage.show_sex == 'true'){this.show_sex = true;this.sex =  true;}else{this.sex = false;this.show_sex =  false;}
        //判断爱好显示或隐藏
        if(localStorage.show_hobby == 'true'){this.show_hobby = true;this.hobby =  true;}else{this.hobby = false;this.show_hobby =  false;}
        //判断生日显示或隐藏
        if(localStorage.show_birthday == 'true'){this.show_birthday = true;this.birthday =  true;}else{this.birthday = false;this.show_birthday =  false;}
        //判断标签显示或隐藏
        if(localStorage.show_clienttag == 'true'){this.show_clienttag = true;this.clienttag =  true;}else{this.clienttag = false;this.show_clienttag =  false;}
        //判断是否离职显示或隐藏
        if(localStorage.show_isdimission == 'true'){this.show_isdimission = true;this.isdimission =  true;}else{this.isdimission = false;this.show_isdimission =  false;}
        //判断备注显示或隐藏
        if(localStorage.show_bossremark == 'true'){this.show_bossremark = true;this.bossremark =  true;}else{this.bossremark = false;this.show_bossremark =  false;}
      }else{
        this.firstlocaldata();
      }
    },

    //客户信息回写
    customerbackData:function(url,id){
      this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
        this.customerShow = res.data.data;
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,this.customerShow.customer_id);
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,this.customerShow.customer_id,this.customerShow.id);
        var shop = this.https+'/crm/shop/getList';
        this.$options.methods.shopgetData.bind(this)(shop,this.customerShow.customer_id);
      })
      .catch(function(res) {
          console.log(res)
      }) 
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

    //请求数据的prims数据
    primsData : function(){
      var  name = this.select.name?" LIKE "+"'%"+this.select.name+"%'":'',
          customer_name = this.select.customer_name?" LIKE "+"'%"+this.select.customer_name+"%'":'',
          duty = this.select.duty?"='"+this.select.duty+"'":'',
          sex = this.select.sex?"='"+this.select.sex+"'":'',
          contact_way = this.select.contact_way?" LIKE "+"'%"+this.select.contact_way+"%'":'';
      return paramsJson ={
        "a.name" : name,
        "a.customer_name" : customer_name,
        "a.duty" : duty,
        "a.sex" : sex,
        "a.contact_way" : contact_way
      };
    },

    //添加联系人数据
    customAddData : function(){
      var id =  this.customer.id;
        name = this.customer.name,
        contact_way = this.contact.contact_way?this.contact.contact_way:'',
        contactinfo = this.contact.contactinfo?this.contact.contactinfo:'',
        position_level = this.customer.position_level,
        customer_id =this.customer.customer_id,
        duty = this.customer.duty,
        flock = this.customer.flock?this.customer.flock.join(','):'',
        sex = this.customer.sex,
        birthday = this.customer.birthday?moment(this.customer.birthday).format("YYYY-MM-DD HH:MM:SS"):'',
        hobby = this.customer.hobby,
        significance = this.customer.significance,
        intimacy = this.customer.intimacy,
        decision_relation = this.customer.decision_relation,
        client_tag = this.customer.client_tag?this.customer.client_tag.join(','):'',
        isdimission = this.customer.isdimission,
        ding_num = this.customer.ding_num,
        wx_num = this.customer.wx_num,
        wx_name = this.customer.wx_name,
        qq = this.customer.qq,
        email = this.customer.email,
        boss_remark =this.customer.boss_remark;
      var  customer_name = '';

      //获取客户名称
      for(var i=0;i<this.clientDetail.length;i++){
        if(this.clientDetail[i].id == customer_id){
          customer_name = this.clientDetail[i].name;
        }
      }
      var contactdata = {
        type : contact_way,
        val : contactinfo
      };
      var data = {
          id : id,
          name : name,
          contact_way : JSON.stringify(contactdata),
          position_level : position_level,
          customer_id : customer_id,
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
          boss_remark : boss_remark,
         customer_name : customer_name
      };

      //判断联系人名称不能为空
      if(name !='' && sex !='' && customer_id !='' && significance != ''){
        return this.dealElement(data); 
      }else{
        //联系人不能为空
        if(significance == ''){
          this.$message('重要程度不能为空');
        }

        //性别不能为空
        if(sex == ''){
          this.$message('性别不能为空');
        }

        //性别不能为空
        if(customer_id == ''){
          this.$message('客户不能为空');
        }

        //判断联系人名称不能为空
        if(name ==''){
          this.$message('名称不能为空');
        }
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
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
            this.dialogCostoms=false;
            var urlenterprise = this.https+'/crm/contacts/getDataById';
            this.$options.methods.customerbackData.bind(this)(urlenterprise,id);
            this.$options.methods.closeDialog.bind(this)();//清空数据
          }else{
            this.$message('创建客户失败');
          }
        })
        .catch(function(res) {
          this.$message('创建客户失败');
        });
      }
    },
    
    //监听搜索条件的变化
    change:function() {
      var labelurl = this.https+'/crm/contacts/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),this.currentPage,this.pageSize);  //方法相互调用
    },

    //每页显示数据量变更
    handleSizeChange: function(val) {
      var labelurl = this.https+'/crm/contacts/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),this.currentPage, val);
    },

    //页码变更
    handleCurrentChange: function(val) {
      var pageNo = this.currentPage;
      var pageSize = this.pageSize;
      var labelurl = this.https+'/crm/contacts/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),val,this.pageSize);
    },  
    
    //点击添加联系人按钮，请求对应的数据信息
    newcustomer : function(){
      this.CustomerStatus = "add_customer";
      this.closeDialog();
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);  //客户信息
      var crm_url = '/tstypegroup/getTypegroupNoSession';

      this.clientIntimacy(this.https+crm_url);  //客户亲密度
      this.policymaker(this.https+crm_url);   //决g关系
      this.clientLabel(this.https+crm_url);  //标签信息
      this.groupIn(this.https+crm_url); //已进的群
      this.dialogCostoms = true;
    },

    //添加联系人、修改联系人
    dialogAdd : function(){
      if(this.customer.id == ''){
        this.customerAdd();
      }else{
        this.CustomerEdit();
      }
    },

    //添加联系人表单信息
    customerAdd : function(){
      var url = this.https+'/crm/contacts/insertData'; 
      var labelurl = this.https+'/crm/contacts/getList';
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.customAddData.bind(this)())
      };
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('创建联系人成功');
          //调用列表接口
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
            this.$options.methods.closeDialog.bind(this)();//清空数据
            this.dialogCostoms=false;
          }else{
            this.$message('创建联系人失败');
          }
        })
        .catch(function(res) {
          
        }) 
      } 
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
          this.$message('删除数据成功');
          $('.detail-bg').hide();
          $('.detail').hide();
          this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(),1, 10);
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

    //清除联系人数据
    closeDialog : function(){
      this.customer.id = '';
      this.contact.contactinfo = '';
      this.contact.contact_way = '';
      this.customer.name = '';
      this.customer.position_level = '';
      this.customer.customer_id = '';
      this.customer.duty = '';
      this.customer.flock = [];
      this.customer.sex = '';
      this.customer.birthday = '';
      this.customer.hobby = '';
      this.customer.significance = '';
      this.customer.intimacy = '';
      this.customer.decision_relation = '';
      this.customer.client_tag = [];
      this.customer.isdimission = '';
      this.customer.ding_num = '';
      this.customer.wx_num = '';
      this.customer.wx_name = '';
      this.customer.qq = '';
      this.customer.email = '';
      this.customer.boss_remark = '';
      dialogCostoms : false;
    },

    //选项卡展示
    handleClick(tab, event) {
      var id = this.customerShow.customer_id;
      var id2 = this.customerShow.id;
      //请求数据信息，更具tab的信息
      if(tab.name == 'first'){
        var followurl = this.https+'/crm/followRecords/getList';
        this.$options.methods.followgetData.bind(this)(followurl,id);
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,id,id2);
      }else if(tab.name == 'second'){
        var customer = this.https+'/crm/contacts/getList';
        this.$options.methods.suetomergetData.bind(this)(customer,id);
      }else if(tab.name == 'third'){
        var shop = this.https+'/crm/shop/getList';
        this.$options.methods.shopgetData.bind(this)(shop,id);
        var urlus = this.https+'/tsuser/getTSUsers?pageSize=-1';
        this.request(urlus); //请求用户信息
      }else{
        var brand = this.https+'/crm/cbCooperation/getList';
        this.$options.methods.brandgetData.bind(this)(brand,id,id2);
      }
    },

    /**
     * 联系人模块中跟进记录处理 
     * 联系人模块中跟进记录评论处理
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

    //整合提交跟进记录信息
    followPrimse(){
      var customer_id = this.customerShow.customer_id?this.customerShow.customer_id:'', //客户id
          contacts_id = this.customerShow.id?this.customerShow.id:'', //联系人id
          follow_up_way = this.records.follow_up_way?this.records.follow_up_way:'', //跟进方式
          follow_up_plan = this.records.follow_up_plan?this.records.follow_up_plan:'', //跟进计划品牌机会ID
          follow_up_on_date = this.records.follow_up_on_date?this.records.follow_up_on_date:'', //跟进时间
          leader_instructions = this.records.leader_instructions?this.records.leader_instructions:'',  //领导批示
          remark = this.records.remark?this.records.remark:'',  //跟进备注
          customer_name = '', //客户名称
          contacts_name =  this.customerShow.name?this.customerShow.name:''; //联系人名称
      
      //判断客户名称
      if(customer_id){
        for(var i=0; i<this.clientDetail.length;i++){
          if(customer_id == this.clientDetail[i].id){
              customer_name = this.clientDetail[i].name;
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
        return this.dealElement(data);
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
            this.$options.methods.followgetData.bind(this)(labelurl,this.customerShow.customer_id);  //方法相互调用
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
      this.records.customer_id = ''; //客户id
      this.records.follow_up_way = ''; //跟进方式
      this.records.follow_up_play = ''; //跟进计划品牌机会ID
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
     * 品牌合作机会功能模块的处理整理
     * clear time on 2018/9/29
    */

    //请求合作品牌数据
    brandgetData:function(url,id){
      this.branddata.length = 0;
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
          console.log(res);
      }) 


    },

    //添加品牌合作机会
    addbrand : function(id){
      this.BrandStatus = "add_brand";
      this.closeChance();
      var urlus = this.https+'/tsuser/getTSUsers?pageSize=-1';
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      var userurl = this.https+'/survey/json/getUserInfo.json';
      this.getUserInfo(userurl); //获取当前登陆用户
      this.request(urlus); //请求用户信息
      this.saleChance(crm_url); //销售机会
      this.dialogChance = true;
      this.brandChance.customer_id = id;
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

    //添加品牌计划
    brandPrimsData : function(){
      var id = this.brandChance.id,
          brand_name = this.brandChance.brand_name,
          brand_plan_code = this.brandChance.brand_plan_code,
          customer_id = this.brandChance.customer_id,
          principal_id = this.brandChance.principal_id,
          policymaker_id = this.brandChance.policymaker_id,
          sales_stage = this.brandChance.sales_stage,
          degree_of_importance = this.brandChance.degree_of_importance,
          plan_cooperation_date = this.brandChance.plan_cooperation_date?moment(this.brandChance.plan_cooperation_date).format("YYYY-MM-DD HH:MM:SS"):'',
          last_follow_up_date = this.brandChance.last_follow_up_date?moment(this.brandChance.last_follow_up_date).format("YYYY-MM-DD HH:MM:SS"):'',
          estimated_amount  = this.brandChance.estimated_amount?this.brandChance.estimated_amount:'',
          brand_plan_code = '',
          customer_name = '',
          principal_name = '',
          policymaker = this.policymakerName[0].name;

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

    //提交品牌机会数据
    addChance : function(){
      if(this.brandChance.id == ''){
        this.addNewBrand();
      }else{
        this.updatebrand();
      }
    },

    //提交品牌机会数据
    addNewBrand : function(){
      var url = this.https+'/crm/cbCooperation/insertData'; 
      //新增页面表单数据提交
      let para = {
        dataJson : JSON.stringify(this.$options.methods.brandPrimsData.bind(this)())
      };

      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          this.$message('创建品牌合作机会成功');
          this.dialogChance = false;
          //调用列表接口
          this.$options.methods.closeChance.bind(this)();//清空数据
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

    /** 
     * 店铺功能模块的处理整理
     * clear time on 2018/9/29
    */

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

    //添加店铺
    addshop : function(id){
      this.ShopStatus = "add_shop";
      this.closeShop();
      var crm_url = '/tstypegroup/getTypegroupNoSession';
      this.shopType(this.https+crm_url);//店铺类型
      this.shopGrade(this.https+crm_url);  //店铺等级
      this.shopLabel(this.https+crm_url);  //标签信息
      var brand_url = this.https+'/crm/dictionary/getList';
      this.brand(brand_url);  //主营品牌
      this.dialogShop = true;
      this.shop.customer_id = id;
    },

    //添加店铺数据信息
    shopPrimsData : function(){
      var id =  this.shop.id?this.shop.id:'',
      name = this.shop.name?this.shop.name:'',
      customer_id = this.shop.customer_id?this.shop.customer_id:'',
      store_customer_type  = this.shop.store_customer_type?this.shop.store_customer_type:'',
      taobaocode  = this.shop.taobaocode?this.shop.taobaocode:'',
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
      principal_orgcode = '', //组织机构编码
      remark = this.shop.remark? this.shop.remark:'';
      //获取客户名称
      for(var i=0;i<this.clientDetail.length;i++){
        if(customer_id == this.clientDetail[i].id){
          customer_name = this.clientDetail[i].name;
          principal_orgcode =  this.clientDetail[i].principal_orgcode;
        }
      }

      var data = {
        id : id,
        name : name,
        customer_id : customer_id,
        store_customer_type : store_customer_type,
        taobaocode : taobaocode,
        link : link,
        shop_type : shop_type,
        shop_level : shop_level,
        main_brand : main_brand,
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
        //主营品牌
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

    //判断新增店铺、修改店铺
    addNewShop : function(){
      if(this.shop.id == ''){
        this.Createshop();
      }else{
        this.shopEdit();
      }
    },

    //提交店铺信息
    Createshop(){
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

    //清空店铺信息
    closeShop : function(){
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
      this.shop.shop_tag= [];
      this.shop.isclose_shop= '';
      this.shop.taobaocode = '';
      this.shop.remark;
    },

    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },

    /**
     * 品牌详情展示数据开始
     * 1、品牌详情回写
     * 2、删除品牌机会功能
     * 3、修改品牌功能
     * 4、添加跟进记录功能
     * 5、展示、隐藏跟进记录评论功能
     */
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
            this.$options.methods.closeChance.bind(this)();//清空数据
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
     */

    //修改店铺负责人信息
    updateshopres : function(id){
      this.shoprespible = true;
      this.shopresdata.id = id;
    },

    //提交店铺负责人信息
    shoprespiblebtn : function(){
      var id = this.shopShow.id;
      var url = this.https+'/crm/shop/updateData'; 
      for(var i=0;i<this.policymakerName.length;i++){
        if(this.shopresdata.principal_id == this.policymakerName[i].id){
          this.shopresdata.principal_name =this.policymakerName[i].name;
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

    //修改店铺助理信息
    updateshopaid : function(id){
      this.shopaid = true;
      this.shopaiddata.id = id;
    },
    
    shopaidbtn : function(){
      var id = this.shopShow.id;
      var url = this.https+'/crm/shop/updateData'; 
      for(var i=0;i<this.policymakerName.length;i++){
        if(this.shopaiddata.assistant_id == this.policymakerName[i].id){
          this.shopaiddata.assistant_name =this.policymakerName[i].name;
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
          this.$message('修改店铺负责人');
          //调用列表接口
          this.shopaid = false;
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
            this.$options.methods.closeChance.bind(this)();//清空数据
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
        this.$options.methods.brandgetData.bind(this)(brand,this.shopShow.customer_id,this.shopShow.policymaker_id);
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
      this.shop.taobaocode = this.shopShow.taobaocode;
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
        this.$options.methods.brandgetData.bind(this)(brand,this.shopShow.customer_id,this.shopShow.policymaker_id);
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

    //修改数据提交
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
            this.$options.methods.closeShop.bind(this)();//清空数据
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
  }
});