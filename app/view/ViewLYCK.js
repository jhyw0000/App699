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
                    xtype: 'numberfield',
                    name : 'view3id',
                    label: 'ID号',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
                        focus: function(){
                            Ext.getCmp('view3id').setValue('');
                        },
                        change: function(){
                            var id = Ext.getCmp('view3id').getValue();
                            if(id==null || id==""){
                                return false;
                            }
                            Ext.Ajax.setTimeout(6000);
                            Ext.Ajax.request({
                                url: config.baseUrl+'/lyck/query',
                                useDefaultXhrHeader: false,
                                withCredentials: true,
                                method: 'get',
                                params: {
                                    transactionSeqNo: id
                                },
                                success: function(response){
                                  var text = eval('('+response.responseText+')');
                                  if(text.success){
                                    Ext.getCmp('view3itemno').setValue(text.root[0].itemNo);//物料编号
                                    Ext.getCmp('view3itemdesc').setValue(text.root[0].description);//物料说明
                                    Ext.getCmp('view3unitofmeas').setValue(text.root[0].unitOfMeasure);//计量单位
                                    Ext.getCmp('view3qty').setValue(text.root[0].transQty);//数量
                                    Ext.getCmp('view3vendordesc').setValue(text.root[0].vendorName);//供应商名字
                                    Ext.getCmp('view3manudate').setValue(text.root[0].makeDate);//生产日期
                                    Ext.getCmp('view3validitydate').setValue(text.root[0].periodValidity);//有效期
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
            margin: '0.01em 0 0 0',
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
                    width: '100%'
                }
            ]
            },{
              xtype: 'container',
              margin: '0.01em 0 0 0',
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
                  margin: '0.05em 0 0 0',
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
                  margin: '0.05em 0 0 0',
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
                 margin: '0.05em 0 0 0',
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
               margin: '0.05em 0 0 0',
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
               margin: '0.05em 0 0 0',
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
           },{
               margin: '0.1em 0 0 0',
               xtype: 'selectfield',
               label: '领料人',
               id: 'view3user',
               name : 'view3user',
               layout: 'hbox',
               width: '100%',
               displayField: 'empName',
               valueField: 'empNo',
               store: 'empStore',
               listeners: {
                   change: function(){
                   }
               }
//               xtype: 'container',
//               margin: '0.1em 0 0 0',
//               layout: 'hbox',
//               width: '100%',
//               items: [
//                   {
//                       margin: '0 0 4px 0',
//                       id: 'view3user',
//                       xtype: 'textfield',
//                       name : 'view3user',
//                       label: '领料人',
//                       labelCls: 'nn',
//                       width: '100%'
//                   }
//               ]
           },{
              xtype: 'container',
              itemId: 'view3btn',
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