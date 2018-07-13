var statistics = new Object();
EmployeeInfo = new Object();
BusinessInfo = new Object();
empPic = new Object();

//$(document).ready(function () {
window.onload = function () {
    getEmployees(renderEmployees);
    ReadEmployeesNeedNewVisa();
    getEmployeesnobusiness();
    getNewEmployees();
    ReadEmployeesNotActive();
    getBusinesses(renderBusinesses,renderBusinessesSearch);  
    getDreason(renderDreasons);  
    getEmployeesnobusinesss(renderEmployeesnobusiness);


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
            uploadFiles(formData, pbLBL, pbDiv, setEmpFile);

        }
    });
    $('#AddNewBus').click(function () {
        sessionStorage.removeItem("busiInfo")
    });

}
//});
//button vallidations
//if email and cancelation already done make it disable
    $('#Cancelinsurance').on('shown.bs.modal', function (e) {
        if (EmployeeInfo.Insurance == false) {

            $('#cancellationDate').attr('disabled', 'disabled');
            document.getElementById("Forfalse").innerHTML += "<span style='color: red;'> * ביטול הביטוח ושליחת המייל כבר נעשו </span>";
            //$('#updateCancellation').attr('disabled', 'disabled');
        }

});

//If System id(michpalid) is not filled yet,you can't send email to insurance
    $('#insurance').on('shown.bs.modal', function (e) {
        if (EmployeeInfo.Sys_id == 0) {
            $("#insurance").modal('hide');
            swal("אינך יכול לעדכן ביטוח ולשלוח מייל לפני עדכון מספר מכפל העובד!", "פעולה לא תקינה", "warning");
        }
    });

function fixDate(date) {
    var date = new Date(parseInt(date.substr(6)));
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month.toString().length < 2) { month = '0' + month; }

    if (day.toString().length < 2) { day = '0' + day; }

    return date.getFullYear() + "-" + month + "-" + day;

    }

function setEmpFile(results) {
    empPic = results;
}

//טבלת עובדים לא פעילים
//גמ"ח

