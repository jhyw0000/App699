Ext.define('App699.controller.LYCKSCcon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            view4 : 'view4'
        },
        control: {
            'view4 container#view4btn button':{
                tap: 'view4taskmaker'
            },
            'view4':{
                initialize: 'view4initialize'
             }
        }
    },
    //初始化输入框获取焦点
    view4initialize:function(){
        setTimeout(function(){
            Ext.getCmp('view4id').focus();
        },300);
    },
    //领用出库删除
    view4taskmaker: function(view){
        var app = this.getApplication();
        var id = Ext.getCmp('view4id');//表id主键
        if(id.getValue()==''||id.getValue()==null){
            Ext.Msg.alert('提示','请扫描出库ID条码！');
            return;
        }
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/lyck/do',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
                id:id.getValue(),
                empNo:"",
                type:"DELETE",//调用存储 type表示入库出库确认操作！
                outStore:""
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    Ext.Msg.alert('提示',text.msg);
                    Ext.getCmp('view4id').setValue('');//id
                    Ext.getCmp('view4itemno').setValue('');//物料号
                    Ext.getCmp('view4itemdesc').setValue('');//物料说明
                    Ext.getCmp('view4unitofmeas').setValue('');//计量单位
                    Ext.getCmp('view4qty').setValue('');//数量
                    Ext.getCmp('view4vendordesc').setValue('');//供应商名字
                    Ext.getCmp('view4manudate').setValue('');//生产日期
                    Ext.getCmp('view4validitydate').setValue('');//有效期
                    Ext.getCmp('view4outdepartmentdesc').setValue('');//出库部门
                    Ext.getCmp('view4user').setValue('');//领料人
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