


// Button Clicks In Tables
$('.table').on('click', 'tr td button', function () {
    //Take the Employee ID from the table row
    sessionStorage.removeItem("empInfo")
    tr = $(this).closest('tr');//.find('td:first').text();
    tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('id');
    var data = $("#" + tableId).DataTable().row(tr).data();
    EmployeeInfo.pass = data['Employee_pass_id'];
    if (whichid == "edit") {
        //Go To Employee Page
        sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
    }
    else if (whichid == "activate") {
        //Make Employee Active Again
            sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
        MakeEmpActive(EmployeeInfo.pass);


    }
    else {
        //Send SMS To Employees
        // SendSMS();
        window.location = "error404.html";
    }