$('.table').on('click', 'tr td button', function () {
 
    sessionStorage.removeItem("empInfo")
    tr = $(this).closest('tr');//.find('td:first').text();
    tableId = $(this).closest('.table').attr('id');
    whichid = $(this).closest('button').attr('id');
    if (whichid == "edit") {

        var data = $("#" + tableId).DataTable().row(tr).data();
        EmployeeInfo.pass = data['Employee_pass_id'];
        sessionStorage.setItem("empInfo", EmployeeInfo.pass);
        window.location = "Employee.html";
    }
    else {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kori.hash@gmail.com',
                pass: 'liroy1010'
            }
        });

        var mailOptions = {
            from: 'kori.hash@gmail.com',
            to: 'kori.hash@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was not easy!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        //Email.send("korihhash@gmail.com",
        //    "korihhash@gmail.com",
        //    "This is a subject",
        //    "this is the body",
        //    {
        //        token: "daccc0e5-1446-4578-9e5b-d36df0aeda67" });
    }


});

//$('#newemp').on('click', 'tr td button', function () {
//    //var table = $('#EmployeesTable').DataTable();
//    sessionStorage.removeItem("empInfo")
//    tr = $(this).closest('tr');//.find('td:first').text();
//    var data = $('#empNoBusi').DataTable().row(tr).data();
//    EmployeeInfo.pass = data['Employee_pass_id'];
//    sessionStorage.setItem("empInfo", EmployeeInfo.pass);
//    window.location = "Employee.html";
//});
