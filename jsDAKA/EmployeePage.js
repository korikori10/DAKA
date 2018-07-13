var EmployeeInfo = new Object();
var Business = new Object();
resultsSave = new Object();
var updated = new Object();
var h = false;


$(document).ready(function () {
    getCities(renderCities);
    getCountries(renderCountries);
    //getBusinesses(renderBusinesses, renderBusinessesSearch);  
    getBusinessesE(renderBusinesses);

});


function fixDate(date) {
	var date = new Date(parseInt(date.substr(6)));
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month.toString().length < 2) { month = '0' + month; }

    if (day.toString().length < 2) { day = '0' + day; }

    return date.getFullYear() + "-" + month + "-" + day;
   
}

//Func for the wizard form
function populate(frm, data) {
	$.each(data, function (key, value) {
        var ctrl = $('[name=' + key + ']', frm);
   
		switch (ctrl.prop("type")) {
			case "radio": case "checkbox":
				ctrl.each(function () {
					if ($(this).attr('value') === value) $(this).attr("checked", value);
				});
				break;
            case "file":
                break;
            case "select-one":
                if (value === true ) {
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
	});
}


function renderBusinesses(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#businessSE').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Bus_id + '">' + row.Bus_name + '</option>';
        $('#businessSE').append(dynamicLi);

    });
}

function renderCountries(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamiCountryList').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Id + '">' + row.Name + '</option>';
        $('#DynamiCountryList').append(dynamicLi);
    });
    EmployeeInfo.pass = sessionStorage.getItem("empInfo");
    $("#Employee_pass_id").val(EmployeeInfo.pass);
    
        getEmployeeById(EmployeeInfo, renderEmployeeByID);
        $('.selectize-select').selectize;
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

//Put all data in place
function renderEmployeeByID(results) {

    results = $.parseJSON(results.d);

    if (results.Employee_pass_id === null) { results = null; }
    else {

        var frm = $("#EmployeeUpdate");
        var data = results;
        resultsSave = results;
        data.Birthday = fixDate(data.Birthday);
        data.Start_date = fixDate(data.Start_date);
        populate(frm, data);
        if (data.Picture != null) {
            $("#empImg").attr("src", data.Picture)
        }
        else {
            $("#empImg").attr("src", "imges/no-img.jpg")
        }

   

    }
    if ($('#sysIdTB').val() != 0) {
        $('#sysIdTB').attr('disabled')
    }
        $(".selectize-select").selectize();
}

//create 1 array for json from the form
    $.fn.serializeObject = function () {
        var o = {};
        var disabled = this.find(':input:disabled').removeAttr('disabled');
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
        disabled.attr('disabled');
        return o;
    };
$(".icon-expand2").on('click', function () {
    $("iframe").height("700px");
});

var form1 = $('#EmployeeUpdate')

form1.validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },

    rules: {
        email: {
            email: true
        }
    },
    showErrors: function (errorMap, errorList) {
        var errors = this.numberOfInvalids();  // <- NUMBER OF INVALIDS
        console.log(errors);

        this.defaultShowErrors(); // <- ENABLE default MESSAGES
    }
});
$.extend($.validator.messages, {
    required: "השדה הזה הינו שדה חובה",
    remote: "נא לתקן שדה זה",
    email: "נא למלא כתובת דוא\"ל חוקית",
    url: "נא למלא כתובת אינטרנט חוקית",
    date: "נא למלא תאריך חוקי",
    dateISO: "נא למלא תאריך חוקי (ISO)",
    number: "נא למלא מספר",
    digits: "נא למלא רק מספרים",
    creditcard: "נא למלא מספר כרטיס אשראי חוקי",
    equalTo: "נא למלא את אותו ערך שוב",
    extension: "נא למלא ערך עם סיומת חוקית",
    maxlength: $.validator.format(".נא לא למלא יותר מ- {0} תווים"),
    minlength: $.validator.format("נא למלא לפחות {0} תווים"),
    rangelength: $.validator.format("נא למלא ערך בין {0} ל- {1} תווים"),
    range: $.validator.format("נא למלא ערך בין {0} ל- {1}"),
    max: $.validator.format("נא למלא ערך קטן או שווה ל- {0}"),
    min: $.validator.format("נא למלא ערך גדול או שווה ל- {0}")
});

$("#delete").on('click', function () {
    swal({
        title: "האם אתה בטוח?",
        text: "השינויים שעשית לא ישמרו",
        type: "info",
        confirmButtonText: "כן",
        showCancelButton: "true",
        cancelButtonText: "בטל",
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
    },

        function (isConfirm) {
            if (isConfirm) {

                location.reload();

            }
            else {
                // swal("Cancelled", "Your imaginary file is safe :)", "error");
            }
        });


});

//Check save or delete
$("#save").on('click', function () {
    var form = $('#EmployeeUpdate');
    $('input[type="tel"]').rules('add', { maxlength: 9 });
    $('input[type="number"]').rules('add', { maxlength: 9 });
    form.validate().settings.ignore = ":disabled,:hidden";
    if (form.valid()) {

     
        swal({
            title: "האם אתה בטוח?",
            text: "אתה עומד לעדכן את פרטי העובד.",
            type: "info",
            confirmButtonText: "כן",
            showCancelButton: "true",
            cancelButtonText: "בטל",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, 
              
            function (isConfirm) {
                if (isConfirm) {

                    h = true;
                    EmployeeInfo = $('#EmployeeUpdate').serializeObject();
                    UpdateEmp(EmployeeInfo);


                }
                else {
                    // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
    }




    });

//
    function UpdateEmp(array) {

        updated = true;
        if (array.Business == resultsSave.Business) {
            array.updateBus = false;
        }
        else {
            array.updateBus = true;
        }

        UpdateEmployee({ EmployeeInfo: JSON.stringify(array) }, renderEmployeeByID);
        if (array.Sys_id != resultsSave.Sys_id) {
            sendEmail({ EmployeeInfo: JSON.stringify(array) })
        }
    }
