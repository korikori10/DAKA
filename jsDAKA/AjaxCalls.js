﻿var datatableVariable = new Object();
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
                    'excelHtml5',
                    'pdfHtml5',
                    {
                        text: 'Archive',
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

            //$('#studentTable tfoot th').each(function () {
            //    var placeHolderTitle = $('#studentTable thead th').eq($(this).index()).text();
            //    $(this).html('<input type="text" class="form-control input input-sm" placeholder = "Search ' + placeHolderTitle + '" />');
            //});

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
                    'excelHtml5',
                    'pdfHtml5',
                   
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


        }
    });


}

//Get all businesses to Businusses table
function getBusinessesTable() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "ajaxWebService.asmx/getBusinessesTable",
        success: function (data) {
            $datatableVariable = $('#BusinessTable').DataTable({
                data: data,
                columns: [
                    {'data': 'Bus_id' },
                    { 'data': 'Bus_name' },
                    { 'data': 'Phone'}
                    
                ]
            });
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
    //function ReadEmployeesNeedNewVisa() {
    //    $.ajax({
    //        type: "POST",
    //        dataType: "json",
    //        url: "ajaxWebService.asmx/ReadEmployeesNeedNewVisa",
    //        success: function (data) {
    //            var datatableVariable = $('#newvisaalert').DataTable({
    //                data: data,
    //                columns: [
    //                    {
    //                        'data': 'Employee_pass_id',
    //                        'visible': false
    //                    },
    //                    { 'data': 'Sys_id' },
    //                    { 'data': 'Fname' },
    //                    { 'data': 'Lname' },
    //                    {
    //                        'data': 'Ex_date', 'render': function (date) {
    //                            var date = new Date(parseInt(date.substr(6)));
    //                            var month = date.getMonth() + 1;
    //                            return date.getDate() + "/" + month + "/" + date.getFullYear();
    //                        }
    //                    },
    //                    { 'data': 'Phone' },
    //                    {
    //                        'data': "",
    //                        'defaultContent': '<button name="dlt" class="btn btn-danger delete" data-toggle="tooltip" data-original-title="העבר לארכיון""><i class="icon-ios-trash"></i></button><button id="edit" name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data-original-title="צפה בעובד"><i class="icon-eye3"></i></button>',
    //                    }]
    //            });
    //        }
    //    });

    //}
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

//חידושי ויזות
function ReadEmployeesNeedNewVisa() { 
$.ajax({
    type: "POST",
    dataType: "json",
    url: "ajaxWebService.asmx/ReadEmployeesNeedNewVisa",
    success: function (data) {
        datatableVariable = $('#newvisaalert').DataTable({
            data: data,
            columns: [
                {
                    'data': 'Employee_pass_id',
                    'visible': false
                },
                { 'data': 'Sys_id' },
                { 'data': 'Fname' },
                { 'data': 'Lname' },
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
                    'defaultContent': '<button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button><button name="Update_Expiration" data-toggle="modal" data-target="#Update_Expiration" class="btn btn-icon btn-success" data-toggle="tooltip" data- original - title="תוקף ויזה חדשה""><i class="icon-check"></i></button><button name="Disable" data-toggle="modal" data-target="#Disable" type="button" class="btn btn-danger delete" data-toggle="tooltip" data- original - title="הפסקת עבודה"><i class="icon-ios-trash"></i></button>',
                }]
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
             datatableVariable = $('#empNoBusi').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'Employee_pass_id',
                        'visible': false
                    },
                    { 'data': 'Sys_id' },
                    { 'data': 'Fname' },
                    { 'data': 'Lname' },
                    { 'data': 'Bus_name' },
                    { 'data': 'Phone' },
                    { 'data': 'Dayspass' },
                    {
                        'data': "",
                        'defaultContent': '<button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button><button name="empwithbusi" data-toggle="modal" data-target="#empwithbusi" class="btn btn-icon btn-success" data-toggle="tooltip" data- original - title="ציוות מחדש""><i class="icon-check"></i></button><button name="Disable1" data-toggle="modal" data-target="#Disable" class="btn btn-danger delete" data-toggle="tooltip" data- original - title="הפסקת עבודה""><i class="icon-ios-trash"></i></button>',
                    }]
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
        datatableVariable = $('#newemp').DataTable({
             data: data,
             responsive: true,
             "autoWidth": false,
      
                columns: [
                 {
                    'data': 'Employee_pass_id',
                    'visible': false
                },
                 {
                     'data': 'Sys_id' ,"orderable": true,
                     'width': '40',},
                {
                    "data": null,
                    render: function (data, type, row) {
                        var details = row.Fname + " " + row.Lname;
                        return details;
                    }
                },
                {
                    'data': "",
                    'defaultContent': '<button  name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data- original - title="צפה בעובד ועדכון מספר מכפל"><i class="icon-eye3"></i></button><button  name="insurance" data-toggle="modal" data-target="#insurance" class="btn btn-icon btn-success" data- original - title="חברת הביטוח""><i class="icon-paper"></i></button>',

                },
                { 'data': 'Bus_name' }]
        });
        $('#container').css('display', 'block');
        datatableVariable.columns.adjust().draw();
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
            var datatableVariable = $('#empnotactive').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'Employee_pass_id',
                        'visible': false
                    },
                    { 'data': 'Sys_id' },
                    { 'data': 'Fname' },
                    { 'data': 'Lname' },
                    { 'data': 'Bus_name' },
                    { 'data': 'Disable_reason' },
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
                        'defaultContent': '<button  name="gmah" data-toggle="modal" data-target="#gmah" class="btn btn-icon btn-success" data- original - title="רישום לצורך גמר חשבון""><i class="icon-file-subtract"></i></button><button name="Diur" data-toggle="modal" data-target="#Diur" class="btn btn-danger delete" data-toggle="tooltip" data- original - title="הוצאה מדיור""><i class="icon-arrow61"></i></button><button name="Cancelinsurance" data-toggle="modal" data-target="#Cancelinsurance" class="btn btn-icon btn-warning" data-toggle="tooltip" data- original - title="הפסקת ביטוח""><i class="icon-paper"></i></button><button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data- original - title="צפה בעובד"><i class="icon-eye3"></i></button>',
                    }]
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

//update employee insurance
function updateInsurance(EmployeeInfo) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/UpdateInsurance',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
          //  renderEmployeeByID(results);
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

function getBusinesses(renderBusinesses) {
    $.ajax({
        url: 'ajaxWebService.asmx/getBusinesses',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        dataType: 'json',
        success: function (results) {
            renderBusinesses(results);
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

//Update visa ex date
function updateVisa (EmployeeInfo) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/updateVisa',
        type: 'POST',
        contentType: 'application/json; charset = utf-8',
        data: emp,
        success: function (results) {

            setTimeout(function () {
                swal("בוצע!", "כל הנתונים נשמרו בהצלחה", "success");
            }, 1000);
            //  renderEmployeeByID(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function updateEmpBusiness(EmployeeInfo) {

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
            }, 1000);
            //  renderEmployeeByID(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}

function updateDisableReason(EmployeeInfo) {

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
            //  renderEmployeeByID(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}