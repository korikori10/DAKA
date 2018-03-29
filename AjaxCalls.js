function getEmployees(renderEmployees) {
    $.ajax({
        url: 'AJAXWebService.asmx/getEmployees',
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (results) {
            renderEmployees(results);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
       
    });
    
}


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


//update spesific employee
function UpdateEmployee(EmployeeInfo) {

    // serialize the object to JSON string
    var emp = JSON.stringify(EmployeeInfo);

        $.ajax({
            url: 'ajaxWebService.asmx/GetUpdateEmployee',
            type: 'POST',
            contentType: 'application/json; charset = utf-8',
            data: emp,
            success: function () {
                swal("בוצע!", "עדכון פרטי העובד בוצע בהצלחה", "success");
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }

