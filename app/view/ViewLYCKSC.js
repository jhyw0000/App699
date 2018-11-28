Ext.define('App699.view.ViewLYCKSC', {
	extend: 'Ext.Container',
	xtype: 'view4',

    requires: [
        'Ext.field.Number'
    ],
	config: {
		title: '领用出库删除',
        scrollable: {
            direction: 'vertical'
        },
        directionLock: true,
		items: [{
            xtype: 'container',
            margin: '1px 0 0 0',
            layout: 'hbox',
            width: '100%',
            style: 'background:white;',
            items: [
                {
                    margin: '0 0 1px 0',
                    id: 'view4id',
                    xtype: 'numberfield',
                    name : 'view4id',
                    label: 'ID号',
                    labelWidth:'22%',
                    labelCls:'labelwhite',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
                        focus: function(){
                            Ext.getCmp('view4id').setValue('');
                        },
                        change:function(){
                            var id = Ext.getCmp('view4id').getValue();
                            if(id==null || id==""){
                                return false;
                            }
                            Ext.Ajax.setTimeout(6000);
                            Ext.Ajax.request({
                                url: config.baseUrl+'/lycksc/query',
                                useDefaultXhrHeader: false,
                                withCredentials: true,
                                method: 'get',
                                params: {
                                    transactionSeqNo: id
                                },
                                success: function(response){
                                  var text = eval('('+response.responseText+')');
                                  if(text.success){
                                    Ext.getCmp('view4itemno').setValue(text.root[0].itemNo);//物料编号
                                    Ext.getCmp('view4itemdesc').setValue(text.root[0].description);//物料说明
                                    Ext.getCmp('view4unitofmeas').setValue(text.root[0].unitOfMeasure);//计量单位
                                    Ext.getCmp('view4qty').setValue(text.root[0].transQty);//数量
                                    Ext.getCmp('view4vendordesc').setValue(text.root[0].vendorName);//供应商名字
                                    Ext.getCmp('view4manudate').setValue(text.root[0].makeDate);//生产日期
                                    Ext.getCmp('view4validitydate').setValue(text.root[0].periodValidity);//有效期
                                    Ext.getCmp('view4outdepartmentdesc').setValue(text.root[0].fromStoreCode);//出库部门
                                    Ext.getCmp('view4user').setValue(text.root[0].createUser);//领料人
                                    Ext.getCmp('view4outid').setValue(text.root[0].transactionSeqNo);//出库流水号
                                    return
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
            margin: '0 0 0 0',
            layout: 'hbox',
            width: '100%',
            style: 'background:white;',
            items: [
                {
                    margin: '0 0 1px 0',
                    id: 'view4itemno',
                    xtype: 'textfield',
                    name : 'view4itemno',
                    label: '物料编码',
                    labelWidth:'22%',
                    labelCls:'labelwhite',
                    readOnly:true,
                    width: '100%'
                }
            ]
            },{
              xtype: 'container',
              margin: '0 0 0 0',
              layout: 'hbox',
              width: '100%',
              items: [
                  {
                      margin: '0 0 1px 0',
                      id: 'view4itemdesc',
                      xtype: 'textfield',
                      name : 'view4itemdesc',
                      label: '物料说明',
                      labelWidth:'22%',
                      labelCls:'labelwhite',
                      readOnly:true,
                      width: '100%'
                  }]
              },{
                  xtype: 'container',
                  margin: '0 0 0 0',
                  layout: 'hbox',
                  width: '100%',
                  items: [
                      {
                          margin: '0 0 1px 0',
                          id: 'view4unitofmeas',
                          xtype: 'textfield',
                          name : 'view4unitofmeas',
                          label: '计量单位',
                          labelWidth:'22%',
                          labelCls:'labelwhite',
                          readOnly:true,
                          width: '100%'
                      }]
               },{
                  xtype: 'container',
                  margin: '0 0 0 0',
                  layout: 'hbox',
                  width: '100%',
                  items: [
                      {
                          margin: '0 0 1px 0',
                          id: 'view4qty',
                          xtype: 'textfield',
                          name : 'view4qty',
                          label: '数量',
                          labelWidth:'22%',
                          readOnly:true,
                          labelCls: 'nn',
                          width: '100%'
                      }
                  ]
              },{
                 xtype: 'container',
                 margin: '0 0 0 0',
                 layout: 'hbox',
                 width: '100%',
                 items: [
                     {
                         margin: '0 0 1px 0',
                         id: 'view4vendordesc',
                         xtype: 'textfield',
                         name : 'view4vendordesc',
                         label: '供应商',
                         labelWidth:'22%',
                         readOnly:true,
                         labelCls: 'nn',
                         width: '100%'
                     }
                 ]
             },{
               xtype: 'container',
               margin: '0 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 1px 0',
                       id: 'view4manudate',
                       xtype: 'textfield',
                       name : 'view4manudate',
                       label: '生产日期',
                       labelWidth:'22%',
                       readOnly:true,
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
               xtype: 'container',
               margin: '0 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 1px 0',
                       id: 'view4validitydate',
                       xtype: 'textfield',
                       name : 'view4validitydate',
                       label: '有效期',
                       labelWidth:'22%',
                       readOnly:true,
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
               xtype: 'container',
               margin: '0 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 1px 0',
                       id: 'view4outdepartmentdesc',
                       xtype: 'textfield',
                       name : 'view4outdepartmentdesc',
                       label: '出库部门',
                       labelWidth:'22%',
                       readOnly:true,
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
               xtype: 'container',
               margin: '0 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 1px 0',
                       id: 'view4user',
                       xtype: 'textfield',
                       name : 'view4user',
                       label: '领料人',
                       labelWidth:'22%',
                       readOnly:true,
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
               xtype: 'container',
               margin: '0 0 0 0',
               layout: 'hbox',
               width: '100%',
               items: [
                   {
                       margin: '0 0 1px 0',
                       id: 'view4outid',
                       xtype: 'textfield',
                       name : 'view4outid',
                       label: '出库流水号',
                       labelWidth:'22%',
                       readOnly:true,
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
              xtype: 'container',
              itemId: 'view4btn',
              style:'',
              docked: 'bottom',
              flex:1,
              layout: 'hbox',
              height: '8%',
              items: [{
                  text:'出库删除',
                  xtype: 'button',
                  cls : 'noBorder',
                  ui: 'action',
                  flex: 1
              }]
            }]
	}
});