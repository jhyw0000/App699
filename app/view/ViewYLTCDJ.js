Ext.define('App699.view.ViewYLTCDJ', {
	extend: 'Ext.Container',
	xtype: 'view5',

    requires: [
        'Ext.field.Select','Ext.field.Hidden'
    ],
	config: {
		title: '余料退库登记',
        scrollable: {
            direction: 'vertical'
        },
        directionLock: true,
		items: [{
            xtype: 'container',
            margin: '6% 0 0 0',
            layout: 'hbox',
            width: '100%',
            style: 'background:white;',
            items: [
                {
                    margin: '0 0 4px 0',
                    id: 'view5id',
                    xtype: 'textfield',
                    name : 'view5id',
                    label: 'ID号',
                    width: '100%'
                }
            ]
            },{
            xtype: 'container',
            margin: '0.5em 0 0 0',
            layout: 'hbox',
            width: '100%',
            style: 'background:white;',
            items: [
                {
                    margin: '0 0 4px 0',
                    id: 'view5itemno',
                    xtype: 'textfield',
                    name : 'view5itemno',
                    label: '物料编码',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
//                    	focus: function(){
//                    	    Ext.getCmp('view5eqmNum').setValue('');
//                    	},
                    	change: function(){
                    	      return false;
                    	      //下面要处理xml数据
                    	      var eqmNum = Ext.getCmp('view5eqmNum').getValue();
                    	      var str=eqmNum;
                    	      if(str==null||""==str){
                    		    return;
                    	      }
                    	      if(str.indexOf("?")==-1){
                    		    return;
                    	      }
                    	      //创建文档对象
                    	      var parser=new DOMParser();
                    	      var xmlDoc=parser.parseFromString(str,"text/xml");

                    	      //提取数据
                    	      var countrys = xmlDoc.getElementsByTagName('CBH');
                    	      var arr = [];

                    	      for (var i = 0; i < countrys.length; i++) {
                    		  arr.push(countrys[i].textContent);
                    	      };
                    	      this.setValue(arr[0]);
                    	      //发送请求
                              eqmNum = arr[0];
                              if(eqmNum==null || eqmNum==''){
                                  return;
                              }
                              Ext.Ajax.setTimeout(6000);
                              Ext.Ajax.request({
                                  url: config.baseUrl+'/emisht/model/app/eqm/EqmAccountHelpInfo.Find.find.action?checkUser=false',
                                  useDefaultXhrHeader: false,
                                  withCredentials: true,
                                  method: 'get',
                                  params: {
                                      eqmNum: eqmNum
                                  },
                                  success: function(response){
                                      var text = eval('('+response.responseText+')');
                                      if(text.success){
                                          if(text.root.length==null||text.root.length==''){
                                              Ext.Msg.alert('提示','此数据不存在！');
                                              return;
                                          }
                                          Ext.getCmp('view5eqmNum').setValue(text.root[0].eqmNum);//设备编号
                                          Ext.getCmp('view5eqmname').setValue(text.root[0].eqmName);//设备名称
                                          Ext.getCmp('view5eqmtype').setValue(text.root[0].eqmType);//设备型号
                                      }else{
                                          Ext.Msg.alert('提示','查询失败，请重试！');
                                      }
                                  },
                                  failure: function(response){
                                      Ext.Msg.alert('提示','查询异常，请重试！');
                                  }
                              });
                    	  }
                    }
                }
            ]
            },{
              xtype: 'container',
              margin: '0.5em 0 0 0',
              layout: 'hbox',
              width: '100%',
              items: [
                  {
                      margin: '0 0 4px 0',
                      id: 'view5itemdesc',
                      xtype: 'textfield',
                      name : 'view5itemdesc',
                      label: '物料说明',
                      width: '100%'
                  }]
              },{
                  xtype: 'container',
                  margin: '0.5em 0 0 0',
                  layout: 'hbox',
                  width: '100%',
                  items: [
                      {
                          margin: '0 0 4px 0',
                          id: 'view5unitofmeas',
                          xtype: 'textfield',
                          name : 'view5unitofmeas',
                          label: '计量单位',
                          width: '100%'
                      }]
               },{
                  xtype: 'container',
                  margin: '0.5em 0 0 0',
                  layout: 'hbox',
                  width: '100%',
                  items: [
                      {
                          margin: '0 0 4px 0',
                          id: 'view5qty',
                          xtype: 'textfield',
                          name : 'view5qty',
                          label: '数量',
                          labelCls: 'nn',
                          width: '100%'
                      }
                  ]
              },{
                 xtype: 'container',
                 margin: '0.5em 0 0 0',
                 layout: 'hbox',
                 width: '100%',
                 items: [
                     {
                         margin: '0 0 4px 0',
                         id: 'view5vendordesc',
                         xtype: 'textfield',
                         name : 'view5vendordesc',
                         label: '供应商名字',
                         labelCls: 'nn',
                         width: '100%'
                     }
                 ]
             },{
               xtype: 'container',
               margin: '0.5em 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 4px 0',
                       id: 'view5indepartmentdesc',
                       xtype: 'textfield',
                       name : 'view5indepartmentdesc',
                       label: '入库部门',
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
               xtype: 'container',
               margin: '0.5em 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 4px 0',
                       id: 'view5outno',
                       xtype: 'textfield',
                       name : 'view5outno',
                       label: '出库流水号',
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
              xtype: 'container',
              itemId: 'view5btn',
              style:'',
              docked: 'bottom',
              flex:1,
              layout: 'hbox',
              height: '8%',
              items: [{
                  text:'报修',
                  xtype: 'button',
                  cls : 'noBorder',
                  ui: 'action',
                  flex: 1
              }]
            }]
	}
});