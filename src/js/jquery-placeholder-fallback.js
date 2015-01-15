/*! jQuery placeholder fallback | (c) 2014-2015 IHW-Marketing GmbH | https://github.com/ihw-marketing/jquery-placeholder-fallback/blob/master/LICENSE */

// Use the fallback when the browser has no native placeholder support
if (document.createElement('input').placeholder === undefined) {
    // Get all elements with a `placeholder` attribute
    var placeholderElements = $('[placeholder]');

    // Bind the fallback function to the placeholder elements
    placeholderElements.blur(function() {
        var input = $(this);

        // Only show the placeholder text when the input is empty
        if (input.val() === '' || input.val() == input.attr('placeholder')) {
            // A password input needs to be cloned as text input
            if (input.attr('type') == 'password') {
                var clonedInput;

                try {
                    clonedInput = input.clone().prop('type', 'text');
                } catch (error) {
                    // When the browser doesn't supports overriding the input type, it needs to
                    // be changed in the raw HTML code before creating a cloned input
                    var html = input.clone()[0].outerHTML;
                    html = html.replace('type=password', 'type=text');
                    clonedInput = $(html);

                    // Copy the data from the original input to the cloned one
                    clonedInput.data(input.data());
                }

                // Add the `placeholder` and `clone` class to the input and set the
                // placeholder text as input value
                clonedInput.addClass('placeholder clone').val(input.attr('placeholder'));

                // Insert the cloned input after the original one
                clonedInput.insertAfter(input);

                // Hide the original input
                input.hide();

                // Show and focus the original input when the cloned input get's
                // focus and also remove it
                clonedInput.focus(function() {
                    input.show().focus();
                    $(this).remove();
                });
            } else {
                // Add the `placeholder` class  to the input and set the placeholder text
                // as input value
                input.addClass('placeholder').val(input.attr('placeholder'));
            }
        }
    }).focus(function() {
        var input = $(this);

        // Reset the input field when it get's focus
        if (input.hasClass('placeholder')) {
            input.removeClass('placeholder');
            input.val('');
        }
    });

    // Fire the blur event manuelly to get the placeholder fallback on load
    placeholderElements.blur();

    // Clear up the input elements before submitting the form
    placeholderElements.parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
            var input = $(this);

            // Remove cloned input fields
            if (input.hasClass('clone')) {
                input.remove();
                return;
            }

            // Reset the value of the input if it's equal to placeholder text
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        });
    });
}
