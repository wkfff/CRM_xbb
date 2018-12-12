/** 
 * create author name xiaominzhang
 * create time 2018/8/19
*/
var vue = new Vue({
  el:"#app",
  mounted(){
    let url = this.vueUrl();
    //页面数据展示
    var visit_url = url+'/crm/clue/listCusClue';
    this.getData(visit_url,this.primsData(1,10));
     //获取来源
     var cluesurl = url+'/tstypegroup/getTypegroupNoSession';
     this.formClues(cluesurl);
     //重要程度
     this.importClues(cluesurl);
     //线索状态
     this.stasrtsClues(cluesurl); //跟进方式
     this.gourl();                //跳转页面的js处理,获取当前时间对时间选择框赋值
  },
  data:{
    form:{
        typeId:''
    },
    input: '',
    pageSize : '', //分页
    total : '' ,//总数
    currentPage: 1,
    formLabelWidth: '120px',
    potentialurl : '',                  //潜在客户URL
    enterprseurl : '',                  //客户管理URL
    dialogVisit: false,
    conversion : false,                 //客户转化
    dialogIn : false,                   //导出页面
    tableData : [],                     //客户跟进计划table
    cluesForm : [],                     //来源
    cluesImport : [],                   //重要程度
    cluesStasrts : [],                  //线索状态
    getClueData : [],                   //客户线索详情
    fileList : [],                      //上传数据信息
    crmsbrand : [],                     //合作品牌信息
    crmsplatform : [],                  //合作平台
    crmsclientLabel : [],               //客户标签
    options1: [],                       //公司员工数据
    crmsshoptype : [],                  //店铺类型
    crmsiscooperation : [{name:'未签约',id:'0'},{name:"已签约",id:'1'}], //是否签约
    subsidiarydate :[{name:'无',id:'无'},{name:"有",id:'有'}], //是否有子公司
    //添加修改表头信息
    title_Clues: {
      add_clues:'新增客户线索',
      edit_clues: "编辑客户线索"
    },
    CluesStatus : '',

    //筛选条件
    select : {
      clueName : '',
      source : '',
      important : '',
      status : ''
    },

    //新增回访表单
    clues_return : {
      id : '',
      clueName : '',
      status : '',
      source : '',
      important : '',
      phone : '',
      companyName : '',
      shopName : '',
      taobaoCode : '',
      potentialPrice : '',
      remark : ''
    },

    //新增必填项提示
    rules: {
      clueName: [{required: true, message: '请填写线索名称', trigger: 'blur'}],
      status : [{required: true, message: '请填项线索状态', trigger: 'blur'}],
      potentialPrice:[{ type: 'number', message: '金额必须是数字'}]
    },

    //完成、取消
    ComCanData : {
      id : '',
      update_time : '',
      remark : ''
    },

    //完成、取消必填项提示
    rulesComCal : {
      update_time: [{required: true, message: '请选择时间', trigger: 'blur'}],
      remark : [{required: true, message: '请填写描述信息', trigger: 'blur'}]
    },

    //转化客户
    //客户模块
    client : {
      name : '',
      introduce : '',
      boss : '',
      cooperative_brand : '',
      cooperation_platform : '',
      label : '',
      now_principal_id : '',
      iscooperation : '',
      district : '',
      address1 : '',
      address2 : '',
      subsidiary : ''
    },

    //联系方式
    customerdata : {
      name : '',
      contact_way : ''
    },

     //新增店铺表单提交
     shop : {
      name : '',
      shop_type : ''
    },

    height:{height:''},  //详情页统一高度样式
    height1:{height:'',overflow:'auto'}, //客户详情详情页左侧高度样式
    height3:{height:'',overflow:'auto'},//详情页中的详情页左侧高度样式
    followheight:{height:'',overflow:'auto'},  //详情页的根据记录高度样式
    brandheight : {height:'',overflow:'auto'},  //详情页的品牌机会、联系人、店铺标签页高度样式
    heightselect : {height:''},  //筛选条件的高度处理
    width : {width:'',left:''}, //详情页中的详情页宽度处理
    width1 : {width:''}, //筛选条件的宽度
    width2 : {width:''}, //筛选条件的狂赌（两个输入框的问题）
    tableHeight : '', //表单的最大高度设置
  },
  created(){
    this.hh(); //获取页面高度
    this.ww(); //获取页面宽度
    const that = this
    window.onresize = () => {
        return (() => {
          this.hh();
          this.ww();
        })();
    }
  },
  methods:{
    //获取页面高度
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
        this.heightselect.height = '100px';
        this.width.width='45%';
        this.width.left = '55%';
        this.width1.width = '120px';
        this.width2.width = '43px';
        this.isB = true;
        this.isA = false;
      }else if(window.innerWidth<=1500 && window.innerWidth>1000){
        this.heightselect.height = 'auto';
        this.width.width='30%';
        this.width.left = '70%';
        this.width1.width = '120px';
        this.width2.width = '43px';
        this.isB = true;
        this.isA = false;
      }else{
        this.heightselect.height = 'auto';
        this.width.width='25%';
        this.width.left = '75%';
        this.width1.width = '210px';
        this.width2.width = '90px';
        this.isB = false;
        this.isA = true;
      }
    },
   
    //获取当前页面的url路径
    vueUrl(){
      var url = location.href.split('/rhmcrm')[0];  
      //处理url
      if(url == "http://test.runhemei.com/maochao_test"){
        url = "http://test.runhemei.com/maochao";
        this.https = url;
        return url;
      }else{
        this.https = url;
        return url;
      }
    },

    //调整页面路径以及参数添加
    gourl : function(){
      this.potentialurl = '/maochao/rhmcrm/view/enterprise/potential.html?name=';
      this.enterprseurl =  '/maochao/rhmcrm/view/enterprise/enterprise.html?name=';
   },

    //判断客户转化前、后的状态
    ifStock : function(data1,data2){
      if(data1 == 0){
        if(data2=='已转化'){
          return '0';
        }else{
          if(data2 == '未转化'){
            return '-1';
          }else{
            return '-10';
          }
          
        }
      }else{
        return '1';
      }
    },

    //页面跳转
    //页面调整处理
    PageTypes : function(url,target){
      let  windowUrl = parent.location.href.split('/');
      let dfm = '';
      for(let i=0;i<windowUrl.length;i++){
          if(windowUrl[i] == 'dform'){
              dfm = windowUrl[i];
          }
      }
      if(dfm != ''){
          this.openPageTypes({id:'',
          title:target,
          url:url});
      }else{
          window.location.href = url;
      }
    }, 
    //判断在ibos中，弹出新的标签页
    openPageTypes : function(obj){
      window.parent.addTabs(obj);
    },

    //来源信息
    formClues : function(url){
      //请求页面表单数据
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'clue_source'
      }}).then((res) => {  //.then() 返回成功的数据
        this.cluesForm = res.data.data.result;
      })
      .catch(function(res) {
        console.log(res)
      }) 
    },

    //重要程度
    importClues : function(url){
      //请求页面表单数据
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'clue_import'
      }}).then((res) => {  //.then() 返回成功的数据
        this.cluesImport = res.data.data.result;
      })
      .catch(function(res) {
        console.log(res)
      }) 
    },

    //线索状态
    stasrtsClues : function(url){
      //请求页面表单数据
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'clue_status'
      }}).then((res) => {  //.then() 返回成功的数据
        this.cluesStasrts = res.data.data.result;
      })
      .catch(function(res) {
        console.log(res)
      }) 
    },

    //导出
    exportOut : function(){
      window.location.href = this.https+'/crm/clue/downloadCusClue?clueName='+this.select.clueName+'&source='+this.select.source+'&important='+this.select.important+'&status='+this.select.status;
    },

    //导入
    exportIn : function(){
      this.dialogIn = true;
      console.log('导入');
    },

    //判断上传文件是否是excel文件
    fileUp : function(file){
      if(file!=''){
        var filextension = file.substring(file.lastIndexOf("."), file.length);
        filextension = filextension.toLowerCase();
        var file = file.split("\\");
        if(filextension != '.xls' && filextension != '.xlsx'){
          this.$message('系统支持上传xls,xlsx格式文件');
          return false;
        }else{
          return file[file.length-1];
        }
      }
    },

    //下载短信模板
    donwClues : function(){
      window.location.href = 'http://test.runhemei.com/maochao/doc/CustomerClueTemplate.xlsx';
    },

    //上传excel
    submitUpload() {
      let url = this.https+'/crm/clue/batchSendMessage';
      let clues = {
        file : $('#file-import').val(),
        fileName : this.fileUp($('#file-import').val())
      };
      if(clues.fileName!=false){
        $.ajaxFileUpload({
          url :this.https+'/crm/clue/batchSendMessage',
          secureuri : false,
          type:"POST",
          data: clues, 
          fileElementId : 'file-import',
          dataType : 'json',
          success : function(data, status) {
            if(data.status=="0"){
              vue.cluesSuccess();
            }else{
              vue.cluesError();
            } 
          },
          error : function(data, status, e) {
            vue.cluesError();
          }
        });
      }
    },

    //成功处理
    cluesSuccess : function(){
      this.dialogIn = false;
      this.$message('上传成功!');
      let table = this.https+'/crm/clue/listCusClue';
      this.$options.methods.getData.bind(this)(table,this.primsData(1,10));
      
    },

    //失败处理
    cluesError : function(){
      this.$message('上传失败!');
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

      
    getData:function(url,data){
      //请求页面表单数据
      this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.tableData = res.data.data.data;
        this.pageSize = data.rows;
        this.total = res.data.data.totalCount;
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //请求筛选数据的prims数据
    primsData : function(page,pageSize){
      var page = page,
          pageSize = pageSize,
          clueName = this.select.clueName,
          source = this.select.source,
          important = this.select.important,
          status =  this.select.status;

      let visitBack = {
        page : page,
        rows : pageSize,
        clueName : clueName,
        source : source,
        important : important,
        status : status
      };
      return visitBack;
    },

    //新增跟进计划按钮
    addclues : function(){
      this.dialogVisit = true;
      this.CluesStatus = 'add_clues';
      this.closeData();
    },

    //监听搜索条件的变化
    change:function() {
      var labelurl = this.https+'/crm/clue/listCusClue';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(this.currentPage,this.pageSize));  //方法相互调用
    },
    
     //每页显示数据量变更
     handleSizeChange: function(val) {
      var labelurl = this.https+'/crm/clue/listCusClue';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(this.currentPage, val));
    },

    //页码变更
    handleCurrentChange: function(val) {
      var labelurl = this.https+'/crm/clue/listCusClue';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.primsData.bind(this)(val,this.pageSize));
    },

    //新增、修改数据处理
    visitPrimse : function(){
      let id = this.clues_return.id,
          clueName = this.clues_return.clueName,
          status = this.clues_return.status,
          source = this.clues_return.source,
          important = this.clues_return.important,
          phone = this.clues_return.phone,
          companyName = this.clues_return.companyName,
          shopName = this.clues_return.shopName,
          taobaoCode = this.clues_return.taobaoCode,
          potentialPrice = this.clues_return.potentialPrice,
          remark = this.clues_return.remark;
      
          //新增、修改数据处理
      let returnData = {
        id : id,
        clueName : clueName,
        clueStatus : status,
        source : source,
        important : important,
        phone : phone,
        companyName : companyName,
        shopName : shopName,
        taobaoCode : taobaoCode,
        potentialPrice : potentialPrice,
        remark : remark
      };
      if(!isNaN(potentialPrice)){
        if(clueName !='' && status !=''){
          return this.dealElement(returnData);
        }else{
          if(status == ''){
            this.$message('线索状态不能为空!');
          }
          if(clueName == ''){
            this.$message('线索名称不能为空!');
          }
          return false;
        }
      }else{
        return false;
      }
    },


    //新增，修改请求处理
    dialogAdd : function(){
      let url = this.https+'/crm/clue/modifyCustomerClue';
      let table = this.https+'/crm/clue/listCusClue';
      let pre = this.visitPrimse();
      if(pre!=false){
        this.$http.post(url,pre,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "0"){
            if(!pre.id){
              this.$message('添加客户检索成功');
            }else{
              this.$message('修改客户检索成功');
            }
            //调用列表接口
            this.dialogVisit=false;
            this.$options.methods.getData.bind(this)(table,this.primsData(1,10));
            this.$options.methods.closeData.bind(this)();//清空数据
          }else{
            this.$message('操作失败');
          }
        })
        .catch(function(res) {
            console.log(res)
        }) 
      }
    },

    //修改跟进计划
    hasComplete : function(id){
      this.dialogVisit = true;
      this.CluesStatus = 'edit_clues';
      this.clues_return.id = id;
      this.getClue(id);      //请求数据详情
    },

    //获取数据详情
    getClue : function(id){
      let url = this.https+'/crm/clue/getClue';
      //获取详情
      this.$http.post(url,{id:id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(res.data.status == "0"){
          this.getClueData = res.data.data;
          this.cluesInfo(this.getClueData); //展示数据详情
        }else{
          this.$message('操作失败');
        }
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    cluesInfo : function(data){
      this.clues_return.clueName = data.clueName;
      this.clues_return.status = data.status;
      this.clues_return.source = data.source;
      this.clues_return.important = data.important;
      this.clues_return.phone = data.phone;
      this.clues_return.companyName = data.companyName;
      this.clues_return.shopName = data.shopName;
      this.clues_return.taobaoCode = data.taobaoCode;
      this.clues_return.potentialPrice = data.potentialPrice;
      this.clues_return.remark = data.remark;
    },
    
    //清除数据
    closeData : function(){
      this.clues_return.id = '';
      this.clues_return.clueName = '';
      this.clues_return.status = '';
      this.clues_return.source = '';
      this.clues_return.important = '';
      this.clues_return.phone = '';
      this.clues_return.companyName = '';
      this.clues_return.shopName = '';
      this.clues_return.taobaoCode = '';
      this.clues_return.potentialPrice = '';
      this.clues_return.remark = '';
    },


    //客户转化
    hasCancel : function(id){
     // this.conversion = true;
     this.$message('此功能未开放');
      var brand_url = this.https+'/crm/dictionary/getList';
      this.brand(brand_url);  //合作品牌
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.platform(crm_url); //客户合作平台
      this.clientLabel(crm_url);  //客户标签
      var urluser = this.https+'/tsuser/getTSUsers?pageSize=-1';
      this.request(urluser); //请求用户信息
      var crm_url = this.https+'/tstypegroup/getTypegroupNoSession';
      this.shopType(crm_url);//店铺类型
    },

    /** 
     *线索转化模块 
    */

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

     //公司成员请求
     request(url){
      this.$http.get(url).then((res) => {  //.then() 返回成功的数据
        this.options1 = res.data.data.result;
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

    //提交客户转化信息
    conversionAdd : function(){
      console.log("店铺信息",this.shop,"联系人信息",this.customerdata,"客户信息",this.client);
    },

    //跳转页面到跟进记录中
    //页面调整处理
    PageTypes : function(url,target){
      let  windowUrl = parent.location.href.split('/');
      let dfm = '';
      for(let i=0;i<windowUrl.length;i++){
          if(windowUrl[i] == 'dform'){
              dfm = windowUrl[i];
          }
      }
      if(dfm != ''){
          this.openPageTypes({id:'',
          title:target,
          url:url});
      }else{
          window.location.href = url;
      }
    },
    //判断在ibos中，弹出新的标签页
    openPageTypes : function(obj){
        window.parent.addTabs(obj);
    },
  },
});