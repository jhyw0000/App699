Ext.define('App699.view.Login', {
    extend: 'Ext.navigation.View',
    xtype: 'login',
    fullscreen: true,

    config: {
        xtype: 'panel',
        items:[{
            xtype:'panel',
            itemId: 'loginbtn',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items:[{
                xtype:'panel',
                margin: '2em 1em 0.5em 1em',
                style: '',
                html: '<span class="logo"></span>'
            },{
                xtype:'panel',
                margin: '0 0em 0 0em',
                style: '',
                html: '<span class="logo2"></span>',
                layout: {
                    type: 'vbox',
                    align: 'center'
                }
            },{
                xtype: 'panel',
                margin: '1em 0 0 0',
                layout: {
                    type: 'vbox',
                    pack:'center',
                    align: 'center'
                },
                width: '80%',
                items: [
                  {
                      id: 'username',
                      width: '100%',
                      margin: '0 0 1px 0',
                      xtype: 'textfield',
                      name : 'username',
                      cls: 'unp',
                      label: '<center>账号</center>',
                      listeners: {
                      	focus: function(){
                      	    Ext.getCmp('username').setValue('');
                      	},
                      	change: function(){
                      	      //下面要处理xml数据
                      	      var username = Ext.getCmp('username').getValue();
                      	      var str=username;
                      	      if(str==null||""==str){
                      		    return;
                      	      }
                      	      if(str.indexOf("?")==-1){
                      		    return;
                      	      }
                      	      //创建文档对象
                      	      var parser=new DOMParser();
                      	      var xmlDoc=parser.parseFromString(str,"text/xml");

                      	      //提取数据
                      	      var countrys = xmlDoc.getElementsByTagName('CBH');
                      	      var arr = [];

                      	      for (var i = 0; i < countrys.length; i++) {
                      		    arr.push(countrys[i].textContent);
                      	      };
                      	      this.setValue(arr[0]);
                      	  }
                      }
                  }
                ]
            },{
                xtype: 'panel',
                margin: '0.5em 0 0 0',
                layout: {
                    type: 'vbox',
                    pack:'center',
                    align: 'center'
                },
                width: '80%',
                items: [
                  {
                      id: 'userpwd',
                      width: '100%',
                      margin: '0 0 4px 0',
                      xtype: 'passwordfield',
                      name : 'userpwd',
                      cls: 'unp',
                      label: '<center>密码</center>'
                  }
                ]
              },{
                xtype:'button',
                text: '',
                width: '35%',
                height: '6%',
                cls: 'login login1',
                margin: '1.5em 0 0 0',
                name: 'pwdlogin'
            },{
                xtype:'panel',
                cls: 'or',
                layout: {
                    type: 'vbox',
                    pack:'center',
                    align: 'center'
                },
                margin: '1.5em 0 0 0',
                html: '<span class="or"></span>'
            },{
                text:'',
                width: '35%',
                height: '6%',
                xtype: 'button',
                cls: 'login login2',
                margin: '1.5em 0 0 0',
                name: 'barlogin'
            }]
         }]
    },
    initialize: function () {
        this.callParent(arguments);
        var narBar = this.getNavigationBar();
        narBar.hide();
    }
});
