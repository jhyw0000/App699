Ext.define('App699.view.ViewRKQR', {
	extend: 'Ext.Container',
	xtype: 'view1',

    requires: [
        'Ext.field.Select','Ext.field.Hidden'
    ],
	config: {
		title: '入库确认',
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
                    id: 'view1id',
                    xtype: 'textfield',
                    name : 'view1id',
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
                    id: 'view1itemno',
                    xtype: 'textfield',
                    name : 'view1itemno',
                    label: '物料编码',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
//                    	focus: function(){
//                    	    Ext.getCmp('view1eqmNum').setValue('');
//                    	},
                    	change: function(){
                    	      return false;
                    	      //下面要处理xml数据
                    	      var eqmNum = Ext.getCmp('view1eqmNum').getValue();
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
                                          Ext.getCmp('view1eqmNum').setValue(text.root[0].eqmNum);//设备编号
                                          Ext.getCmp('view1eqmname').setValue(text.root[0].eqmName);//设备名称
                                          Ext.getCmp('view1eqmtype').setValue(text.root[0].eqmType);//设备型号
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
                      id: 'view1itemdesc',
                      xtype: 'textfield',
                      name : 'view1itemdesc',
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
                          id: 'view1unitofmeas',
                          xtype: 'textfield',
                          name : 'view1unitofmeas',
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
                          id: 'view1qty',
                          xtype: 'textfield',
                          name : 'view1qty',
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
                         id: 'view1vendordesc',
                         xtype: 'textfield',
                         name : 'view1vendordesc',
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
                       id: 'view1storelocation',
                       xtype: 'textfield',
                       name : 'view1storelocation',
                       label: '入库库房',
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
                       id: 'view1qjw',
                       xtype: 'textfield',
                       name : 'view1qjw',
                       label: '区架位',
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
              xtype: 'container',
              itemId: 'view1btn',
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