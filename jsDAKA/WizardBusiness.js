selectedCity = new Object();
EmployeeInfo = new Object();
resultsSave = new Object();
isUpdate = new Object();
var EmpPic = null;

$(document).ready(function () {
    getCities(renderCities);
   getRoles(renderRoles);
    getBusinesses(renderBusinesses);
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
});

function setEmpFile(results) {
    EmpPic = results;
}

function fixDate(date) {
    var date = new Date(parseInt(date.substr(6)));
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month.toString().length < 2) { month = '0' + month; }
    if (day.toString().length < 2) { day = '0' + day; }
    return date.getFullYear() + "-" + month + "-" + day;

}

function populate(frm, data) {
    $.each(data, function (key, value) {
        var ctrl = $('[name=' + key + ']', frm);
        //  console.log(ctrl.prop("type"))
        switch (ctrl.prop("type")) {
            case "radio": case "checkbox":
                ctrl.each(function () {
                    if ($(this).attr('value') == value) $(this).attr("checked", value);
                });
                break;
            case "file":
                break;
            case "select-one":
                if (value === true) {
                    value = 'T';
                }
                else if (value === false) {
                    value = 'F';
                }
                ctrl.val(value);
                break;
            default:
                ctrl.val(value);

        }
    }

    );
}

function renderEmployeeByID(results) {

    results = $.parseJSON(results.d);
    resultsSave = results;
    if (results.Employee_pass_id == null) {
        isUpdate = false;
        $("#passportid").val(EmployeeInfo.pass);
        results = null;
        document.getElementById("kindoform").innerHTML = "ברוכים הבאים! זוהי קליטה חדשה,אנא הזן את כל הפרטים";
    }
    else {
        var frm = $("#insertEmpForm");
        var data = results;
        isUpdate = true;
        data.Birthday = fixDate(data.Birthday);
        populate(frm, data);
        $('.selectize-select').selectize();
        document.getElementById("kindoform").innerHTML = "עובד זה כבר פעיל במערכת, יש לבצע ציוות מחדש בלבד";


    }

}

function renderBusinesses(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#businessSE').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Bus_id + '">' + row.Bus_name + '</option>';
        $('#businessSE').append(dynamicLi);
        //  $('#DynamicCitiesList').listview('refresh');

    });
}

function renderRoles(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#role_id').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Role_id + '">' + row.Role_name + '</option>';
        $('#role_id').append(dynamicLi);

    });
    EmployeeInfo.pass = sessionStorage.getItem("empInfo");
    getEmployeeById(EmployeeInfo, renderEmployeeByID);
}

function renderCities(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamicCitiesList').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Id + '">' + row.Name + '</option>';
        $('#DynamicCitiesList').append(dynamicLi);
    });
}


$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (this.value == 'T') {
            this.value = 'true'
        }
        else if (this.value == 'F') {
            this.value = 'false'
        }
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function insertBusandContact(){




    var formData = $('#insertEmpForm').serializeObject();
    // var result = JSON.stringify(formData);
    //  var array = ($("#insertEmpForm").serialize());
    insertEmp(formData);

    //EmployeeInfo = array;

    //if (isUpdate) {
    //    if (EmpPic == null) {
    //        array.Picture = resultsSave.Picture;

    //    }
    //    else {
    //        array.Picture = EmpPic;
    //    }
    //    if (array.Business == resultsSave.Business) {
    //        array.updateBus = false;
    //    }
    //    else {
    //        array.updateBus = true;
    //    }
    //    swal({
    //        title: "האם אתה בטוח?",
    //        text: "אתה עומד לעדכן פרטי עובד.",
    //        type: "info",
    //        confirmButtonText: "כן",
    //        showCancelButton: "true",
    //        cancelButtonText: "בטל",
    //        closeOnConfirm: false,
    //        showLoaderOnConfirm: true,
    //    },

    //        function (isConfirm) {
    //            if (isConfirm) {

    //                updateEmployee({ EmployeeInfo: JSON.stringify(array) })
    //            }
    //            else {
    //                // swal("Cancelled", "Your imaginary file is safe :)", "error");
    //            }
    //        });

    //}
    //else {
    //    swal({
    //        title: "האם אתה בטוח?",
    //        text: "אתה עומד להוסיף עובד חדש.",
    //        type: "info",
    //        confirmButtonText: "כן",
    //        showCancelButton: "true",
    //        cancelButtonText: "בטל",
    //        closeOnConfirm: false,
    //        showLoaderOnConfirm: true,
    //    },

    //        function (isConfirm) {
    //            if (isConfirm) {

    //                insertEmployee({ EmployeeInfo: JSON.stringify(array) });
    //            }
    //            else {
    //                // swal("Cancelled", "Your imaginary file is safe :)", "error");
    //            }
    //        });

    //}

}


