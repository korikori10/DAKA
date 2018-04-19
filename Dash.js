var statistics = new Object();
EmployeeInfo = new Object();

//$(document).ready(function () {
window.onload = function () {
    ReadEmployeesNeedNewVisa();
    getEmployeesnobusiness();
    getNewEmployees();
    ReadEmployeesNotActive();
    Statistics(RenderTotalnewemp);
}
//});


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
        MakeEmpActive();
        
    }
    else {
        //Send SMS To Employees
       // SendSMS();
        window.location = "error404.html";
            }
    

});
//SearchBox

//$(document).ready(function () {

//    $('#DynamicEmployeesList').typeahead({
//    getEmployeesearch(renderEmployees)
//    });

//});

//SearchBox
function renderEmployees(results) {
    //this is the callBackFunc
    totalEmp = 0;
    results = $.parseJSON(results.d);
    for (var i = 1; i <= results.length; i++) {
        totalEmp = i;
    }
    var dl = $('#DynamicEmployeesList');
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Employee_pass_id + '">' + row.Fname + " " + row.Lname + '</option>';
        dl.append(dynamicLi);
    });
}

//Statistics callcack func
function RenderTotalnewemp(results) {
    statistics = results.d;
    document.getElementById("activeEmp").value = statistics[1];
    document.getElementById("activeEmp").max = statistics[3];
    document.getElementById("numnewemp").innerHTML = statistics[1];

}



