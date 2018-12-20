/** 
 * create author name xiaominzhang
 * create time 2018/8/18
*/
var vue = new Vue({
  el:"#app",
  mounted(){
      var url = this.vueUrl();
      this.getData(url+'/crm/user/listAllDepart');  //品牌机会数据
  },
  data:{
    form:{
        typeId:''
    },
    tableData:[],  //表单数据
    Height : {height:''}, //表单的最大高度设置
  },
  created(){
    this.hh();
    const that = this
    window.onresize = () => {
        return (() => {
          this.hh();
        })();
    }
  },
  methods:{
    hh(){
      this.Height.height = window.innerHeight - 160+'px';
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

    //获取table数据
    getData:function(url){
      var array = [{
        "id": "8a9b78ee5becee7c015bed3209540003",
        "pId": null,
        "orgCode": "R01",
        "name": "北京润合美",
        "children": [{
          "id": "8a9b78ee5becee7c015bed3209650004",
          "pId": "8a9b78ee5becee7c015bed3209540003",
          "orgCode": "R0100",
          "name": "董事长"
        }, {
          "id": "8a9b78ee5becee7c015bed3209790005",
          "pId": "8a9b78ee5becee7c015bed3209540003",
          "orgCode": "R0101",
          "name": "总经理",
          "children": [{
            "id": "8a9b78ee5becee7c015bed3209840006",
            "pId": "8a9b78ee5becee7c015bed3209790005",
            "orgCode": "R010101",
            "name": "常务副总",
            "children": [{
              "id": "8a9b78ee5becee7c015bed3209b2000a",
              "pId": "8a9b78ee5becee7c015bed3209840006",
              "orgCode": "R01010101",
              "name": "财务部经理",
              "children": [{
                "id": "8a9b78ee5c0f537d015c0f5e1a330018",
                "pId": "8a9b78ee5becee7c015bed3209b2000a",
                "orgCode": "R0101010101",
                "name": "财务主管",
                "children": [{
                  "id": "8a9b78ee5c0f537d015c0f5e53c3001a",
                  "pId": "8a9b78ee5c0f537d015c0f5e1a330018",
                  "orgCode": "R010101010101",
                  "name": "财务助理"
                }, {
                  "id": "8a9b78ee5c0f537d015c0f5e9d04001c",
                  "pId": "8a9b78ee5c0f537d015c0f5e1a330018",
                  "orgCode": "R010101010102",
                  "name": "出纳"
                }]
              }]
            }, {
              "id": "8a9b78ee5becee7c015bed3209be000b",
              "pId": "8a9b78ee5becee7c015bed3209840006",
              "orgCode": "R01010102",
              "name": "物流部经理"
            }, {
              "id": "8a9b78ee5becee7c015bed3209ca000c",
              "pId": "8a9b78ee5becee7c015bed3209840006",
              "orgCode": "R01010103",
              "name": "人资行政部顾问"
            }, {
              "id": "8a9b78ee5becee7c015bed3209d5000d",
              "pId": "8a9b78ee5becee7c015bed3209840006",
              "orgCode": "R01010104",
              "name": "人资行政部经理"
            }, {
              "id": "8a9b78ee5becee7c015bed3209e0000e",
              "pId": "8a9b78ee5becee7c015bed3209840006",
              "orgCode": "R01010105",
              "name": "采购部主管",
              "children": [{
                "id": "8a9b78ee60bfffc90160c04468f9022a",
                "pId": "8a9b78ee5becee7c015bed3209e0000e",
                "orgCode": "R0101010501",
                "name": "采购专员一"
              }, {
                "id": "8a9b78ee60bfffc90160c044c96e022c",
                "pId": "8a9b78ee5becee7c015bed3209e0000e",
                "orgCode": "R0101010502",
                "name": "采购专员二"
              }, {
                "id": "8a9b78ee60df66cb0160fe177c2d01da",
                "pId": "8a9b78ee5becee7c015bed3209e0000e",
                "orgCode": "R0101010503",
                "name": "采购专员三"
              }, {
                "id": "8a9b78ee6126112301612b6aac9c0268",
                "pId": "8a9b78ee5becee7c015bed3209e0000e",
                "orgCode": "R01010105A01",
                "name": "采购专员四"
              }]
            }, {
              "id": "8a9b78ee5df01135015df2f29c3f000c",
              "pId": "8a9b78ee5becee7c015bed3209840006",
              "orgCode": "R01010106",
              "name": "技术支持主管"
            }]
          }, {
            "id": "8a9b78ee5becee7c015bed32098f0007",
            "pId": "8a9b78ee5becee7c015bed3209790005",
            "orgCode": "R010102",
            "name": "分销部总监",
            "children": [{
              "id": "8a9b78ee5becee7c015bed3209eb000f",
              "pId": "8a9b78ee5becee7c015bed32098f0007",
              "orgCode": "R01010201",
              "name": "分销部经理",
              "children": [{
                "id": "8a9b78ee5becee7c015bed320a7b001a",
                "pId": "8a9b78ee5becee7c015bed3209eb000f",
                "orgCode": "R0101020101",
                "name": "一部部长",
                "children": [{
                  "id": "8a9b78ee5becee7c015bed320a88001b",
                  "pId": "8a9b78ee5becee7c015bed320a7b001a",
                  "orgCode": "R010102010101",
                  "name": "一部销售专员"
                }]
              }, {
                "id": "8a9b78ee5becee7c015bed320a95001c",
                "pId": "8a9b78ee5becee7c015bed3209eb000f",
                "orgCode": "R0101020106",
                "name": "微商主管",
                "children": [{
                  "id": "8a9b78ee5becee7c015bed320aa2001d",
                  "pId": "8a9b78ee5becee7c015bed320a95001c",
                  "orgCode": "R010102010601",
                  "name": "微商助理"
                }, {
                  "id": "8a9b78ee5becee7c015bed320aaf001e",
                  "pId": "8a9b78ee5becee7c015bed320a95001c",
                  "orgCode": "R010102010602",
                  "name": "微商美工"
                }]
              }, {
                "id": "8a9b78ee5d7ef967015d82a2a9f80015",
                "pId": "8a9b78ee5becee7c015bed3209eb000f",
                "orgCode": "R0101020107",
                "name": "控价专员"
              }, {
                "id": "8a9b78ee5ddfef34015de02d23dd0969",
                "pId": "8a9b78ee5becee7c015bed3209eb000f",
                "orgCode": "R0101020102",
                "name": "二部部长",
                "children": [{
                  "id": "8a9b78ee5ddfef34015de02d23dd0962",
                  "pId": "8a9b78ee5ddfef34015de02d23dd0969",
                  "orgCode": "R010102010201",
                  "name": "二部销售专员"
                }]
              }, {
                "id": "8a9b78ee5ddfef34015de02df616096e",
                "pId": "8a9b78ee5becee7c015bed3209eb000f",
                "orgCode": "R0101020103",
                "name": "三部部长",
                "children": [{
                  "id": "8a9b78ee5ddfef34015de02d23dd0963",
                  "pId": "8a9b78ee5ddfef34015de02df616096e",
                  "orgCode": "R010102010301",
                  "name": "三部销售专员"
                }]
              }, {
                "id": "8a9b78ee5fb4f25a015fbf432dcc006c",
                "pId": "8a9b78ee5becee7c015bed3209eb000f",
                "orgCode": "R0101020107",
                "name": "七组补货专员"
              }]
            }]
          }, {
            "id": "8a9b78ee5becee7c015bed32099a0008",
            "pId": "8a9b78ee5becee7c015bed3209790005",
            "orgCode": "R010103",
            "name": "自营部经理",
            "children": [{
              "id": "8a9b78ee5becee7c015bed320a040011",
              "pId": "8a9b78ee5becee7c015bed32099a0008",
              "orgCode": "R01010301",
              "name": "蜂花店长",
              "children": [{
                "id": "8a9b78ee5becee7c015bed320a110012",
                "pId": "8a9b78ee5becee7c015bed320a040011",
                "orgCode": "R0101030101",
                "name": "蜂花店长助理"
              }, {
                "id": "8a9b78ee5becee7c015bed320a1f0013",
                "pId": "8a9b78ee5becee7c015bed320a040011",
                "orgCode": "R0101030102",
                "name": "蜂花店铺美工"
              }]
            }, {
              "id": "8a9b78ee5ddfef34015de02ef2cf0971",
              "pId": "8a9b78ee5becee7c015bed32099a0008",
              "orgCode": "R01010302",
              "name": "大宝店长"
            }, {
              "id": "8a9b78ee5ddfef34015de02f5c480973",
              "pId": "8a9b78ee5becee7c015bed32099a0008",
              "orgCode": "R01010303",
              "name": "牙博士店长"
            }, {
              "id": "8a9b78ee5ddfef34015de030cb430975",
              "pId": "8a9b78ee5becee7c015bed32099a0008",
              "orgCode": "R01010304",
              "name": "京东妮维雅"
            }, {
              "id": "8a9b78ee5ddfef34015de031567f0977",
              "pId": "8a9b78ee5becee7c015bed32099a0008",
              "orgCode": "R01010305",
              "name": "红瑞徕店长"
            }, {
              "id": "8a9b78ee5ddfef34015de0319c4c0979",
              "pId": "8a9b78ee5becee7c015bed32099a0008",
              "orgCode": "R01010306",
              "name": "丽得姿店长"
            }]
          }, {
            "id": "8a9b78ee5becee7c015bed3209a60009",
            "pId": "8a9b78ee5becee7c015bed3209790005",
            "orgCode": "R010105",
            "name": "技术部经理",
            "children": [{
              "id": "8a9b78ee5becee7c015bed320a2c0014",
              "pId": "8a9b78ee5becee7c015bed3209a60009",
              "orgCode": "R01010501",
              "name": "一组研发主管",
              "children": [{
                "id": "8a9b78ee5becee7c015bed320a480016",
                "pId": "8a9b78ee5becee7c015bed320a2c0014",
                "orgCode": "R0101050101",
                "name": "一组研发专员"
              }, {
                "id": "8a9b78ee5e56fff0015fb4bd44b40562",
                "pId": "8a9b78ee5becee7c015bed320a2c0014",
                "orgCode": "R0101050102",
                "name": "二组研发专员级"
              }]
            }, {
              "id": "8a9b78ee5becee7c015bed320a390015",
              "pId": "8a9b78ee5becee7c015bed3209a60009",
              "orgCode": "R01010503",
              "name": "前端主管"
            }, {
              "id": "8a9b78ee5cc0110d015ccede02b900b0",
              "pId": "8a9b78ee5becee7c015bed3209a60009",
              "orgCode": "R01010502",
              "name": "二组研发主管",
              "children": [{
                "id": "8a9b78ee5cc0110d015ce98adb420184",
                "pId": "8a9b78ee5cc0110d015ccede02b900b0",
                "orgCode": "R0101050201",
                "name": "二组研发专员"
              }]
            }, {
              "id": "8a9b78ee66edabc101671b46168d0835",
              "pId": "8a9b78ee5becee7c015bed3209a60009",
              "orgCode": "R010105A01",
              "name": "产品助理"
            }]
          }, {
            "id": "8a9b78ee5c0f537d015c0f56f100000a",
            "pId": "8a9b78ee5becee7c015bed3209790005",
            "orgCode": "R010104",
            "name": "猫超部总监",
            "children": [{
              "id": "8a9b78ee5becee7c015bed3209f80010",
              "pId": "8a9b78ee5c0f537d015c0f56f100000a",
              "orgCode": "R01010401",
              "name": "猫超一部部长",
              "children": [{
                "id": "8a9b78ee5becee7c015bed320a540017",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R0101040101",
                "name": "主管一"
              }, {
                "id": "8a9b78ee5ddf1fc6015de0346e8b0006",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R0101040103",
                "name": "主管三"
              }, {
                "id": "8a9b78ee5ddf1fc6015de034c2da0008",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R0101040104",
                "name": "主管四"
              }, {
                "id": "8a9b78ee5de03342015de03372ba0000",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R0101040102",
                "name": "主管二"
              }, {
                "id": "8a9b78ee5e56fff0015f0fd20d8d0352",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R0101040105",
                "name": "主管五"
              }, {
                "id": "8a9b78ee60bb8b690160bf42cef3061b",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R0101040106",
                "name": "主管六"
              }, {
                "id": "8a9b78ee60bf584e0160bf60a57a0002",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R0101040100",
                "name": "猫超一部副部长"
              }, {
                "id": "8a9b78ee60df66cb0160f950202a0191",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R01010401A01",
                "name": "主管七"
              }, {
                "id": "8a9b78ee60df66cb0161070caef8042e",
                "pId": "8a9b78ee5becee7c015bed3209f80010",
                "orgCode": "R01010401A02",
                "name": "主管八"
              }]
            }, {
              "id": "8a9b78ee5e0ca8fb015e27d20ff60a33",
              "pId": "8a9b78ee5c0f537d015c0f56f100000a",
              "orgCode": "R01010402",
              "name": "猫超二部部长",
              "children": [{
                "id": "8a9b78ee5e0ca8fb015e27deb7180a4d",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R0101040201",
                "name": "主管一"
              }, {
                "id": "8a9b78ee5e0ca8fb015e27dee5e90a4f",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R0101040202",
                "name": "主管二"
              }, {
                "id": "8a9b78ee5e0ca8fb015e27df13830a51",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R0101040203",
                "name": "主管三"
              }, {
                "id": "8a9b78ee5e56fff0015f14d63a940377",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R0101040204",
                "name": "主管四"
              }, {
                "id": "8a9b78ee5e56fff0015f4d92cb0e0441",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R0101040205",
                "name": "猫超临时通用"
              }, {
                "id": "8a9b78ee60bb8b690160bf3abc4e060d",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R0101040205",
                "name": "主管五"
              }, {
                "id": "8a9b78ee60d584010160d8edf0fd0017",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R01010402A01",
                "name": "主管六"
              }, {
                "id": "8a9b78ee61261123016223c67c5a0a68",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R01010402A02",
                "name": "主管七"
              }, {
                "id": "8a9b78ee6126112301622d78697e0a89",
                "pId": "8a9b78ee5e0ca8fb015e27d20ff60a33",
                "orgCode": "R01010402A03",
                "name": "主管八"
              }]
            }, {
              "id": "8a9b78ee5e0ca8fb015e27d290b60a35",
              "pId": "8a9b78ee5c0f537d015c0f56f100000a",
              "orgCode": "R01010403",
              "name": "猫超三部部长",
              "children": [{
                "id": "8a9b78ee5e0ca8fb015e27e010200a56",
                "pId": "8a9b78ee5e0ca8fb015e27d290b60a35",
                "orgCode": "R0101040301",
                "name": "主管一"
              }, {
                "id": "8a9b78ee5e0ca8fb015e27e059e70a58",
                "pId": "8a9b78ee5e0ca8fb015e27d290b60a35",
                "orgCode": "R0101040302",
                "name": "主管二"
              }, {
                "id": "8a9b78ee5e0ca8fb015e27e085a40a5a",
                "pId": "8a9b78ee5e0ca8fb015e27d290b60a35",
                "orgCode": "R0101040303",
                "name": "主管三"
              }, {
                "id": "8a9b78ee60bb8b690160bf4f5acd0626",
                "pId": "8a9b78ee5e0ca8fb015e27d290b60a35",
                "orgCode": "R0101040304",
                "name": "主管四"
              }]
            }, {
              "id": "8a9b78ee5e0ca8fb015e27d2cf9d0a37",
              "pId": "8a9b78ee5c0f537d015c0f56f100000a",
              "orgCode": "R01010404",
              "name": "猫超供应链部长",
              "children": [{
                "id": "8a9b78ee5e0ca8fb015e27d7f72b0a3c",
                "pId": "8a9b78ee5e0ca8fb015e27d2cf9d0a37",
                "orgCode": "R0101040401",
                "name": "主管一"
              }, {
                "id": "8a9b78ee5e0ca8fb015e27d89e190a3f",
                "pId": "8a9b78ee5e0ca8fb015e27d2cf9d0a37",
                "orgCode": "R0101040402",
                "name": "主管二"
              }, {
                "id": "8a9b78ee60df66cb0161085fe3520435",
                "pId": "8a9b78ee5e0ca8fb015e27d2cf9d0a37",
                "orgCode": "R01010404A01",
                "name": "主管三"
              }]
            }, {
              "id": "8a9b78ee5e0ca8fb015e27d3017e0a39",
              "pId": "8a9b78ee5c0f537d015c0f56f100000a",
              "orgCode": "R01010405",
              "name": "猫超五部部长",
              "children": [{
                "id": "8a9b78ee5e0ca8fb015e27d9dbf90a42",
                "pId": "8a9b78ee5e0ca8fb015e27d3017e0a39",
                "orgCode": "R0101040501",
                "name": "主管一"
              }, {
                "id": "8a9b78ee5e0ca8fb015e27dbf90d0a44",
                "pId": "8a9b78ee5e0ca8fb015e27d3017e0a39",
                "orgCode": "R0101040502",
                "name": "主管二"
              }]
            }]
          }, {
            "id": "8a9b78ee5e56fff0015f9b5283f5052d",
            "pId": "8a9b78ee5becee7c015bed3209790005",
            "orgCode": "R010106",
            "name": "人资行政部主管",
            "children": [{
              "id": "8a9b78ee5e56fff0015f9b52dc0b052f",
              "pId": "8a9b78ee5e56fff0015f9b5283f5052d",
              "orgCode": "R01010601",
              "name": "行政助理"
            }]
          }]
        }]
      }];
     // array.push(array);
      this.department(array);
      // this.$http.post(url).then((res) => {  //.then() 返回成功的数据
      //   var array = new Array();
      //   array.push(res.data[1]);
      //   this.department(array);
      // })
      // .catch(function(res) {
      //     console.log(res)
      // }) 
    },

    //部门数据处理
    department : function(data){
      //处理数据格式
      var dataArr = new Array();
      for(let i=0;i<data.length;i++){
        dataArr.push({key:'1',name:data[i].name,orgCode:data[i].orgCode});
        this.departmentlist(dataArr,data[i].children);
      }
      this.gotopo(this.departmentNum(dataArr));
    },

    departmentlist : function(dataArr,data){
      for(let i=0;i<data.length;i++){
        let content = '';
        if(data[i].children){
          dataArr.push({key:(dataArr.length+1).toString(),name:data[i].name,orgCode:data[i].orgCode,parent:content});
          this.departmentlist(dataArr,data[i].children);
        }else{
          dataArr.push({key:(dataArr.length+1).toString(),name:data[i].name,orgCode:data[i].orgCode,parent:content});
        }
        
      }
    },

    //处理组织机构关系
    departmentNum : function(dataArr){
      let num = 0;
      let num1 = 0;
      for(let i = 2;i<dataArr.length;i++){
        for(let j=2;j<dataArr.length;j++){
          if(dataArr[i].orgCode.length>5 && dataArr[i].orgCode.length<=11){
            num = dataArr[j].orgCode.length-2;
            if(dataArr[i].orgCode == dataArr[j].orgCode.substring(0,num)){
              dataArr[j].parent = dataArr[i].key;
            }
          }else if(dataArr[i].orgCode.length>11){
            num1 = dataArr[j].orgCode.length-3;
            if(dataArr[i].orgCode == dataArr[j].orgCode.substring(0,num1)){
              dataArr[j].parent = dataArr[i].key;
            }
          }else{
            dataArr[1].parent = 1;
            dataArr[2].parent = 2;
          }
        }
      }
      for(let i=0;i<dataArr.length;i++){
        if(dataArr[i].parent==''){
          if(dataArr[i].orgCode.length == 7){
            dataArr[i].parent =3
          }else if(dataArr[i].orgCode == 'R010105A01'){
            dataArr[i].parent = 42;
          }else if(dataArr[i].orgCode == 'R01010105A01'){
            dataArr[i].parent = 12;
          }else{
            dataArr[i].parent = 56;
          }
        }
      }
      console.log(dataArr);
      return dataArr;
    },

    //拓扑图展示
    gotopo : function(data){
      var $ = go.GraphObject.make;
      myDiagram = $(go.Diagram, "myDiagramDiv",
        {
          initialContentAlignment: go.Spot.Center,
          maxSelectionCount: 1, // users can select only one part at a time
          validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
          "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
          "clickCreatingTool.insertPart": function(loc) {  // customize the data for the new node
            this.archetypeNodeData = {
              key: getNextKey(), // assign the key based on the number of nodes
              name: "(new person)",
              title: ""
            };
            return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
          },
          layout:
            $(go.TreeLayout,
              {
                treeStyle: go.TreeLayout.StyleLastParents,
                arrangement: go.TreeLayout.ArrangementHorizontal,
                angle: 90,
                layerSpacing: 35,
                alternateAngle: 90,
                alternateLayerSpacing: 35,
                alternateAlignment: go.TreeLayout.AlignmentBus,
                alternateNodeSpacing: 20
              }),
          "undoManager.isEnabled": true // enable undo & redo
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

    myDiagram.addDiagramListener("SelectionDeleting", function(e) {
      var part = e.subject.first(); 
      myDiagram.startTransaction("clear boss");
      if (part instanceof go.Node) {
        var it = part.findTreeChildrenNodes(); // find all child nodes
        while(it.next()) { // now iterate through them and clear out the boss information
          var child = it.value;
          var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
          if (bossText === null) return;
          bossText.text = "";
        }
      } else if (part instanceof go.Link) {
        var child = part.toNode;
        var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
        if (bossText === null) return;
        bossText.text = "";
      }
      myDiagram.commitTransaction("clear boss");
    });

    var levelColors = ["#AC193D", "#2672EC", "#8C0095", "#5133AB","#008299", "#D24726", "#008A00", "#094AB2"];
    myDiagram.layout.commitNodes = function() {
      go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);
      myDiagram.layout.network.vertexes.each(function(v) {
        if (v.node) {
          var level = v.level % (levelColors.length);
          var color = levelColors[level];
          var shape = v.node.findObject("SHAPE");
          if (shape) shape.fill = $(go.Brush, "Linear", { 0: color, 1: go.Brush.lightenBy(color, 0.05), start: go.Spot.Left, end: go.Spot.Right });
        }
      });
    };

    function getNextKey() {
      var key = nodeIdCounter;
      while (myDiagram.model.findNodeDataForKey(key) !== null) {
        key = nodeIdCounter--;
      }
      return key;
    }

    var nodeIdCounter = -1; // use a sequence to guarantee key uniqueness as we add/remove/modify nodes


    // this is used to determine feedback during drags
    function mayWorkFor(node1, node2) {
      if (!(node1 instanceof go.Node)) return false;  // must be a Node
      if (node1 === node2) return false;  // cannot work for yourself
      if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
      return true;
    }

    // This function provides a common style for most of the TextBlocks.
    // Some of these values may be overridden in a particular TextBlock.
    function textStyle() {
      return { font: "9pt  Segoe UI,sans-serif", stroke: "white" };
    }

    // This converter is used by the Picture.
    function findHeadShot(key) {
      if (key < 0 || key > 16) return "images/HSnopic.png"; // There are only 16 images on the server
      return "images/HS" + key + ".png"
    }

    // define the Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Rectangle",
          {
            name: "SHAPE", fill: "white", stroke: null,
            // set the port properties:
            portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
          }),
        $(go.Panel, "Horizontal",
          // define the panel where the text will appear
          $(go.Panel, "Table",
            {
              maxSize: new go.Size(150, 999),
              margin: new go.Margin(6, 10, 0, 3),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, textStyle(),  // the name
              {
                row: 0, column: 0, columnSpan: 5,
                font: "12pt Segoe UI,sans-serif",
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 16)
              },
              new go.Binding("text", "name").makeTwoWay()),
            $(go.TextBlock, textStyle(),
              { row: 0, column: 0 },
              ),
            $(go.TextBlock, textStyle(),  // the comments
              {
                row: 3, column: 0, columnSpan: 5,
                font: "italic 9pt sans-serif",
                wrap: go.TextBlock.WrapFit,
                editable: true,  // by default newlines are allowed
                minSize: new go.Size(10, 14)
              },
              new go.Binding("text", "comments").makeTwoWay())
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node



    // define the Link template
    myDiagram.linkTemplate =
      $(go.Link, go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        $(go.Shape, { strokeWidth: 4, stroke: "#00a4a4" }));  // the link shape

      
      var myModel = $(go.TreeModel);

      myModel.nodeDataArray = data;
      // [
      // {"key":1, "name":"Stella Payne Diaz", "title":"CEO"},
      // {"key":2, "name":"Luke Warm", "title":"VP Marketing/Sales", "parent":1},
      // {"key":3, "name":"Meg Meehan Hoffa", "title":"Sales", "parent":2},
      // {"key":4, "name":"Peggy Flaming", "title":"VP Engineering", "parent":1},
      // {"key":5, "name":"Saul Wellingood", "title":"Manufacturing", "parent":4},
      // {"key":6, "name":"Al Ligori", "title":"Marketing", "parent":2},
      // {"key":7, "name":"Dot Stubadd", "title":"Sales Rep", "parent":3},
      // {"key":8, "name":"Les Ismore", "title":"Project Mgr", "parent":5},
      // {"key":9, "name":"April Lynn Parris", "title":"Events Mgr", "parent":6},
      // {"key":10, "name":"Xavier Breath", "title":"Engineering", "parent":4},
      // {"key":11, "name":"Anita Hammer", "title":"Process", "parent":5},
      // {"key":12, "name":"Billy Aiken", "title":"Software", "parent":10},
      // {"key":13, "name":"Stan Wellback", "title":"Testing", "parent":10},
      // {"key":14, "name":"Marge Innovera", "title":"Hardware", "parent":10},
      // {"key":15, "name":"Evan Elpus", "title":"Quality", "parent":5},
      // {"key":16, "name":"Lotta B. Essen", "title":"Sales Rep", "parent":3}
      // ];
      myDiagram.model = myModel;
    }
  }
});