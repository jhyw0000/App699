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
                    xtype: 'numberfield',
                    name : 'view1id',
                    label: 'ID号',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
                        focus: function(){
                    	    Ext.getCmp('view1id').setValue('');
                    	},
                        change: function(){
                            var id = Ext.getCmp('view1id').getValue();
                            if(id==null || id==""){
                                return false;
                            }
                            Ext.Ajax.setTimeout(6000);
                            Ext.Ajax.request({
                                url: config.baseUrl+'/rkqr/query',
                                useDefaultXhrHeader: false,
                                withCredentials: true,
                                method: 'get',
                                params: {
                                    transactionSeqNo: id
                                },
                                success: function(response){
                                  var text = eval('('+response.responseText+')');
                                  if(text.success){
                                    Ext.getCmp('view1itemno').setValue(text.root[0].itemNo);//物料编号
                                    Ext.getCmp('view1itemdesc').setValue(text.root[0].description);//物料说明
                                    Ext.getCmp('view1unitofmeas').setValue(text.root[0].unitOfMeasure);//计量单位
                                    Ext.getCmp('view1qty').setValue(text.root[0].transQty);//数量
                                    Ext.getCmp('view1vendordesc').setValue(text.root[0].vendorName);//供应商名字
                                    Ext.getCmp('view1storelocation').setValue(text.root[0].toStoreCode);//入库库房
                                    Ext.getCmp('view1qjw').setValue(text.root[0].qjw);//区架位
                                    return;
                                  }
                                  Ext.Msg.alert('提示',text.msg);
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
            margin: '0.1em 0 0 0',
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
                    width: '100%'
                }
            ]
            },{
              xtype: 'container',
              margin: '0.1em 0 0 0',
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
                  margin: '0.1em 0 0 0',
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
                  margin: '0.1em 0 0 0',
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
                 margin: '0.1em 0 0 0',
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
               margin: '0.1em 0 0 0',
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
               margin: '0.1em 0 0 0',
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
               margin: '0.1em 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 4px 0',
                       id: 'view1qjw2',
                       xtype: 'textfield',
                       name : 'view1qjw2',
                       placeHolder : '扫码输入',
                       label: '区架位条码',
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
                  text:'确认',
                  xtype: 'button',
                  cls : 'noBorder',
                  ui: 'action',
                  flex: 1
              }]
            }]
	}
});