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

    function renderEmployeeByID(results) {

        results = $.parseJSON(results.d);

        if (results.Employee_pass_id == null) { results = null; }
        else {
            
            $('#name').val(results.Fname + " " + results.Lname);
            $('#sysIdTB').val(results.Sys_id);
          //$('#dobTB').val(function  () {
          //    var date = new Date(parseInt(results.Birthday.substr(6)));
          //      var month = date.getMonth() + 1;
          //      return date.getDate() + "/" + month + "/" + date.getFullYear();
          //  });

           // Business = results.
            $('#empPassTB').val(results.Employee_pass_id);
            $('#addressTB').val(results.Add);
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
                    var formData = $('#EmployeeUpdate').serializeObject();
                    // var result = JSON.stringify(formData);
                    //  var array = ($("#insertEmpForm").serialize());
                    UpdateEmp(formData);
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
        
 

 
});
  

  function UpdateEmp(array) {


      //EmployeeInfo = array;


      UpdateEmployee({ EmployeeInfo: JSON.stringify(array) });
  }

//function RefreshEmployee(result)
//{
//    window.location.reload();
//}