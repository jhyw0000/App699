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
            }
        }
    },
    pwdloginClick: function(){
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
        var views = Ext.ComponentQuery.query('main'), //找已经存在的视图对象
        view = (views.length > 0) ? views[0] : Ext.widget('main');
//        login.push(view);
//        return false;
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
                    //将用户名添加到main
                    var currUserName = Ext.getCmp('currUserName');
                    currUserName.setHtml('<span style="valign:bottom;font-size:0.8em;">当前用户：'+ text.root[0].EMPLOYEENAME +'</span>');
                    login.push(view);//跳转到主界面
                }else{
                    Ext.Msg.alert('提示',text.msg);
                }
            },
            failure: function(response){
                Ext.Msg.alert('提示','登录异常，请重试！');
            }
        });
    },
    barloginClick: function(btn, e){
        var app = this.getApplication();
        var login = this.getLogin(),
            loginType = 'cardLogin',
            logId = '',
//            views = Ext.ComponentQuery.query('main'), //找已经存在的视图对象
//            view = (views.length > 0) ? views[0] : Ext.widget('main');
            views, //找已经存在的视图对象
            view;
//        login.push(view);//跳转到主界面
//        return;
        cordova.plugins.barcodeScanner.scan(
             function (result) {
//                alert("We got a barcode Result: " + result.text + "Format: " + result.format + "Cancelled: " + result.cancelled);
                  logId = result.text;
                  if(logId==null || logId==''){
                        return;
                    }
                  if(result.format=='QR_CODE'){
                         var str=logId;
                         //创建文档对象
                         var parser=new DOMParser();
                         var xmlDoc=parser.parseFromString(str,"text/xml");

                         //提取数据
                         var countrys = xmlDoc.getElementsByTagName('CBH');

                         var arr = [];

                         for (var i = 0; i < countrys.length; i++) {
                             arr.push(countrys[i].textContent);
                         };
                         logId = arr[0];
                  }

                  Ext.Ajax.setTimeout(8000);
                  Ext.Ajax.request({
                      url: config.baseUrl+'/emisht/model/sys/login/portal001/portalAction001.checkLogin.action?checkUser=false',
                      useDefaultXhrHeader: false,
                      withCredentials: true,
                      method: 'post',
                      params: {
                          loginType: loginType,
                          logId: logId
                      },
                      success: function(response){
                          var text = eval('('+response.responseText+')');
                          if(text.success){
                              app.localStorage.setItem("userName",logId);
                              //去后台获取登录用户的信息（主要是部门编号）
                              Ext.Ajax.setTimeout(6000);
                              Ext.Ajax.request({
                                  url: config.baseUrl+'/emisht/model/app/sfc/Sfc.getLoginInfo.action',
                                  useDefaultXhrHeader: false,
                                  withCredentials: true,
                                  method: 'post',
                                  params: {
                                      logId: logId
                                  },
                                  success: function(response){
                                      var text = eval('('+response.responseText+')');
                                      if(text.success){
                                          views = Ext.ComponentQuery.query('main');//找已经存在的视图对象
                                          view = (views.length > 0) ? views[0] : Ext.widget('main');
                                          app.localStorage.setItem("departmentCode",text.root[0].departmentCode);//部门编码
                                          app.localStorage.setItem("clockNo",text.root[0].clockNo);//员工编号
                                          app.localStorage.setItem("employeeName",text.root[0].employeeName);//员工姓名
                                          app.localStorage.setItem("teamCode",text.root[0].teamCode);//员工班组信息
                                          //将用户名添加到main
                                          var currUserName = Ext.getCmp('currUserName');
                                          currUserName.setHtml('<span style="valign:bottom;font-size:0.8em;">当前用户：'+ text.root[0].employeeName +'</span>');
                                          login.push(view);//跳转到主界面
                                          return;
                                      }
                                      Ext.Msg.alert('提示','获取用户信息失败，请重试！');
                                  },
                                  failure: function(response){
                                      Ext.Msg.alert('提示','登录失败，请重试！');
                                  }
                              });
                              return;
                          }
                          Ext.Msg.alert('提示','条码不存在，请重试！');
                      },
                      failure: function(response){
                          Ext.Msg.alert('提示','登录失败，请重试！');
                      }
                  });
             },
             function (error) {
                 alert("Scanning failed: " + error);
             },
             {
                 preferFrontCamera : false, // 前置摄像头 iOS and Android
                 showFlipCameraButton : false, // 摄像头翻转按钮iOS and Android
                 showTorchButton : false, // 电灯图标显示按钮  iOS and Android
                 torchOn: false, // Android, launch with the torch switched on (if available)
                 prompt : "请将二维码/条形码至于扫描区域", // Android
                 resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                 //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                 formats : "all", // default: all but PDF_417 and RSS_EXPANDED
                 orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                 disableAnimations : true, // iOS
                 disableSuccessBeep: false // iOS
             }
          );
    }
});