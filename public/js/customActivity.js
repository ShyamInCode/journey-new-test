// Wait for DOM and Postmonger to be ready
$(document).ready(function() {
    // Ensure Postmonger is loaded
    if (typeof Postmonger === 'undefined') {
        console.error('Postmonger not loaded');
        return;
    }

    // Initialize the connection
    var connection = new Postmonger.Session();
    var payload = {};
    var steps = [
        { "label": "Step 1", "key": "step1" }
    ];
    var currentStep = steps[0].key;

    // Setup the connection events
    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

    function initialize(data) {
        if (data) {
            payload = data;
        }

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        $.each(inArguments, function(index, inArgument) {
            $.each(inArgument, function(key, val) {
                if (key === 'name') {
                    $('#name').val(val);
                }
            });
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'done',
            visible: true
        });
    }

    function onGetTokens(tokens) {
        console.log('tokens', tokens);
    }

    function onGetEndpoints(endpoints) {
        console.log('endpoints', endpoints);
    }

    function onClickedNext() {
        save();
    }

    function onClickedBack() {
        connection.trigger('prevStep');
    }

    function onGotoStep(step) {
        currentStep = step.key;
    }

    function save() {
        var name = $('#name').val();

        payload['arguments'].execute.inArguments = [{
            "email": "{{Contact.Attribute.manihas_custom_activity.Email}}",
            "name": "{{Contact.Attribute.manihas_custom_activity.Name}}",
            "contactKey": "{{Contact.Key}}"
        }];

        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }

    // Start the app
    onRender();
}); 