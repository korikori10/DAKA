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
            $('#name').val(results.Add);
            $('#sysIdTB').val(results.Add);
            $('#dobTB').val(results.Add);
            $('#businessTB').val(results.Add);
            $('#addressTB').val(results.Add);
            $('#addressTB').val(results.Add);
        }

    }

  EmployeeInfo.name=  $('#name').val();
  EmployeeInfo.sysid=   $('#sysIdTB').val();
  EmployeeInfo.dobTB  = $('#dobTB').val();
  EmployeeInfo.businessTB=  $('#businessTB').val();
  EmployeeInfo.addressTB=  $('#addressTB').val();




  $("#info").on('click',function () {
    UpdateEmployee(results.Employee_pass_id, EmployeeInfo.sysid, EmployeeInfo.dobTB, EmployeeInfo.businessTB, EmployeeInfo.addressTB,RefreshEmployee );
});


function RefreshEmployee(result)
{
    window.location.reload();
}