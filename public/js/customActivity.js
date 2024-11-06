var connection = new Postmonger.Session();
var payload = {};

$(window).ready(onRender);

connection.on('initActivity', initialize);
connection.on('clickedNext', save);

function onRender() {
    // Notify Journey Builder that this activity is ready
    connection.trigger('ready');
}

function initialize(data) {
    if (data) {
        payload = data;
    }

    // Request the Entry Source schema
    connection.trigger('requestSchema');
    connection.on('requestedSchema', function (data) {
        // Add entry source attributes as inArgs
        const schema = data['schema'];

        if (!payload['arguments']) {
            payload['arguments'] = {};
        }

        if (!payload['arguments'].execute) {
            payload['arguments'].execute = {};
        }

        if (!payload['arguments'].execute.inArguments) {
            payload['arguments'].execute.inArguments = [];
        }

        // Add default inArguments
        payload['arguments'].execute.inArguments = [{
            "email": "{{Contact.Attribute.manihas_custom_activity.Email}}",
            "name": "{{Contact.Attribute.manihas_custom_activity.Name}}",
            "contactKey": "{{Contact.Key}}"
        }];

        // Add schema fields as inArguments
        for (var i = 0, l = schema.length; i < l; i++) {
            var inArg = {};
            let attr = schema[i].key;
            let keyIndex = attr.lastIndexOf('.') + 1;
            inArg[attr.substring(keyIndex)] = '{{' + attr + '}}';
            payload['arguments'].execute.inArguments.push(inArg);
        }
    });
}

function save() {
    payload['metaData'].isConfigured = true;
    connection.trigger('updateActivity', payload);
} 