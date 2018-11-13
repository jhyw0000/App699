Ext.define('App699.controller.RKQRQXcon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            view2 : 'view2'
        },
        control: {
            'view2 container#view2btn button':{
                tap: 'view2taskmaker'
            }
        }
    },
    //入库确认取消
    view2taskmaker: function(view){
        var app = this.getApplication();
        var id = Ext.getCmp('view2id');//入库登记表id主键
        if(id.getValue()==''||id.getValue()==null){
            Ext.Msg.alert('提示','请扫描入库ID条码！');
            return;
        }
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/rkqr/do',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
                id:id.getValue(),
                logId:app.localStorage.getItem("userName"),
                type:"DELETE"//调用存储 type='DELETE' 表示入库确认取消操作！
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    Ext.Msg.alert('提示',text.msg);
                    Ext.getCmp('view2id').setValue('');//id
                    Ext.getCmp('view2itemno').setValue('');//物料号
                    Ext.getCmp('view2itemdesc').setValue('');//物料说明
                    Ext.getCmp('view2unitofmeas').setValue('');//计量单位
                    Ext.getCmp('view2qty').setValue('');//数量
                    Ext.getCmp('view2vendordesc').setValue('');//供应商名字
                    return;
                }
                Ext.Msg.alert('提示',text.msg);
            },
            failure: function(response){
                Ext.Msg.alert('提示','请求失败');
            }
        })
    }
});