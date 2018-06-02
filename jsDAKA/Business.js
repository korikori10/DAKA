var EmployeeInfo = new Object();
var Business = new Object();
resultsSave = new Object();
var contactSave = new Object();
var updated = new Object();
var frm = new Object();
var data = new Object();
var h = false;
var BusinessInfo = new Object();


$(document).ready(function () {
    getCities(renderCities);
    getCountries(renderCountries);
  
      

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
    $.each(results, function (i, row) {

        if (row.Bus_id == busID) {
            frm = $("#BusinessUpdate");
             data = row;
            resultsSave = row;
            populate(frm, data);
        }

    });
    $(".selectize-select").selectize();
}

function renderCountries(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamiCountryList').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Id + '">' + row.Name + '</option>';
        $('#DynamiCountryList').append(dynamicLi);
    });
    getBusinesses(renderBusinesses);
    getContactsByBus(renderContacts);
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
    $(contact).appendTo('#contactsTab');
    return id;
}

//Put all data in place
function renderContacts(results) {

    results = $.parseJSON(results.d);
    var busID = sessionStorage.getItem("busiInfo");
    $.each(results, function (i, row) {

        if (row.Bus_id == busID) {
            if (i == 0) {
                frm = $("#contact1");
                data = row;
                contactSave[i] = row;
                populate(frm, data);
            }
            else {
                frm = $("#" + createContactForm());
                data = row;
                contactSave[i] = row;
                populate(frm, data);
            }

        }

    });


   

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
$("[name='updateB'").on('click', function () {

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
                    BusinessInfo = $('#BusinessUpdate').serializeObject();
                    UpdateBus(BusinessInfo);


                }
                else {
                    // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });





    });

//
    function UpdateBus(array) {


        UpdateBusiness({ BusinessInfo: JSON.stringify(array) }, renderBusinesses);
 
    }
