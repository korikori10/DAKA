var EmployeeInfo = new Object();

    $(document).ready(function () {
        EmployeeInfo.pass = sessionStorage.getItem("empInfo")
        getEmployeeById(EmployeeInfo, renderEmployeeByID);
        
    });

    function renderEmployeeByID(results) {

        results = $.parseJSON(results.d);

        if (results.Employee_pass_id == null) { results = null; }
        else {
            //document.getElementById('name').innerHTML = results.fname;
            //document.getElementById('sysIdTB').innerHTML = results.U_name;
            //document.getElementById('dobTB').innerText = results.Birthday;
            //document.getElementById('businessTB').innerHTML = results.U_type_code;
            $('#name').val(results.Fname + " " + results.Lname);
            $('#sysIdTB').val(results.Sys_id);
          //$('#dobTB').val(function  () {
          //    var date = new Date(parseInt(results.Birthday.substr(6)));
          //      var month = date.getMonth() + 1;
          //      return date.getDate() + "/" + month + "/" + date.getFullYear();
          //  });
        
          
            $('#empPassTB').val(results.Employee_pass_id);
            $('#addressTB').val(results.Add);
        }

    }

  //EmployeeInfo.name=  $('#name').val();
  //EmployeeInfo.sysid=   $('#sysIdTB').val();
  //EmployeeInfo.dobTB  = $('#dobTB').val();
  //EmployeeInfo.businessTB=  $('#businessTB').val();
  //EmployeeInfo.addressTB=  $('#addressTB').val();




  $("#info").on('click',function () {
      //  UpdateEmployee(results.Employee_pass_id, EmployeeInfo.sysid, EmployeeInfo.dobTB, EmployeeInfo.businessTB, EmployeeInfo.addressTB, RefreshEmployee);
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

      var formData = $('#EmployeeUpdate').serializeObject();
      // var result = JSON.stringify(formData);
      //  var array = ($("#insertEmpForm").serialize());
      UpdateEmp(formData);
});
  

  function UpdateEmp(array) {


      //EmployeeInfo = array;


      UpdateEmployee({ EmployeeInfo: JSON.stringify(array) });
  }

//function RefreshEmployee(result)
//{
//    window.location.reload();
//}