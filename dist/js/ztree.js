$(function () {
  (function(){
    //增加项目模态框
    var addDuty=$('#addDuty');
    var modalTitle1=addDuty.find('h4.modal-title1');
    var modalTitle2=addDuty.find('h4.modal-title2');
    var addForm=addDuty.find('div.add-form');
    var addModalDuty=addDuty.find('div.add-modal-duty');
    var modalSet=addDuty.find('div.modal-set');
    var modalSave=addDuty.find('div.modal-save');
    //添加项目按钮
    $('#addDutyBtn').click(function(){
      modalTitle1.show();
      addForm.show();
      modalSet.show();
      modalTitle2.hide();
      addModalDuty.hide();
      modalSave.hide();
    });
    //下一步
    $('button.setep').click(function(){
      modalTitle1.hide();
      addForm.hide();
      modalSet.hide();
      modalTitle2.show();
      addModalDuty.show();
      modalSave.show();
    });
    /*选择模板模态框*/
    //点击确定 添加模板
    var aInput=$('#tableexample').find('input');
    $('#template-ensure').click(function(){
        var templateNameId=$('#templateName').find('span.template-name1');
        templateNameId.eq(0).text('');
        templateNameId.eq(1).text('');
        templateNameId.eq(2).text('');
        for(var i=0;i<aInput.length;i++){
            if(aInput[i].checked){
              var sib=aInput.eq(i).parent().siblings();
              templateNameId.eq(0).text(sib.eq(0).text());
              templateNameId.eq(1).text(sib.eq(1).text());
              templateNameId.eq(2).text(sib.eq(2).text());
            }
        }
    });

    //      ztree初始化
    (function(){
      var setting = {
        treeObj:null,
        view:{
          showIcon:false,
        },
        check:{
          autoCheckTrigger:false,
          chkboxType:{"Y":"ps","N":"ps"},
          chkStyle:"checkbox",
          enable:true,
          nocheckInherit:false,
          chkDisabledInherit:false,
          radioType:'level'
        }
      };

      var zNodes = [
        {
          //nocheck:false,
          //checked:true,//选择多选框 zNodes.nocheck=false&& zNodes.enable=true时生效
          name: "猫超业务",
          open: false,
          url:"#",
          children:[
            {
              name:"采购类",
              open:false,
              isParent:true,
              children:[
                {name:"品牌对接"},
                {name:"猫超对接"},
                {name:"海格对接"},
                {name:"物流对接"},
                {name:"技术对接"},
                {name:"财务对接"}
              ]
            }
          ]
        },
        {
          name: "技术服务",
          open: false,
          url:"#",
          children: [
            {name:"需求分析"},
            {name:"系统设计"},
            {name:"前端开发"},
            {name:"后端开发"},
            {name:"测试修改"},
            {name:"运维修改"}
          ]
        }

      ];
      var zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      //点击选择职责按钮时初始化
      $('#selectDutyBtn').click(function(){
        zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      });
      //      点击确定 添加职责
      $('#duty-ensure').click(function(){
        var nodes=zTreeObj.getCheckedNodes('true');
        var str='';
        for(var i=0;i<nodes.length;i++){
          str+='<p style="margin-left:'+ nodes[i].level*15+'px">'+ nodes[i].name+'</p>'
        }
        $('#dutyOutline').empty().append(str);
      });
    })();
  })();
  //$("#example2").DataTable();
  //日期选择
  $('#reservation').daterangepicker(
    {
      format: 'YYYY-MM-DD',
      locale:{
        applyLabel: '确认',
        cancelLabel: '取消',
        fromLabel: '从',
        toLabel: '到',
        weekLabel: 'W',
        customRangeLabel: '选择时间',
        daysOfWeek:["日","一","二","三","四","五","六"],
        monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
      }
    },function(start, end, label) {
       $('#reservation').val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
     }
  );
  //多选框
  $(".select2").select2();

});