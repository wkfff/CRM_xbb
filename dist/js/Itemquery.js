/** 
 * create author name xiaominzhang
 * create time 2018/8/18
*/
var vue = new Vue({
  el:"#app",
  mounted(){
      var labelurl ='/saleDetail/listSaleDetail';
      var brandurl = '/tstypegroup/getTypegroupNoSession';
      var url = this.vueUrl();
      this.setTimeDate();
      this.getbrand(url+brandurl);  //获取字典品牌数据
      this.getData(url+labelurl,this.itemprimsData(1,10));
  },
  data:{
    form:{
        typeId:''
    },
    loading: true,              //加载动态
    input: '',
    pageSize : '',          //分页
    total : '' ,            //总数
    pageSizeout : '',       //出库单分页
    totalout : '',           //出库单总数
    itemtableData : [],     // 单品查询表单数据
    brandtableData : [],    //分品牌统计
    monthtableData : [],    //分月份统计
    clienttableData:[],     //分客户统计
    outboundtableData : [], //出库表单
    outboundOrder : false,  //出库单弹出层 
    https : '',             //请求接口前缀
    crmsbrand : [],         //品牌字典数据
    formLabelWidth: '120px',
    activeName : 'first',
    currentPage: 1,
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
    }, //首次合作日期

    //单品查询的筛选条件
    selectItem : {
      customerName : '',
      brand : '',
      goodsName : '',
      goodsCode : '',
      date : ''
    },

    //概要统计
    abtotals : {
      custotal : '',
      brandtotal : '',
      ordertotal : '',
      qutboundamount : '',
      cusorders : '',
      cusqutboundamount : ''
    },

    //分品牌统计
    selectbrand : {
      date : ''
    }, 

    //份月份统计
    selectmonth : {
      startdate : '',
      enddate : ''
    },

    //客户统计
    selectclient : {
      customerName : '',
      brand : '',
      date : ''
    },

    //出库单数据整理
    selectoutbound : {
      customer_name : '',
      brand : '',
      date : ''
    },

    height:{height:''},
    heightselect : {height:''},
    heightselect1 :  {height:''},
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
      this.tableHeight = window.innerHeight - 380;
    },
    //获取页面宽度
    ww(){
      if(window.innerWidth<=1000){
        this.heightselect.height = '120px';
        this.heightselect1.height = '70px';
        this.width.width='95%';
        this.width.left = '5%';
        this.width1.width = '120px';
        this.width2.width = '120px';
      }else if(window.innerWidth<=1500 && window.innerWidth>1000){
        this.heightselect.height = '120px';
        this.heightselect1.height = '70px';
        this.width.width='85%';
        this.width.left = '15%';
        this.width1.width = '120px';
        this.width2.width = '120px';
      }else{
        this.heightselect.height = '120px';
        this.heightselect1.height = '70px';
        this.width.width='70%';
        this.width.left = '30%';
        this.width1.width = '210px';
        this.width2.width = '120px';
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

    //处理默认时间展示
    setTimeDate : function(){
      var nowdate = new Date();
      var y = nowdate.getFullYear();
      var mend = nowdate.getMonth()+1;
      var dend = nowdate.getDate();
      var mstrat = this.monthDataChange(mend,0); // nowdate.getMonth();
      var monthstrat = this.monthDataChange(mend,5);
      var dstrat = nowdate.getDate()+1;
      var time = [ mstrat+'-'+dstrat, y+'-'+mend+'-'+dend]
      this.selectItem.date = time;    //默认单品查询时间段是最近的一个月
      this.selectbrand.date = time;   //默认分品牌统计
      this.selectclient.date = time;    //默认月份时间段是最近的一个月
      this.selectmonth.startdate =monthstrat;//分月份统计开始月
      this.selectmonth.enddate = y+'-'+mend; //分月份统计截止月
    },

    //判断月份同时判断年的变化
    monthDataChange : function(date,num){
      var nowdate = new Date();
      var y = nowdate.getFullYear();
      var mend = nowdate.getMonth()-num;
      if(mend > date){
        y = nowdate.getFullYear() - 1;
      }
      return y+'-'+mend;
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

    //选项卡展示
    handleClick(tab, event) {
      //页面跳转
      var labelurl = '';
      if(tab.name == 'first'){
        labelurl = this.https+'/saleDetail/listSaleDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }else if(tab.name == 'second'){
        labelurl = this.https+'/saleDetail/listSaleBrandDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }else if(tab.name == 'third'){
        labelurl = this.https+'/saleDetail/listSaleMonthDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }else if(tab.name == 'fourth'){
        labelurl = this.https+'/saleDetail/listSaleCustomerData';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }
    },

    //获取品牌字典数据信息
    getbrand : function(url){
      this.$http.get(url,{params:{
        "page" : '',
        "pageSize" : '-1',
        "typegroupcode" : 'fxbrand'
      }}).then((res) => {  //.then() 返回成功的数据
        this.crmsbrand.push({"typename":"全部","typecode":""});
        for(let i=0;i<res.data.data.result.length;i++){
          this.crmsbrand.push(res.data.data.result[i]);
        } 
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //点击分客户统计的品牌
    handleEdit : function(cinvcname,name){
      this.loading =true;
      this.selectoutbound.customer_name = name;
      this.selectoutbound.date = this.selectItem.date;
      //根据名称、获取品牌的编码
      for(let i=0;i<this.crmsbrand.length;i++){
        if(cinvcname == this.crmsbrand[i].typename){
          this.selectoutbound.brand = this.crmsbrand[i].typecode;
        }
      }
      this.outboundOrder = true;
      //请求出库单列表数据
      let url = this.https+'/saleDetail/listCustomerBrandDetail';
      this.outboundorderData(url,this.outboundprise(1,10));
    },

    //日期格式转换
    dateFormat:function(row, column) { 
      var date = row[column.property]; 
      if (date == undefined) { 
        return ""; 
      } 
      return moment(date).format("YYYY-MM-DD"); 
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
    getData:function(url,data){
      //请求页面表单数据
      this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        if(this.activeName == 'first'){
          this.itemtableData = res.data.data.saleList;
          this.pageSize = data.rows;
          this.total = res.data.data.totalCount;
          //获取概要统计数据
          let aturl = this.https+'/saleDetail/getTotalSale';
          this.abouttotal(aturl,data);
        }else if(this.activeName == 'second'){
          this.brandtableData = res.data.data.saleList;
          this.pageSize = data.rows;
          this.total = res.data.data.totalCount;
        }else if(this.activeName == 'third'){
          this.monthtableData = res.data.data.saleList;
          this.pageSize = data.rows;
          this.total = res.data.data.totalCount;
        }else if(this.activeName == 'fourth'){
          this.clienttableData = res.data.data.saleList;
          this.pageSize = data.rows;
          this.total = res.data.data.totalCount;
        }
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //请求概要统计接口
    abouttotal : function(url,data){
      this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          let about = res.data.data;
          this.abtotals.custotal = about.customerCount;
          this.abtotals.brandtotal = about.brandCount;
          this.abtotals.ordertotal = about.orderCount;
          this.abtotals.qutboundamount = about.saleMoney;
          this.abtotals.cusorders = about.orderCount/about.customerCount;
          this.abtotals.cusqutboundamount = about.saleMoney/about.customerCount;
        
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //单品查询请求数据处理
    itemprimsData : function(page,pagesize){
      if(this.activeName == 'first'){
        return data = {
          page: page,
          rows: pagesize,
          name :this.selectItem.customerName,
          code : this.selectItem.brand,
          cinvname : this.selectItem.goodsName,
          cinvcode : this.selectItem.goodsCode,
          startTime : this.selectItem.date[0],
          endTime :  this.selectItem.date[1]
        };
      }else if(this.activeName == 'second'){
        return data = {
          page: page,
          rows: pagesize,
          startTime : this.selectbrand.date[0],
          endTime :  this.selectbrand.date[1]
        };
      }else if(this.activeName == 'third'){
        return data = {
          page: page,
          rows: pagesize,
          startTime : this.selectmonth.startdate,
          endTime : this.selectmonth.enddate
        };
      }else if(this.activeName == 'fourth'){
        return data = {
          page: page,
          rows: pagesize,
          name : this.selectclient.customerName,
          code : this.selectclient.brand,
          startTime : this.selectclient.date[0],
          endTime :  this.selectclient.date[1]
        };
      }
    },

    /** 
     * 公共处理方法集成处理判断
     * 处理筛选条件问题
     * 处理请求后台接口问题
     * 处理分页问题
     * 需要判断当前在哪个标签页中
    */

    //监听单品查询筛选条件
    changeItem : function(){
      var labelurl = '';
      if(this.activeName == 'first'){
        labelurl = this.https+'/saleDetail/listSaleDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }else if(this.activeName == 'second'){
        labelurl = this.https+'/saleDetail/listSaleBrandDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }else if(this.activeName == 'third'){
        labelurl = this.https+'/saleDetail/listSaleMonthDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }else if(this.activeName == 'fourth'){
        labelurl = this.https+'/saleDetail/listSaleCustomerData';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(1,10));
      }
    },

    //每页显示数据量变更
    handleSizeChange: function(val) {
      var labelurl = '';
      if(this.activeName == 'first'){
        labelurl = this.https+'/saleDetail/listSaleDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(this.currentPage, val));
      }else if(this.activeName == 'second'){
        labelurl = this.https+'/saleDetail/listSaleBrandDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(this.currentPage, val));
      }else if(this.activeName == 'third'){
        labelurl = this.https+'/saleDetail/listSaleMonthDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(this.currentPage, val));
      }else if(this.activeName == 'fourth'){
        labelurl = this.https+'/saleDetail/listSaleCustomerData';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(this.currentPage, val));
      }else{
        labelurl = this.https+'/saleDetail/listCustomerBrandDetail';
        this.$options.methods.outboundorderData.bind(this)(labelurl,this.$options.methods.outboundprise.bind(this)(this.currentPage, val));
      }
    },

    //出库单没有显示数据变更
    handleSizeChangeout: function(val) {
      this.loading =true;
      let labelurl = this.https+'/saleDetail/listCustomerBrandDetail';
      this.$options.methods.outboundorderData.bind(this)(labelurl,this.$options.methods.outboundprise.bind(this)(this.currentPage, val));
      
    },


    //页码变更
    handleCurrentChange: function(val) {
      var labelurl = '';
      if(this.activeName == 'first'){
        labelurl = this.https+'/saleDetail/listSaleDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(val,this.pageSize));
      }else if(this.activeName == 'second'){
        labelurl = this.https+'/saleDetail/listSaleBrandDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(val,this.pageSize));
      }else if(this.activeName == 'third'){
        labelurl = this.https+'/saleDetail/listSaleMonthDetail';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(val,this.pageSize));
      }else if(this.activeName == 'fourth'){
        labelurl = this.https+'/saleDetail/listSaleCustomerData';
        this.$options.methods.getData.bind(this)(labelurl,this.$options.methods.itemprimsData.bind(this)(val,this.pageSize));
      }else{
        labelurl = this.https+'/saleDetail/listCustomerBrandDetail';
        this.$options.methods.outboundorderData.bind(this)(labelurl,this.$options.methods.outboundprise.bind(this)(val,this.pageSize));
      }
    },
    //出库单页码变更
    handleCurrentChangeout: function(val) {
      this.loading =true;
      let labelurl = this.https+'/saleDetail/listCustomerBrandDetail';
      this.$options.methods.outboundorderData.bind(this)(labelurl,this.$options.methods.outboundprise.bind(this)(val,this.pageSize));
    },

    //出库单数据整理
    outboundprise : function(page,pagesize){
      var data = {
        page : page,
        rows : pagesize,
        name : this.selectoutbound.customer_name,
        code : this.selectoutbound.brand,
        startTime :  this.selectoutbound.date[0],
        endTime :this.selectoutbound.date[1],
      };
      return data;
    },

    //请求出库单列表数据
    outboundorderData : function(url,data){
       //请求页面表单数据
       this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          this.loading = false;
          this.outboundtableData = res.data.data.saleList;
          this.pageSizeout = data.rows;
          this.totalout = res.data.data.totalCount;
       })
       .catch(function(res) {
           console.log(res)
       }) 
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
  }
});