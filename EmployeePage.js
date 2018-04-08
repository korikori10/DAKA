var EmployeeInfo = new Object();
var Business = new Object();
resultsSave = new Object();
var updated = new Object();

$(document).ready(function () {
    getCities(renderCities);
    getCountries(renderCountries);
    getBusinesses(renderBusinesses);
    //EmployeeInfo.pass = sessionStorage.getItem("empInfo");
    //    getEmployeeById(EmployeeInfo, renderEmployeeByID);
    //    $(".selectize-select").selectize();
        
      
        //$("#info").on('click', function () {

        //    swal({
        //        title: "האם אתה בטוח?",
        //        text: "אתה עומד לעדכן את פרטי העובד.",
        //        type: "info",
        //        confirmButtonText: "כן",
        //        showCancelButton: "true",
        //        cancelButtonText:"בטל"
        //    });
        //});
        
});
function fixDate(date) {
	var date = new Date(parseInt(date.substr(6)));
	var month = date.getMonth() + 1;
	return date.getFullYear() + "-" + month + "-" + date.getDate();
}
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

                ctrl.val(value).prop('selected', true);
                //var o = ctrl.selectmenu("refresh");
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
        //  $('#DynamicCitiesList').listview('refresh');

    });
}

function renderCountries(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamiCountryList').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Id + '">' + row.Name + '</option>';
        $('#DynamiCountryList').append(dynamicLi);
        //  $('#DynamiCountryList').listview('refresh');
        EmployeeInfo.pass = sessionStorage.getItem("empInfo");
    });
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
        //  $('#DynamicCitiesList').listview('refresh');
    });
}
    function renderEmployeeByID(results) {

        results = $.parseJSON(results.d);

        if (results.Employee_pass_id === null) { results = null; }
		else {

			var frm = $("#EmployeeUpdate");
            var data = results;
            resultsSave = results;
            data.Birthday = fixDate(data.Birthday);
            populate(frm, data);
            //if (updated) {
            //    swal("בוצע!", "עדכון פרטי העובד בוצע בהצלחה", "success");
            //}
           // $('#name').val(results.Fname + " " + results.Lname);
            //$('#sysIdTB').val(results.Sys_id);
          //$('#dobTB').val(function  () {
          //    var date = new Date(parseInt(results.Birthday.substr(6)));
          //      var month = date.getMonth() + 1;
          //      return date.getDate() + "/" + month + "/" + date.getFullYear();
          //  });

           // Business = results.
            //$('#empPassTB').val(results.Employee_pass_id);
            //$('#addressTB').val(results.Add);
            //$('#gender').val(results.Gender);
            $(".selectize-select").selectize();
        }

    }

  //EmployeeInfo.name=  $('#name').val();
  //EmployeeInfo.sysid=   $('#sysIdTB').val();
  //EmployeeInfo.dobTB  = $('#dobTB').val();
  //EmployeeInfo.businessTB=  $('#businessTB').val();
  //EmployeeInfo.addressTB=  $('#addressTB').val();

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
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

    $("#info").on('click', function () {

        swal({
            title: "האם אתה בטוח?",
            text: "אתה עומד לעדכן את פרטי העובד.",
            type: "info",
            confirmButtonText: "כן",
            showCancelButton: "true",
            cancelButtonText: "בטל"

        },
            function (isConfirm) {
                if (isConfirm) {
                    //EmployeeInfo.Employee_pass_id = $("#empPassTB").val()
                    //EmployeeInfo.Sys_id = $("#sysIdTB").val()
                    EmployeeInfo = $('#EmployeeUpdate').serializeObject();
                    // var result = JSON.stringify(formData);
                    //  var array = ($("#insertEmpForm").serialize());
                    UpdateEmp(EmployeeInfo);
                    
                } else {
                   // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
        
 

 
});
  

  function UpdateEmp(array) {

      updated = true;
      if (array.Business == resultsSave.Business) {
          array.updateBus = false;
      }
      else {
          array.updateBus = true;
      }

      UpdateEmployee({ EmployeeInfo: JSON.stringify(array) }, renderEmployeeByID);
  }
