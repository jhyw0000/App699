Ext.define('App699.controller.Configcon', {
    extend: 'Ext.app.Controller',

    requires: [
        'App699.view.ViewRKQR'
    ],

    config: {
        refs: {
            login: 'login',
            viewconfig: 'viewconfig'
        },
        control: {
            'viewconfig button[name=configok]':{
                tap: 'configok'
            },
            'viewconfig button[name=configcancle]':{
                tap: 'configcancle'
            },
            'viewconfig':{
                initialize: 'viewconfiginitialize'
             }
        }
    },
    //根据本地设置填充ip port
    viewconfiginitialize:function(){
        var app = this.getApplication();
        var ip = app.localStorage.getItem("ip");
        var port = app.localStorage.getItem("port");
        if(ip!=null && ip != ""){
            Ext.getCmp('ip').setValue(ip);
        }
        if(port!=null && port != ""){
            Ext.getCmp('port').setValue(port);
        }
    },
    configok: function(){
        var app = this.getApplication();
        var ip = Ext.getCmp('ip').getValue();
        if(ip==null || ip==""){
            Ext.Msg.alert('提示','ip不能为空！');
            return;
        }
        var port = Ext.getCmp('port').getValue();
        if(port==null || port==""){
            Ext.Msg.alert('提示','端口不能为空！');
            return;
        }
        Ext.getCmp('ip').setValue(ip);
        Ext.getCmp('port').setValue(port);
        app.localStorage.setItem("ip",ip);
        app.localStorage.setItem("port",port);
        config.baseUrl = 'http://'+ ip +':'+port// IP  端口
        var login = this.getLogin(),
            viewconfig = this.getViewconfig();
        login.pop(viewconfig);
    },
    configcancle:function(){
        var login = this.getLogin(),
            viewconfig = this.getViewconfig();
        login.pop(viewconfig);
    }
});