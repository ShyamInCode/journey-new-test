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
    
    // Set the activity as configured immediately
    payload['metaData'].isConfigured = true;
    connection.trigger('updateActivity', payload);
}

function save() {
    // Pre-configure the payload with default values
    payload['arguments'].execute.inArguments = [{
        "email": "{{Contact.Attribute.manihas_custom_activity.Email}}",
        "name": "{{Contact.Attribute.manihas_custom_activity.Name}}",
        "contactKey": "{{Contact.Key}}"
    }];

    payload['metaData'].isConfigured = true;

    console.log('Saving payload:', payload);
    connection.trigger('updateActivity', payload);
} 