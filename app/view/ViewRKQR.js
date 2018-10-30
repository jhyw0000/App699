Ext.define('App699.view.ViewRKQR', {
	extend: 'Ext.Container',
	xtype:"view1",//别名: 'view1',

    requires: [
    ],
	config: {
		title: '入库确认',
        scrollable: {
            direction: 'vertical'
        },
        directionLock: true,
		items: [{
            xtype: 'container',
            margin: '10% 0 0 0',
            layout: 'hbox',
            width: '100%',
            style: 'background:white;',
            items: [
                {
                    margin: '0 0 4px 0',
                    id: 'view1eqmNum',
                    xtype: 'textfield',
                    name : 'view1eqmNum',
                    labelWidth: '33%',
                    label: '员工编号',
                    placeHolder : '扫码输入',
                    width: '90%'
                }
            ]
            },{
                  xtype: 'container',
                  itemId: 'view1btn',
                  style:'',
                  docked: 'bottom',
                  flex:1,
                  layout: 'hbox',
                  height: '8%',
                  items: [{
                      text:'报修',
                      xtype: 'button',
                      cls : 'noBorder',
                      ui: 'action',
                      flex: 1
                  }]
            }]
	}
});