﻿var datatableVariable = new Object();
var local = true;
var WSUrl = 'ajaxWebService.asmx';
if (!local) {
    WSUrl = 'http://proj.ruppin.ac.il/bgroup59/test2/tar2/ajaxwebservice.asmx';
}

//Get All Employees
function getEmployees(renderEmployees) {
    $.ajax({
        url: 'ajaxWebService.asmx/getEmployees',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {

            renderEmployees(results);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }

    });

}
//Get All Employees for employees table
function getEmployeess() {
    var datatableVariable = $('#EmployeesTable');
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "AJAXWebService.asmx/getEmployeess",
        success: function (data) {
            datatableVariable.DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        messageTop: 'Printing'
                    },
                    'copyHtml5',
                    'csv',
                    'pdf',
                    {
                        text: 'Archive',
                        className: "my-1 btn btn-secondary",
                        action: function (e, dt, node, config) {
                            window.location = "Archive.html";
                        }
                    }
                ],
                data: data,
                columns: [
                    { 'data': 'Employee_pass_id' },
                    { 'data': 'Fname' },
                    { 'data': 'Lname' },
                    {
                        'data': 'Birthday', 'render': function (date) {
                            var date = new Date(parseInt(date.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },
                    { 'data': 'Phone' },

                    {
                        'data': "",
                        'defaultContent': '<button name="dlt" class="btn btn-danger delete" data-toggle="tooltip" data- original - title="העבר לארכיון""><i class="icon-ios-trash"></i></button><button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button>',

                    }]
            });
            $(".buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel").addClass("my-1 btn btn-secondary ");
            $(".dt-buttons").addClass("btn-group");
            $(".btn").removeClass("dt-button");

        }
    });
}

//Make Employee active again from Archive
function MakeEmpActive(EmployeeInfo, refreshTable) {
    var dataString = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/UpdateToActive',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function () {

            setTimeout(function () {
                swal({
                    title: "בוצע!",
                    text: "כל הנתונים נשמרו בהצלחה",
                    type: "success",
                },
                    function (isConfirm) {
                    //    var table = $('#ArchiveTable').DataTable();

                        datatableVariable.ajax.reload();
                       
                      // refreshTable()

                      //  getArchive();
                    }, 1000);

            });
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });        
}

function MakeEmpNotActive(EmployeeInfo, current_row) {

    var dataString = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/UpdateToUnActive',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function () {
            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
                NotActiveEmpDatatableVariable.row(current_row).remove().draw();
            }, 1000);
            //$("#insurance").modal('hide');

         
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//Archive
function getArchive() {
     datatableVariable = $('#ArchiveTable');
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "AJAXWebService.asmx/getArchive",
        success: function (data) {
            datatableVariable.DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'print',
                        messageTop: 'Printing'
                    },
                    'copyHtml5',
                    'csv',
                    'pdf'
                ],
                data: data,
                columns: [
                    { 'data': 'Employee_pass_id' },
                    { 'data': 'Fname' },
                    { 'data': 'Lname' },
                    {
                        'data': 'Birthday', 'render': function (date) {
                            var date = new Date(parseInt(date.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },
                    { 'data': 'Phone' },

                    {

                        'data': "",
                        'defaultContent': '<button name="activate" id="activate" class="btn btn-icon btn-success view" data-toggle="tooltip" data- original - title="החזר לפעילות""><i class="icon-arrow61"></i></button><button name="edit" id="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button>',

                    }]
            });
            $(".buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel").addClass("my-1 btn btn-secondary ");
            $(".dt-buttons").addClass("btn-group");
            $(".btn").removeClass("dt-button");

        }
    });


}

//Get all businesses to Businusses table
function getBusinessesTable() {
    var datatableVariable = $('#BusinessTable');
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ajaxWebService.asmx/getBusinessesTable",
        success: function (data) {
                datatableVariable.DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            extend: 'print',
                            messageTop: 'Printing'
                        },
                        'copyHtml5',
                        'csv',
                        'pdf'
                        ],
                data: data,
                columns: [
                    {
                        'data': 'Bus_id',
                        'visible': false
                    }, 
                    { 'data': 'Bus_name' },
                    { 'data': 'Department_name' },
                    { 'data': 'Phone' },

                    {
                        'data': "",
                        'defaultContent': '<button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button>',

                    }
                ]
                    
            });
                $(".buttons-copy, .buttons-csv, .buttons-print, .buttons-pdf, .buttons-excel").addClass("my-1 btn btn-secondary ");
                $(".dt-buttons").addClass("btn-group");
                $(".btn").removeClass("dt-button");
        }
    });
}

