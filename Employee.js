var EmployeeInfo = new Object();

$(document).ready(function () {
    getEmployeessearch(renderEmployees);//מה זה?

});



function renderEmployees(results) {
    //this is the callBackFunc 
    EmployeeInfo = results.d

    $(".selectize-select").selectize({
        create: true,
        valueField: 'Emp_Pass_id',
        lableField: 'Fname',
        sortField: 'text',
        searchField: ['Emp_Pass_id', 'Fname', 'Lname'],
        options: EmployeeInfo
    });

}


$('#EmployeesTable').on('click', 'tr td button', function () {
    //var table = $('#EmployeesTable').DataTable();
    sessionStorage.removeItem("empInfo")
    EmployeeInfo.pass = $(this).closest('tr').find('td:first').text();
    sessionStorage.setItem("empInfo", EmployeeInfo.pass);
    window.location = "Employee.html";
    
   
});





