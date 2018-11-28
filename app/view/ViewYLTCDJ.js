Ext.define('App699.view.ViewYLTCDJ', {
	extend: 'Ext.Container',
	xtype: 'view5',

    requires: [
        'Ext.field.Number'
    ],
	config: {
		title: '余料退库登记',
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
                    id: 'view5id',
                    xtype: 'numberfield',
                    name : 'view5id',
                    label: 'ID号',
                    labelWidth:'22%',
                    labelCls:'labelwhite',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
                        focus: function(){
                            Ext.getCmp('view5id').setValue('');
                        },
                        change:function(){
                            var id = Ext.getCmp('view5id').getValue();
                            if(id==null || id==""){
                                return false;
                            }
                            Ext.Ajax.setTimeout(6000);
                            Ext.Ajax.request({
                                url: config.baseUrl+'/tkdj/query',
                                useDefaultXhrHeader: false,
                                withCredentials: true,
                                method: 'get',
                                params: {
                                    transactionSeqNo: id
                                },
                                success: function(response){
                                  var text = eval('('+response.responseText+')');
                                  if(text.success){
                                    Ext.getCmp('view5itemno').setValue(text.root[0].itemNo);//物料编号
                                    Ext.getCmp('view5itemdesc').setValue(text.root[0].description);//物料说明
                                    Ext.getCmp('view5unitofmeas').setValue(text.root[0].unitOfMeasure);//计量单位
                                    Ext.getCmp('view5qty').setValue(text.root[0].transQty);//数量
                                    Ext.getCmp('view5vendordesc').setValue(text.root[0].vendorName);//供应商名字
                                    Ext.getCmp('view5indepartmentdesc').setValue(text.root[0].fromStoreCode);//入库部门
                                    Ext.getCmp('view5outid').setValue(text.root[0].transactionSeqNo);//出库流水号
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
                    id: 'view5itemno',
                    xtype: 'textfield',
                    name : 'view5itemno',
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
                      id: 'view5itemdesc',
                      xtype: 'textfield',
                      name : 'view5itemdesc',
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
                          id: 'view5unitofmeas',
                          xtype: 'textfield',
                          name : 'view5unitofmeas',
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
                          id: 'view5qty',
                          xtype: 'textfield',
                          name : 'view5qty',
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
                         id: 'view5vendordesc',
                         xtype: 'textfield',
                         name : 'view5vendordesc',
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
                       id: 'view5indepartmentdesc',
                       xtype: 'textfield',
                       name : 'view5indepartmentdesc',
                       label: '入库部门',
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
                       id: 'view5outid',
                       xtype: 'textfield',
                       name : 'view5outid',
                       label: '出库流水号',
                       labelWidth:'22%',
                       readOnly:true,
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
                  text:'确认',
                  xtype: 'button',
                  cls : 'noBorder',
                  ui: 'action',
                  flex: 1
              }]
            }]
	}
});