Ext.define('App699.view.ViewRKQRQX', {
	extend: 'Ext.Container',
	xtype: 'view2',

    requires: [
        'Ext.field.Select','Ext.field.Hidden'
    ],
	config: {
		title: '入库确认取消',
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
                    id: 'view2id',
                    xtype: 'numberfield',
                    name : 'view2id',
                    label: 'ID号',
                    placeHolder : '扫码输入',
                    width: '100%',
                    listeners: {
                        focus: function(){
                            Ext.getCmp('view2id').setValue('');
                        },
                        change: function(){
                            var id = Ext.getCmp('view2id').getValue();
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
                                    Ext.getCmp('view2itemno').setValue(text.root[0].itemNo);//物料编号
                                    Ext.getCmp('view2itemdesc').setValue(text.root[0].description);//物料说明
                                    Ext.getCmp('view2unitofmeas').setValue(text.root[0].unitOfMeasure);//计量单位
                                    Ext.getCmp('view2qty').setValue(text.root[0].transQty);//数量
                                    Ext.getCmp('view2vendordesc').setValue(text.root[0].vendorName);//供应商名字
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
            margin: '0.5em 0 0 0',
            layout: 'hbox',
            width: '100%',
            style: 'background:white;',
            items: [
                {
                    margin: '0 0 4px 0',
                    id: 'view2itemno',
                    xtype: 'textfield',
                    name : 'view2itemno',
                    label: '物料编码',
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
                      id: 'view2itemdesc',
                      xtype: 'textfield',
                      name : 'view2itemdesc',
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
                          id: 'view2unitofmeas',
                          xtype: 'textfield',
                          name : 'view2unitofmeas',
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
                          id: 'view2qty',
                          xtype: 'textfield',
                          name : 'view2qty',
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
                         id: 'view2vendordesc',
                         xtype: 'textfield',
                         name : 'view2vendordesc',
                         label: '供应商名字',
                         labelCls: 'nn',
                         width: '100%'
                     }
                 ]
             },{
              xtype: 'container',
              itemId: 'view2btn',
              style:'',
              docked: 'bottom',
              flex:1,
              layout: 'hbox',
              height: '8%',
              items: [{
                  text:'入库确认取消',
                  xtype: 'button',
                  cls : 'noBorder',
                  ui: 'action',
                  flex: 1
              }]
            }]
	}
});