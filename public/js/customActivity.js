let connection = new Postmonger.Session();
let payload = {};
let steps = { trigger: false, config: false, schedule: false };

$(document).ready(function() {
    connection.trigger('ready');
    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('clickedNext', save);
});

function initialize(data) {
    if (data) {
        payload = data;
    }

    const hasInArguments = Boolean(
        payload['arguments'] &&
        payload['arguments'].execute &&
        payload['arguments'].execute.inArguments &&
        payload['arguments'].execute.inArguments.length > 0
    );

    const inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

    $.each(inArguments, function(index, inArgument) {
        $.each(inArgument, function(key, val) {
            if (key === 'emailField') {
                $('#emailField').val(val);
            }
            if (key === 'nameField') {
                $('#nameField').val(val);
            }
        });
    });
}

function onGetTokens(tokens) {
    console.log(tokens);
}

function onGetEndpoints(endpoints) {
    console.log(endpoints);
}

function save() {
    const emailField = $('#emailField').val();
    const nameField = $('#nameField').val();

    payload['arguments'].execute.inArguments = [{
        "emailField": emailField,
        "nameField": nameField,
        "contactKey": "{{Contact.Key}}"
    }];

    payload['metaData'].isConfigured = true;

    connection.trigger('updateActivity', payload);
} 