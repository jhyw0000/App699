Ext.define('App699.controller.Logincon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            login : 'login'
        },
        control: {
            'login panel#loginbtn button[name=pwdlogin]': {
                tap: 'pwdloginClick'
            },
            'login panel#loginbtn button[name=barlogin]': {
                tap: 'barloginClick'
            },
            'login':{
                initialize: 'logininitialize'
            }
        }
    },
    logininitialize:function(){
        var app = this.getApplication();
        var remflag = app.localStorage.getItem("remflag");
        var logId = app.localStorage.getItem("username");
        var logPwd = app.localStorage.getItem("userpwd");
        var ip = app.localStorage.getItem("ip");
        var port = app.localStorage.getItem("port");
        if(remflag=='true'){
            Ext.getCmp('remember').setValue(remflag);
            Ext.getCmp('remember').setChecked(true);
            Ext.getCmp('username').setValue(logId);
            Ext.getCmp('userpwd').setValue(logPwd);
        }else{
            Ext.getCmp('remember').setValue(false);
            Ext.getCmp('remember').setChecked(false);
            Ext.getCmp('username').setValue('');
            Ext.getCmp('userpwd').setValue('');
        }
        if(!(ip==null || ip=="") && !(port ==null || port =="")){
            config.baseUrl = 'http://'+ ip +':'+port// IP  端口
        }
    },
    pwdloginClick: function(){
        var value = Ext.getCmp('remember').getValue();
        var app = this.getApplication();
        var login = this.getLogin(),
            logId = Ext.getCmp('username').getValue(),
            logPwd = Ext.getCmp('userpwd').getValue();
        if(logId==null || logId==''){
            Ext.Msg.alert('提示','用户名不能为空');
            return;
        }
        if(logPwd==null || logPwd==''){
            Ext.Msg.alert('提示','密码不能为空');
            return;
        }
        var views, //找已经存在的视图对象
            view;
        //显示加载信息
        Ext.Viewport.add({
            xtype:'loadmask',
            message:'登录中...',
            id:'panel-mask'
        });
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/login/checklogin',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
                logId: logId,
                logPwd: logPwd
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    app.localStorage.setItem("userName",logId);
                    //将用户权限信息添加到全局
                    app.localStorage.setItem("auth",text.authroot);
                    //如果登录成功，设置记录用户名和密码，则将用户名和密码记录到本地
                    if(value){
                        app.localStorage.setItem("remflag",value);
                        app.localStorage.setItem("username",logId);
                        app.localStorage.setItem("userpwd",logPwd);
                    }else{
                        app.localStorage.setItem("remflag",false);
                        app.localStorage.setItem("username","");
                        app.localStorage.setItem("userpwd","");
                    }
                    //此处初始化main
                    views = Ext.ComponentQuery.query('main'), //找已经存在的视图对象
                    view = (views.length > 0) ? views[0] : Ext.widget('main');
                    //将用户名添加到main
                    var currUserName = Ext.getCmp('currUserName');
                    currUserName.setHtml('<span style="valign:bottom;font-size:0.8em;">当前用户：'+ text.root[0].EMPLOYEENAME +'</span>');
                    Ext.Viewport.remove(Ext.getCmp('panel-mask'));//清除遮罩
                    login.push(view);//跳转到主界面
                }else{
                    Ext.Viewport.remove(Ext.getCmp('panel-mask'));//清除遮罩
                    Ext.Msg.alert('提示',text.msg);
                }
            },
            failure: function(response){
                Ext.Viewport.remove(Ext.getCmp('panel-mask'));//清除遮罩
                Ext.Msg.alert('提示','登录异常，请重试！');
            }
        });
    },
    barloginClick: function(btn, e){
        var login = this.getLogin();
        var views, view;
        views = Ext.ComponentQuery.query('viewconfig'), //找已经存在的视图对象
        view = (views.length > 0) ? views[0] : Ext.widget('viewconfig');
        login.push(view);
    }
});