alert();
var $ = JQuery;
var REST_DATA = 'api/favorites';
var defaultItems = [

];


function verificar_email_pass(){

}
function loadItems() {
    xhrGet(REST_DATA, function(data) {
        var receivedItems = data || [];
        var items = [];
        var i;
        // Make sure the received items have correct format
        for (i = 0; i < receivedItems.length; ++i) {
            var item = receivedItems[i];
            if (item && 'id' in item) {
                items.push(item);
            }
        }
        console.log(items);
        alert(items);
    }, function(err) {
        console.error(err);
    });
}

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
