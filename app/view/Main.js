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
           docked: 'top',
           margin: '1% 1% 0 1%',
           height: 30,
           //html: '<div style="background-color:red;"></div>',
           items: [{
                   //margin: '1% 1% 1% 1%',
                   //style: 'border:1px solid red;',
                   layout:'hbox',
                       items:[{
                           html:'<span class="logo21 logo3"></span>',
                           flex:0.5
                       },{
                           margin: '0 5% 0 0',
                           html:'<span style="valign:center;font-size:0.8em;margin-top:6px;">油漆暂存库管理系统</span>',
                           flex:2
                       },{
                           padding: '',
                           id: 'currUserName',
                           name: 'currUserName',
                           html:'<span style="valign:center;font-size:0.8em;margin-top:6px;">当前用户：</span>',
                           flex:2.5
                       }]
                   }
               ]
           },{

            xtype: "container",
            title: '欢迎',
            itemId: 'welcome',
            cls: 'welcome',
            items: [{
                xtype:'panel',
                margin: '0 0 0.1em 0',
                style: '',
                html: '<span class="maintu"></span>'
            },{
                layout: 'hbox',
                height: '20%',
                itemId: 'row1',
                margin: '5em 0 0 0',
                items: [
                    {
                        action: '1',
                        id: 'mainbtn1',
                        xtype: 'button',
                        width: '33.33%',
                        disabled: true,
                        text: '<span class="mainmenu">入库确认</span>',
                        ui: 'normal',
                        cls : 'noBorder2',
                        iconAlign: 'top',
                        iconCls: 'mc1rn',
                        iconMask : true
                    },
                    {
                        action: '2',
                        id: 'mainbtn2',
                        xtype: 'button',
                        width: '33.33%',
                        disabled: true,
                        text: '<span class="mainmenu">入库确认取消</span>',
                        ui: 'normal',
                        cls : 'noBorder2',
                        iconAlign: 'top',
                        iconCls: 'mc2rn',
                        iconMask : true
                    },
                    {
                        action: '3',
                        id: 'mainbtn3',
                        xtype: 'button',
                        width: '33.33%',
                        disabled: true,
                        text: '<span class="mainmenu">领用出库</span>',
                        ui: 'normal',
                        cls : 'noBorder2',
                        iconAlign: 'top',
                        iconCls: 'mc3rn',
                        iconMask : true
                     }
                       ]
            },{
                  layout: 'hbox',
                  itemId: 'row2',
                  height: '20%',
                  margin: '3.8em 0 0 0',
                  items: [
                        {
                             action: '4',
                             id: 'mainbtn4',
                             xtype: 'button',
                             width: '33.33%',
                             disabled: true,
                             text: '<span class="mainmenu">领用出库删除</span>',
                             ui: 'normal',
                             cls : 'noBorder2',
                             iconAlign: 'top',
                             iconCls: 'mc4rn',
                             iconMask : true
                         },
                        {
                           action: '5',
                           id: 'mainbtn5',
                           xtype: 'button',
                           width: '33.33%',
                           disabled: true,
                           text: '<span class="mainmenu">余料退库登记</span>',
                           ui: 'normal',
                           cls : 'noBorder2',
                           iconAlign: 'top',
                           iconCls: 'mc5rn',
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