CategoryInfo = new Object();
ProductInfo = new Object();

$(document).on('pagebeforeshow', '#home', function () {
    getCategory(renderCategory);
});


function renderCategory(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamicList').empty();
    $.each(results, function (i, row) {
        dynamicLi = '<li> <a href="" data-id="' + row.Id + '"> <h3>' + row.Name + '</h3><span class="ui-li-count"> ' + row.ProductAmount+ '</span></a></li>'
        $('#DynamicList').append(dynamicLi);
        $('#DynamicList').listview('refresh');
    }

   
    )
}
$(document).on('vclick', '#DynamicList li a', function () {
    CategoryInfo.id = $(this).attr('data-id');
    getProductsByCat(CategoryInfo, renderProducts);
    $.mobile.changePage("#category", {
        transition: "slide", changeHash: false

    });

});

function renderProducts(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    $('#DynamicListproducts').empty();
    $.each(results, function (i, row) {
      // console.log(JSON.stringify(row));
       if (row.ImagePath == null) { imageFullPath = "/images/no-img.jpg" }
            else { imageFullPath = row.ImagePath }
       dynamicList = '<li> <a href="" data-id="' + row.Id + '"> <img src="' + imageFullPath + '"/>  <h3>' + row.Title + '</h3><p>Price: ' + row.Price + '</br>Inventory: ' + row.Inventory + '</p></a></li>'
       $('#DynamicListproducts').append(dynamicList);
        $('#DynamicListproducts').listview('refresh');
    })
}


$(document).on('vclick', '#DynamicListproducts li a', function () {
    ProductInfo.id = $(this).attr('data-id');
    getProduct(ProductInfo, renderFullProduct);
    $.mobile.changePage("#product", {
        transition: "slide", changeHash: false

    });

});

function renderFullProduct(results) {
    //this is the callBackFunc 
    results = $.parseJSON(results.d);
    var attributes = "";
    $('#productPage').empty();
        if (results.ImagePath == null) { imageFullPath = "/images/no-img.jpg" }
        else { imageFullPath = results.ImagePath }
        pimginv = "<div class='pro'><h3>" + results.Title + "</h3></br><img src='" + imageFullPath + "'/> </br><p>Inventory: " + results.Inventory + "</p></div><div  id='productPageList'  data-role='collapsible-set'>"
        $('#productPage').append(pimginv);
            if (results.Attributes['אספקה מהירה'] == null) {
                attributes += "<h4>No attributes for this product!</h4>"
            }
            else {
        $.each(results.Attributes, function (i, row) {
                attributes += "<div class='col' data-role='collapsible'><h3>" + i + "</h3>" + "<p>" + row + "</p></div>"
        });

            }
        $('#productPageList').append(attributes);
        $('div[data-role="collapsible"]').collapsible();

    

}





