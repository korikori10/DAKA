selectedCity = new Object();
BusiInfo = new Object();
resultsSave = new Object();

var BusContractFile = null;

$(document).ready(function () {
    getCities(renderCities);
    getRoles(renderRoles);
    getBusinessesW(renderBusinesses);
    getDepartments(renderDepartments);
    getTypes(renderTypes);
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
            uploadFiles(formData, setBusContractFile);

        }
    })
});

function BusContractFile(results) {
    BusContractFile = results;
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

function renderDepartments(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#departmentSE').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Id + '">' + row.Name + '</option>';
        $('#departmentSE').append(dynamicLi);
    });
}

function renderTypes(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#typeSE').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Bus_type_code + '">' + row.Bus_type_name + '</option>';
        $('#typeSE').append(dynamicLi);
       
    });
    $('.selectize-select').selectize();
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

function insertBusandContact(formData){

    var formData = $('#insertEmpForm').serializeObject();
    var result = JSON.stringify(formData);
    var array = ($("#insertEmpForm").serialize());
  

    BusiInfo = formData;
    BusiInfo.Contract_code = "1";
        swal({
            title: "האם אתה בטוח?",
            text: "אתה עומד להוסיף בית עסק ואיש קשר חדש.",
            type: "info",
            confirmButtonText: "כן",
            showCancelButton: "true",
            cancelButtonText: "בטל",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },

            function (isConfirm) {
                if (isConfirm) {

                    InsertBusinessContact({ BusiInfo: JSON.stringify(BusiInfo) });
                }
                else {
                    // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });

    

}


