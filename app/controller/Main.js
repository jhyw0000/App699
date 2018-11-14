Ext.define('App699.controller.Main', {
    extend: 'Ext.app.Controller',

    requires: [
        'App699.view.ViewRKQR'
    ],

    config: {
        refs: {
            main: 'main',
            login: 'login'
        },
        control: {
            'container#welcome #row1 button': {
            	tap: 'openView'
            },
            'container#welcome #row2 button': {
                tap: 'openView'
            },
            'main container button[name=backBt]':{
                tap: 'mainBackClick'
            },
            'main':{
                initialize: 'maininitialize'
             }
        }
    },
    openView: function (btn, e) {
    	var main = this.getMain(),
    		action = btn.config.action, //1 2 3 ...
    		viewXType = 'view' + action, //view1 view2 view3 ...
    		views = Ext.ComponentQuery.query(viewXType), //找已经存在的视图对象
    		view = (views.length > 0) ? views[0] : Ext.widget(viewXType);
    	main.push(view);
    },
    //根据权限 修改图标是否可点击
    maininitialize:function(){
        var app = this.getApplication();
        var authstr = app.localStorage.getItem("auth");
        var autharr = [];
        if(authstr!=null && authstr!=""){
            if(authstr.indexOf(",") > 0){
                autharr = authstr.split(",");
                for(var i=0;i<autharr.length;i++){
                    if(Ext.getCmp("mainbtn"+autharr[i])){
                        Ext.getCmp("mainbtn"+autharr[i]).setDisabled(false);
                    }
                }
            }else{
                Ext.getCmp(("mainbtn"+authstr)).setDisabled(false);
            }
        }
    },
    mainBackClick: function(){
        //先执行替换按钮文本显示
        Ext.MessageBox.YESNO[0].text = '取消';
        Ext.MessageBox.YESNO[1].text = '确定';
        Ext.Msg.confirm("退出登录","",function(res){
            if(res=='yes'){
                var login = this.getLogin(),
                    main = this.getMain();
                login.pop(main);
                var app = this.getApplication();
                app.localStorage.setItem("userName","");
                app.localStorage.setItem("auth","");
            }
        },this);
    }
});