var statistics = new Object();
EmployeeInfo = new Object();
empPic = new Object();

//$(document).ready(function () {
window.onload = function () {
    getEmployees(renderEmployees);
    ReadEmployeesNeedNewVisa();
    getEmployeesnobusiness();
    getNewEmployees();
    ReadEmployeesNotActive();
    getBusinesses(renderBusinesses);  
    getDreason(renderDreasons);  
  //  Statistics(RenderTotalnewemp);
    StatisticsAllEmp(RenderTotalAllemp);
    $('input').iCheck({
        radioClass: 'iradio_flat-green',
    });
    //Picture or file upload
    $("#Pic").on("change", function () {
        pbLBL = $("#pbLBL")
        pbDiv = $("#progressBar")
        pbLBL.text('Uploading...');
        pbDiv.fadeIn(500)
        var files = $(this).get(0).files;
        if (files.length > 0) {


            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i])
            }
            uploadFiles(formData, setEmpFile);

        }
    })
}
//});
function setEmpFile(results) {
    empPic = results;
}

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
function renderBusinesses(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#businessSE').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Bus_id + '">' + row.Bus_name + '</option>';
        $('#businessSE').append(dynamicLi);
    });
        var select = $("#businessSE").selectize({
            maxItems: 1, //Max items selectable in the textbox
            maxOptions: 30 //Max options to render at once in the dropdown
            }
        );
}
function renderDreasons(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $("#DynamicDisableList").empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Did + '">' + row.D_name + '</option>';
        $('#DynamicDisableList').append(dynamicLi);
    });
    var select = $("#DynamicDisableList").selectize({
        maxItems: 1, //Max items selectable in the textbox
        maxOptions: 30 //Max options to render at once in the dropdown
    }
    );
}


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
$('#updateVisa').click(function () {
    $('#visaRenew').validate();
    
    if ($('#visaRenew').valid()) {
        EmployeeInfo.Ex_date = $('#visaDate').val();
        EmployeeInfo.Doc_id = $('#visaID').val();
        EmployeeInfo.Picture = empPic;
        EmployeeInfo.Doctype_id = '1';
        EmployeeInfo.Employee_pass_id = EmployeeInfo.pass
        $('#Update_Expiration').modal('toggle');
        updateVisa({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
})


$('#updateBusBTN').click(function () {
  //  $('#visaRenew').validate();

    //if ($('#visaRenew').valid()) {
    EmployeeInfo.Business = $('#businessSE').val();        
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    $('#empwithbusi').modal('toggle');
        updateEmpBusiness({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
   // }
})

$("#confirmDR").click(function () {
    //  $('#visaRenew').validate();

    //if ($('#visaRenew').valid()) {
    EmployeeInfo.Did = $('#DynamicDisableList').val();
    EmployeeInfo.Emp_id = EmployeeInfo.pass;
    EmployeeInfo.Description = $('#disableTXT').val();
    $("#Disable").modal('toggle');
    updateDisableReason({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    // }
})

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
    var select = $("#DynamicEmployeesList").selectize({
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
//function RenderTotalnewemp(results) {
//    statistics = results.d;
    

//}

function RenderTotalAllemp(results)
{
    statistics = results.d;
    document.getElementById("activeEmp").value = statistics[3];
    document.getElementById("activeEmp").max = statistics[1];
    document.getElementById("numnewemp").innerHTML = statistics[3];

    document.getElementById("allemp").value = statistics[5];
    document.getElementById("allemp").max = statistics[1];
    document.getElementById("allactiveemp").innerHTML = statistics[5];

    document.getElementById("allemp").value = statistics[7];
    document.getElementById("allemp").max = statistics[1];
    document.getElementById("numofleave").innerHTML = statistics[7];
}



