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

function changeGmah() {
        EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
        if ($("input[name=gmahh]:checked").val()) {
            EmployeeInfo.Final_bill = 'True';
        updateGmah({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }
        else if ($("input[name=gmahh]:checked").val() == semiTrue) {
            EmployeeInfo.Final_bill = 'False';
        updateGmah({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }
    
}

function changeInsurance() {
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    if ($("input[name=insured]:checked").val()) {
        EmployeeInfo.Com_insurance = 'True';
        updateInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }
    else if ($("input[name=insured]:checked").val() == semiTrue) {
        EmployeeInfo.Com_insurance = 'False';
        updateInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }

}

function cancelInsurance() {
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    
        EmployeeInfo.Com_insurance = 'False';
        EmployeeInfo.Insurance = 'False';
        EmployeeInfo.Ex_date = $('#cancellationDate').val(); 
        cancelInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
 

}

function renderBusinesses(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#businessSE').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Bus_id + '"><h3>' + row.Bus_name + '</h3> </option>';
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
        dynamicLi = '<option value="' + row.Did + '">' + row.D_name +  '</option>';
        $('#DynamicDisableList').append(dynamicLi);
    });
    var select = $("#DynamicDisableList").selectize({
        maxItems: 1, //Max items selectable in the textbox
        maxOptions: 30 //Max options to render at once in the dropdown
    }
    );
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


// Button Clicks In Tables
$('.table').on('click', 'tr td button', function () {
 //Take the Employee ID from the table row
    sessionStorage.removeItem("empInfo")
        //tr = $(this).closest('tr');//.find('td:first').text()
    current_row = $(this).parents('tr');//Get the current row;
    if (current_row.hasClass('child')) {//Check if the current row is a child row
        current_row = current_row.prev();//If it is, then point to the row before it (its 'parent')
    }
    tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('name');
    var data = $("#" + tableId).DataTable().row(current_row).data();
    //if (!jQuery.isEmptyObject(data)) {
    //    alert('You clicked on ' + data.Employee_pass_id + '\'s row');
    //} else {
    //    alert('failed first check');
    //    var tr = $(this).closest('tr');
    //    var data = DataTable().row(tr).data();
    //}
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
        EmployeeInfo.Doc_id = EmployeeInfo.pass + $('#visaDate').val();
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
    EmployeeInfo.Start_date = $('#SchedulingDate').val();        
  //  EmployeeInfo.End_date = $('#SchedulingDate').val();        
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
        dynamicLi = '<option value="' + row.Employee_pass_id + '" data-extra-search="{"sysid":' + row.Sys_id +'}"> <h3>' + row.Fname + " " + row.Lname + '</h3>  </option>';
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
        },
        dataAttr: 'data-extra',//search also for hidden values
        searchField: ['value', 'text', 'other']
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

    document.getElementById("allemp1").value = statistics[5];
    document.getElementById("allemp1").max = statistics[1];
    document.getElementById("allactiveemp").innerHTML = statistics[5];

    document.getElementById("allemp").value = statistics[7];
    document.getElementById("allemp").max = statistics[1];
    document.getElementById("numofleave").innerHTML = statistics[7];
}