//Send SMS For Employees that needs to renew their visa
function SendSMS() {
    $.ajax({
        url: 'AJAXWebService.asmx/PostDataToURL',
        type: 'POST',
        dataType: "xml",
        // contentType: 'application/json; charset = utf-8',
        success: function (results) {
            alert("sms sent");
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}
    
//SearchBox
 function getEmployeesearch(renderEmployees) {
        $.ajax({
            url: 'AJAXWebService.asmx/getEmployeesearch',
            type: 'POST',
            dataType: "json",
            //  contentType: 'application/json; charset = utf-8',
            success: function (results) {
                renderEmployees(results);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

//Make the search to go to emp page
function getEmployeeById(EmployeeInfo, renderEmployeeByID) {

    // serialize the object to JSON string
    var dataString =  JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/GetEmployeeById',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderEmployeeByID(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//History page for employee
function getHistory(EmployeeInfo) {

    $.ajax({
        url: 'ajaxWebService.asmx/GetHistory',
        data: EmployeeInfo,
        type: 'POST',
        dataType: "json",
        success: function (data) {
            $datatableVariable = $('#HistoryTable').DataTable({
                data: data,
                columns: [
                    { 'data': 'Employee_pass_id' },
                    { 'data': 'Fname' },
                    { 'data': 'Lname' },
                    { 'data': 'Bus_name' },
                    {
                        'data': 'Start_date', 'render': function (date) {
                            var date = new Date(parseInt(date.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },
                    {
                        'data': 'End_date', 'render': function (date) {
                            var date = new Date(parseInt(date.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    }
                ]
            });



        }
    });

}

//Statistics
function Statistics(RenderTotalnewemp) {
    $.ajax({
        url: 'AJAXWebService.asmx/ReadTotalnewemp',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            RenderTotalnewemp(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}

function getUsers(renderUsers) {
    $.ajax({
        url: 'ajaxWebService.asmx/getUsers',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {

            renderUsers(results);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }

    });

}

//statistics all active emp
function StatisticsAllEmp(RenderTotalAllemp) {
    $.ajax({
        url: 'AJAXWebService.asmx/ReadTotalAllemp',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            RenderTotalAllemp(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}

//statistics page , emp growth by year
function StatisticsEmpByYear(RenderempByYear) {
    $.ajax({
        url: 'AJAXWebService.asmx/ReadEmpByYearStatistics',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            RenderempByYear(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

} 

//statistics page , busi growth by quarter
function StatisticsbusiByQuarter(RenderBusiByQuarter) {
    $.ajax({
        url: 'AJAXWebService.asmx/ReadBusiByQuarterStatistics',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            RenderBusiByQuarter(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}

//statistics page , emp growth by month
function StatisticsEmpByMonth(RenderempByMonth) {
    $.ajax({
        url: 'AJAXWebService.asmx/ReadEmpByMonthStatistics',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            RenderempByMonth(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}

//statistics page , busi growth by year
function StatisticsBusiByYear(RenderBusiByYear) {
    $.ajax({
        url: 'AJAXWebService.asmx/ReadBusiByYearStatistics',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            RenderBusiByYear(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}

//חידושי ויזות
function ReadEmployeesNeedNewVisa() { 
$.ajax({
    type: "POST",
    dataType: "json",
    url: "ajaxWebService.asmx/ReadEmployeesNeedNewVisa",
    success: function (data) {
        t2 = $('#newvisaalert').DataTable({
            data: data,
            "bLengthChange": false,
            responsive: true,
            autoWidth: false,

            columns: [
                {
                    'data': 'Employee_pass_id',
                    'visible': false
                },
                { 'data': 'Sys_id' },
                {
                    "data": null,
                    render: function (data, type, row) {
                        var details = row.Fname + " " + row.Lname;
                        return details;
                    }
                },
                {
                    'data': 'Ex_date', 'render': function (date) {
                        var date = new Date(parseInt(date.substr(6)));
                        var month = date.getMonth() + 1;
                        return date.getDate() + "/" + month + "/" + date.getFullYear();
                    }
                },
                { 'data': 'Phone' },
                {
                    'data': "",
                    'defaultContent': '<button name="edit" type="button" class="btn btn-info view call-to-action-btn" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button><button name="Update_Expiration" data-toggle="modal" data-target="#Update_Expiration" class="btn btn-icon btn-success call-to-action-btn" data-toggle="tooltip" data- original - title="תוקף ויזה חדשה""><i class="icon-check"></i></button><button name="Disable" data-toggle="modal" data-target="#Disable" type="button" class="btn btn-danger delete call-to-action-btn" data-toggle="tooltip" data- original - title="הפסקת עבודה"><i class="icon-ios-trash"></i></button>',
                    'responsivePriority': 5000
                }
            ]
        });
    }
});
}

//ממתינים לציוות
function getEmployeesnobusiness() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ajaxWebService.asmx/getEmployeesnobusiness",
        success: function (data) {
             t3 = $('#empNoBusi').DataTable({
                 data: data,
                 "bLengthChange": false,
                 responsive: true,
                columns: [
                    {
                        'data': 'Employee_pass_id',
                        'visible': false
                    },
                    { 'data': 'Sys_id' },
                    {
                        "data": null,
                        render: function (data, type, row) {
                            var details = row.Fname + " " + row.Lname;
                            return details;
                        }
                    },
                    { 'data': 'Bus_name' },
                    { 'data': 'Phone' },
                    { 'data': 'Dayspass' },
                    {
                        'data': "",
                        'defaultContent': '<button name="edit" type="button" class="btn btn-info view call-to-action-btn" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button><button name="empwithbusi" data-toggle="modal" data-target="#empwithbusi" class="btn btn-icon btn-success call-to-action-btn" data-toggle="tooltip" data- original - title="ציוות מחדש""><i class="icon-check"></i></button><button name="Disable1" data-toggle="modal" data-target="#Disable" class="btn btn-danger delete call-to-action-btn" data-toggle="tooltip" data- original - title="הפסקת עבודה""><i class="icon-ios-trash"></i></button><button name="sms" id="sms"  class="btn btn-danger delete call-to-action-btn" data-toggle="tooltip" data- original - title="שליחת SMS""><i class="icon-ios-trash"></i></button>',
                        'responsivePriority': 5000
                    }
                ]
            });

        }
    });


}

//עובדים חדשים
function getNewEmployees() {
$.ajax({
    type: "POST",
    dataType: "json",
    url: "ajaxWebService.asmx/getNewEmployees",
    success: function (data) {        
          t1 = $('#newemp').DataTable({
              data: data,
              "bLengthChange": false,
             responsive: true,
             autoWidth: false,
             "scrollY": "200px",
             "scrollCollapse": true,
             "paging": true,
             "scrollX": false,
      
                columns: [
                 {
                    'data': 'Employee_pass_id',
                    'visible': false
                },
                 {
                     'data': 'Sys_id' },
                {
                    "data": null,
                    render: function (data, type, row) {
                        var details = row.Fname + " " + row.Lname;
                        return details;
                    }
                },
                { 'data': 'Bus_name' },
                {
                    'data': "",
                    'defaultContent': '<button  name="edit" type="button" class="btn btn-info view call-to-action-btn" data-toggle="tooltip" data- original - title="צפה בעובד ועדכון מספר מכפל"><i class="icon-eye3"></i></button><button  name="insurance" data-toggle="modal" data-target="#insurance" class="btn btn-icon btn-success call-to-action-btn" data- original - title="חברת הביטוח""><i class="icon-paper"></i></button>',
                    'responsivePriority': 5000
                }
                ]
        });
   
    }
});

}

//עובדים לא פעילים
function ReadEmployeesNotActive() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ajaxWebService.asmx/ReadEmployeesNotActive",
        success: function (data) {
             NotActiveEmpDatatableVariable = $('#empnotactive').DataTable({
                 data: data,
                 "bLengthChange": false,
                 responsive: true,
                 autoWidth: false,
                 "scrollY": "200px",
                 "scrollCollapse": true,
                 "paging": true,
                 "scrollX": false,
                columns: [
                    {
                        'data': 'Employee_pass_id',
                        'visible': false
                    },
                    { 'data': 'Sys_id' },
                    {
                        "data": null,
                        render: function (data, type, row) {
                            var details = row.Fname + " " + row.Lname;
                            return details;
                        }
                    },
                    { 'data': 'Bus_name' },
                    { 'data': 'Disable_reason'},
                    { 'data': 'Phone' },
                    {
                        'data': 'Ex_date', 'render': function (date) {
                            var date = new Date(parseInt(date.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },
                    {
                        'data': "",
                        'defaultContent': '<button name="gmahB"  data-toggle="modal" data-target="#gmah" class="btn btn-icon btn-success call-to-action-btn"  title="רישום לצורך גמר חשבון""><i data-toggle="tooltip" class="icon-file-subtract "></i></button><button name="Diur" data-toggle="modal" data-target="#Diur" class="btn btn-danger delete call-to-action-btn" data-toggle="tooltip" data- original - title="הוצאה מדיור""><i class="icon-arrow61"></i></button><button name="Cancelinsurance" data-toggle="modal" data-target="#Cancelinsurance" class="btn btn-icon btn-warning call-to-action-btn" data-toggle="tooltip" data- original - title="הפסקת ביטוח""><i class="icon-paper"></i></button><button name="edit" type="button" class="btn btn-info view call-to-action-btn" title="צפה בעובד"><i class="icon-eye3"></i></button>',
                        'responsivePriority': 5000
                    }

                ]
            }); 
        }
    });

}

//update spesific employee
function UpdateEmployee(EmployeeInfo, renderEmployeeByID) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);

        $.ajax({
            url: 'ajaxWebService.asmx/GetUpdateEmployee',
            type: 'POST',
            contentType: 'application/json; charset = utf-8',
            data: emp,
            success: function (results) {
           
                    setTimeout(function () {
                        swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
                    }, 1000);
                renderEmployeeByID(results);    
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
}

//update spesific business
function UpdateBusiness(BusinessInfo, renderBusinesses) {

    // serialize the object to JSON string
    var bus = JSON.stringify(BusinessInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/updateBusiness',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: bus,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
            renderEmployeeByID(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//update spesific user
function UpdateUsercall(UserInfo) {

    // serialize the object to JSON string
    var user = JSON.stringify(UserInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/UpdateUser',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: user,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//insert spesific business
function InsertBusiness(BusinessInfo, renderBusinesses) {

    // serialize the object to JSON string
    var bus = JSON.stringify(BusinessInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/insertBusiness',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: bus,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
            renderEmployeeByID(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//insert spesific business
function InsertBusinessContact(BusiInfo) {

    // serialize the object to JSON string
    var bus = JSON.stringify(BusiInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/insertBusinessAndContact',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: bus,
        success: function (results) {
            alert(results);
            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//insert spesific Employee
function insertEmployee(EmployeeInfo) {
    var emp = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/insertEmployee',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        success: function () {
            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
           // window.location = "DashBoardPage.html";
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//insert spesific user
function InsertUserCall(UserInfo) {

    // serialize the object to JSON string
    var user = JSON.stringify(UserInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/insertUser',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: user,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//Delete user

function DeleteUserCall(UserInfo) {

    // serialize the object to JSON string
    var user = JSON.stringify(UserInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/DeleteUser',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: user,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//insert spesific contact
function InsertContact(contactInfo) {

    // serialize the object to JSON string
    var con = JSON.stringify(contactInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/insertContact',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: con,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
           
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}



//insert spesific contract
function InsertheContract(DocsInfo) {

    // serialize the object to JSON string
    var doc = JSON.stringify(DocsInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/insertContract',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: doc,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//insert spesific contact
function UpdateContact(contactInfo) {

    // serialize the object to JSON string
    var con = JSON.stringify(contactInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/UpdateContact',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: con,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//update employee insurance
function updateInsurance(EmployeeInfo, current_row) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);
   // var table = $('#newemp');
    $.ajax({
        url: 'ajaxWebService.asmx/UpdateInsurance',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        async: false,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
                t1.row(current_row).remove().draw();
            }, 1000);
            $("#insurance").modal('hide');

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });


}

//take user deatails from DB using ajax WS
function getUserByUserName(username, renderUser) {
    var dataString = '{"username":' + JSON.stringify(username) + '}';
    $.ajax({
        url: WSUrl + '/getUserByUserName',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderUser(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function getUserById(username, ValidateUser) {

    // serialize the object to JSON string
    var dataString = '{"username":' + JSON.stringify(username) + '}';

    $.ajax({
        url: WSUrl + '/getUserByUserName',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            ValidateUser(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}



//cancel employee insurance
function ajaxcancelInsurance(EmployeeInfo) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);
    // var table = $('#newemp');
    $.ajax({
        url: 'ajaxWebService.asmx/cancelInsurance',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        async: false,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });


}


//update employee gmah

function updateGmah(EmployeeInfo) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);
    $.ajax({
        url: 'ajaxWebService.asmx/updateGmahWS',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        async: false,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
                $("#gmah").modal('hide');
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });


}

function updateDiur(EmployeeInfo) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);
    $.ajax({
        url: 'ajaxWebService.asmx/updateDiur',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        async: false,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });


}

function getCities(renderCities) {
    $.ajax({
        url: 'ajaxWebService.asmx/getCities',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderCities(results);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }

    });

}

function getCountries(renderCountries) {
    $.ajax({
        url: 'ajaxWebService.asmx/getCountries',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderCountries(results);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }

    });

}

function getRoles(renderRoles) {
    $.ajax({
        url: 'ajaxWebService.asmx/getRoles',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderRoles(results);
        },
        error: function (request, error) {
            alert('Network error has occurred please try again!');
        }

    });

}

function getBusinesses(renderBusinesses)//, renderBusinessesSearch) {//, renderBusinessesSearch
{
    $.ajax({
        url: 'ajaxWebService.asmx/getBusinesses',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderBusinesses(results);
           // renderBusinessesSearch(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function getBusinesses(renderBusinesses, renderBusinessesSearch) {//, renderBusinessesSearch
    $.ajax({
        url: 'ajaxWebService.asmx/getBusinesses',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderBusinesses(results);
            renderBusinessesSearch(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}
function getBusinessesE(renderBusinesses){//, renderBusinessesSearch) {//, renderBusinessesSearch
    $.ajax({
        url: 'ajaxWebService.asmx/getBusinesses',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderBusinesses(results);
          //  renderBusinessesSearch(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function getDepartments(renderDepartments)
{
    $.ajax({
        url: 'ajaxWebService.asmx/getDepartments',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderDepartments(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}


function getTypes(renderTypes) {
    $.ajax({
        url: 'ajaxWebService.asmx/getTypes',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderTypes(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function getUserTypes(renderUserTypes) {
    $.ajax({
        url: 'ajaxWebService.asmx/getUserTypes',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderUserTypes(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function getContactsByBus(renderContacts) {
    $.ajax({
        url: 'ajaxWebService.asmx/getContacts',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderContacts(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function getDreason(renderDreasons) {
    $.ajax({
        url: 'ajaxWebService.asmx/getDisable',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderDreasons(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });

}

function sendEmail(EmployeeInfo) {
    var dataString = JSON.stringify(EmployeeInfo);
    $.ajax({
        url: 'ajaxWebService.asmx/SendEmail',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function () {
           
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function sendEmailCancelInsurance(EmployeeInfo) {
    var dataString = JSON.stringify(EmployeeInfo);
    $.ajax({
        url: 'ajaxWebService.asmx/CancelInsuranceSendEmail',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function () {

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//Upload Files
function uploadFiles(formData, setEmpFile) {
    pbLBL = $("#pbLBL")
    pbDiv = $("#progressBar")
    $.ajax({
        url: 'UploadHandler.ashx',
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (results) {
            setEmpFile(results);
            pbLBL.text('Complete');
            pbDiv.fadeOut(2000);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}

//Upload contracts
function uploadFiles(formData, setDocFile) {
    pbLBL = $("#pbLBL")
    pbDiv = $("#progressBar")
    $.ajax({
        url: 'UploadHandler.ashx',
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (results) {
            setDocFile(results);
          pbLBL.text('Complete');
          pbDiv.fadeOut(2000);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }

    });

}

//Update visa ex date
function updateVisa (EmployeeInfo) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo, current_row);

    $.ajax({
        url: 'ajaxWebService.asmx/updateVisa',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
                t2.row(current_row).remove().draw();
            }, 1000);
            $("#Update_Expiration").modal('hide');
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function updateEmpBusiness(EmployeeInfo, current_row ) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/updateEmpBusiness',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
               t3.row(current_row).remove().draw();
            }, 1000); 
            $("#empwithbusi").modal('hide');

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//Disable reason in visa table
function updateDisableReason(EmployeeInfo, current_row) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/Updatedisablereason',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
                t2.row(current_row).remove().draw();
            }, 1000);
            $("#Disable").modal('hide');

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function updateDisableReasonWithoutBusiness(EmployeeInfo, current_row) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/Updatedisablereason',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
               // t3.row(current_row).remove().draw();
            $("#Disable2").modal('hide');

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}
//emp docs
function getTheDocs(DocsInfo, renderDocs) {

    // serialize the object to JSON string
    var dataString = JSON.stringify(DocsInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/ReadDocs',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderDocs(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

//busi docs
function getTheDocsBusi(DocsInfo, renderDocs) {

     //serialize the object to JSON string
    var dataString = JSON.stringify(DocsInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/ReadDocsBusi',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderDocs(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function getDocTypes(renderDocTypes) {
    $.ajax({
        url: 'ajaxWebService.asmx/getDocTypes',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderDocTypes(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });

}

function updatePass(newpass, username) {
    userPass = JSON.stringify({ userName: username, pass: newpass })
    $.ajax({
        url: WSUrl + '/updateUserPass',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: userPass,
        success: function () {
            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);

        }
    });
}