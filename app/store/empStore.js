Ext.define('App699.store.empStore',{
    extend: 'Ext.data.Store',

    config: {
        autoLoad: false,
        storeId: "empStore",
        model: 'App699.model.empModel',
        data: [
//                {empNo: "E0001", empName: "王明"},
//                {empNo: "E0002", empName: "李明"}
            ]
    }
});