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
            $('#addressTB').val(results.Add)
        }

    }

