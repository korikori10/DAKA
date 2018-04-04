var EmployeeInfo = new Object();

$(document).ready(function () {
    EmployeeInfo.pass = sessionStorage.getItem("empInfo");
    getHistory(EmployeeInfo, renderEmployeeByIDs)
});

function getHistory(EmployeeInfo, renderEmployeeByIDs) {
    var dataString = JSON.stringify(EmployeeInfo);

    $.ajax({
        url: 'ajaxWebService.asmx/GetHistory',
        data: dataString,
        type: 'POST',
        dataType: "json",
        contentType: 'application/json; charset = utf-8',
        success: function (data) {
          //  renderEmployeeByIDs(results)
            var datatableVariable = $('#HistoryTable').DataTable({
                data: data,
                columns: [
                    { 'data': 'Employee_pass_id' },
                    { 'data': 'Fname' },
                    { 'data': 'Lname' },
                    { 'data': 'Bus_name' },
                    {
                        'data': 'Start_date', 'render': function (date) {
                            var date = new Date(parseInt(date.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },
                    {
                        'data': 'End_date', 'render': function (date) {
                            var date = new Date(parseInt(date.substr(6)));
                            var month = date.getMonth() + 1;
                            return date.getDate() + "/" + month + "/" + date.getFullYear();
                        }
                    },]
            });

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    });
}
//function renderEmployeeByIDs(data) {
//    data = $.parseJSON(data.d);
//    var datatableVariable = $('#HistoryTable').DataTable({
//        data: data,
//        columns: [
//            { 'data': 'Employee_pass_id' },
//            { 'data': 'Fname' },
//            { 'data': 'Lname' },
//            { 'data': 'Bus_name' },
//            {
//                'data': 'Start_date', 'render': function (date) {
//                    var date = new Date(parseInt(date.substr(6)));
//                    var month = date.getMonth() + 1;
//                    return date.getDate() + "/" + month + "/" + date.getFullYear();
//                }
//            },
//            {
//                'data': 'End_date', 'render': function (date) {
//                    var date = new Date(parseInt(date.substr(6)));
//                    var month = date.getMonth() + 1;
//                    return date.getDate() + "/" + month + "/" + date.getFullYear();
//                }
//            },]
//    });


//}