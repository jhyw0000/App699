Ext.define('App699.store.departmentStore',{
    extend: 'Ext.data.Store',

    config: {
        autoLoad: true,
        storeId: "departmentStore",
        model: 'App699.model.departmentModel',
        data: [
//                {departmentCode: "1", departmentDesc: "部门1"},
//                {departmentCode: "2", departmentDesc: "部门2"}
            ]
    }
});