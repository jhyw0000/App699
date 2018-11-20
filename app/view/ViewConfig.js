Ext.define('App699.view.ViewConfig', {
	extend: 'Ext.form.Panel',
	requires: ['Ext.form.FieldSet'],
	xtype: 'viewconfig',

	config: {
		title: '服务配置',
		autoDestroy: false,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

		items: [{
		    margin: '40% 0 0 0',
			xtype: 'component',
			html: '输入服务器的IP和PORT,例如：IP:192.168.1.1，PORT:8080'
		}, {
			xtype: 'fieldset',
			items: [{
				xtype: 'textfield',
				id: "ip",
				value: '192.168.1.110',
				label: 'IP'
			},{
				xtype: 'textfield',
				id: "port",
				value: '8088',
				label: 'PORT'
			}]
		},{
		    margin: '10% 0 0 0',
		    text:'确认',
            xtype: 'button',
            name: 'configok',
            ui: 'action',
            flex: 0.5
		},{
            margin: '2% 0 0 0',
            text:'取消',
            xtype: 'button',
            name: 'configcancle',
            ui: 'action',
            flex: 0.5
        }],

		listeners: [{
            delegate: "field",
            event: 'change',
            fn: "onFormChange"
		}]
	},
    onFormChange: function() {
        this.dirty = true;
    },

	beforePop: function(){
        var me = this, main = me.up("main");
        if (me.dirty) {
            Ext.Msg.show({
                title: "系统提示",
                message: '已更改, 是否保存?',
                buttons: [{
                    text: "取消",
                    itemId: "cancel"
                }, {
                    text: "保存",
                    itemId: "yes"
                }, {
                    text: "不保存",
                    itemId: "no"
                }],
                promptConfig: false,
                scope: me,
                fn: function(btnId) {
                    if (btnId == "yes") {
                        me.fireEvent('tapsave', me); //tapsave是点击导航栏save按钮的事件
                    } else if (btnId == "no") {
                        if (main.beforePop()) main.doPop();
                    }
                }
            });
            return false; //不会继续pop
        }
        return true; //继续pop
    }
});