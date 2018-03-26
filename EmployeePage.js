var EmployeeInfo = new Object();
var Business = new Object();

    $(document).ready(function () {
        EmployeeInfo.pass = sessionStorage.getItem("empInfo")
        getEmployeeById(EmployeeInfo, renderEmployeeByID);
        $(".selectize-select").selectize();
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
					if ($(this).attr('value') == value) $(this).attr("checked", value);
				});
				break;
			default:
				ctrl.val(value);
		}
	});
}

    function renderEmployeeByID(results) {

        results = $.parseJSON(results.d);

        if (results.Employee_pass_id == null) { results = null; }
		else {

			var frm = $("#EmployeeUpdate");
			var data = results;
			data.Birthday = fixDate(data.Birthday)
			populate(frm, data)
            
            $('#name').val(results.Fname + " " + results.Lname);
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
            cancelButtonText: "בטל",

        },
            function (isConfirm) {
                if (isConfirm) {
                    EmployeeInfo.Employee_pass_id = $("#empPassTB").val()
                    EmployeeInfo.Sys_id = $("#sysIdTB").val() //$('#EmployeeUpdate').serializeObject();
                    // var result = JSON.stringify(formData);
                    //  var array = ($("#insertEmpForm").serialize());
                    UpdateEmp(EmployeeInfo);
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
        
 

 
});
  

  function UpdateEmp(array) {


      //EmployeeInfo = array;


      UpdateEmployee({ EmployeeInfo: JSON.stringify(array) })
  }

//function RefreshEmployee(result)
//{
//    window.location.reload();
//}