var statistics = new Object();
EmployeeInfo = new Object();

//$(document).ready(function () {
window.onload = function () {
    getEmployees(renderEmployees);
    ReadEmployeesNeedNewVisa();
    getEmployeesnobusiness();
    getNewEmployees();
    ReadEmployeesNotActive();
    Statistics(RenderTotalnewemp);
    StatisticsAllEmp(RenderTotalAllemp);
    $('input').iCheck({
        radioClass: 'iradio_flat-green',
    });
    
}
//});


function changeInsurance() {
        EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    if ($("input[name=insured]:checked").val()) {
        EmployeeInfo.Com_insurance = 'True';
        updateInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
    else if ($("input[name=insured]:checked").val() == semiTrue) {
        EmployeeInfo.Com_insurance = 'False';
        updateInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
    

};

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
        MakeEmpActive();  
    }
    else if (whichid=="sms") {

        //Send SMS To Employees
     //   SendSMS();
    }
    else if (whichid == "email") {
    //    sendEmail(EmployeeInfo);
    }
    //else if (whichid == "insurance") {
    //    //    sendEmail(EmployeeInfo);
    //}
    //else if (whichid == "Update_Expiration") {
    //    //    sendEmail(EmployeeInfo);
    //} else if (whichid == "Disable") {
    //    //    sendEmail(EmployeeInfo);
    //}
    //else {
    //    window.location = "error404.html";
    //        }
    

});


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
    ////////////////////////////////////////////
    var select = $(".selectize-select").selectize({
        maxItems: 1, //Max items selectable in the textbox
        maxOptions: 30, //Max options to render at once in the dropdown
       
        onItemAdd: function (value) {
            sessionStorage.removeItem("empInfo")
            EmployeeInfo.pass = value;
            sessionStorage.setItem("empInfo", EmployeeInfo.pass);
            window.location = "Employee.html"
        }
    });

}


//function renderEmployees(results) {
//    //this is the callBackFunc 
//    EmployeeInfo = results.d

//    $(".selectize-select").selectize({
//        create: true,
//        valueField: 'Emp_Pass_id',
//        lableField: 'Fname',
//        sortField: 'text',
//        searchField: ['Emp_Pass_id', 'Fname', 'Lname'],
//        options: EmployeeInfo
//    });

//}
//Statistics callcack func
function RenderTotalnewemp(results) {
    statistics = results.d;
    document.getElementById("activeEmp").value = statistics[1];
    document.getElementById("activeEmp").max = statistics[3];
    document.getElementById("numnewemp").innerHTML = statistics[1];

}

function RenderTotalAllemp(results)
{
    statisticsAll = results.d;
    document.getElementById("allemp").value = statisticsAll[1];
    document.getElementById("allemp").max = statisticsAll[3];
    document.getElementById("allactiveemp").innerHTML = statisticsAll[1];
}



