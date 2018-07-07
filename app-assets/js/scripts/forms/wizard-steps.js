/*=========================================================================================
    File Name: wizard-steps.js
    Description: wizard steps page specific js
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Wizard tabs with numbers setup
//$(".number-tab-steps").steps({
//    headerTag: "h6",
//    bodyTag: "fieldset",
//    transitionEffect: "fade",
//    titleTemplate: '<span class="step">#index#</span> #title#',
//    labels: {
//        finish: 'Submit'
//    },
//    onFinished: function (event, currentIndex) {
//        alert("Form submitted.");
//    }
//});

// Wizard tabs with icons setup
//$(".icons-tab-steps").steps({
//    headerTag: "h6",
//    bodyTag: "fieldset",
//    transitionEffect: "fade",
//    titleTemplate: '<span class="step">#index#</span> #title#',
//    labels: {
//        finish: 'Submit'
//    },
//    onFinished: function (event, currentIndex) {
//        alert("Form submitted.");
//    }
//});

// Vertical tabs form wizard setup
var form = $("#insertEmpForm").show();
$(".vertical-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    stepsOrientation: "vertical",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex) {
            return true;
        }
        $('input[type="tel"]').rules('add', { maxlength: 9 });
        $('input[type="number"]').rules('add', { maxlength: 9 });
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function (event, currentIndex) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex) {

        $.fn.serializeObject = function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (this.value == 'T') {
                    this.value = 'true'
                }
                else if (this.value == 'F') {
                    this.value = 'false'
                }
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        var formData = $('#insertEmpForm').serializeObject();
        // var result = JSON.stringify(formData);
        //  var array = ($("#insertEmpForm").serialize());
        if ($('#insertEmpForm').attr('name') === 'WizardBusiForm') {
            insertBusandContact(formData);
        }
        else {
        insertEmp(formData);

        }
    }
});

// Validate steps wizard

// Show form
//var form = $(".steps-validation").show();

//$(".steps-validation").steps({
//    headerTag: "h6",
//    bodyTag: "fieldset",
//    transitionEffect: "fade",
//    titleTemplate: '<span class="step">#index#</span> #title#',
//    labels: {
//        finish: 'Submit'
//    },
//    onStepChanging: function (event, currentIndex, newIndex)
//    {
//        // Allways allow previous action even if the current form is not valid!
//        if (currentIndex > newIndex)
//        {
//            return true;
//        }
//        // Forbid next action on "Warning" step if the user is to young
//        if (newIndex === 3 && Number($("#age-2").val()) < 18)
//        {
//            return false;
//        }
//        // Needed in some cases if the user went back (clean up)
//        if (currentIndex < newIndex)
//        {
//            // To remove error styles
//            form.find(".body:eq(" + newIndex + ") label.error").remove();
//            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
//        }
//        form.validate().settings.ignore = ":disabled,:hidden";
//        return form.valid();
//    },
//    onFinishing: function (event, currentIndex)
//    {
//        form.validate().settings.ignore = ":disabled";
//        return form.valid();
//    },
//    onFinished: function (event, currentIndex)
//    {
//        alert("Submitted!");
//    }
//});

// Initialize validation
var form1 = $("#insertEmpForm")

form1.validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function(element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function(element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function(error, element) {
        error.insertAfter(element);
    },
    rules: {
        email: {
            email: true
        }
    }
});


// Initialize plugins
// ------------------------------
// Date & Time
$('.datetime').daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
        format: 'MM/DD/YYYY h:mm A'
    }
});