var DocsInfo = new Object();
var DocTypes = new Object();
//var docs = new Object();

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

function renderDocTypes(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    DocTypes = results;
    $('#docTypeFilter').empty();
    dynamicLi = '<option value="0">הצג הכל</option>';
    $('#docTypeFilter').append(dynamicLi);
    $.each(results, function (i, row) {
        dynamicLi = '<option value="' + row.Doctype_id + '">' + row.Doc_name + '</option>';
        $('#docTypeFilter').append(dynamicLi);
    });
    getTheDocs({ DocsInfo: JSON.stringify(DocsInfo) }, renderDocs);
}

function renderDocs(results) {


    results = $.parseJSON(results.d);
    //var busID = sessionStorage.getItem("busiInfo");
    $('#EmpDocs').attr('id');
    var doctype = "5";
    $.each(results, function (i, row) {

        //if (row.Doctype_id == doctype) {
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
                //data = row;
                //contactSave[i] = row;
                //populate(frm, data);

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
    $(docs).appendTo('#EmpDocs');
  //  $(contact).insertBefore('#addContact');
   // rolesSelect();
    return id;
}