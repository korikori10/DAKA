var DocsInfo = new Object();
//var docs = new Object();

$(document).ready(function () {
    DocsInfo.Employee_pass_id = sessionStorage.getItem("empInfo");
    getTheDocs({ DocsInfo: JSON.stringify(DocsInfo) }, renderDocs);
  
});

function renderDocs(results) {


    results = $.parseJSON(results.d);
    //var busID = sessionStorage.getItem("busiInfo");
    $('#EmpDocs').attr('id');
    var doctype = "5";
    $.each(results, function (i, row) {

        if (row.Doctype_id == doctype) {
            if (i == 0) {
                $("#doc1").find('img').attr('id', 'docimg1')
                var img = $('#docimg1').att('src', row.Img_url);
                //data = row;
                //contactSave[i] = row;
                //populate(frm, data);

            }
            else {
                id = createContractForm();
                frm = $("#" + id).find('form').attr('id', 'update' + id);
                data = row;
                contactSave[i] = row;
                populate(frm, data);
            }

        }

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
    var docs = '<div class="col-xl-6 col-md-2 col-xs-4"' + id + '">' + $div.html() + '</div>'; //$div.clone().prop('id', id);

    // Finally insert $klon wherever you want
    $(contact).appendTo('#EmpDocs');
  //  $(contact).insertBefore('#addContact');
   // rolesSelect();
    return id;
}