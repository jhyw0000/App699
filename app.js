/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
Ext.Loader.setPath({
    'UX': 'app/ux',
    'App699': 'app'
});
Ext.application({
    name: 'App699',

    requires: [
        'App699.config',
        'Ext.MessageBox',
        'Ext.field.Password',
        'UX.viewport.Time',
        'UX.navigation.View',
        'Ext.field.DatePicker',
        'UX.viewport.FieldScroller'

    ],
    models: [
        'departmentModel',
        'empModel'
    ],
    stores: [
        'departmentStore',
        'empStore'
    ],
    views: [
        'Main',
        'Login',
        'ViewRKQR',
        'ViewRKQRQX',
        'ViewLYCK',
        'ViewLYCKSC',
        'ViewYLTCDJ'
    ],

    controllers: [
        'Logincon',
        'Main',
        'RKQRcon',
        'RKQRQXcon',
        'LYCKcon',
        'LYCKSCcon',
        'YLTKDJcon'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    localStorage: window.localStorage,//添加本地存储
    launch: function() {
        // Destroy the #appLoadingIndicator element
        this.someTricks();//小技巧
        this.registerEvents();//事件
        Ext.fly('appLoadingIndicator').destroy();
        this.langZh();//汉化
        Ext.Msg.defaultAllowedConfig.showAnimation = false


        // Initialize the main view
        //Ext.Viewport.add(Ext.create('App699.view.Main'));
        Ext.Viewport.add(Ext.create('App699.view.Login'));

    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    registerEvents: function(){
        Ext.Viewport.onAfter('activeitemchange', function(viewport, value, oldValue) {//在各自的View里面触发
            value.fireEvent('activateview', value, oldValue);
            if (oldValue)
                oldValue.fireEvent('deactivateview', oldValue, value);
        }, Ext.Viewport);

        document.addEventListener("backbutton", Ext.Function.bind(this.onBackButton, this), false); //手机物理返回键(phonegap提供事件)
        //document.addEventListener("menubutton", Ext.Function.bind(this.onMenuButton, this), false); //手机物理菜单键(phonegap提供事件)
    },
    someTricks: function() {
        //安卓需要下面段代码才能使orientationchange事件生效
        if (Ext.os.is.Android) {
            Ext.Viewport.addWindowListener('resize', Ext.Function.bind(Ext.Viewport.onResize, Ext.Viewport));
            Ext.Viewport.updateSize(); //added
            Ext.Viewport.orientation = Ext.Viewport.determineOrientation(); //added
        }

        //解决点击穿透
        Ext.Viewport.onBefore('activeitemchange', 'beforeActiveItemChange', this);
        Ext.Viewport.onAfter('activeitemchange', 'afterActiveItemChange', this);
        Ext.Viewport.on({
            delegate: 'mask',
            show: 'maskShow',
            hide: 'maskHide',
            scope: this
        });
    },
    beforeActiveItemChange: function(container, newItem, oldItem) {
        if (newItem.element)
            newItem.element.addCls('prevent-pointer-events');
    },
    afterActiveItemChange: function(container, newItem, oldItem) {
        setTimeout(function() {
            if (newItem.element)
                newItem.element.removeCls('prevent-pointer-events');
        }, 300);
    },
    maskShow: function(mask) {
        var activeItem = Ext.Viewport.getActiveItem();
        if (activeItem.element)
            activeItem.element.addCls('prevent-pointer-events');
    },
    maskHide: function(mask) {
        var activeItem = Ext.Viewport.getActiveItem();
        setTimeout(function() {
            if (activeItem.element)
                activeItem.element.removeCls('prevent-pointer-events');
        }, 300);
    },
    onBackButton: function() {
        var activeItem = Ext.Viewport.getActiveItem();
        var id = activeItem.id;
        if (id.indexOf("mainView") != -1) {
            var mainview = Ext.Viewport.getActiveItem();
            var length = mainview.getActiveItem().getItems().length;
            console.log("length = " + length);
            if(length > 2){
                if(app.viewId == 0){
                    app.getController("phone.MyAppControllerP").pop(1);
                }else if(app.viewId == 1){
                    app.getController("phone.TodoControllerP").pop(1);
                }else if(app.viewId == 2){
                    app.getController("phone.AppCenterControllerP").pop(1);
                }else if(app.viewId ==3){
                    app.getController("phone.MoreControllerP").pop(1);
                }
            }else{
                if (typeof WL === 'undefined') {
                    Ext.Msg.confirm("提示", "您确定要退出应用吗?", function(e) {
                        if (e == "yes") {
                            navigator.app.exitApp();
                        }
                    }, this);
                } else {
                    WL.SimpleDialog.show("提示", "您确定要退出应用吗?", [ {
                        text : "确定",
                        handler : function() {
                            navigator.app.exitApp();
                        }
                    }, {
                        text : "取消",
                        handler : function() { }
                        } ]);
                }
            }
        }else{
            if (typeof WL === 'undefined') {
                //console.log(6);
                Ext.Msg.confirm("提示", "您确定要退出应用吗?", function(e) {
                    if (e == "yes") {
                        //清理登录用户信息
                        this.localStorage.removeItem("userName");
                        navigator.app.exitApp();
                    }
                }, this);
            } else {
                WL.SimpleDialog.show("提示", "您确定要退出应用吗?", [ {
                    text : "确定",
                    handler : function() {
                        navigator.app.exitApp();
                    }
                }, {
                    text : "取消",
                    handler : function() { } } ]);
            }
        }
    },
    //汉化
    langZh:function(){
        //Ext.Msg.alert('提示','进入汉化函数');
        if ((navigator.language || navigator.systemLanguage || navigator.userLanguage).split('-')[0] === 'zh') {
            Ext.Date.monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            Ext.Date.monthNumbers = {
                'Jan': 0,
                'Feb': 1,
                'Mar': 2,
                'Apr': 3,
                'May': 4,
                'Jun': 5,
                'Jul': 6,
                'Aug': 7,
                'Sep': 8,
                'Oct': 9,
                'Nov': 10,
                'Dec': 11
            };
            if (Ext.picker) {
                if (Ext.picker.Picker) {
                    var config = Ext.picker.Picker.prototype.config;
                    //Ext.Msg.alert('提示',config.doneButton);
                    config.doneButton = '确定';
                    config.cancelButton = '取消';
                }
            }
            if (Ext.MessageBox) {
                var msg = Ext.MessageBox;
                msg.OK.text = '确定';
                msg.CANCEL.text = '取消';
                msg.YES.text = '是222';
                msg.NO.text = '否222';
                msg.OKCANCEL[0].text = '取消';
                msg.OKCANCEL[1].text = '确定';
                msg.YESNOCANCEL[0].text = '取消';
                msg.YESNOCANCEL[1].text = '否333';
                msg.YESNOCANCEL[2].text = '是333';
//                msg.YESNO[0].text = '忽略';
//                msg.YESNO[1].text = '查看';
            }

        }
    }
});
