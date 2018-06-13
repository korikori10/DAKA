$(document).ready(function () {
    var username = sessionStorage.getItem('userName');

    getUserByUserName(username, renderUser);
});

//Func for the wizard form
function populate(frm, data) {
    $.each(data, function (key, value) {
        var ctrl = $('[name=' + key + ']', frm);

        switch (ctrl.prop("type")) {
            case "radio": case "checkbox":
                ctrl.each(function () {
                    if ($(this).attr('value') === value) $(this).attr("checked", value);
                });
                break;
            case "file":
                break;
            case "select-one":
                if (value === true) {
                    value = 'T';
                }
                else if (value === false) {
                    value = 'F';
                }
                ctrl.val(value);
                break;
            default:
                ctrl.val(value);
        }
    });
}
function renderUser(results) {
    results = $.parseJSON(results.d);
    frm = $("#userUpdate");
    data = results;
    resultsSave = results;
    populate(frm, data);
}