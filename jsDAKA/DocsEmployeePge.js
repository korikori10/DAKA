var DocsInfo = new Object();
var DocTypes = new Object();

$(document).ready(function () {
    DocsInfo.Employee_pass_id = sessionStorage.getItem("empInfo");
    getDocTypes(renderDocTypes);
    
    $('#docTypeFilter').on('change', function () {
        if (this.value == 0) {
            $(".docCards").children().show();
        }
        else {
            $(".docCards").children().show();
            $(".docCards").not("[name='" + this.value + "']").children().hide()
        }
    });



});

////fit the pdf to iframe
//    $(function(){
    
//        var iFrames = $('iframe');

//    	function iResize() {
    	
//    		for (var i = 0, j = iFrames.length; i < j; i++) {
//        iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';}
//    	    }

//    //    	if ($.browser.safari || $.browser.opera) {

//    //    iFrames.load(function () {
//    //        setTimeout(iResize, 0);
//    //    });
            
//    //for (var i = 0, j = iFrames.length; i < j; i++) {
//    //    			var iSource = iFrames[i].src;
//    //    			iFrames[i].src = '';
//    //    			iFrames[i].src = iSource;
//    //           }

//    //    	} else {
//        iFrames.load(function () {
//            this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
//        });
//    //}

//        });



function renderDocTypes(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    DocTypes = results;
    $('#docTypeFilter').empty();
    dynamicLi = '<option value="0">הצג הכל</option>';
    $('#docTypeFilter').append(dynamicLi);
    $('#docTypeSelect').empty();
    dynamicLi = '<option value="">בחר סוג מסמך</option>';
    $('#docTypeSelect').append(dynamicLi);
    
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Doctype_id + '">' + row.Doc_name + '</option>';
        $('#docTypeFilter').append(dynamicLi);
        $('#docTypeSelect').append(dynamicLi);
    });
    getTheDocs({ DocsInfo: JSON.stringify(DocsInfo) }, renderDocs);
}

function renderDocs(results) {


    results = $.parseJSON(results.d);
    $('#EmpDocs').attr('id');
    var doctype = "5";
    $.each(results, function (i, row) {

        if (i == 0) {
            $("#doc1").attr('name', row.Doctype_id);
            $("#doc1").find('iframe').attr('id', 'docimg1');
            var img = $('#docimg1').attr('src', row.Img_url);
            $.each(DocTypes, function (j, rows) {
                if (row.Doctype_id == rows.Doctype_id) {
                    $("#doc1").find('h4').html('<i class="icon-eye6"></i> ' + rows.Doc_name);
                    return
                }
            });
  

            }
            else {
            id = createContractForm();
            $("#" + id).attr('name', row.Doctype_id);
            var img = $("#" + id).find('iframe').attr('id', 'img' + id);
            $('#img' + id).attr('src', row.Img_url);
            $.each(DocTypes, function (j, rows) {
                if (row.Doctype_id == rows.Doctype_id) {
                    $("#" + id).find('h4').html('<i class="icon-eye6"></i> ' + rows.Doc_name);
                    return
                }
            });
            }

       // }
        //fit iframe to expand size
    $('[data-action="expand"]').on('click', function(){    setTimeout(function () {
   resize();
    }, 200);} );

    });
}

//fit the img to iframe
$("#docstab").on('click',function(){
$('iframe').contents().find('img').css('width', '100%')
$('iframe').contents().find('img').css('height', '375px')

});


function resize() {
        var windowWidth = $('[name="iframe-holder"]').width();
        var windowHeight = $('[name="iframe-holder"]').height();

        if ($('[name="iframe-holder"]').hasClass("card-fullscreen")) {
              $("iframe").css({
            "height": 700 + "px",
            "width": 100 + "%"
                });
            }
        else {
          $("iframe").css({
            "height": 375 + "px",
            "width": 100 + "%"     
                });
            }
    }

function createContractForm() {
    // get the last DIV which ID starts with ^= "contact"
    var $div = $('div[id^="doc"]:last');

    // Read the Number from that DIV's ID (i.e: 3 from "klon3")
    // And increment that number by 1
    var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
    var id = 'doc' + num;

    // Clone it and assign the new ID (i.e: from num 4 to ID "contact4")
    var docs = '<div class="docCards col-xl-4 col-md-6 col-xs-12" id="' + id + '">' + $div.html() + '</div>'; //$div.clone().prop('id', id);

    // Finally insert $klon wherever you want
    $(docs).appendTo('#EmpDocs');

    return id;
}

$('#insertDoc').click(function () {
    $('#insertDocFrm').validate();

    if ($('#insertDocFrm').valid()) {
        EmployeeInfo.Ex_date = $('#visaDate').val();
        EmployeeInfo.Doc_id = EmployeeInfo.pass + makeid();
        EmployeeInfo.Picture = empPic;
        EmployeeInfo.Doctype_id = $('#docTypeSelect').val();
        EmployeeInfo.Employee_pass_id = DocsInfo.Employee_pass_id
        $('#uploadDocs').modal('toggle');
        updateDocs({ EmployeeInfo: JSON.stringify(EmployeeInfo) });
    }
});

//Picture or file upload
$("#Pic").on("change", function () {
    pbLBL = $("#pbLBL")
    pbDiv = $("#progressBar")
    pbLBL.text('Uploading...');
    pbDiv.fadeIn(500)
    var files = $(this).get(0).files;
    if (files.length > 0) {


        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i])
        }
        uploadFiles(formData, pbLBL, pbDiv, setEmpFile);

    }
});

function setEmpFile(results) {
    empPic = results;
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}