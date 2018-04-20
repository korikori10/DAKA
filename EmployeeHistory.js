var EmployeeInfo = new Object();

$(document).ready(function () {
    EmployeeInfo.pass = sessionStorage.getItem("empInfo");
    getHistory(EmployeeInfo)
});

 