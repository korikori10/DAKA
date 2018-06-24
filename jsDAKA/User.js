var UserSave = new Object();
var roles = new Object();
$(document).ready(function () {
   // var username = sessionStorage.getItem('userName');

    //  getUserByUserName(username, renderUser);
    getUserTypes(renderUserTypes)
    getUsers(renderUsers);
    $("#AddUser").on('click', function () { createUserForm() });
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


function renderUserTypes(results) {
    //this is the callBackFunc 
    roles = $.parseJSON(results.d);
}

function createUserForm() {
    // get the last DIV which ID starts with ^= "contact"
    var $div = $('div[id^="user"]:last');

    // Read the Number from that DIV's ID (i.e: 3 from "klon3")
    // And increment that number by 1
    var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
    var id = 'user' + num;

    // Clone it and assign the new ID (i.e: from num 4 to ID "contact4")
    var contact = '<div class="col-xl-4 col-md-6 col-xs-12" id="' + id + '">' + $div.html() + '</div>'; //$div.clone().prop('id', id);

    // Finally insert $klon wherever you want
    //$(contact).appendTo('#contactsTab');
    $(contact).insertBefore('#addUser');
    rolesSelect();
    return id;
}
function rolesSelect() {
    $("[name='U_type_code']:last").empty();
    $.each(roles, function (i, row) {
        dynamicLi = '<option value="' + row.U_type_code + '">' + row.U_type_name + '</option>';
        $("[name='U_type_code']:last").append(dynamicLi);

    });
}

//Put all data in place
function renderUsers(results) {


    results = $.parseJSON(results.d);
    var busID = sessionStorage.getItem("busiInfo");
    rolesSelect();
    $.each(results, function (i, row) {


        if (i == 0) {
            $("#user1").find('form').attr('id', 'updateuser1')
            frm = $('#updateuser1');
            data = row;
            UserSave[i] = row;
            populate(frm, data);
            $("#user1").find('h4').html(row.Full_name);
            $("#user1").find('h6').html($("[name='U_type_code']:last option:selected").text());
            $("#user1").find('img').attr('src', row.User_img);
        }
        else {
            id = createUserForm();
            frm = $("#" + id).find('form').attr('id', 'updateuser' + id);
            data = row;
            UserSave[i] = row;
            populate(frm, data);
            $("#" + id).find('h4').html(row.Full_name);
            $("#" + id).find('h6').html($("[name='U_type_code']:last option:selected").text());
            $("#" + id).find('img').attr('src', row.User_img);
        }



    });

    $('.selectize-select').selectize();
    $("[name='UserSave']").on('click', function () {
        var contactFRM = $(this).closest('form')
        swal({
            title: "האם אתה בטוח?",
            text: "אתה עומד לעדכן את פרטי איש הקשר.",
            type: "info",
            confirmButtonText: "כן",
            showCancelButton: "true",
            cancelButtonText: "בטל",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },

            function (isConfirm) {
                if (isConfirm) {

                    h = true;
                    contactInfo = contactFRM.serializeObject();
                    contactInfo.Bus_id = sessionStorage.getItem("busiInfo");
                    if (contactInfo.Contact_id == false) {
                        InsertContact({ contactInfo: JSON.stringify(contactInfo) });
                    }
                    else {

                        UpdateContact({ contactInfo: JSON.stringify(contactInfo) });
                    }


                }
                else {
                    // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
    });
}