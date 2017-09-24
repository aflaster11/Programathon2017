xhrGet(REST_DATA, function(data) {

    var receivedItems = data || [];
    console.log(data);
    /*var items = [];
    var i;
    // Make sure the received items have correct format
    for (i = 0; i < receivedItems.length; ++i) {
        var item = receivedItems[i];
        if (item && 'id' in item) {
            items.push(item);
        }
    }
    var hasItems = items.length;
    if (!hasItems) {
        items = defaultItems;
    }
    for (i = 0; i < items.length; ++i) {
        addItem(items[i], !hasItems);
    }
    if (!hasItems) {
        var table = document.getElementById('notes');
        var nodes = [];
        for (i = 0; i < table.rows.length; ++i) {
            nodes.push(table.rows[i].firstChild.firstChild);
        }

        function save() {
            if (nodes.length) {
                saveChange(nodes.shift(), save);
            }
        }
        save();
    }
    */
}, function(err) {
    console.error(err);
});

/*

function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
        alert("Error: La dirección de correo " + email + " es incorrecta.");
    }
    console.log(1);
}
var email="ma@x.com";
validarEmail(email);
*/
