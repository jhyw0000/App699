Ext.define("App699.view.Main", {
    extend:"UX.navigation.View",
    xtype: 'main',
    fullscreen: true,
    config: {
        autoDestroy: false, //不自动销毁子视图
//        scrollable: {
//            direction: 'vertical'
//        },
        items:[{
           //xtype:'titlebar',
           xtype: 'container',
           baseCls: 'aaa',
           docked: 'top',
           //title: 'wenzi',
           //margin: '2% 2% 0 2%',
           height: 28,
           //html: '<div style="background-color:red;"></div>',
           items: [{
                   margin: '2% 1% 1% 1%',
                   style: '',
                   layout:'hbox',
                       items:[{
                           html:'<span class="logo2 logo3"></span>',
                           flex:3,
                           style:''
                       },{
                           padding: '',
                           id: 'currUserName',
                           name: 'currUserName',
                           html:'<span style="valign:center;font-size:0.8em;margin-top:10px;">当前用户：</span>',
                           flex:2.2,
                           style:''
                       }]
                   }
               ]
           },{

            xtype: "container",
            title: '欢迎',
            itemId: 'welcome',
            cls: 'welcome',
            items: [{
                layout: 'hbox',
                height: '20%',
                itemId: 'row1',
                margin: '6% 0 0 0',
                items: [
                    {
                        action: '1',
                        xtype: 'button',
                        width: '25%',
                        text: '<span class="mainmenu">报修申请</span>',
                        ui: 'normal',
                        cls : 'noBorder',
                        iconAlign: 'top',
                        iconCls: 'mc1rn',
                        iconMask : true
                    },
                    {
                        action: '2',
                        xtype: 'button',
                        width: '25%',
                        text: '<span class="mainmenu">维修开始</span>',
                        ui: 'normal',
                        cls : 'noBorder',
                        iconAlign: 'top',
                        iconCls: 'mc1rn',
                        iconMask : true
                    },
                    {
                        action: '3',
                        xtype: 'button',
                        width: '25%',
                        text: '<span class="mainmenu">维修完成</span>',
                        ui: 'normal',
                        cls : 'noBorder',
                        iconAlign: 'top',
                        iconCls: 'mc2rn',
                        iconMask : true
                     },
                     {
                         action: '4',
                         xtype: 'button',
                         width: '25%',
                         text: '<span class="mainmenu">维修查询</span>',
                         ui: 'normal',
                         cls : 'noBorder',
                         iconAlign: 'top',
                         iconCls: 'mc1rn',
                         iconMask : true
                     }
                       ]
            },{
                  layout: 'hbox',
                  itemId: 'row2',
                  height: '20%',
                  margin: '1% 0 0 0',
                  items: [
                        {
                           action: '5',
                           xtype: 'button',
                           width: '25%',
                           text: '<span class="mainmenu">保养提醒</span>',
                           ui: 'normal',
                           cls : 'noBorder',
                           iconAlign: 'top',
                           iconCls: 'mc3rn',
                           iconMask : true
                        }]
              },{
                   //第三项，下部导航按钮
                   xtype: "container",
                   docked: 'bottom',
                   flex:1,
                   layout: 'hbox',
                   height: '8%',
                   //itemId: 'mainbackbtn',
                   items: [{
                       text:'主页',
                       xtype: 'button',
                       ui: 'action',
                       cls : 'noBorderMainBtn',
                       iconAlign: 'top',
                       iconCls: 'homepage',
                       name: 'mainBt',
                       flex: 1
                   },{
                       text:'退出',
                       xtype: 'button',
                       cls : 'noBorderBackBtn',
                       iconAlign: 'top',
                       iconCls: 'backpage',
                       name: 'backBt',
                       ui: 'action',
                       flex: 1
                   }]
               }]
        }]
    }
});