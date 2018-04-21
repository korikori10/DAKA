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
                        'defaultContent': '<button name="dlt" class="btn btn-danger delete" data-toggle="tooltip" data-original-title="העבר לארכיון""><i class="icon-ios-trash"></i></button><button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data-original-title="צפה בעובד"><i class="icon-eye3"></i></button>',

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
                        refreshTable();

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
    var datatableVariable = $('#ArchiveTable');
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
                        'defaultContent': '<button name="activate" id="activate" class="btn btn-icon btn-success view" data-toggle="tooltip" data-original-title="החזר לפעילות""><i class="icon-arrow61"></i></button><button name="edit" id="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data-original-title="צפה בעובד"><i class="icon-eye3"></i></button>',

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
            var datatableVariable = $('#BusinessTable').DataTable({
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
            var datatableVariable = $('#HistoryTable').DataTable({
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

//חידושי ויזות
function ReadEmployeesNeedNewVisa() { 
$.ajax({
    type: "POST",
    dataType: "json",
    url: "ajaxWebService.asmx/ReadEmployeesNeedNewVisa",
    success: function (data) {
        var datatableVariable = $('#newvisaalert').DataTable({
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
                    'defaultContent': '<button name="visa" class="btn btn-icon btn-success " data-toggle="tooltip" data-original-title="ויזה חודשה""><i class="icon-check"></i></button><button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data-original-title="צפה בעובד"><i class="icon-eye3"></i></button><button name="sms" class="btn btn-icon btn-primary" data-toggle="tooltip" data- original - title="שלח סמס""><i class="icon-check"></i></button>',
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
            var datatableVariable = $('#empNoBusi').DataTable({
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
                        'defaultContent': '<button name="dlt" class="btn btn-danger delete" data-toggle="tooltip" data-original-title="העבר לארכיון""><i class="icon-ios-trash"></i></button><button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data-original-title="צפה בעובד"><i class="icon-eye3"></i></button>',
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
        var datatableVariable = $('#newemp').DataTable({
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
                {
                    'data': "",
                    'defaultContent': '<button  name="email"  class="btn btn-icon btn-success" data-toggle="tooltip" data-original-title="שלח מייל לחברת הביטוח""><i class="icon-envelope"></i></button><button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data-original-title="צפה בעובד"><i class="icon-eye3"></i></button>',
                }]
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
                        'defaultContent': '<button name="dlt" class="btn btn-danger delete" data-toggle="tooltip" data-original-title="העבר לארכיון""><i class="icon-ios-trash"></i></button><button name="edit" type="button" class="btn btn-info view" data-toggle="tooltip" data-original-title="צפה בעובד"><i class="icon-eye3"></i></button>',
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

