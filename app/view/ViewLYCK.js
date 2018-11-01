Ext.define('App699.view.ViewLYCK', {
	extend: 'Ext.Container',
	xtype: 'view3',

    requires: [
        'Ext.field.Select','Ext.field.Hidden'
    ],
	config: {
		title: '领用出库',
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
                    id: 'view3id',
                    xtype: 'textfield',
                    name : 'view3id',
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
                    id: 'view3itemno',
                    xtype: 'textfield',
                    name : 'view3itemno',
                    label: '物料编码',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
//                    	focus: function(){
//                    	    Ext.getCmp('view3eqmNum').setValue('');
//                    	},
                    	change: function(){
                    	      return false;
                    	      //下面要处理xml数据
                    	      var eqmNum = Ext.getCmp('view3eqmNum').getValue();
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
                                          Ext.getCmp('view3eqmNum').setValue(text.root[0].eqmNum);//设备编号
                                          Ext.getCmp('view3eqmname').setValue(text.root[0].eqmName);//设备名称
                                          Ext.getCmp('view3eqmtype').setValue(text.root[0].eqmType);//设备型号
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
                      id: 'view3itemdesc',
                      xtype: 'textfield',
                      name : 'view3itemdesc',
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
                          id: 'view3unitofmeas',
                          xtype: 'textfield',
                          name : 'view3unitofmeas',
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
                          id: 'view3qty',
                          xtype: 'textfield',
                          name : 'view3qty',
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
                         id: 'view3vendordesc',
                         xtype: 'textfield',
                         name : 'view3vendordesc',
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
                       id: 'view3manudate',
                       xtype: 'textfield',
                       name : 'view3manudate',
                       label: '生产日期',
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
                       id: 'view3validitydate',
                       xtype: 'textfield',
                       name : 'view3validitydate',
                       label: '有效期',
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
               xtype: 'selectfield',
               label: '出库部门',
               id: 'view3outdepartmentdesc',
               name : 'view3outdepartmentdesc',
               layout: 'hbox',
               width: '100%',
               displayField: 'departmentDesc',
               valueField: 'departmentCode',
               store: 'departmentStore',
               listeners: {
                   change: function(){
                   }
               }
//               xtype: 'container',
//               margin: '0.5em 0 0 0',
//               layout: 'hbox',
//               width: '100%',
//               items: [
//                   {
//                       margin: '0 0 4px 0',
//                       id: 'view3outdepartmentdesc',
//                       xtype: 'textfield',
//                       name : 'view3outdepartmentdesc',
//                       label: '出库部门',
//                       labelCls: 'nn',
//                       width: '100%'
//                   }
//               ]
           },{
               xtype: 'container',
               margin: '0.5em 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 4px 0',
                       id: 'view3user',
                       xtype: 'textfield',
                       name : 'view3user',
                       label: '领料人',
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
              xtype: 'container',
              itemId: 'view3btn',
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