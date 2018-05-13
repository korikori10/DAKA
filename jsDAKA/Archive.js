

$(document).ready(function () {
    getArchive();
});

var EmployeeInfo = new Object();


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
       



    }
    else {
        //Send SMS To Employees
        // SendSMS();
        window.location = "error404.html";
    }
});

function refreshTable() {
    //var table = $('#ArchiveTable').DataTable();
    //table.ajax.reload();//refreshTable();
    
};

