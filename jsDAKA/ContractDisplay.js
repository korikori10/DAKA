var EmpCont = new Object();
var contAmount = new Object();

$(document).ready(function () {
    var results = JSON.parse(sessionStorage.getItem('contract'));
    $("#signtaure").jSignature();
    //$("#signtaure").jSignature("reset");
    renderDocs(results);
  $('#sign').click(  function () {
        $('#sigModal').modal('show');
        //var $sigdiv = $("#signature")
        // $sigdiv.jSignature() // inits the jSignature widget.
        //  $sigdiv.jSignature("reset")
    });
    $('#saveSig').click(function () {
        var datapair = $("#signature").jSignature("getData")
        var svg = datapair;//[0] + "," + datapair[1] 
        InsertSignature(svg, results, insertContract);
        
    });
});

function renderDocs(results) {


   
    //var busID = sessionStorage.getItem("busiInfo");
    $('#EmpDocs').attr('id');
    var doctype = "5";
    $.each(results, function (i, row) {

        //if (row.Doctype_id == doctype) {
        if (i == 0) {
          //  $("#doc1").attr('name', row.Doctype_id);
            $("#doc1").find('iframe').attr('id', 'docimg1');
            var img = $('#docimg1').attr('src', row);
            //$.each(DocTypes, function (j, rows) {
            //    if (row.Doctype_id == rows.Doctype_id) {
            //        $("#doc1").find('h4').html('<i class="icon-eye6"></i> ' + rows.Doc_name);
            //        return
            //    }
            //});
            //data = row;
            //contactSave[i] = row;
            //populate(frm, data);

        }
        else {
            id = createContractForm();
           // $("#" + id).attr('name', row.Doctype_id);
            var img = $("#" + id).find('iframe').attr('id', 'img' + id);
             $('#img' + id).attr('src', row);
            //$.each(DocTypes, function (j, rows) {
            //    if (row.Doctype_id == rows.Doctype_id) {
            //        $("#" + id).find('h4').html('<i class="icon-eye6"></i> ' + rows.Doc_name);
            //        return
            //    }
            //});
        }

        // }

    });
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
    $(docs).insertBefore('#sign');
    //  $(contact).insertBefore('#addContact');
    // rolesSelect();
    return id;
}


function insertContract(results) {
    results = $.parseJSON(results.d);
    contAmount = results;
    EmpCont.Doctype_id = '5';
    EmpCont.Employee_pass_id = sessionStorage.getItem("empInfo");
    $.each(results, function (i, row) {

        EmpCont.Doc_id = EmpCont.Employee_pass_id + makeid();
        EmpCont.Img_url = row;
    InsertConts({ FileInfo: JSON.stringify(EmpCont) }, i, finished);

    })
    $('#sigModal').modal('toggle');
}

function finished(i) {

    if (contAmount.length <= (i + 1)) {

        swal({
            title: "בוצע!",
            text: "כל הנתונים נשמרו בהצלחה",
            type: "success",
            confirmButtonText: "חזור למסך הבית",
        },

            function (isConfirm) {

                window.location = "Dash.html"

            })
    }
};
$('#sigModal').on('shown.bs.modal', function (e) {
    $("#signature").jSignature();
    $("#signature").resize();
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}