var statistics = new Object();

$('.table').on('click', 'tr td button', function () {
 
    sessionStorage.removeItem("empInfo")
    tr = $(this).closest('tr');//.find('td:first').text();
    tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('id');
        var data = $("#" + tableId).DataTable().row(tr).data();
        EmployeeInfo.pass = data['Employee_pass_id'];
    if (whichid == "edit") {

        sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
    }
    else if (whichid =="activate") {

        var dataString = JSON.stringify(EmployeeInfo);

        $.ajax({
            url: 'ajaxWebService.asmx/UpdateToActive',
            data: dataString,
            type: 'POST',
            dataType: "json",
            contentType: 'application/json; charset = utf-8',
            success: function () {
                alert("yes");
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });        
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




