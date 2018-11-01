Ext.define('App699.controller.LYCKcon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            view3 : 'view3'
        },
        control: {
            'view3 container#view3btn button':{
                tap: 'view3taskmaker'
            },
            'view3':{
                initialize: 'view3initialize'
             }
        }
    },
    view3initialize:function(){
        //初始化获取部门信息
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/department/list',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    //将分类信息填充到store的data中
                    var departmentStore = Ext.getCmp('view3outdepartmentdesc').getStore();
                    departmentStore.setData(text.root);
                    return;
                }
                Ext.Msg.alert('提示',text.msg);
            },
            failure: function(response){
                Ext.Msg.alert('提示','请求失败');
            }
        });

    },
    //获取参数测试
    view3taskmaker: function(view){
        var app = this.getApplication();
        var eqmNum = Ext.getCmp('view3eqmNum');//设备编号
        if(eqmNum.getValue()==''||eqmNum.getValue()==null){
            Ext.Msg.alert('提示','员工编号不能为空');
            return;
        }
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/esmmemp/createByPro',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
                logId:eqmNum.getValue()
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    Ext.Msg.alert('提示',text.msg);
                    return;
                }
                Ext.Msg.alert('提示',text.msg);
            },
            failure: function(response){
                Ext.Msg.alert('提示','请求失败');
            }
        });
    }
});