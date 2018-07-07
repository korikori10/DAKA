
var EmployeeInfo = new Object();

$(document).ready(function () {
    getArchive();
});



// Button Clicks In Tables
$('.table').on('click', 'tr td button', function () {
    //Take the Employee ID from the table row
    sessionStorage.removeItem("empInfo")
 current_row = $(this).parents('tr');//Get the current row;
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }  
  tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('name');
    var data = $("#" + tableId).DataTable().row(current_row).data();
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

                    MakeEmpActive(EmployeeInfo,current_row);
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



