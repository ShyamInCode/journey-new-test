// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // First check if Postmonger is available
    if (typeof Postmonger === 'undefined') {
        console.error('Postmonger is not loaded');
        return;
    }

    // Initialize Postmonger Session with proper target
    var connection = new Postmonger.Session({
        // This tells Postmonger where to send messages
        // For Journey Builder, we use the parent window
        win: window.parent,
        // Optional: Define allowed methods
        methods: ['ready', 'initActivity', 'updateActivity']
    });

    var payload = {};
    var eventDefinitionKey;

    // Test connection
    console.log('Postmonger Connection:', connection);

    // Setup the connection events
    connection.on('initActivity', function(data) {
        console.log('Initialize Activity:', data);
        if (data) {
            payload = data;
        }

        if (!payload.arguments) {
            payload.arguments = {};
        }
        if (!payload.arguments.execute) {
            payload.arguments.execute = {};
        }

        // Request event definition key and schema
        connection.send('requestEventDefinitionKey');
        connection.send('requestSchema');
    });

    connection.on('requestedSchema', function(data) {
        console.log('Received Schema:', data);
        
        payload.arguments.execute.inArguments = [{
            sourceData: '{{Event.DEAudience-' + eventDefinitionKey + '}}'
        }];

        console.log('Updated Payload:', payload);
    });

    connection.on('requestedEventDefinitionKey', function(data) {
        console.log('Received EventDefinitionKey:', data);
        eventDefinitionKey = data.eventDefinitionKey;
    });

    connection.on('clickedNext', function() {
        save();
    });

    // Define save function
    function save() {
        if (!payload.metaData) {
            payload.metaData = {};
        }
        payload.metaData.isConfigured = true;
        
        console.log('Saving payload:', payload);
        connection.send('updateActivity', payload);
    }

    // Send ready event
    console.log('Sending ready event');
    connection.send('ready');
}); 