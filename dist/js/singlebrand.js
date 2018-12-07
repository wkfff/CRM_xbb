/** 
 * create author name xiaominzhang
 * create time 2018/8/18
*/
var vue = new Vue({
  el:"#app",
  mounted(){
      var brand_url = '/fenxiao/api/brandClassList';
      var url = this.vueUrl();
      this.brand(url+brand_url);  //品牌机会数据
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
    crmsbrand : [], //品牌
    branddirectory : [], //宝贝目录
    https : '',//请求接口前缀
    saleFlag : [{typename:"全部",typecode:''},{typename:"上架",typecode:1},{typename:"下架",typecode:0}],//是否上架
    followStatu : [{typename:"全部",typecode:''},{typename:"已关注",typecode:1},{typename:"未关注",typecode:0}],//是否关注
    currentPage: 1, //表单分页
    brandType : '', //品牌用于获取相关目录信息
    category : [], //类目
    multipleSelection:[], //选中批量的值
    checkBoxData : [],
    addbabydialog : false, //添加宝贝数
    formLabelWidth: '120px',
    //筛选条件
    select : {
      customerName : '',
      classId : '',
      shopName: '',
      title : '',
      attribute : '',
      subtitle : '',
      spus: '',
      salesFlag: '',
      followStatus: '',
      managerName: '',
      category1 : '',
      category2 : '',
      category3 : ''
    },

    //筛选宝贝类目问题
    selectdir : { 
      directory : ''
    },

    //添加宝贝数据
    insertbabay : {
      url : '',
      classId : ''
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
        this.heightselect.height = '230px';
        this.width.width='95%';
        this.width.left = '5%';
        this.width1.width = '100px';
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

    //品牌请求
    brand(url){
      this.$http.post(url).then((res) => {  //.then() 返回成功的数据
        for(let i=0;i<res.data.data.length;i++){
         // this.brandType = res.data.data[1].id;
          this.crmsbrand.push({"brandName":res.data.data[i].name,"brandCode":res.data.data[i].id});
        }
        var dirurl = '/fenxiao/api/searchItemClassList';
        this.directory(this.https+dirurl,this.directoryPrimse());
      }).catch(function(res) {
          console.log(res)
      })
    
    },

    //宝贝目录数据信息请求处理
    directoryPrimse(){
      return  data ={ 
        start : 0,
        length : 50,
        brandType : this.brandType
      };
    },

    //获取宝贝目录的问题
    directory : function(url,data){
      this.branddirectory.length = 0;
      this.selectdir.directory = '';
      this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        for(let i=0;i<res.data.data.length;i++){
          this.selectdir.directory = res.data.data[i].id;
          this.branddirectory.push({"brandName":res.data.data[i].name,"brandCode":res.data.data[i].id});
        }
        let dirurl =this.https+'/fenxiao/api/searchClassScreen';
        this.getData(dirurl,1,10);
      }).catch(function(res) {
          console.log(res)
      }) 
    },

    //获取table数据
    getData:function(url,pageNum,pageSize){
      //请求页面表单数据
      let para = {
          start: pageNum,
          length: pageSize,
          customerName:  this.select.customerName,
          classId : this.select.classId,
          shopName : this.select.shopName,
          title : this.select.title,
          attribute : this.select.attribute,
          subtitle  : this.select.subtitle,
          spus : this.select.spus,
          salesFlag : this.select.salesFlag,
          followStatus : this.select.followStatus,
          managerName : this.select.managerName,
          category1  : this.select.category1,
          category2 : this.select.category2,
          category3  : this.select.category3,
          classId : this.selectdir.directory
      };
      this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
        this.showTable(res.data.data);
        this.pageSize = pageSize;
        this.total = Number(res.data.recordsTotal);
      })
      .catch(function(res) {
          console.log(res)
      }) 
    },

    //表单数据处理主要是对sku处理
    showTable : function(data){
      var spu = new Array();
      var strSub='';
        for(let i=0;i<data.length;i++){
          spu.length = 0;
          let dataspu = JSON.parse(data[i].spus);
          for(var key in dataspu){
              if(typeof dataspu[key]=='object'){
                  for(let j=0;j<dataspu[key].length;j++){
                      strSub=dataspu[key][j];
                  }
              }else{
                  strSub+=dataspu[key];
              }
              spu.push({"name":key,"name2":strSub})
          }
          data[i].spus = spu;
        }
        this.tableData = data;
    },

    //添加店铺数据信息
    shopPrimsData : function(){
      
    },

    //导出数据
    downloaddp : function(){
      var url = this.https+'/crm/shop/downloadList?paramsJson='+JSON.stringify(this.$options.methods.primsData.bind(this)()); 
      window.location.href = url;
    },

    //监听宝贝变化
    changebrand : function(){
      var labelurl = this.https+'/fenxiao/api/searchItemClassList';
      this.$options.methods.directory.bind(this)(labelurl,this.$options.methods.directoryPrimse.bind(this)());  //方法相互调用
    },

    //监听目录变化
    changedir : function(){
      let dirurl =this.https+'/fenxiao/api/searchClassScreen'
      this.getData(dirurl,1,10);
    },

    //监听搜索条件的变化
    change:function() {
      var labelurl = this.https+'/fenxiao/api/searchClassScreen';
      this.$options.methods.getData.bind(this)(labelurl,this.currentPage,this.pageSize);  //方法相互调用
    },

    //每页显示数据量变更
    handleSizeChange: function(val) {
      var labelurl = this.https+'/fenxiao/api/searchClassScreen';
      this.$options.methods.getData.bind(this)(labelurl,this.currentPage, val);
    },

    //页码变更
    handleCurrentChange: function(val) {
      var pageNo = this.currentPage;
      var pageSize = this.pageSize;
      var labelurl = this.https+'/fenxiao/api/searchClassScreen';
      this.$options.methods.getData.bind(this)(labelurl,val,this.pageSize);
    },

    //点击新增按钮，请求相关数据
    addbaby : function(){
      this.addbabydialog = true;
    },

    //判断添加的宝贝数据是否存在
    babayprise : function(){
      let url =  this.insertbabay.url,
          classId = this.selectdir.directory;
      let data = {
        url : this.insertbabay.url,
        classId : this.selectdir.directory
      };
      //判断都不为空
      if(url!='' && classId!=''){
        return data;
      }else{
        if(classId == ''){
          this.$message('宝宝类目不能为空!');
        }
        if(url ==''){
          this.$message('宝宝链接不能为空!');
        }
        return false;
      }
    },

    //添加宝贝请求
    addChance : function(){
      let data = this.babayprise();
      let addurl = this.https+'/fenxiao/api/addItem';
      if(data !=false){
        this.$http.post(addurl,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          let dirurl =this.https+'/fenxiao/api/searchClassScreen';
          this.getData(dirurl,1,10);
        }).catch(function(res) {
            console.log(res)
        }) 
        this.addbabydialog = false;
      }
    },

    //清除联系人数据
    closeinsertbabay : function(){
      this.insertbabay.url = '';
      this.insertbabay.classId = '';
    },

    changeFun(data) {
      this.checkBoxData = data;
    },

    /** 
     * 处理选中的数据id值
     * data == 1 是批量关注 否则 是批量不关注
    */
    checkBox : function(num){
      var data = new Array();
      for(let i=0;i<this.checkBoxData.length;i++){
        data.push(this.checkBoxData[i].id);
      }
      var followStatus = '';
      if(num == 1){
        followStatus = 1;
      }else{
        followStatus = 0;
      }
      var primsedata = {
        ids : data.join(','),
        followStatus : followStatus
      }
      return primsedata;
    },

    //批量关注
    batchfocus : function(){
      let ids = this.checkBox(1);
      let addurl = this.https+'/fenxiao/api/batchFollow';
      if(data !=false){
        this.$http.post(addurl,ids,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.message == 'success'){
            let dirurl =this.https+'/fenxiao/api/searchClassScreen';
            this.getData(dirurl,1,10);
          }else{
            this.$message('修改状态失败!');
          }
          
        }).catch(function(res) {
            console.log(res)
        }) 
        this.addbabydialog = false;
      }
    },

    //批量不关注
    nobatchfocus : function(){
      let ids = this.checkBox(0);
      let addurl = this.https+'/fenxiao/api/batchFollow';
      if(data !=false){
        this.$http.post(addurl,ids,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
          if(res.data.message == 'success'){
            let dirurl =this.https+'/fenxiao/api/searchClassScreen';
            this.getData(dirurl,1,10);
          }else{
            this.$message('修改状态失败!');
          }
          
        }).catch(function(res) {
            console.log(res)
        }) 
        this.addbabydialog = false;
      }
    }

  }
});