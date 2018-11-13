Ext.define('App699.controller.RKQRcon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            view1 : 'view1'
        },
        control: {
            'view1 container#view1btn button':{
                tap: 'view1taskmaker'
            }
        }
    },
    //入库确认
    view1taskmaker: function(view){
        var app = this.getApplication();
        var id = Ext.getCmp('view1id');//入库登记表id主键
        if(id.getValue()==''||id.getValue()==null){
            Ext.Msg.alert('提示','请扫描入库ID条码！');
            return;
        }
        var qjw2 = Ext.getCmp('view1qjw2');//扫描区架位信息
        if(qjw2.getValue()==''||qjw2.getValue()==null){
            Ext.Msg.alert('提示','请扫描区架位条码信息！');
            return;
        }
        var qjw = Ext.getCmp('view1qjw');//回写的区架位信息
        if(qjw.getValue()!=qjw2.getValue()){
            Ext.Msg.alert('提示','入库信息不一致，不能确认！');
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
                type:"UPDATE"//调用存储 type表示入库确认操作！
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    Ext.Msg.alert('提示',text.msg);
                    Ext.getCmp('view1id').setValue('');//id
                    Ext.getCmp('view1itemno').setValue('');//物料号
                    Ext.getCmp('view1itemdesc').setValue('');//物料说明
                    Ext.getCmp('view1unitofmeas').setValue('');//计量单位
                    Ext.getCmp('view1qty').setValue('');//数量
                    Ext.getCmp('view1vendordesc').setValue('');//供应商名字
                    Ext.getCmp('view1storelocation').setValue('');//入库库房
                    Ext.getCmp('view1qjw').setValue('');//区架位
                    Ext.getCmp('view1qjw2').setValue('');//区架位条码
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