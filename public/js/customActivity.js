$(document).ready(function() {
    if (typeof Postmonger === 'undefined') {
        console.error('Postmonger not loaded');
        return;
    }

    var connection = new Postmonger.Session();
    var payload = {};
    
    const DE_EXTERNAL_KEY = '1DE7605E-9CB3-4087-ABF6-AF29A5B68D8C';

    connection.on('initActivity', initialize);
    connection.on('clickedNext', onClickedNext);

    function onRender() {
        connection.trigger('ready');
    }

    function initialize(data) {
        console.log('Initializing with data:', data);
        if (data) {
            payload = data;
        }

        connection.trigger('requestSchema');
        connection.on('requestedSchema', function(data) {
            console.log('Received schema:', data);
            
            payload['arguments'].execute.inArguments = [{
                "deFields": `{{Contact.Attribute.${DE_EXTERNAL_KEY}.*}}`
            }];

            console.log('Updated payload:', payload);
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onClickedNext() {
        save();
    }

    function save() {
        payload['arguments'].execute.inArguments = [{
            "deFields": `{{Contact.Attribute.${DE_EXTERNAL_KEY}.*}}`
        }];

        payload['metaData'].isConfigured = true;

        console.log('Saving payload:', payload);
        connection.trigger('updateActivity', payload);
    }

    onRender();
}); 