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
