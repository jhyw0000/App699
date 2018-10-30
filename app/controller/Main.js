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
                app.localStorage.setItem("departmentCode","");//部门编码
                app.localStorage.setItem("clockNo","");//员工编号
                app.localStorage.setItem("employeeName","");//员工姓名
                app.localStorage.setItem("teamCode","");//员工班组
            }
        },this);
    }
});