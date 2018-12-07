/** 
 * create author name xiaominzhang
 * create time 2018/8/18
*/
var vue = new Vue({
  el:"#app",
  mounted(){
      var labelurl = '/crm/shop/getList';
      var url = this.vueUrl();
      this.getData(url+labelurl,this.select,1,10);
  },
  data:{
    form:{
        typeId:''
    },
    input: '',
    pageSize : '', //分页
    total : '' ,//总数
    loading: true,
    tableData:[],  //表单数据
    https : '',//请求接口前缀
    formLabelWidth: '120px',
    activeName : 'third',
    currentPage: 1,


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


    height:{height:''},
    height1:{height:'',overflow:'auto'},
    height3:{height:'',overflow:'auto'},
    followheight:{height:'',overflow:'auto'},
    brandheight : {height:'',overflow:'auto'},
    heightselect : {height:''},
    width : {width:'',left:''},
    width1 : {width:''},
    width2 : {width:''},
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
      this.brandheight.height = window.innerHeight-230+'px';
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
      if(url == "http://test.runhemei.com/maochao_test"){
        url = "http://test.runhemei.com/maochao"
        this.https = url;
        return url;
      }else{
        this.https = url;
        return url;
      }
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
            setTimeout(() => {
              this.loading = false;
            }, 2000);
           // this.loading = false;
          })
          .catch(function(res) {
              console.log(res)
          }) 
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

    //选项卡展示
    handleClick(tab, event) {
      //页面跳转
      var followurl ='';
      if(tab.name == 'first'){
        followurl = this.https+'_test'+'/rhmcrm/view/salesDetail/Itemquery.html';
      }else if(tab.name == 'second'){
        followurl = this.https+'_test'+'/rhmcrm/view/salesDetail/brandStatistics.html';
      }else if(tab.name == 'third'){
        followurl = this.https+'_test'+'/rhmcrm/view/salesDetail/monthlyStatistics.html';
      }else if(tab.name == 'fourth'){
        followurl = this.https+'_test'+'/rhmcrm/view/salesDetail/customerStatistics.html';
      }
      window.location.href = followurl;
    },
  }
});