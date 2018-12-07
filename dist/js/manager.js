/** 
 * create author name xiaominzhang
 * create time 2018/10/11
*/
var vue = new Vue({
    el:"#app",
    props:{
        step:{   //此数据是控制动画快慢的
            type:Number,
            default:50  
        }
    },
    mounted(){
        var DWDurl ='/dw/getDWRelation.json';        //大数据维度关系接口
        var DWDreurl = '/dw/getDWDic.json';          //大数据字典数据
        var DWurl = '/dw/getDW.json';                //大数据数据接口获取
        var userurl = '/survey/json/getUserInfo.json'; //当前登录用户请求的接口
        var url = this.vueUrl();                     //获取页面的路径
        this.getUser(url+userurl);                   //获取当前登录用户的组织编码等相关信息
        this.gourl();                                //跳转页面的js处理,获取当前时间对时间选择框赋值
        this.getDWRelation(url+DWDurl);              //获取维度关系
        this.dashboard(url+DWurl);                   //仪表盘、统计
        this.departmentSale(url+DWurl);              //销售数据分析
        this.saleTrand(url+DWurl);                   //销售趋势分析
        this.clienttrand(url+DWurl);                 //客户数据分析
        this.custrend(url+DWurl);                    //客户趋势分析
        this.brandTrand();                           //品牌合作分析
        this.funnelTrand();                          //漏斗分析
        this.showdoc();                              //展示模块数据
        this.agents();                               //待办任务模块
    },
    data:{
        form:{
            typeId:''
        },
        loading: true,              //加载动态
        isHide : true,              //加载时展示，成功隐藏
        isActive:true,             //浮动框显示与隐藏
        show1 : {display:'block'},  //控制div展示
        dsjDic : [],                //大数据字典表数据
        dsjRel : [],                //大数据中数据维度关系
        https : '',                 //页面路径
        iboshttps : '',             //低价报警次数路径
        potentialurl : '',          //待联系潜在客户
        visitUrl:'',                //跟进计划
        stayeurl : '',              //待进货客户 
        enterpriseurl:'',           //客户记录
        enterurl:'',                //单个客户记录
        lowprice : '',              //低价报警次数
        userorgCode : '',           //当前登录用户的orgCode
        crmbrand : [],              //获取部门全部品牌
        bringCilent : [],           //待进货客户
        dashboardSelect : {         //仪表盘数据筛选条件
            time : '',
            company : 'R01',
            dimension : '100000.110',
            type : '11',
            list : ['index32','index2','index33','index16']

        },
        dashboardStatis : { //仪表盘数据
            dashboard1 : {
                target : '',
                accomplish : '',
                finishingRate : ''
            },
            dashboard2 : {
                target : '',
                accomplish : '',
                finishingRate : ''
            },
            statistics : {
                stayContact : '',
                todayFollowPlay : '',
                stayStockClient : '',
                lowPriceAlarmNum : ''
            }
        },
        clientconditions : [        //客户数据分析筛选客户画像二级数据
            {dic_name:'全部',dic_code:'all'}
        ],      
        dashNewTime : [             //分销部当前展示
            {name:"本月",value:4},
            {name:"本年",value:5}
        ],
        custype : '',               //筛选类别，目的查询二级菜单
        clientType : [              //客户类别
            {name:'全部',code:''},
            {name:'客户级别',code:'customer_level'},
            {name:'客户类型',code:'customer_type'},
            {name:'客户来源',code:'customer_source'},
            {name:'合作平台',code:'cooperation_platform'},
            {name:'RFM分层',code:'customer_status'}
        ],
        dashqueryTime : {            //选择展示本年、本月，展示到仪表盘相关出    
            name : 4
        },
        showQuery : '本月',          //展示数据名
        showSale : '本月',           //销售数据分析展示名称
        saleNewTime : [             //销售前展示
            {name:"本月",value:4},
            {name:"本年",value:5}
        ],
        saleShow : {                //销售数展示模板
            show_month : true,
            show_year : false
        },
        saleQeryTime : {            //销售数据年月展示以及时间处理
            name : 4
        },
        saleSelect : {              //销售数据参数请求
            time : '',
            company : 'R01',
            brand : 'all',
            dimension : '100000.110',
            type : '11',
            list : ['index33','index16','index36','index37']
        },   
        custrand : {                //客户趋势分析
            detail : [],
            time : [],
            series : [],
        },
        sale : { //销售趋势时间段
            saledata1 : '',
            saledata2 : '',
            company : 'R01',
            brand : 'all',
            dimension : '100000.110',
            type : '11',
            list : ['index33','index16','index36','index37']
        },
        saleAnalysis : { //销售趋势分析

        },
        section : {//部门月销售数据分析
            target : '',
            accomplish : '',
            finishingRate : '',
            clientSale : '',
            lossSale : ''
        }, 
        clientTime : { //客户趋势时间
            saledata1 : '',
            saledata2 : '',
            company : 'R01',
            brand : 'all',
            dimension : '100000.110',
            type : '11',
            list : ['index1','index2','index7','index8','index3','index4','index5']
        },
        cusdatafx : {  //客户数据分析
            time : '',
            company : 'R01',
            brand : 'all',
            conditions : 'all',
            dimension : '100000.110',
            type : '11',
            list : ['index1','index2','index7','index8','index3','index4','index5']
        },
        clienData :{
            data : {
                cumulative : '',
                newclient : '',
                threeclient : '',
                sixclient:'',
                twelveclient:'',
                followclient:'',
                clienttotal : ''
            },
            datadetail : [],
            series :[],
        },
        select : {//选择品牌
            brand:'',
            fxmonth : ''
        },
        brandTime : { //品牌机会时间选择
            saledata1 : '',
            saledata2 : ''
        },
        brantrand : {  //品牌合作机会分析
            detail : [],
            time : [],
            series : [],
        },
        funneltime : {
            time : ''
        }, //销售漏斗
        funnelld : { //漏斗图
            detail : [],
            series : []
        }
    },
    created : function(){
        var vm=this;
        window.onscroll=function(){
            if (document.documentElement.scrollTop>60) {
                vm.isActive=true;
            }else {
                vm.isActive=false;
            }
            let heightclient = $('.client').offset().top-80;
            let heightsale = $('.sale').offset().top-80;
            if(document.documentElement.scrollTop>0 && document.documentElement.scrollTop<heightclient){
                $('.toTop').css({'background-color':'rgba(0,0,0,.5)'});
                $('.toclient').css({'background-color':'rgba(0,0,0,.2)'});
                $('.tosale').css({'background-color':'rgba(0,0,0,.2)'});
            }else if(document.documentElement.scrollTop>heightclient && document.documentElement.scrollTop<heightsale){
                $('.toTop').css({'background-color':'rgba(0,0,0,.2)'});
                $('.toclient').css({'background-color':'rgba(0,0,0,.5)'});
                $('.tosale').css({'background-color':'rgba(0,0,0,.2)'});
            }else if(document.documentElement.scrollTop>heightsale){
                $('.toTop').css({'background-color':'rgba(0,0,0,.2)'});
                $('.toclient').css({'background-color':'rgba(0,0,0,.2)'});
                $('.tosale').css({'background-color':'rgba(0,0,0,.5)'});
            }
        }
    },
    methods:{
        //获取当前页面的url路径
        vueUrl :function(){
            var url = location.href.split('/rhmcrm')[0];
            if(url == "http://test.runhemei.com/maochao_test"){
                url = "http://test.runhemei.com/maochao";
                this.https = url;
                return url;
            }else if(url == 'http://ibos.runhemei.com/maochao_test'){
                url = "http://ibos.runhemei.com/maochao";
                this.https = url;
                return url;
            }else{
                this.https = url;
                return url;
            }
        },

        //获取当前登录用户的信息
        getUser : function(url){
            this.$http.get(url).then((res) => {  //.then() 返回成功的数据
                this.userorgCode = res.data.data.org.orgCode;
            })
            .catch(function(res) {
                console.log(res)
            }) 
        },

        //判断在ibos中，弹出新的标签页
        openPageTypes : function(obj){
            window.parent.addTabs(obj);
        },

        //大数据维度关系
        getDWRelation : function(url){
            //请求页面表单数据
            let para = {
               type : 11
           };
           this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                this.hqwdDataDeil(res.data.data);
           })
           .catch(function(res) {
               console.log(res)
           })
       },

        //获取数据进行维度数据处理
        hqwdDataDeil : function(data){   
            //此方法，主要处理通用的数据展示，包括把公司、渠道、品牌、店铺、仓库进行数据拆分赋值处理
            //第一层for循环,是区分公司;第二层for循环,是区分渠道;第三层for循环,是区分品牌;第四层for循环,是区分店铺(客户):第五层for循环,是区分仓库.
            var datasx = new Array();
            var url = '/dw/getDWDic.json';
            for (let i in data) {
                let customer = i;
                child = data[i];
                var  ditch = new Array();
                for (let j in child) {
                    let ditchName = j;
                    let brand = new Array();
                    ditch.push({"ditch":ditchName,"brandList":brand});
                    for (let m in child[j]) {
                        let brandName = m;
                        let shop = new Array();
                        brand.push({"brand":brandName,"shopList":shop});
                        for(let q in child[j][m]){
                            let shopName = q;
                            let warehouList = new Array();
                            shop.push({"shop":shopName,"warehousesList":warehouList});
                            for(let p in child[j][m][q]){
                                let warehousesName = p;
                                warehouList.push({"warehous":warehousesName});
                            }
                        }                   
                    }
                }
                this.dsjRel = [{"customer":customer,"ditchList":ditch}];
                this.getDWDic(this.https+url);
            }
        },

        //获取大数据字典数据
        getDWDic : function(url){
             //请求页面表单数据
             let para = {
                type : 11
            };
            this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                this.dealDicRel(res.data.data); //处理大数据字典表以及维度关系区交集的数据
            })
            .catch(function(res) {
                console.log(res)
            }) 
        },

        //判断完成率
        RateIf : function(data){
            if(data == 'NaN'){
                return 0;
            }else{
                return data;
            }
        },

        //对于获取的大数据字典表、维度关系进行取交际处理
        dealDicRel : function(data){
            var datainter = new Array(); 
            for(var i=0;i<data.length;i++){
                for(var j=0;j<this.dsjRel.length;j++){
                    if(this.dsjRel[j].customer == data[i].dic_code){
                        datainter.push(data[i]);
                    }
                    for(var j1=0;j1<this.dsjRel[j].ditchList.length;j1++){
                        if(this.dsjRel[j].ditchList[j1].ditch == data[i].dic_code){
                            datainter.push(data[i]);
                        }
                        for(var j2 = 0;j2<this.dsjRel[j].ditchList[j1].brandList.length;j2++){
                            if(this.dsjRel[j].ditchList[j1].brandList[j2].brand == data[i].dic_code){
                                datainter.push(data[i]);
                            }
                            for(var j3=0;j3<this.dsjRel[j].ditchList[j1].brandList[j2].shopList.length;j3++){
                                if(this.dsjRel[j].ditchList[j1].brandList[j2].shopList[j3].shop == data[i].dic_code){
                                    datainter.push(data[i]);
                                }
                                for(var j4=0;j4<this.dsjRel[j].ditchList[j1].brandList[j2].shopList[j3].warehousesList.length;j4++){
                                    if(this.dsjRel[j].ditchList[j1].brandList[j2].shopList[j3].warehousesList[j4].warehous == data[i].dic_code){
                                        datainter.push(data[i]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //数据去重
            this.heavy(datainter);
        },

        //获取数据去重后赋值
        heavy : function(data){
            for(var i = 0; i < data.length-1; i++){
                for(var j = i+1; j < data.length; j++){
                    if(data[i]==data[j]){
                        data.splice(j,1);
                        j--;
                   }
                }
            }
            this.dsjDic = data;
            this.obtainBrand(data); //处理部门所有品牌
        },

        /** 
         * 页面加载时，去掉默认vue加载时展示的{{}}双括号展示问题
         * 方法一：使用方法showdoc，页面中，查找：当无数据时展示的布局 方法一：双括号问题
         * 方法二：使用 v-cloak，在页面中添加<div v-cloak> 目前使用的时方法一、方法二同时使用
        */

        //展示模块数据 页面刷新时隐藏的数据
        showdoc : function(){
            //页面进来，加载此方法，禁止鼠标滑动
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",mo,false);//禁止页面滑动
            setTimeout(() => {
                this.isShow = true; //加载时隐藏，成功显示
                this.isHide = true; //加载时展示，成功隐藏
                this.loading = false;
                this.show1.display = 'none';//控制div展示
                var mo=function(e){e.preventDefault();};
                document.body.style.overflow='';//出现滚动条
                document.removeEventListener("touchmove",mo,false);
                //页面进来，加载此方法，使用鼠标滑动
            }, 3000);
        },
        
        //调整页面路径以及参数添加
        gourl : function(){
            //获取当前日期
            var data = this.time(1); //1表示年月日,2表数年月,3表数选择时间段年月,4表示数据月
            this.potentialurl = '/maochao/rhmcrm/view/enterprise/potential.html?searchPotentialCus=1';
            this.visitUrl =  '/maochao/rhmcrm/view/visit/visitPlay.html?time='+data+'&status=0';
            this.enterpriseurl =  '/maochao/rhmcrm/view/enterprise/enterprise.html?time='+data;
            var department = this.time(4);
            this.dashboardSelect.time = department; //仪表盘时间
            var fxtime = this.time(4);
            this.select.fxmonth = fxtime;//分销月
            var timesingle = this.time(2);
            this.cusdatafx.time = timesingle;  //客户数据分析时间默认
            this.funneltime.time = timesingle; //销售漏斗时间默认
            var period = this.time(3);
            this.sale.saledata1 = period; //销售开始时间
            this.sale.saledata2 = timesingle; //销售截止时间
            this.brandTime.saledata1 = period; //品牌机会开始时间
            this.brandTime.saledata2 = timesingle; //品牌机会截止时间
            this.clientTime.saledata1 = period; //客户趋势开始时间
            this.clientTime.saledata2 = timesingle; //客户趋势截止时间
        },

        //获取当前日期
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
            }else if(date == 4){
                return year+''+month;
            }else if(date == 5){
                return year;
            }else if(date == 6){
                return year+'-'+month+'-'+day+ ' 00:00:00';
            }else if(date == 7){
                return year+'-'+month+'-'+day+ ' 23:59:59';
            }
        },

        //选择仪表盘展示数据是本月、本年
        dashquerychange : function(data){
            //动态展示仪表盘标题本年、本月信息
            if(data == 4){
                this.showQuery = '本月';
                this.dashboardSelect.time = this.time(data); 
                this.dashboardSelect.dimension = '100000.110';
            }else if(data == 5){
                this.showQuery = '本年';
                this.dashboardSelect.time = this.time(data); 
                this.dashboardSelect.dimension = '100000.100';
            }
            var url='/dw/getDW.json';
            this.dashboard(this.https+url);
        },

        //仪表盘条件处理
        dashboardPrimse : function(){
            var data = {
                "dateBegin" : this.dashboardSelect.time,
                "dateEnd" : this.dashboardSelect.time,
                "tier1" : this.dashboardSelect.company,
                "dimension" : this.dashboardSelect.dimension,
                "type" : this.dashboardSelect.type,
                "fields" : this.dashboardSelect.list.join(',')
            }; 
            return data;
        },

        /**
         * 请求仪表盘1、仪表盘2、工作统计的数据 
         * 请求后台接口进行对对象赋值
         */
        dashboard : function(url){
             //请求页面表单数据
             let para = this.$options.methods.dashboardPrimse.bind(this)();
            this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                let dashdata = res.data.data.result;
                if(dashdata.length>0){
                    for(let i=0;i<dashdata.length;i++){
                        var Rate1 = ((dashdata[i].index2?dashdata[i].index2/(dashdata[i].index32?dashdata[i].index32:0):0)*100).toFixed(2),
                        Rate2 =((dashdata[i].index16?dashdata[i].index16/(dashdata[i].index33?dashdata[i].index33:0).toFixed(2):0)*100).toFixed(2);
                        if(Rate1 == 'Infinity'){
                            Rate1 = 0;
                        }
                        if(Rate2 == 'Infinity'){
                            Rate2 = 0;
                        }
                        this.dashboardStatis.dashboard1 = {
                            "target":dashdata[i].index32?dashdata[i].index32:0,
                            "accomplish":dashdata[i].index2?dashdata[i].index2:0,
                            "finishingRate":Rate1
                        };
                        this.dashboardStatis.dashboard2 = {
                            "target":dashdata[i].index33?dashdata[i].index33:0,
                            "accomplish":dashdata[i].index16?dashdata[i].index16:0,
                            "finishingRate":Rate2
                        }
                    }
                }else{
                    this.dashboardStatis.dashboard1 = {"target":0,"accomplish":0,"finishingRate":0};
                    this.dashboardStatis.dashboard2 = {"target":0,"accomplish":0,"finishingRate":0}
                }
               
                
                 this.fxdashboard1();
                 this.fxdashboard2();
            })
            .catch(function(res) {
                this.dashboardStatis.dashboard1 = {"target":0,"accomplish":0,"finishingRate":0};
                 this.dashboardStatis.dashboard2 = {"target":0,"accomplish":0,"finishingRate":0}
                 this.fxdashboard1();
                 this.fxdashboard2();
            })
        },
    
        //分销仪表盘展示
        fxdashboard1 : function(){
            var myChart1= echarts.init(document.getElementById('mychart1'));
            // 指定图表的配置项和数据
            option = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series : [
                    {
                        name:'业务指标',
                        radius: '80%',
                        type:'gauge',
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [0.09, 'lime'],
                                    [0.82, '#1e90ff'],
                                    [1, '#ff4500']
                                ],
                                width: 3,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: { // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#000',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: { // 分隔线
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 15,
                                fontStyle: 'italic',
                                color: '#000',
                                shadowColor: '#000', //默认透明
                                shadowBlur: 10
                            }
                        },
                        
                        detail : {formatter:'{value}%'},
                        data:[{value: this.dashboardStatis.dashboard1.finishingRate, name: '完成率'}]
                    }
                ]
            };
    
            // 使用刚指定的配置项和数据显示图表。
            myChart1.setOption(option);
            window.addEventListener("resize",function(){
                myChart1.resize(); 
            });
        },
    
        //分销仪表盘展示
        fxdashboard2 : function(){
            var fxdashboard2 = echarts.init(document.getElementById('fxdashboard2'));
            // 指定图表的配置项和数据
            optionshboard2 = {
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                series : [
                    {
                        name:'业务指标',
                        radius: '80%',
                        type:'gauge',
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: [
                                    [0.09, 'lime'],
                                    [0.82, '#1e90ff'],
                                    [1, '#ff4500']
                                ],
                                width: 3,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: { // 坐标轴小标记
                            textStyle: { // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#000',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 15, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: { // 分隔线
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 15,
                                fontStyle: 'italic',
                                color: '#000',
                                shadowColor: '#000', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail : {formatter:'{value}%'},
                        data:[{value: this.dashboardStatis.dashboard2.finishingRate, name: '完成率'}]
                    }
                ]
            };
    
            // 使用刚指定的配置项和数据显示图表。
            fxdashboard2.setOption(optionshboard2);
            window.addEventListener("resize",function(){
                fxdashboard2.resize(); 
            });
        },

        /** 
         * 待办任务处理
         * 1、待联系潜在客户
         * 2、待进货客户
         * 3、今日跟进计划
         * 4、低价警报次数
         * 以上的4个功能
        */

       agents : function(){
           //请求待联系潜在客户
           let stayContactPCUrl = this.https+'/crm/customer/countContactCustomer';
           this.stayContactPotential(stayContactPCUrl);
           //请求待进货客户
           let stayStockUrl = this.https+'/crm/customer/countWaitStockCustomer';
           this.stayStock(stayStockUrl);
           //请求今日跟进计划
           let todayFollowUrl = this.https+'/crm/callback/listCallBackPlan';
           this.todayFollow(todayFollowUrl);
           //低价警报次数
           let lowPriceAlarmUrl = this.https+'/fenxiao/api/itemPriceAlert';
           this.lowPriceAlarm(lowPriceAlarmUrl);
       },

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

       //待联系客户数请求接口
       stayContactPotential : function(url){
        this.$http.post(url,{isManager:1},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
            this.dashboardStatis.statistics.stayContact = res.data.data;
        })
        .catch(function(res) {
             this.dashboardStatis.statistics.stayContact = 0;
        })
       },

       //带进货客户
       stayStock : function(url){
        this.$http.post(url,{isManager:1},{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
            this.dashboardStatis.statistics.stayStockClient = res.data.data.length;
            //待进货参数处理，目的是查询客户的信息
            this.bringCustomer(res.data.data);
        })
        .catch(function(res) {
            this.dashboardStatis.statistics.stayStockClient = 0;
        })
       },

        //待进货参数处理，目的是查询客户的信息
        bringCustomer : function(data){
            for(let i=0;i<data.length;i++){
                this.bringCilent.push(data[i].id);
            }
            this.stayeurl = '/maochao/rhmcrm/view/enterprise/enterprise.html?id='+this.bringCilent.join(',');
        },


        //请求今日跟进计划
        todayFollow : function(url){
            let data = {
                status:0,
                startTime: this.time(6),
                endTime: this.time(7)
            }
            this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                this.dashboardStatis.statistics.todayFollowPlay = res.data.data.totalCount;
            })
            .catch(function(res) {
                this.dashboardStatis.statistics.todayFollowPlay = 0;
            })
        
        },

       //低价警报次数
       lowPriceAlarm : function(url){
            //此功能是进其他系统，进行数据查询，坑比较多，后来者要小心。
            //经理页面，品牌是全部的品牌，查询低价报警次数也是全部品牌。
            let data = {
                start:0,
                length:10,
                newFlag:1,
                inform:-1,
                reviewType:0

            };
            this.$http.post(url,data,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                this.dashboardStatis.statistics.lowPriceAlarmNum = res.body.recordsTotal;
                this.lowprice = this.https+'/fenxiao/priceWarning.html';
            })
            .catch(function(res) {
                this.dashboardStatis.statistics.lowPriceAlarmNum = 0;
            })
       
       },


        //品牌数据展示
        obtainBrand : function(data){
            var brand = new Array();
            brand.push({"dic_name":"全部","dic_code":"all"});
            for(var i=0;i<data.length;i++){
                if(data[i].dic_type == 'brand11'){
                    if(data[i].dic_code != 'all'){
                        brand.push(data[i]);
                    }
                }
            }
            this.crmbrand = brand;
        },

    
        /**
         *  销售数据分析
         *  请求后台接口进行对对象赋值
         */

        //销售数据查询条件处理
        saleprimseData : function(){
            if(this.saleSelect.brand == 'all' && this.saleQeryTime.name ==4){
                this.saleSelect.dimension = '100000.110';
            }else if(this.saleSelect.brand != 'all' && this.saleQeryTime.name ==4){
                this.saleSelect.dimension = '101000.110';
            }else if(this.saleSelect.brand != 'all' && this.saleQeryTime.name ==5){
                this.saleSelect.dimension = '101000.100';
            }else if(this.saleSelect.brand == 'all' && this.saleQeryTime.name ==5){
                this.saleSelect.dimension = '100000.100';
            }
            //数据整合
            var data = {
                dateBegin : this.time(this.saleQeryTime.name),
                dateEnd : this.time(this.saleQeryTime.name),
                tier1 : this.saleSelect.company,
                tier3 : this.saleSelect.brand,
                dimension : this.saleSelect.dimension,
                type : this.saleSelect.type,
                fields:this.saleSelect.list.join(',')
            }
            return data;
        },

        //监听销售数据分析
        salwquerychange : function(data){
            if(data == 4){
                this.showSale = '本月';
                this.saleShow.show_month = true;
                this.saleShow.show_year = false;
            }else if(data == 5){
                this.showSale = '本年';
                this.saleShow.show_month = false;
                this.saleShow.show_year = true;
            }
            var url='/dw/getDW.json';
            this.departmentSale(this.https+url);
        },

        //部门销售数据分析
        departmentSale : function(url){
            //请求数据
            let para = this.$options.methods.saleprimseData.bind(this)();
            this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                //销售数据展示
                let departData = res.data.data.result;
                if(departData.length>0){
                    for(let i=0;i<departData.length;i++){
                        this.section.target = departData[i].index33?Number(departData[i].index33).toFixed(2):0;
                        this.section.accomplish = departData[i].index16?Number(departData[i].index16).toFixed(2):0;
                        this.section.finishingRate = ((this.section.accomplish/this.section.target)*100).toFixed(2)=='Infinity'?0:((this.section.accomplish/this.section.target)*100).toFixed(2);
                        this.section.clientSale = departData[i].index36?Number(departData[i].index36).toFixed(2):0;
                        this.section.lossSale = departData[i].index37?Number(departData[i].index37).toFixed(2):0;
                    }
                }else{
                    this.section.target = '0';
                    this.section.accomplish = '0';
                    this.section.finishingRate = '0';
                    this.section.clientSale = '0';
                    this.section.lossSale = '0';
                }
            })
            .catch(function(res) {
                this.section.target = '0';
                this.section.accomplish = '0';
                this.section.finishingRate = '0';
                this.section.clientSale = '0';
                this.section.lossSale = '0';
            })
        },

       
        /**
         * 销售趋势分析监听
         * 请求后台接口数据
         */

        //销售趋势数据参数整理
        saleTrandPrimes : function(){
            var data = {
                dateBegin : this.sale.saledata1.replace(/\-/g, ""),
                dateEnd : this.sale.saledata2.replace(/\-/g, ""),
                tier1 : this.sale.company,
                tier3 : this.sale.brand,
                dimension : this.sale.dimension,
                fields : this.sale.list.join(','),
                type : this.sale.type
            };
            return data;
        },


        //监听销售趋势分析
        changeSale : function(){
            //判断品牌是否为all
            if(this.sale.brand == 'all'){
                this.sale.dimension = '100000.110';
            }else{
                this.sale.dimension = '101000.110';
            }
            var url='/dw/getDW.json';
            this.saleTrand(this.https+url);
        },

        //获取销售趋势分析的数据
        saleTrand:function(url){
            this.saleAnalysis.amount = ['目标销售额','完成销售额','完成率','新增客户销售额','流失客户半年月均销售额'];
            this.saleAnalysis.month = this.getMonthAll(this.sale.saledata1,this.sale.saledata2);
            let timeData = new Array();
            for(let i=0;i<this.saleAnalysis.month.length;i++){
                timeData.push(this.saleAnalysis.month[i].replace(/\-/g, ""));
            }
            //请求数据
            let para = this.$options.methods.saleTrandPrimes.bind(this)();
            this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                //调用客户趋势展示的方法
                this.saleTrandEcharts(timeData,this.ArrayProjectSum(res.data.data.result));
            })
            .catch(function(res) {
                console.log("请求数据失败");
            })
        },

        //销售趋势分析数据处理
        saleTrandEcharts : function(timeData,datashow){
            //this.clientTime
            var data1 = new Array(), //目标销售额
                data2 = new Array(), //完成销售额
                data3 = new Array(), //完成率
                data4 = new Array(), //新增客户销售额
                data5 = new Array(); //流水客户半年月均销售额
            for(let i=0;i<datashow.length;i++){
                for(let j=0;j<timeData.length;j++){
                    if(timeData[j] == datashow[i].data_date){
                        data1.push({'time':timeData[j],value:datashow[i].index33?Number(datashow[i].index33):0}); //目标销售额
                        data2.push({'time':timeData[j],value:datashow[i].index16?Number(datashow[i].index16):0}); //完成销售额
                        data3.push({'time':timeData[j],value:(((datashow[i].index16?Number(datashow[i].index16):0)/(datashow[i].index33?Number(datashow[i].index33):0))*100).toFixed(2)}); //完成率 
                        data4.push({'time':timeData[j],value:datashow[i].index36?Number(datashow[i].index36):0}); //新增客户销售额
                        data5.push({'time':timeData[j],value:datashow[i].index37?Number(datashow[i].index37).toFixed(2):0}); //流水客户半年月均销售额

                    }else{
                        data1.push({'time':timeData[j],value:0});
                        data2.push({'time':timeData[j],value:0});
                        data3.push({'time':timeData[j],value:0}); 
                        data4.push({'time':timeData[j],value:0});
                        data5.push({'time':timeData[j],value:0});  
                    }
                }
            }

            this.saleAnalysis.series = [
                {
                    name:'完成率',
                    type:'line',
                    stack: '',
                    yAxisIndex: 1,
                    data:this.heavy1(data3,timeData),
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                positiong: 'top',
                                formatter: '{c}%'
                            }
                        }
                    }
                },{
                    name:'目标销售额',
                    type:'line',
                    stack: '',
                    data:this.heavy1(data1,timeData),
                },
                {
                    name:'完成销售额',
                    type:'line',
                    stack: '',
                    data:this.heavy1(data2,timeData)
                },
                {
                    name:'新增客户销售额',
                    type:'line',
                    stack: '',
                    data:this.heavy1(data4,timeData)
                },
                {
                    name:'流失客户半年月均销售额',
                    type:'line',
                    stack: '',
                    data:this.heavy1(data5,timeData)
                }
            ];
            //销售趋势分析折线图
            this.fxtrend();
         
        },


        //销售趋势分析折线图
        fxtrend:function(){
          var mychartsale= echarts.init(document.getElementById('mychartsale'));
          // 指定图表的配置项和数据
          option = {
              tooltip : {
                  trigger: 'axis'
              },
              legend: {
                y : 'bottom',
                  data:this.saleAnalysis.amount
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
                      data : this.saleAnalysis.month
                  }
              ],
              yAxis : [
                  {
                      name: '金额',
                      type : 'value',
                      scale:true,
                  },{
                      name: '完成率',
                      type: 'value',
                      scale:true,
                      min: 0,
                      max: 100,        // 计算最大值
                      interval: Math.ceil(100 / 5),   //  平均分为5份
                      axisLabel: {  
                          show: true,    
                          formatter: '{value} %'  
                      }
                      
                  }
              ],
              series : this.saleAnalysis.series
          };        
  
          // 使用刚指定的配置项和数据显示图表。
          mychartsale.setOption(option);
          window.addEventListener("resize",function(){
              mychartsale.resize(); 
          });
        },

        //请求二级客户画像
        changeconditions : function(){
            var url = this.https+'/dw/customerPortrait';
            this.clientconditions.length = 0;
            this.clientconditions.push({dic_name:'全部',dic_code:'all'});
            if(this.custype == ''){
                 //请求饼状图展示数据
                 this.clientPie();
            }
            this.$http.get(url,{params:{
                "ext" : this.custype
              }}).then((res) => {  //.then() 返回成功的数据
                for(let i=0;i<res.data.data.length;i++){
                    this.clientconditions.push(res.data.data[i]);
                }
                //请求饼状图展示数据
                this.clientPie();
              })
              .catch(function(res) {
                  console.log(res)
              }) 
        },

        //饼状图请求数据参数
        clientpiePrimse : function(){
            let dateBegin = this.cusdatafx.time.replace(/\-/g, ""),
                tier1 = this.cusdatafx.company,
                tier2 = 'all',
                tier3 = 'all',
                tier4 = this.custype,
                tier5 = 'all';
           
            var data = {
                "dateBegin" : dateBegin,
                "tier1" : tier1,
                "tier2" : tier2,
                "tier3" : tier3,
                "tier4" : tier4,
                "tier5" : tier5,
                "dimension" : '100100.110'
            }; 
            return data;
        },

        //只判断品牌，客户画像不判断
        clientpie1Primse : function(){
            let dateBegin = this.cusdatafx.time.replace(/\-/g, ""),
            tier1 = this.cusdatafx.company,
            tier2 = 'all',
            tier3 = this.cusdatafx.brand,
            tier4 = 'all',
            tier5 = 'all';
            var data = '';
            if(tier3 == 'all'){
                data = {
                    "dateBegin" : dateBegin,
                    "tier1" : tier1,
                    "tier2" : tier2,
                    "tier4" : tier4,
                    "tier5" : tier5,
                    "dimension" : '101000.110'
                }; 
            }else{
                data = {
                    "dateBegin" : dateBegin,
                    "tier1" : tier1,
                    "tier2" : tier2,
                    "tier3" : tier3,
                    "tier4" : tier4,
                    "tier5" : tier5,
                    "dimension" : '101000.110'
                }; 
            }
       
            return data;
        },
        
        //请求饼状图展示数据
        clientPie : function(){
            var url = '',piedata = '';
            if(this.custype == ''){
                url = this.https+'/dw/getCustomerBrandVal';
                piedata = this.clientpie1Primse();
            }else{
                url =this.https+'/dw/getCustomerDrawVal';
                piedata = this.clientpiePrimse();
            }
            this.$http.get(url,{params:piedata}).then((res) => {  //.then() 返回成功的数据
                //请求饼状图展示数据
                this.clientpiechar(res.data);
            })
            .catch(function(res) {
                console.log(res)
            }) 
        },

        //客户画像饼状图展示
        clientpiechar : function(data){
            this.clienData.datadetail.length = 0;
            this.clienData.series.length = 0;
            for(let i=0;i<data.length;i++){
                this.clienData.datadetail.push(data[i].typename);
                this.clienData.series.push({value:data[i].index1, name:data[i].typename});
            }
            //加载饼状图
            this.cusanalyze();
        },


        /** 
         * 客户数据分析相关功能
        */

        //客户数据分析参数处理
        clientTrandPrimse : function(){
            var data = {
                "dateBegin" : this.cusdatafx.time.replace(/\-/g, ""),
                "dateEnd" : this.cusdatafx.time.replace(/\-/g, ""),
                "tier1" : this.cusdatafx.company,
                "tier3" : this.cusdatafx.brand,
                "tier4" : this.cusdatafx.conditions,
                "dimension" : this.cusdatafx.dimension,
                "type" : this.cusdatafx.type,
                "fields" : this.cusdatafx.list.join(',')
            }; 
            return data;
        },

        //监听下拉框变化
        changeAnalysis : function(){
            if(this.cusdatafx.brand!='all' && this.cusdatafx.conditions == 'all'){
                this.cusdatafx.dimension = '101000.110';
            }else if(this.cusdatafx.brand=='all' && this.cusdatafx.conditions != 'all'){
                this.cusdatafx.dimension = '100100.110';
            }else if(this.cusdatafx.brand!='all' && this.cusdatafx.conditions != 'all'){
                this.cusdatafx.dimension = '101100.110';
            }else{
                this.cusdatafx.dimension = '100000.110';
            }
            var url = this.https+'/dw/getDW.json';
            this.clienttrand(url);
        },

        //客户数据分析
        clienttrand : function(url){
            //请求数据
            let para = this.$options.methods.clientTrandPrimse.bind(this)();
            this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
            //调用客户数据展示的方法
            this.clientTrandShow(res.data.data.result);

            })
            .catch(function(res) {
                console.log("请求数据失败");
            })
        },

        //客户数据展示的方法
        clientTrandShow : function(data){
            if(data.length>0){
                for(var i=0;i<data.length;i++){
                    this.clienData.data.cumulative = data[i].index1?data[i].index1:0;
                    this.clienData.data.newclient = data[i].index2?data[i].index2:0;
                    this.clienData.data.threeclient = data[i].index3?data[i].index3:0;
                    this.clienData.data.sixclient = data[i].index4?data[i].index4:0;
                    this.clienData.data.twelveclient = data[i].index5?data[i].index5:0;
                    this.clienData.data.followclient = data[i].index7?data[i].index7:0;
                    this.clienData.data.clienttotal = data[i].index8?data[i].index8:0;
                }
            }else{
                this.clienData.data.cumulative = 0;
                this.clienData.data.newclient = 0;
                this.clienData.data.threeclient = 0;
                this.clienData.data.sixclient = 0;
                this.clienData.data.twelveclient =0;
                this.clienData.data.followclient =0;
                this.clienData.data.clienttotal = 0;
            }

            //请求只有品牌、没有客户画像的饼状图数据
            this.clientPie();
        },

        //客户数据分析饼状图
        cusanalyze : function(){
            var mychartcus= echarts.init(document.getElementById('mychartcus'));
            // 指定图表的配置项和数据
            option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // legend: {
                //     top: 10,
                //     left: 'center',
                //    // data:  this.clienData.datadetail
                // },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true, 
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '15%',
                                    width: '30%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'', //访问来源
                        type:'pie',
                        radius : '50%',
                        center: ['45%', '30%'],
                        data: this.clienData.series
                    }
                ]
            };      

            // 使用刚指定的配置项和数据显示图表。
            mychartcus.setOption(option);
            window.addEventListener("resize",function(){
                mychartcus.resize(); 
            }); 
        },

        //客户趋势的数据整合
        clientPrimse : function(){
            var data = {
                "dateBegin" : this.clientTime.saledata1.replace(/\-/g, ""),
                "dateEnd" : this.clientTime.saledata2.replace(/\-/g, ""),
                "tier1" : this.clientTime.company,
                "tier3" : this.clientTime.brand,
                "dimension" : this.clientTime.dimension,
                "type" : this.clientTime.type,
                "fields" : this.clientTime.list.join(',')
            }; 
            return data;
        },


        /**
         * 客户趋势分析请求接口数据整合
         *  请求后台接口 
        */
        custrend:function (url) {
            this.custrand.detail = ['客户总数','新增客户','跟进客户','跟进次数','近3月成交客户数','近6月成交客户数','近12月成交客户数'];
            this.custrand.time = this.getMonthAll(this.clientTime.saledata1,this.clientTime.saledata2);
            let timeData = new Array();
            for(let i=0;i<this.custrand.time.length;i++){
                timeData.push(this.custrand.time[i].replace(/\-/g, ""));
            }
            //请求数据
            let para = this.$options.methods.clientPrimse.bind(this)();
            this.$http.post(url,para,{emulateJSON: true}).then((res) => {  //.then() 返回成功的数据
                //调用客户趋势展示的方法
                this.ClientEcharts(timeData,this.ArrayProjectSum(res.data.data.result));
            })
            .catch(function(res) {
                console.log("请求数据失败");
            })
        },

         //判断数据对象合并求和
         ArrayProjectSum : function(data){
            //次判断暂时用不上，但返回值需要
            // for(let i=0;i<data.length;i++){
            //     for(let j=i;j<data.length;j++){
            //         if(data[i].data_date == data[j].data_date){
            //         }
            //     }
            // }
            return data;
         },

        //获取数据去重后赋值,
        heavy1 : function(data,data1){
            var dataArr = new Array();
            if(data.length >data1.length){
                for(var i = 0; i < data.length-1; i++){
                    for(var j = i+1; j < data.length; j++){
                        if(data[i].time==data[j].time){
                           if(data[i].value>=data[j].value){
                                dataArr.push(data[i].value);
                           }else{
                            dataArr.push(data[j].value);
                           }
                       }
                    }
                }
            }else{
                for(var i=0;i< data.length;i++){
                    dataArr.push(data[i].value);
                }
            }
           
            return dataArr;
        },
         //调用客户趋势展示的方法
        ClientEcharts : function(timeData,datashow){
             //this.clientTime
            var data1 = new Array(), //客户总数
                data2 = new Array(), //新增客户
                data3 = new Array(), //近3月成交客户数
                data4 = new Array(), //近6月成交客户数
                data5 = new Array(), //近12月成交客户数
                data6 = new Array(), //跟进客户
                data7 = new Array(); //跟进次数
            for(let i=0;i<datashow.length;i++){
                for(let j=0;j<timeData.length;j++){
                    if(timeData[j] == datashow[i].data_date){
                        data1.push({'time':timeData[j],value:datashow[i].index1?datashow[i].index1:0}); //客户总数
                        data2.push({'time':timeData[j],value:datashow[i].index2?datashow[i].index2:0}); //新增客户
                        data3.push({'time':timeData[j],value:datashow[i].index3?datashow[i].index3:0}); //近3月成交客户数
                        data4.push({'time':timeData[j],value:datashow[i].index4?datashow[i].index4:0}); //近6月成交客户数
                        data5.push({'time':timeData[j],value:datashow[i].index5?datashow[i].index5:0}); //近12月成交客户数
                        data6.push({'time':timeData[j],value:datashow[i].index7?datashow[i].index7:0}); //跟进客户
                        data7.push({'time':timeData[j],value:datashow[i].index8?datashow[i].index8:0}); //跟进次数

                    }else{
                        data1.push({'time':timeData[j],value:0});
                        data2.push({'time':timeData[j],value:0});
                        data3.push({'time':timeData[j],value:0});
                        data4.push({'time':timeData[j],value:0});
                        data5.push({'time':timeData[j],value:0});
                        data6.push({'time':timeData[j],value:0});
                        data7.push({'time':timeData[j],value:0});
                    }
                }
            }
            this.custrand.series =  [
                {
                    name:'客户总数',
                    type:'line',
                    stack: '',
                    data: this.heavy1(data1,timeData)
                },{
                    name:'新增客户',
                    type:'line',
                    stack: '',
                    data:this.heavy1(data2,timeData)
                },
                {
                    name:'近3月成交客户数',
                    type:'line',
                    stack: '',
                    data:this.heavy1(data3,timeData)
                },
                {
                    name:'近6月成交客户数',
                    type:'line',
                    stack: '',
                    data: this.heavy1(data4,timeData)
                },
                {
                    name:'近12月成交客户数',
                    type:'line',
                    stack: '',
                    data: this.heavy1(data5,timeData)
                },
                {
                    name:'跟进客户',
                    type:'line',
                    stack: '',
                    data: this.heavy1(data6,timeData)
                },
                {
                    name:'跟进次数',
                    type:'line',
                    stack: '',
                    data:this.heavy1(data7,timeData)
                }
            ];
            //客户折线图展示
            this.customertrend();
        },

        //客户趋势分析
        customertrend:function(){
            var mychartcustomer= echarts.init(document.getElementById('mychartcustomer'));
            // 指定图表的配置项和数据
            option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    y : 'bottom',
                    data:this.custrand.detail
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
                        data : this.custrand.time
                    }
                ],
                yAxis : [
                    {
                        name: '数量',
                        type : 'value',
                        scale:true,
                    }
                ],
                series : this.custrand.series
            };        

            // 使用刚指定的配置项和数据显示图表。
            mychartcustomer.setOption(option);
            window.addEventListener("resize",function(){
                mychartcustomer.resize(); 
            });
        },

        //监听趋势分析的时间框
        changeClient : function(data,data2){
            //判断开始时间小于截止时间同时不能为空
            if(this.clientTime.brand!='all'){
                this.clientTime.dimension = '101000.110';
            }else{
                this.clientTime.dimension = '100000.110';
            }
            var url = '/dw/getDW.json';
            this.custrend(this.https+url);
        },

        /**
         * 品牌合作机会分析
         * 请求后台数据
         */
        brandTrand : function(){
            this.brantrand.detail = ['无意向','客户开发','意向客户','重点客户','筛选品牌','确认合作品牌','达成合作'];
            this.brantrand.time = ['2018-4','2018-5','2018-6','2018-7','2018-8','2018-9','2018-10'];
            this.brantrand.series =  [
                {
                    name:'无意向',
                    type:'line',
                    stack: '总量',
                    data:[10,25,60,46,78,52,66],
                },{
                    name:'客户开发',
                    type:'line',
                    stack: '总量',
                    data:[1, 13, 5, 20, 40, 65, 15],
                },
                {
                    name:'意向客户',
                    type:'line',
                    stack: '总量',
                    data:[220, 18, 19, 23, 29, 33, 31]
                },
                {
                    name:'重点客户',
                    type:'line',
                    stack: '总量',
                    data:[32, 33, 30, 33, 39, 33, 32]
                },
                {
                    name:'筛选品牌',
                    type:'line',
                    stack: '总量',
                    data:[82, 93, 90, 93, 129, 133, 132]
                },
                {
                    name:'确认合作品牌',
                    type:'line',
                    stack: '总量',
                    data:[15, 10, 20, 30, 12, 13, 32]
                },
                {
                    name:'达成合作',
                    type:'line',
                    stack: '总量',
                    data:[8, 9, 9, 9, 15, 13, 13]
                }
            ];
            this.brandteamwork();
        },

        //品牌合作机会分析
        brandteamwork : function(){
            var mychartbrand= echarts.init(document.getElementById('mychartbrand'));
            // 指定图表的配置项和数据
            option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    y : 'bottom',
                    data:this.brantrand.detail
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
                        data : this.brantrand.time
                    }
                ],
                yAxis : [
                    {
                        name: '数量',
                        type : 'value',
                        scale:true,
                    }
                ],
                series : this.brantrand.series
            };        

            // 使用刚指定的配置项和数据显示图表。
            mychartbrand.setOption(option);
            window.addEventListener("resize",function(){
                mychartbrand.resize(); 
            });
        },

        /**
         * 漏斗图展示
         * 后台请求销售漏斗的数据
         */ 
        funnelTrand : function(){
            this.funnelld.detail = ['无意向','客户开发','意向客户','重点客户','筛选品牌','确认合作品牌','达成合作'];
            this.funnelld.series =  [
                {value: 40, name: '无意向'},
                {value: 30, name: '客户开发'},
                {value: 10, name: '意向客户'},
                {value: 5, name: '重点客户'},
                {value: 5, name: '筛选品牌'},
                {value: 5, name: '确认合作品牌'},
                {value: 5, name: '达成合作'}
            ];
            this.funnel();
        },
        
        //漏斗展示
        funnel : function(){
            var myChart = echarts.init(document.getElementById('main1'));
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : 总计{c} 占比{d}%"
                },
                toolbox: {
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    y : 'bottom',
                    data: this.funnelld.detail
                },
                calculable: true,
                series: [
                    {
                        name:'漏斗图',
                        type:'funnel',
                        left: '10%',
                        top: 60,
                        bottom: 60,
                        width: '80%',
                        min: 0,
                        max: 100,
                        minSize: '0%',
                        maxSize: '100%',
                        sort: 'descending',
                        gap: 2,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            },
                            emphasis: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 10,
                                lineStyle: {
                                    width: 1,
                                    type: 'solid'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        data: this.funnelld.series
                    }
                ]
            };
    
                    
            myChart.setOption(option);
            window.addEventListener("resize",function(){
                myChart.resize(); 
            });
        },

        //根据开始月份、截止月份，展示出所有放的月
        getMonthAll : function(begin,end) {
            var d1 = begin;
            var d2 = end;
            var dateArry = new Array();
            var s1 = d1.split("-");
            var s2 = d2.split("-");
            var mCount = 0;
            if (parseInt(s1[0]) < parseInt(s2[0])) {
                mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1])+1;
            } else {
                mCount = parseInt(s2[1]) - parseInt(s1[1])+1;
            }
            if (mCount > 0) {
                var startM = parseInt(s1[1]);
                var startY = parseInt(s1[0]);
                for (var i = 0; i < mCount; i++) {
                    if (startM < 12) {
                        dateArry[i] = startY + "-" + (startM>9 ? startM : "0" + startM);
                        startM += 1;
                    } else {
                        dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
                        startM = 1;
                        startY += 1;
                    }
                }
            }
            return dateArry;
        },
  
        change : function(){

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
        //浮动框导航
        toTop : function(i){
            //参数i表示间隔的幅度大小，以此来控制速度
            document.documentElement.scrollTop-=i;
            if (document.documentElement.scrollTop>0) {
                var c=setTimeout(()=>this.toTop(i),16);
            }else {
                clearTimeout(c);
            }
        },
        //点击客户浮动框
        toTopclient : function(i){
            //参数i表示间隔的幅度大小，以此来控制速度
            let height = $('.client').offset().top;
            document.documentElement.scrollTop+=i;
            if (document.documentElement.scrollTop<height-50) {
                var c=setTimeout(()=>this.toTopclient(i),16);
            }else if(document.documentElement.scrollTop>height){
                document.documentElement.scrollTop = height; 
            }else{
                clearTimeout(c);
            }
        },
        //点击销售浮动框
        toTopsale : function(i){
            //参数i表示间隔的幅度大小，以此来控制速度
            let height = $('.sale').offset().top;
            if (document.documentElement.scrollTop<height-50) {
                var c=setTimeout(()=>this.toTopsale(i),16);
            }else {
                clearTimeout(c);
            }
        },

        //页面底部
        toBottom :function(i){
            var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
            var scrollHeight=document.documentElement.scrollHeight;
            let height=scrollHeight-clientHeight; //超出窗口上界的值就是底部的scrolTop的值
            document.documentElement.scrollTop+=i;
            if (document.documentElement.scrollTop<height) {
                var c=setTimeout(()=>this.toBottom(i),16);
            }else {
                clearTimeout(c);
            }
        }
    }
  });