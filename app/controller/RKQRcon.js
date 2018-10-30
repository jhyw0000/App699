Ext.define('App699.controller.RKQRcon', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            view1 : 'view1'
        },
        control: {
            'view1 container#view1btn button':{
                tap: 'view1taskmaker'
            }
        }
    },
    //获取参数测试
    view1taskmaker: function(view){
        var app = this.getApplication();
        var eqmNum = Ext.getCmp('view1eqmNum');//设备编号
        if(eqmNum.getValue()==''||eqmNum.getValue()==null){
            Ext.Msg.alert('提示','员工编号不能为空');
            return;
        }
        Ext.Ajax.setTimeout(6000);
        Ext.Ajax.request({
            url: config.baseUrl+'/esmmemp/createByPro',
            useDefaultXhrHeader: false,
            withCredentials: true,
            method: 'post',
            params: {
                logId:eqmNum.getValue()
            },
            success: function(response){
                var text = eval('('+response.responseText+')');
                if(text.success){
                    Ext.Msg.alert('提示',text.msg);
                    return;
                }
                Ext.Msg.alert('提示',text.msg);
            },
            failure: function(response){
                Ext.Msg.alert('提示','请求失败');
            }
        })
    }
//    view1taskmaker: function(view){
//        var app = this.getApplication();
//        var eqmNum = Ext.getCmp('view1eqmNum');//设备编号
//        if(eqmNum.getValue()==''||eqmNum.getValue()==null){
//            Ext.Msg.alert('提示','设备编号不能为空');
//            return;
//        }
//        var applyDate = Ext.getCmp('view1repairdate');//报修日期
//        var exceptions = Ext.getCmp('view1faultdes');//故障描述及原因
//        var jpgLocation = Ext.getCmp('filename');//获取图片名字
//        if(exceptions.getValue()==''||exceptions.getValue()==null){
//            Ext.Msg.alert('提示','故障现象及原因不能为空');
//            return;
//        }
//        //return;
//        Ext.Ajax.setTimeout(6000);
//        Ext.Ajax.request({
//            url: config.baseUrl+'/emisht/model/app/eqm/EqmFaultApply.Insert.exists.action',
//            useDefaultXhrHeader: false,
//            withCredentials: true,
//            method: 'post',
//            params: {
//                eqmNum: eqmNum.getValue()
//            },
//            success: function(response){
//                var text = eval('('+response.responseText+')');
//                if(text.success){
//                    if(text.flag==1){
//                         var year = applyDate.getValue().getFullYear(),
//                             month = (applyDate.getValue().getMonth()+1+'').length==1?('0'+(applyDate.getValue().getMonth()+1)):(applyDate.getValue().getMonth()+1),
//                             day = (applyDate.getValue().getDate()+'').length==1?('0'+(applyDate.getValue().getDate())):(applyDate.getValue().getDate());
//                         var daten = new Date(),
//                              yearn = daten.getFullYear(),
//                              monthn = daten.getMonth() + 1,
//                              strDate = daten.getDate(),
//                              hours = daten.getHours(),
//                              minutes = daten.getMinutes(),
//                              seconds = daten.getSeconds();
//                          if (monthn >= 1 && monthn <= 9) {
//                              monthn = "0" + monthn;
//                          }
//                          if (strDate >= 0 && strDate <= 9) {
//                              strDate = "0" + strDate;
//                          }
//                          var currentdate = yearn + '-' + monthn + '-' + strDate+' '+hours+':'+minutes+':'+seconds;
//                          var str = year+month+day,
//                              runStatus = 'S',//表示设备状态，'S'代表维修状态
//                              applyDepartment = app.localStorage.getItem('departmentCode'),//报修部门
//                              //修改报修人员（报修人员是e_smm_employee表中的clockNo）
//                              applyPerson = app.localStorage.getItem('clockNo'),//报修人员
//                              passFlag = '0',//提交标识
//                              createUser = app.localStorage.getItem('userName'),//制单人
//                              createDate = currentdate,//制单日期
//                              finishFlag = '1';//完成标识
//    //                      Ext.Msg.alert('提示',applyPerson);
//    //                     return;
//                         Ext.Ajax.setTimeout(6000);
//                         Ext.Ajax.request({
//                            url: config.baseUrl+'/emisht/model/app/eqm/EqmFaultApply.Insert.add.action',
//                            useDefaultXhrHeader: false,
//                            withCredentials: true,
//                            method: 'get',
//                            params: {
//                                eqmNum: eqmNum.getValue(),
//                                repairdate: str,
//                                exceptions: exceptions.getValue(),
//                                //exceptions: encodeURI(encodeURI(exceptions.getValue())),
//                                runStatus: runStatus,
//                                applyDate: applyDate.getValue(),
//                                applyDepartment: applyDepartment,
//                                applyPerson: applyPerson,
//                                passFlag: passFlag,
//                                createUser: createUser,
//                                createDate: createDate,
//                                finishFlag: finishFlag,
//                                jpgLocation:jpgLocation.getValue()
//                            },
//                            success: function(response){
//                                var text = eval('('+response.responseText+')');
//                                if(text.success){
//                                    Ext.getCmp('view1eqmNum').setValue('');//设备编号
//                                    Ext.getCmp('view1eqmname').setValue('');//设备名称
//                                    Ext.getCmp('view1eqmtype').setValue('');//设备型号
//                                    Ext.getCmp('view1faultdes').setValue('');//故障现象及原因
//                                    Ext.Msg.alert('提示','操作成功');
//                                }else{
//                                    Ext.Msg.alert('提示',text.msg);
//                                }
//                            },
//                            failure: function(){
//                                Ext.Msg.alert('提示','操作异常，请重试！');
//                            }
//                         });
//                    }else if(text.flag==0){
//                        Ext.Msg.alert('提示','存在未维修的数据');
//                    }
//                }else{
//                    Ext.Msg.alert('提示',text.msg);
//                }
//
//            },
//            failure: function(response){
//                Ext.Msg.alert('提示','报修异常！');
//            }
//        });
//    }
});