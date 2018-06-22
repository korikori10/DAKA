var DocsInfo = new Object();

$(document).ready(function () {
    DocsInfo.pass = sessionStorage.getItem("empInfo");
 
    getTheDocs(DocsInfo, renderDocs)
  
});

function renderDocs(results) {


    results = $.parseJSON(results.d);
    //var busID = sessionStorage.getItem("busiInfo");
    $('#EmpDocs').attr('id');
    var doctype = "5";
    $.each(results, function (i, row) {

        if (row.Doctype_id == doctype) {
            if (i == 0) {
                $("#contract1").find('form').attr('id', 'updatecontract1')
                frm = $('#updatecontract1');
                data = row;
                contactSave[i] = row;
                populate(frm, data);
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
    var $div = $('div[id^="contract"]:last');

    // Read the Number from that DIV's ID (i.e: 3 from "klon3")
    // And increment that number by 1
    var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
    var id = 'contract' + num;

    // Clone it and assign the new ID (i.e: from num 4 to ID "contact4")
    var contact = '<div class="col-md-6" id="' + id + '">' + $div.html() + '</div>'; //$div.clone().prop('id', id);

    // Finally insert $klon wherever you want
    //$(contact).appendTo('#contactsTab');
  //  $(contact).insertBefore('#addContact');
   // rolesSelect();
    return id;
}