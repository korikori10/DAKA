$('.table').on('click', 'tr td button', function () {
 
    sessionStorage.removeItem("empInfo")
    tr = $(this).closest('tr');//.find('td:first').text();
    tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('id');
    if (whichid == "edit") {

        var data = $("#" + tableId).DataTable().row(tr).data();
        EmployeeInfo.pass = data['Employee_pass_id'];
        sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
    }
    else {
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
    

});

//$('#newemp').on('click', 'tr td button', function () {
//    //var table = $('#EmployeesTable').DataTable();
//    sessionStorage.removeItem("empInfo")
//    tr = $(this).closest('tr');//.find('td:first').text();
//    var data = $('#empNoBusi').DataTable().row(tr).data();
//    EmployeeInfo.pass = data['Employee_pass_id'];
//    sessionStorage.setItem("empInfo", EmployeeInfo.pass);
//    window.location = "Employee.html";
//});
