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
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/emp/list',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
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
    },
    //领用出库确认
    view3taskmaker: function(view){
        var app = this.getApplication();
        var id = Ext.getCmp('view3id');//表id主键
        if(id.getValue()==''||id.getValue()==null){
            Ext.Msg.alert('提示','请扫描出库ID条码！');
            return;
        }
        var outdepartment = Ext.getCmp('view3outdepartmentdesc');//表id主键
        if(outdepartment.getValue()==''||outdepartment.getValue()==null){
            Ext.Msg.alert('提示','出库部门不能为空！');
            return;
        }
        var empNo = Ext.getCmp('view3user');//表id主键
        if(empNo.getValue()==''||empNo.getValue()==null){
            Ext.Msg.alert('提示','领用人不能为空！');
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
                empNo:empNo.getValue(),
                type:"INSERT",//调用存储 type表示入库出库确认操作！
                outStore:outdepartment.getValue()
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    Ext.Msg.alert('提示',text.msg);
                    Ext.getCmp('view3id').setValue('');//id
                    Ext.getCmp('view3itemno').setValue('');//物料号
                    Ext.getCmp('view3itemdesc').setValue('');//物料说明
                    Ext.getCmp('view3unitofmeas').setValue('');//计量单位
                    Ext.getCmp('view3qty').setValue('');//数量
                    Ext.getCmp('view3vendordesc').setValue('');//供应商名字
                    Ext.getCmp('view3manudate').setValue('');//生产日期
                    Ext.getCmp('view3validitydate').setValue('');//有效期
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