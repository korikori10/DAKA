var DocsInfo = new Object();
//var DocTypes = new Object();
var docpic = new Object();

$(document).ready(function () {
    DocsInfo.Bus_id = sessionStorage.getItem("busiInfo");
    getTheDocsBusi({ DocsInfo: JSON.stringify(DocsInfo) },renderDocs);


    //Picture or file upload
    $("#contract").on("change", function () {
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
            uploadFiles(formData, pbLBL, pbDiv, setDocFile);

        }
    });

});

function setDocFile(results) {
    docpic = results;
}

$('#InsertContract').click(function () {

    DocsInfo.Bus_id = sessionStorage.getItem("busiInfo");
    DocsInfo.Contract_pic = docpic;
    DocsInfo.Contype_id = '1';
    $('#Insert_contract').modal('toggle');
    InsertheContract({ DocsInfo: JSON.stringify(DocsInfo) });
});


$("#busiTab").on('click',function(){
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

function renderDocs(results) {

results = $.parseJSON(results.d);
    $('#BusiDocs').attr('id');

    $.each(results, function (i, row) {
        if (i == 0) {

            $("#doc1").attr('name', row.Contype_id);
            $("#doc1").find('iframe').attr('id', 'docimg1');
            var img = $('#docimg1').attr('src', row.Contract_pic + "#view=FitH");

         
        }
        else {
            id = createContractForm();
            $("#" + id).attr('name', row.Contype_id + "#view=FitH");
            var img = $("#" + id).find('iframe').attr('id', 'img' + id);
            $('#img' + id).attr('src', row.Contract_pic);
           
        }

        // }

    });

    $('[data-action="expand"]').on('click', function(){    setTimeout(function () {
   resize();
    }, 200);} );
   

}
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
    $(docs).appendTo('#BusiDocsInsert');

    return id;
}

//$('[data-action="expand"]').on('click', resize);

//function resize()
//{
//    iFrame = document.getElementsByTagName(iframe);
//    iFrame = iFrame.width = 100+'%';//iFrame.contentWindow.document.body.scrollWidth;
//    iFrame = iFrame.height = 1000 + 'px';// iFrame.contentWindow.document.body.scrollHeight;
//}