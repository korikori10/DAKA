selectedCity = new Object();
EmployeeInfo = new Object();
resultsSave = new Object();
isUpdate = new Object();
var updateBus = new Object();
var EmpPic = null;
EmpVisa = new Object();
EmpID = new Object();
EmpAuth = new Object();

$(document).ready(function () {
    getCities(renderCities);
    getCountries(renderCountries);
    getBusinessesW(renderBusinesses);

    Selectize.define('dropdown_direction', function (options) {
        var self = this;
        console.log('this works actually');

        /**
         * Calculates and applies the appropriate position of the dropdown.
         * 
         * Supports dropdownDirection up, down and auto. In case menu can't be fitted it's
         * height is limited to don't fall out of display.
         */
        this.positionDropdown = (function () {
            return function () {
                var $control = this.$control;
                var $dropdown = this.$dropdown;
                var p = getPositions();

                // direction
                var direction = getDropdownDirection(p);
                if (direction === 'up') {
                    $dropdown.addClass('direction-up').removeClass('direction-down');
                } else {
                    $dropdown.addClass('direction-down').removeClass('direction-up');
                }
                $control.attr('data-dropdown-direction', direction);

                // position
                var isParentBody = this.settings.dropdownParent === 'body';
                var offset = isParentBody ? $control.offset() : $control.position();
                var fittedHeight;

                switch (direction) {
                    case 'up':
                        offset.top -= p.dropdown.height;
                        if (p.dropdown.height > p.control.above) {
                            fittedHeight = p.control.above - 15;
                        }
                        break;

                    case 'down':
                        offset.top += p.control.height;
                        if (p.dropdown.height > p.control.below) {
                            fittedHeight = p.control.below - 15;
                        }
                        break;
                }

                if (fittedHeight) {
                    this.$dropdown_content.css({ 'max-height': fittedHeight });
                }

                this.$dropdown.css({
                    width: $control.outerWidth(),
                    top: offset.top,
                    left: offset.left
                });
            };
        })();

        /**
         * Gets direction to display dropdown in. Either up or down.
         */
        function getDropdownDirection(positions) {
            var direction = self.settings.dropdownDirection;

            if (direction === 'auto') {
                // down if dropdown fits
                if (positions.control.below > positions.dropdown.height) {
                    direction = 'down';
                }
                // otherwise direction with most space
                else {
                    direction = (positions.control.above > positions.control.below) ? 'up' : 'down';
                }
            }

            return direction;
        }

        /**
         * Get position information for the control and dropdown element.
         */
        function getPositions() {
            var $control = self.$control;
            var $window = $(window);

            var control_height = $control.outerHeight(false);
            var control_above = $control.offset().top - $window.scrollTop();
            var control_below = $window.height() - control_above - control_height;

            var dropdown_height = self.$dropdown.outerHeight(false);

            return {
                control: {
                    height: control_height,
                    above: control_above,
                    below: control_below
                },
                dropdown: {
                    height: dropdown_height
                }
            };
        }
    });


    //fields autocomplete logic
    $('[name=Il_citizen]').on('change', function () {
        if (this.value == 'T') {

            $('[name=Insurance]').val('T').attr('disabled');
        }
        else {
            $('[name=Insurance]').removeAttr('disabled').val("");
        }
    });
    $('[name=Food_incloud]').on('change', function () {
        if (this.value == 'F') {

            $('[name=Food_pay]').val(0).attr('disabled');
        }
        else {
            $('[name=Food_pay]').removeAttr('disabled');
        }

    });
    $('[name=Com_app]').on('change', function () {
        if (this.value == 'F') {

            $('[name=Monthly_rent]').val(0).attr('disabled');
        }
        else {
            $('[name=Monthly_rent]').removeAttr('disabled');
        }

    });
    //Picture or file upload
    $("#Pic").on("change", function () {
        pbLBL = $("#pLBL2")
        pbDiv = $("#progressBar")
        pbLBL.text('Uploading...');
        pbDiv.fadeIn(500);
        var files = $(this).get(0).files;
        if (files.length > 0) {


            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i])
            }

            uploadFiles(formData,  pbLBL, pbDiv, setEmpPic);
        }
    })
    $("#PicID").on("change", function () {
        pbLBL = $("#pbLBL")
        pbDiv = $("#progressBar1")
        pbLBL.text('Uploading...');
        pbDiv.fadeIn(500)
        var files = $(this).get(0).files;
        if (files.length > 0) {


            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i])
            }
            EmployeeInfo.Doc_id = EmployeeInfo.pass + makeid();
            EmployeeInfo.Doctype_id = '2';
            uploadFiles(formData,  pbLBL, pbDiv,setEmpID);

        }
    })
    $("#picAuth").on("change", function () {
        pbLBL = $("#pLB2")
        pbDiv = $("#progressBar2")
        pbLBL.text('Uploading...');
        pbDiv.fadeIn(500)
        var files = $(this).get(0).files;
        if (files.length > 0) {

            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i])
            }
            EmployeeInfo.Doc_id = EmployeeInfo.pass + makeid();
            EmployeeInfo.Doctype_id = '3';
            EmployeeInfo.Employee_pass_id = EmployeeInfo.pass
            uploadFiles(formData, pbLBL, pbDiv, setEmpAuth);

        }
    })
    $("#Picvisa").on("change", function () {
        pbLBL = $("#pVlBl")
        pbDiv = $("#progressBar4")
        pbLBL.text('Uploading...');
        pbDiv.fadeIn(500);
        var files = $(this).get(0).files;
        if (files.length > 0) {


            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i])
            }

            uploadFiles(formData, pbLBL, pbDiv, setEmpVisa);
        }
    })
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function setEmpVisa(results) {
    EmpVisa.Img_url = results;
    EmpVisa.Doc_id = $('#passportid').val() + makeid();
    EmpVisa.Doctype_id = '1';
    EmpVisa.Employee_pass_id = $('#passportid').val();

}

