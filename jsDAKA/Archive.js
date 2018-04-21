
<<<<<<< HEAD:jsDAKA/Archive.js
$(document).ready(function () {
    getArchive();
});
=======
var EmployeeInfo = new Object();
>>>>>>> 35350ebd1db9abc69c35405b4b9c92a6859a016d:Archive.js

// Button Clicks In Tables
$('.table').on('click', 'tr td button', function () {
    //Take the Employee ID from the table row
    sessionStorage.removeItem("empInfo")
    tr = $(this).closest('tr');//.find('td:first').text();
    tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('name');
    var data = $("#" + tableId).DataTable().row(tr).data();
    EmployeeInfo.pass = data['Employee_pass_id'];
    if (whichid == "edit") {
        //Go To Employee Page
        sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
    }
    else if (whichid == "activate") {
        //Make Employee Active Again
<<<<<<< HEAD:jsDAKA/Archive.js
        sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
        MakeEmpActive(EmployeeInfo.pass);
=======
        swal({
            title: "האם אתה בטוח?",
            text: "אתה עומד להפוך עובד לפעיל.",
            type: "info",
            confirmButtonText: "כן",
            showCancelButton: "true",
            cancelButtonText: "בטל",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },

            function (isConfirm) {
                if (isConfirm) {

                    MakeEmpActive(EmployeeInfo, refreshTable);
                }
                else {
                    // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
       
>>>>>>> 35350ebd1db9abc69c35405b4b9c92a6859a016d:Archive.js


    }
    else {
        //Send SMS To Employees
        // SendSMS();
        window.location = "error404.html";
    }
});
<<<<<<< HEAD:jsDAKA/Archive.js
    
=======
function refreshTable() {
    var table = $('EmployeesTable').DataTable()
    table.ajax.reload()
};
>>>>>>> 35350ebd1db9abc69c35405b4b9c92a6859a016d:Archive.js
