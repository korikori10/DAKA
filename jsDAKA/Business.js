var EmployeeInfo = new Object();
var Business = new Object();
resultsSave = new Object();
var updated = new Object();
var h = false;


$(document).ready(function () {
    getCities(renderCities);
    getCountries(renderCountries);
    getContactsByBus(renderContacts);
    getBusinesses(renderBusinesses);  

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

        $(".selectize-select").selectize();
   

    }
}

//create 1 array for json from the form
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

//Check save or delete
    $("#info").on('click', function () {

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