function setEmpAuth(results) {
    EmpAuth.Img_url = results;
    EmpAuth.Doc_id = $('#passportid').val() + makeid();
    EmpAuth.Doctype_id = '3';
    EmpAuth.Employee_pass_id = $('#passportid').val();
}

function setEmpID(results) {
    EmpID.Img_url = results;
    EmpID.Doc_id = $('#passportid').val() + makeid();
    EmpID.Doctype_id = '2';
    EmpID.Employee_pass_id = $('#passportid').val();
}

function setEmpPic(results) {
    EmpPic = results;
    console.log(EmpPic)
}

function fixDate(date) {
    var date = new Date(parseInt(date.substr(6)));
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month.toString().length < 2) { month = '0' + month; }
    if (day.toString().length < 2) { day = '0' + day; }
    return date.getFullYear() + "-" + month + "-" + day;

}


function renderBusinesses(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#businessSE').empty();
    dynamicLi = '<option value=""> בחר Select</option>';
    $('#businessSE').append(dynamicLi);
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Bus_id + '">' + row.Bus_name + '</option>';
        $('#businessSE').append(dynamicLi);
        //  $('#DynamicCitiesList').listview('refresh');

    });
}

function renderCountries(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamiCountryList').empty();
    dynamicLi = '<option value=""> בחר Select</option>';
    $('#DynamiCountryList').append(dynamicLi);
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Id + '">' + row.Name + '</option>';
        $('#DynamiCountryList').append(dynamicLi);

    });
    //EmployeeInfo.pass = sessionStorage.getItem("empInfo");
    //getEmployeeById(EmployeeInfo, renderEmployeeByID);
    getOccu(renderOccu);
}

function renderCities(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamicCitiesList').empty();
    dynamicLi = '<option value=""> בחר Select</option>';
    $('#DynamicCitiesList').append(dynamicLi);
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Id + '">' + row.Name + '</option>';
        $('#DynamicCitiesList').append(dynamicLi);
    });
}


function renderOccu(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#OccuSE').empty();
    dynamicLi = '<option value=""> בחר Select</option>';
    $('#OccuSE').append(dynamicLi);
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Occupation_code + '">' + row.Occupation_desc + '</option>';
        $('#OccuSE').append(dynamicLi);
    });
    $('.selectize-select').selectize({
        dropdown_direction: 'auto'
    });
}

function insertEmp(array) {

    array.Bus_name = $('#businessSE option:selected').text();
    array.Occupation_desc = $('#OccuSE option:selected').text();
    array.Day_off_name = $('#day_off option:selected').text();
    array.Add_city_name = $('#DynamicCitiesList option:selected').text();
    array.Picture = EmpPic;

        swal({
            title: "האם אתה בטוח?",
            text: "אתה עומד להוסיף עובד חדש.",
            type: "info",
            confirmButtonText: "כן",
            showCancelButton: "true",
            cancelButtonText: "בטל",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },

            function (isConfirm) {
                if (isConfirm) {
                    insertEmployee({ EmployeeInfo: JSON.stringify(array) }, InsertAllDocs);

                }
                else {
                    // swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });

    }


function InsertAllDocs(results) {
   
        EmpVisa.Ex_date = $('#date4_2').val();
        InsertDocs({ FileInfo: JSON.stringify(EmpVisa) });
        InsertDocs({ FileInfo: JSON.stringify(EmpID) });
        InsertDocs({ FileInfo: JSON.stringify(EmpAuth) });

    sessionStorage.setItem('contract', results.d);
    sessionStorage.setItem("empInfo", $('#passportid').val());
        window.location = "ContractDisplay.html";

}