function changeGmah() {
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
        if ($("input[name=gmahh]:checked").val()) {
            EmployeeInfo.Final_bill = 'True';
        updateGmah({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
        else if ($("input[name=gmahh]:checked").val() === semiTrue) {
            EmployeeInfo.Final_bill = 'False';
        updateGmah({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
//if (EmployeeInfo.Com_insurance == 'False' &&  EmployeeInfo.Insurance == 'False' &&  EmployeeInfo.Final_bill == 'True' && EmployeeInfo.Com_app == 'False') {
//        MakeEmpNotActive({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);

//}
    
}



//ביטול דיור
function changeDiur() {
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    if ($("input[name=Diur]:checked").val()) {
        EmployeeInfo.Com_app = 'False';//כן תוציא לי מדיור
        updateDiur({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
    else {
        EmployeeInfo.Com_app = 'True';//לא להוציא מדיור
        updateDiur({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
//if (EmployeeInfo.Com_insurance== 'False' &&  EmployeeInfo.Insurance == 'False' &&  EmployeeInfo.Final_bill == 'True' && EmployeeInfo.Com_app == 'False') {
//        MakeEmpNotActive({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);

//}

}

//הפסקת ביטוח
function cancelInsurance() {
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    if (EmployeeInfo.Insurance != 'False') {

        sendEmailCancelInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
        EmployeeInfo.Com_insurance = 'False';
        EmployeeInfo.Insurance = 'False';
        EmployeeInfo.Ex_date = $('#cancellationDate').val(); 
        ajaxcancelInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }

//if (EmployeeInfo.Com_insurance== 'False' &&  EmployeeInfo.Insurance == 'False' &&  EmployeeInfo.Final_bill == 'True' && EmployeeInfo.Com_app == 'False') {
//        MakeEmpNotActive({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);

//}

}

//טבלת עובדים חדשים
function changeInsurance() {
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    if ($('#insured').prop('checked')) {
        EmployeeInfo.Com_insurance = 'True';
        updateInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }
    else if ($('#otherIn').prop('checked')) {
        EmployeeInfo.Com_insurance = 'False';
        updateInsurance({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }

}



function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//טבלת חידושי ויזה
$('#updateVisa').click(function () {
    $('#visaRenew').validate();

    if ($('#visaRenew').valid()) {
        EmployeeInfo.Ex_date = $('#visaDate').val();
        EmployeeInfo.Doc_id = EmployeeInfo.pass + $('#visaDate').val();
        EmployeeInfo.Picture = empPic;
        EmployeeInfo.Doctype_id = '1';
        EmployeeInfo.Employee_pass_id = EmployeeInfo.pass
        $('#Update_Expiration').modal('toggle');
        updateVisa({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
    }
});

//Disable reason
$("#confirmDR").click(function () {

    EmployeeInfo.Did = $('#DynamicDisableList').val();
    EmployeeInfo.Emp_id = EmployeeInfo.pass;
    EmployeeInfo.Description = $('#disableTXT').val();
    $("#Disable").modal('toggle');
    updateDisableReason({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
   
})

//טבלת ממתינים לציוות
$('#updateBusBTN').click(function () {

    EmployeeInfo.Business = $('#businessSE').val();        
    EmployeeInfo.Start_date = $('#SchedulingDate').val();        
  //  EmployeeInfo.End_date = $('#SchedulingDate').val();        
    EmployeeInfo.Employee_pass_id = EmployeeInfo.pass;
    $('#empwithbusi').modal('toggle');
    updateEmpBusiness({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);
})

$("#confirmDR2").click(function () {

    EmployeeInfo.Did = $('#DynamicDisableList').val();
    EmployeeInfo.Emp_id = EmployeeInfo.pass;
    EmployeeInfo.Description = $('#disableTXT').val();
    updateDisableReasonWithoutBusiness({ EmployeeInfo: JSON.stringify(EmployeeInfo) }, current_row);

})

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
            maxOptions: 30, //Max options to render at once in the dropdown
              dropdownOffsetWidth: 150
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


$('#gmah').on('shown.bs.modal', function (e) {
   
    $("input[name=gmahh][value=" + EmployeeInfo.Final_bill + "]").iCheck('check');
});

$('#Diur').on('shown.bs.modal', function (e) {

    if (EmployeeInfo.Com_app) {
        value = false;
    }
    else {
        value = true;
    }
    $("input[name=Diur][value=" + value + "]").iCheck('check');
});

$('#insurance').on('shown.bs.modal', function (e) {
  
    $("input[name=insured][value=" + EmployeeInfo.Com_insurance + "]").iCheck('check');
});

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

    EmployeeInfo.pass = data['Employee_pass_id'];
    EmployeeInfo.Final_bill = data['Final_bill'];
    EmployeeInfo.Com_app = data['Com_app'];
    EmployeeInfo.Insurance = data['Insurance'];
    EmployeeInfo.Com_insurance = data['Com_insurance'];
    //EmployeeInfo.Origin_country = data['Origin_country'];
    EmployeeInfo.Fname = data['Fname'];
    EmployeeInfo.Lname = data['Lname'];
    EmployeeInfo.Sys_id = data['Sys_id'];
    EmployeeInfo.Bus_id = data['Bus_id'];
   // EmployeeInfo.Ex_date = data['Ex_date'];
    if (whichid === "edit") {
        //Go To Employee Page
        sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
    }
    else if (whichid === "activate") {
        //Make Employee Active Again
        MakeEmpActive();  
    }
    else if (whichid==="sms") {

        //Send SMS To Employees
        SendSMS();
    }
    //else if (whichid === "email") {
    ////    sendEmail(EmployeeInfo);
    //}

    

});



//employee //SearchBox-
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

//business
function renderBusinessesSearch(results) {
    //this is the callBackFunc 
    totalEmp = 0;
    results = $.parseJSON(results.d);
    for (var i = 1; i <= results.length; i++) {
        totalEmp = i;
    }
    dl = $('#DynamicBusinessList');
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Bus_id + '" data-extra-search="{"Businessid":' + row.Bus_id + '}"> <h3>' + row.Bus_name + '</h3>  </option>';
        dl.append(dynamicLi);
    });
    ////////////////////////////////////////////
    var select = $("#DynamicBusinessList").selectize({
        maxItems: 1, //Max items selectable in the textbox
        maxOptions: 30, //Max options to render at once in the dropdown

        onItemAdd: function (value) {
            sessionStorage.removeItem("busiInfo")
            BusinessInfo.Bus_id = value;
            sessionStorage.setItem("busiInfo", BusinessInfo.Bus_id);
            window.location = "Business.html"
        },
        dataAttr: 'data-extra',//search also for hidden values
        searchField: ['value', 'text', 'other']
    });

}

//statistics
function RenderTotalAllemp(results)
{
    statistics = $.parseJSON(results.d);
    console.log(statistics[3]);
    document.getElementById("activeEmp").value = statistics[2];
    document.getElementById("activeEmp").max = statistics[0];
    document.getElementById("numnewemp").innerHTML = statistics[2];

    document.getElementById("allemp1").value = statistics[1];
    document.getElementById("allemp1").max = statistics[0];
    document.getElementById("allactiveemp").innerHTML = statistics[1];

    document.getElementById("allemp").value = statistics[3];
    document.getElementById("allemp").max = statistics[0];
    document.getElementById("numofleave").innerHTML = statistics[3];
}

function renderEmployeesnobusiness(NoEmpresults) {
    //this is the callBackFunc
    NoEmpresults = $.parseJSON(NoEmpresults.d);
    len = Object.keys(NoEmpresults).length;
    document.getElementById("Num").innerHTML = len;
    document.getElementById("Num").value = len;
   
}

