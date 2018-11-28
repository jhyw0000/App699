Ext.define('App699.controller.Pickcon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            picker : 'picker',
            picker2:'picker2'
        },
        control: {
             'picker':{
                 pick: 'pick2'
              },
              'picker2':{
                               pick: 'picker2'
                            }
        }
    },
    pick2:function(){
        this.getPicker().onDoneButtonTap();
    }
});