'use strict';

let connection = new Postmonger.Session();
let payload = {};
let lastStepEnabled = false;
let steps = [ 
    { "label": "Configure API", "key": "step1" }
];

connection.on('initActivity', initialize);
connection.on('requestedTokens', onGetTokens);
connection.on('requestedEndpoints', onGetEndpoints);
connection.on('clickedNext', save);

function initialize(data) {
    if (data) {
        payload = data;
    }
    
    connection.trigger('ready');
    connection.trigger('requestTokens');
    connection.trigger('requestEndpoints');

    // Initialize UI with saved data
    if (payload.arguments?.execute?.inArguments?.length > 0) {
        const config = payload.arguments.execute.inArguments[0];
        
        document.getElementById('endpoint').value = config.endpoint || '';
        document.getElementById('headers').value = config.headers ? JSON.stringify(config.headers, null, 2) : '';
        document.getElementById('body').value = config.body ? JSON.stringify(config.body, null, 2) : '';
    }
}

function onGetTokens(tokens) {
    console.log('Tokens: ', tokens);
}

function onGetEndpoints(endpoints) {
    console.log('Endpoints: ', endpoints);
}

function save() {
    // When user clicks save, collect form data
    const endpoint = document.getElementById('endpoint').value;
    let headers, body;
    
    // Parse JSON inputs
    try {
        headers = JSON.parse(document.getElementById('headers').value || '{}');
        body = JSON.parse(document.getElementById('body').value || '{}');
    } catch (e) {
        console.error('Invalid JSON in headers or body');
        return;
    }

    // Save configuration back to SFMC
    payload.arguments.execute.inArguments = [{
        endpoint: endpoint,
        headers: headers,
        body: body,
        tokens: "{{Contact.Attribute.Journey.tokens}}"
    }];
} 