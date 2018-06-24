var DocsInfo = new Object();
//var docs = new Object();

$(document).ready(function () {
    DocsInfo.Employee_pass_id = sessionStorage.getItem("empInfo");
    getTheDocs({ DocsInfo: JSON.stringify(DocsInfo) }, renderDocs);
    $('#docTypeFilter').on('change', function () {
        $(".docCards").not("[name='"+ this.value+"']" ).att
    });
});

function renderDocs(results) {


    results = $.parseJSON(results.d);
    //var busID = sessionStorage.getItem("busiInfo");
    $('#EmpDocs').attr('id');
    var doctype = "5";
    $.each(results, function (i, row) {

        //if (row.Doctype_id == doctype) {
        if (i == 0) {
            $("#doc1").attr('name', row.Doctype_id);
                $("#doc1").find('iframe').attr('id', 'docimg1')
                var img = $('#docimg1').attr('src', row.Img_url);
                //data = row;
                //contactSave[i] = row;
                //populate(frm, data);

            }
            else {
            id = createContractForm();
            $("#" + id).attr('name', row.Doctype_id);
                img = $("#" + id).find('iframe').attr('id', 'img' + id);
                var img = $('#docimg1').attr('src', row.Img_url);
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
    var docs = '<div class="col-xl-4 col-md-6 col-xs-12"' + id + '">' + $div.html() + '</div>'; //$div.clone().prop('id', id);

    // Finally insert $klon wherever you want
    $(docs).appendTo('#EmpDocs');
  //  $(contact).insertBefore('#addContact');
   // rolesSelect();
    return id;
}