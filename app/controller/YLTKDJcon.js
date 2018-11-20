Ext.define('App699.controller.YLTKDJcon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            view5 : 'view5'
        },
        control: {
            'view5 container#view5btn button':{
                tap: 'view5taskmaker'
            },
            'view5':{
                initialize: 'view5initialize'
             }
        }
    },
    //初始化输入框获取焦点
    view5initialize:function(){
        setTimeout(function(){
            Ext.getCmp('view5id').focus();
        },300);
    },
    //退库登记确认
    view5taskmaker: function(view){
        var app = this.getApplication();
        var id = Ext.getCmp('view5id');//表id主键
        if(id.getValue()==''||id.getValue()==null){
            Ext.Msg.alert('提示','请扫描入库ID条码！');
            return;
        }
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/tkdj/do',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
                id:id.getValue(),
                logId:app.localStorage.getItem("userName")
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    Ext.Msg.alert('提示',text.msg);
                    Ext.getCmp('view5id').setValue('');//物料编号
                    Ext.getCmp('view5itemno').setValue('');//物料编号
                    Ext.getCmp('view5itemdesc').setValue('');//物料说明
                    Ext.getCmp('view5unitofmeas').setValue('');//计量单位
                    Ext.getCmp('view5qty').setValue('');//数量
                    Ext.getCmp('view5vendordesc').setValue('');//供应商名字
                    Ext.getCmp('view5indepartmentdesc').setValue('');//入库部门
                    Ext.getCmp('view5outid').setValue('');//出库流水号
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