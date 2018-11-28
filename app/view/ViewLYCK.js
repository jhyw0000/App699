Ext.define('App699.view.ViewLYCK', {
	extend: 'Ext.Container',
	xtype: 'view3',

    requires: [
        'Ext.field.Select','Ext.field.Hidden','Ext.field.Number'
    ],
	config: {
		title: '领用出库',
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
                    id: 'view3id',
                    xtype: 'numberfield',
                    name : 'view3id',
                    label: 'ID号',
                    labelWidth:'22%',
                    labelCls:'labelwhite',
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
            margin: '0 0 0 0',
            layout: 'hbox',
            width: '100%',
            style: 'background:white;',
            items: [
                {
                    margin: '0 0 1px 0',
                    id: 'view3itemno',
                    xtype: 'textfield',
                    name : 'view3itemno',
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
                      id: 'view3itemdesc',
                      xtype: 'textfield',
                      name : 'view3itemdesc',
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
                          id: 'view3unitofmeas',
                          xtype: 'textfield',
                          name : 'view3unitofmeas',
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
                          id: 'view3qty',
                          xtype: 'textfield',
                          name : 'view3qty',
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
                         id: 'view3vendordesc',
                         xtype: 'textfield',
                         name : 'view3vendordesc',
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
                       id: 'view3manudate',
                       xtype: 'textfield',
                       name : 'view3manudate',
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
                       id: 'view3validitydate',
                       xtype: 'textfield',
                       name : 'view3validitydate',
                       label: '有效期',
                       labelWidth:'22%',
                       readOnly:true,
                       labelCls: 'nn',
                       width: '100%'
                   }
               ]
           },{
               xtype: 'selectfield',
               label: '领用部门',
               labelWidth:'22%',
               labelCls:'labelwhite',
               id: 'view3outdepartmentdesc',
               name : 'view3outdepartmentdesc',
               layout: 'hbox',
               width: '100%',
               autoSelect:true,
               displayField: 'departmentDesc',
               valueField: 'departmentCode',
               store: 'departmentStore',
               listeners: {
                   change: function(){
                        var departmentCode = this.getValue();
                        if(departmentCode==null ||departmentCode==""){
                            return;
                        }
                        Ext.Ajax.setTimeout(6000);
                        Ext.Ajax.request({
                            url: config.baseUrl+'/emp/list',
                            useDefaultXhrHeader: false,
                            withCredentials: true,
                            method: 'post',
                            params: {
                                departmentCode:departmentCode
                            },
                            success: function(response){
                                var text = eval('('+response.responseText+')');
                                if(text.success){
                                    //将分类信息填充到store的data中
                                    var empStore = Ext.getCmp('view3user').getStore();
                                    empStore.setData(text.root);
                                    return;
                                }
                                Ext.Msg.alert('提示',text.msg);
                            },
                            failure: function(response){
                                Ext.Msg.alert('提示','请求失败');
                            }
                        });
                   }
               }
           },{
               margin: '1px 0 0 0',
               xtype: 'selectfield',
               label: '领料人',
               labelWidth:'22%',
               labelCls:'labelwhite',
               id: 'view3user',
               name : 'view3user',
               layout: 'hbox',
               width: '100%',
               displayField: 'empName',
               valueField: 'empNo',
               store: 'empStore'
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