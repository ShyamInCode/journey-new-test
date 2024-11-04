let connection = new Postmonger.Session();
let payload = {};

$(document).ready(function() {
    connection.trigger('ready');
    connection.on('initActivity', initialize);
    connection.on('clickedNext', save);
});

function initialize(data) {
    if (data) {
        payload = data;
    }
}

function save() {
    payload['arguments'].execute.inArguments = [{
        "email": "{{Contact.Attribute.manihas_custom_activity.Email}}",  // Replace 'Journey_DE' with your Data Extension name
        "name": "{{Contact.Attribute.manihas_custom_activity.Name}}",    // Replace 'Journey_DE' with your Data Extension name
        "contactKey": "{{Contact.Key}}"
    }];

    payload['metaData'].isConfigured = true;
    connection.trigger('updateActivity', payload);
} 