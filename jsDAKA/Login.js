var username = new Object();

document.addEventListener('deviceready', function () {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
        .startInit("83d04d9a-0af5-47ff-8e0d-daa16120ede1")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
}, false);

$(document).ready(function () {
   
    if (localStorage.getItem("userName") != null) {
        $("#user-name").val(localStorage.getItem("userName"))
        $("#user-password").val(localStorage.getItem("userPass"))
    }
    
});
//localStorage to save user name (no expiration)
function movetopage() {
    username = $("#user-name").val();
    userPass = $("#user-password").val();
    getUserById(username, userPass, ValidateUser);

}

function ValidateUser(results) {
    
    rememberMe = $("#remember-me");
    results = $.parseJSON(results.d);
    if (results) {
        if (rememberMe.prop("checked")) {
            localStorage.setItem("userName", username)
            localStorage.setItem("userPass", userPass)
        }
        getUserByUserName(username, renderUser);
        function renderUser(results) {
            results = $.parseJSON(results.d);
        sessionStorage.setItem("u_img", results.User_img);
            sessionStorage.setItem("FullName", results.Full_name);
            sessionStorage.setItem("userName", username)
            window.location = "DashBoardPage.html"
    }

        
    }
    else {
        $("#wrongPH").html('*שם משתמש או סיסמה שגויים').css('color','red')

    }

}
