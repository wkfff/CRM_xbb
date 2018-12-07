/** 
 * create author name xiaominzhang
 * create time 2018/8/20
*/
var vue = new Vue({
  el:"#app",
  mounted(){
      var crm_url = '/tstypegroup/getTypegroupNoSession';
      var followurl = '/crm/followRecords/getList';
      var url = this.vueUrl();
      this.visitWay(url+crm_url); //跟进方式
      this.geturldata();//获取url参数信息
     // this.getData(url+followurl,this.change(),'-1');
  },
  data:{
    form:{
        typeId:''
    },
    input: '',
    pageSize : '', //分页
    total : '' ,//总数
    clientDetail : [],//客户信息
    customerDetail : [], //联系人信息
    visit : [], //拜访方式
    branddata : [], //合作品牌信息
    tableData : [], //跟进记录信息
    followInfo : [], //回掉跟进记录数据信息
    commentInfo : [], //评论数据
    https : '',//页面请求前缀
    formLabelWidth: '120px',
    activeName : 'first',
    dialogCostoms : false,
    dialogenterprise : false,
    currentPage: 1,
    fullscreenLoading: true,
    state2 : '',
    title_follow: {
        addFollow:'新增跟进记录',
        ediFollow: "编辑跟进记录"
    },
    //新增和编辑弹框标题
    FollowStatus: "",
    //筛选条件
    select : {
      follow_up_way : '',
      follow_up_on_date : ''
    },

    brand : [], //选中客户的信息
    pickerOptions1: {
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
    },
    pickerOptions2: {
      shortcuts: [{
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
      }]
    },

    records :{
      id : '',
      customer_id : '',
      contacts_id : '',
      follow_up_way : '',
      follow_up_plan : '',
      follow_up_on_date : '',
      leader_instructions : '',
      remark : ''
    },

    textarea : {
      id : '',
      theme_id : '',
      context : '',
      type : '跟进记录'
    },

　　height:{height:'',overflow: 'auto'},
    heightcomment:{height:'',overflow: 'auto'},
    heightselect : {height:''},
    width1 : {width:''}
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
      this.height.height=window.innerHeight-200+'px';
      this.heightcomment.height=window.innerHeight-430+'px';
    },
    ww(){
      if(window.innerWidth<=1000){
        this.heightselect.height = '100px';
        this.width1.width = '120px';
      }else{
        this.heightselect.height = 'auto';
        this.width1.width = '210px';
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
    
    //获取url的参数，并且进行查询数据
    geturldata:function(){
      var time = this.getQueryString('time');
      var time1 = time;
      var time2 = time;
      if(time!=''){
        this.select.follow_up_on_date=[time1,time2];
        this.change();
      }
      
    },
    getQueryString : function(name){
      //获取url参数
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return decodeURI(r[2]);
      }
      return null;
    },
    //客户信息
    clientName(url){
      let para = {
        pageSize: -1
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
      this.clientDetail = res.data.data.result;
      })
      .catch(function(res) {
        this.$message('请求失败');
      }) 
    },

    //联系人
    customerData:function(url,id){
      //请求页面表单数据
      var data = {
        "a.customer_id" : "='"+id+"'"
      };
      let para = {
        pageSize: -1,
        paramsJson:JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.customerDetail = res.data.data.result;
      })
      .catch(function(res) {
        this.$message('请求失败');
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
        this.$message('请求失败');
      }) 
    },

    //获取选中的客户id
    customer :function(id){
      var labelurl = this.https+'/crm/contacts/getList';
      this.customerData(labelurl,id);
      var brand = this.https+'/crm/cbCooperation/getList';
      this.$options.methods.brandPlay.bind(this)(brand,id);  //方法相互调用

    },
    
    //跟进品牌计划
    brandPlay(url,data){
      var data = {
        "a.customer_id" : "='"+data+"'"
      }
      var para = {
        pageSize: -1,
        paramsJson : JSON.stringify(data)
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.branddata = res.data.data.result;
      })
      .catch(function(res) {
        this.$message('请求失败');
      }) 
    },

    //日期格式转换
    dateFormat:function(row, column) { 
      var date = row[column.property]; 
      if (date == undefined) { 
        return ""; 
      } 
      return moment(date.time).format("YYYY-MM-DD"); 
    },
  
    //添加数据信息
    followPrimse(){
      var id = this.records.id,
          customer_id = this.records.customer_id, //客户id
          contacts_id = this.records.contacts_id, //联系人id
          follow_up_way = this.records.follow_up_way, //跟进方式
          follow_up_plan = this.records.follow_up_plan, //跟进计划品牌机会ID
          follow_up_on_date = this.records.follow_up_on_date, //跟进时间
          leader_instructions = this.records.leader_instructions,  //领导批示
          remark = this.records.remark,  //跟进备注
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
          id : id,                    //id
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

    //点击新增跟进记录按钮
    newfollow : function(){
      this.FollowStatus = "addFollow";
      var clienturl = this.https+'/crm/customer/getList';
      this.clientName(clienturl);
      this.dialogCostoms=true;

      //因为页面用的同一个页面，所以新增时，数据都情况
      this.closeDialog();
    },

    //跟进记录新增功能
    followNew : function(){
      //判断是否存在跟进记录id，没有新增，否则就是修改
      if(this.records.id==''){
        this.followAdd()
      }else{
        this.followUpdate();
      }
    },

    //新增数据
    followAdd : function(){
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
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.pramise.bind(this)(),-1);  //方法相互调用
            this.closeDialog();//清空数据
            this.dialogCostoms=false;
          }else{
            this.$message('新增跟进记录失败');
          }
        })
        .catch(function(res) {
          this.$message('新增跟进记录失败');
        });
      }
    },

    //修改跟进记录信息
    followedit : function(id){
      this.FollowStatus = "ediFollow";
      this.dialogCostoms = true;
      var clienturl = this.https+'/crm/customer/getList';
      var labelurl = this.https+'/crm/contacts/getList';
      this.clientName(clienturl);  //获取客户信息
      this.customerData(labelurl);  //获取联系人信息
      this.$options.methods.customer.bind(this)(this.followInfo.customer_id);  //根据客户id获取品牌信息
      this.records.id = this.followInfo.id?this.followInfo.id:''; //id
      this.records.customer_id = this.followInfo.customer_id?this.followInfo.customer_id:''; //客户id
      this.records.contacts_id = this.followInfo.contacts_id?this.followInfo.contacts_id:''; //联系人id
      this.records.follow_up_way = this.followInfo.follow_up_way?this.followInfo.follow_up_way:''; //跟进方式
      this.records.follow_up_plan = this.followInfo.follow_up_plan?this.followInfo.follow_up_plan:''; //跟进计划品牌机会ID
      this.records.follow_up_on_date = this.followInfo.follow_up_on_date?moment(this.followInfo.follow_up_on_date.time).format("YYYY-MM-DD HH:mm:ss"):''; //跟进时间
      this.records.leader_instructions = this.followInfo.leader_instructions?this.followInfo.leader_instructions:'';  //领导批示
      this.records.remark = this.followInfo.remark?this.followInfo.remark:'';  //跟进备注
      
    },

    //提交修改信息
    followUpdate : function(){
      var url = this.https+'/crm/followRecords/updateData';
      let para = {
        dataJson : JSON.stringify(this.$options.methods.followPrimse.bind(this)())
      };
      //判断false
      if(para.dataJson != undefined){
        this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.status == "success"){
            this.$message('修改跟进记录成功');
            //调用列表接口
            var labelurl = this.https+'/crm/followRecords/getList';
            this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.pramise.bind(this)(),-1);  //方法相互调用
            var lurl = this.https+'/crm/followRecords/getDataById';
            this.$options.methods.followData.bind(this)(lurl,this.followInfo.id);  //方法相互调用
            this.closeDialog();//清空数据
            this.dialogCostoms=false;
          }else{
            this.$message('修改跟进记录失败');
          }
          
        })
        .catch(function(res) {
          this.$message('修改跟进记录失败');
        });
      }
    },
    
    //清除数据
    closeDialog : function(){
      this.records.id = ''; //id
      this.records.customer_id = ''; //客户id
      this.records.contacts_id = ''; //联系人id
      this.records.follow_up_way = ''; //跟进方式
      this.records.follow_up_plan = ''; //跟进计划品牌机会ID
      this.records.follow_up_on_date = ''; //跟进时间
      this.records.leader_instructions = '';  //领导批示
      this.records.remark = '';  //跟进备注
    },

    //获取筛选条件信息
    pramise(){
      var follow_up_way = this.select.follow_up_way?"='"+this.select.follow_up_way+"'":'',
          follow_up_on_date =this.select.follow_up_on_date?' BETWEEN '+"'"+moment(this.select.follow_up_on_date[0]).format("YYYY-MM-DD HH:mm:ss")+"'"+' AND '+"'"+moment(this.select.follow_up_on_date[1]).format("YYYY-MM-DD")+" 23:59:59'":'';
      //判断是否有值
      if(follow_up_on_date ==" BETWEEN 'Invalid date' AND 'Invalid date 23:59:59'"){
        follow_up_on_date = '';
        this.select.follow_up_on_date = '';
      }
     
      //数据整合
      var data = {
        follow_up_way : follow_up_way,
        follow_up_on_date : follow_up_on_date
      }
      return data;
    },

    //筛选信息
    change : function(){
      var labelurl = this.https+'/crm/followRecords/getList';
      this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.pramise.bind(this)(),-1);  //方法相互调用
    },

    //数据展示
    getData : function(url,data,pageSize){
      let para = {
        pageSize: pageSize,
        paramsJson : JSON.stringify(data)
      };
      $('.follow').show();
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.tableData = res.data.data.result;
        //展示第一条数据详情
        if(this.tableData.length>0){
          this.$options.methods.showFollow.bind(this)(this.tableData[0].id,0);
        }else{
          this.$options.methods.showFollow.bind(this)(null,0);
        }
      })
      .catch(function(res) {
        this.$message('请求失败');
      }) 
    },

    //展示选中的数据
    showFollow : function(id,index){
      //判断li的第一个展示选中
      $('.folowCard').find('.triangle').hide();
      $('.folowCard').eq(index).find('.triangle').show();
      //请求选中数据信息
      var labelurl = this.https+'/crm/followRecords/getDataById';
      this.$options.methods.followData.bind(this)(labelurl,id);
    },

    //选中数据信息
    followData : function(url,id){
      if(id!=null){
        this.$http.get(url,{params:{"id" : id}}).then((res) => {  //.then() 返回成功的数据
          this.followInfo = res.data.data?res.data.data:'';
          var commenturl = this.https+'/crm/comment/getList';
          this.$options.methods.showComment.bind(this)(commenturl,id,"跟进记录")
        })
        .catch(function(res) {
          this.$message('请求失败');
        });
      }else{
        //重新赋值为空的数据
        this.followInfo = [];
        this.commentInfo = [];
      }
     
    },

    //删除跟进记录信息
    followdel : function(id){
      this.$confirm('此操作将删除跟进记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = this.https+'/crm/followRecords/delData';
        var labelurl = this.https+'/crm/followRecords/getList';
        this.$http.post(url,{"id":id},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.pramise.bind(this)(),-1);  //方法相互调用
        }).catch(function(res) {
          this.$message('请求失败');
        }) 
       
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
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
      if(context != '' && theme_id != ''){
        return data;
      }else{
        //判断评论内容为空
        if(context == ''){
          this.$message('请填写评论内容');
        }

        //判断跟进记录id为空时
        if(theme_id == ''){
          this.$message('跟进记录id为空');
        }
      }
    },

    //评论功能
    comment : function(id){
      if(id!=''){
        var url = this.https+'/crm/comment/insertData';
        this.textarea.theme_id = id;   //获取跟进记录的id
        let para = {
          dataJson : JSON.stringify(this.$options.methods.commentPrimse.bind(this)())
        };
        //判断false
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
    }
  }
});