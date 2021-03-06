﻿var EmployeeInfo = new Object();
var Business = new Object();
resultsSave = new Object();
var contactSave = new Object();
var updated = new Object();
var frm = new Object();
var data = new Object();
var h = false;
var BusinessInfo = new Object();
var roles = new Object();
var newBus = new Object();


$(document).ready(function () {
    getCities(renderCities);
    getCountries(renderCountries);
    getDepartments(renderDepartments);
    getRoles(renderRoles);
    getTypes(renderTypes);

});




// Button Clicks In Tables
$('.table').on('click', 'tr td button', function () {
    //Take the Employee ID from the table row
    sessionStorage.removeItem("busiInfo")
    tr = $(this).closest('tr');//.find('td:first').text();
    tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('name');
    var data = $("#" + tableId).DataTable().row(tr).data();
    BusinessInfo.Bus_id = data['Bus_id'];
    if (whichid == "edit") {
        //Go To Business Page
        sessionStorage.setItem("busiInfo", BusinessInfo.Bus_id);
        window.location = "Business.html";
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
    var busID = sessionStorage.getItem("busiInfo");
    $('#businessSE').empty();
    $('#bus_id').removeAttr('disabled');
    newBus = true;
    $.each(results, function (i, row) {

        if (row.Bus_id == busID) {
            frm = $("#BusinessUpdate");
             data = row;
            resultsSave = row;
            newBus = false;
            populate(frm, data);
            $('#bus_id').attr('disabled', 'disabled');
        }

        
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
    getBusinessesW(renderBusinesses)
    getContactsByBus(renderContacts);
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
}

function renderRoles(results) {
    //this is the callBackFunc 
    roles = $.parseJSON(results.d);

    $("#role_id_modal").empty();
    $.each(roles, function (i, row) {
        dynamicLi = '<option value="' + row.Role_id + '">' + row.Role_name + '</option>';
        $("#role_id_modal").append(dynamicLi);
    });
        }

function createContactForm() {
    // get the last DIV which ID starts with ^= "contact"
    var $div = $('div[id^="contact"]:last');

    // Read the Number from that DIV's ID (i.e: 3 from "klon3")
    // And increment that number by 1
    var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
    var id = 'contact' + num;

    // Clone it and assign the new ID (i.e: from num 4 to ID "contact4")
    var contact = '<div class="col-md-6" id="'+ id +'">'+ $div.html() + '</div>'; //$div.clone().prop('id', id);

    // Finally insert $klon wherever you want
    //$(contact).appendTo('#contactsTab');
    $(contact).insertAfter('#addContact');
    rolesSelect();
    return id;
}

function rolesSelect() {
    $("[name='Role_id']:last").empty();
    $.each(roles, function (i, row) {
        dynamicLi = '<option value="' + row.Role_id + '">' + row.Role_name + '</option>';
        $("[name='Role_id']:last").append(dynamicLi);

    });
}

//Put all data in place
function renderContacts(results) {


    results = $.parseJSON(results.d);
    var busID = sessionStorage.getItem("busiInfo");
    rolesSelect();
    flag = true;
    $.each(results, function (i, row) {

        if (row.Bus_id == busID) {

            if (flag) {
                $("#contact1").find('form').attr('id', 'updatecontact1')
                frm = $('#updatecontact1');
                data = row;
                contactSave[i] = row;
                populate(frm, data);
                flag = false;
            }
            else {
                id = createContactForm();
                frm = $("#" + id).find('form').attr('id', 'update' + id);
                data = row;
                contactSave[i] = row;
                populate(frm, data);
            }

        }
    
       
  
        
    });

    setTimeout(function () {
    $(".selectize-select").selectize();
  }, 500);

    $("[name='contactSave']").on('click', function () {
     
        contactFRM = $(this).closest('form');

        contactFRM.validate({
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
                },
                Phone: {
                    maxlength: 9,
                    digits: true
                }
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

        //$('input[type="number"]').rules('add', { maxlength: 9 });

        if (contactFRM.valid()) {

            swal({
                title: "האם אתה בטוח?",
                text: "אתה עומד לעדכן את פרטי איש הקשר.",
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
                        contactInfo = contactFRM.serializeObject();
                        contactInfo.Bus_id = sessionStorage.getItem("busiInfo");
                        if (contactInfo.Contact_id == false) {
                            $('#AddContactModal').modal('toggle');
                            InsertContact({ contactInfo: JSON.stringify(contactInfo) });
                        }
                        else {

                            UpdateContact({ contactInfo: JSON.stringify(contactInfo) });
                          
                        }


                    }
                    else {
                        // swal("Cancelled", "Your imaginary file is safe :)", "error");
                    }
                });



        }

    });
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
        disabled.attr('disabled' , 'disabled');
        return o;
    };

//Check save or delete
$("[name='updateB']").on('click', function () {
    BusFRM = $('#BusinessUpdate');

    BusFRM.validate({
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
    $('input[type="number"]').rules('add', { maxlength: 9 });
    if (BusFRM.valid()) {
        swal({
            title: "האם אתה בטוח?",
            text: "אתה עומד לעדכן את פרטי העסק.",
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
                    BusinessInfo = $('#BusinessUpdate').serializeObject();
                    if (newBus) {
                        InsertBus(BusinessInfo);
                    }
                    else {

                        UpdateBus(BusinessInfo);
                    }


                }
                else {
                    // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });


    }


});



//update business
    function UpdateBus(array) {


        UpdateBusiness({ BusinessInfo: JSON.stringify(array) }, renderBusinesses);
 
}

//insert new business
function InsertBus(array) {


    InsertBusiness({ BusinessInfo: JSON.stringify(array) }, renderBusinesses);

}


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
       
        });


});