/*! jQuery placeholder fallback | (c) 2014 IHW-Marketing GmbH | MIT license */

// Detect native placeholder support
var placeholderSupport = 'placeholder' in document.createElement('input');

// Use fallback when we don't have native placeholder support
if (!placeholderSupport) {
    var placeholder = $('[placeholder]');

    // Bind the fallback functions to the input's with
    // placeholder propibute
    placeholder.blur(function() {
        var input = $(this);

        // Only show the placeholder text when the user hasen't
        // entered his own input text
        if (input.val() == '' || input.val() == input.prop('placeholder')) {
            // Password input's need to be cloned as text input's
            // They will be removed before submitting the form
            if (input.prop('type') == 'password') {
                var clonedInput;
                try {
                    clonedInput = input.clone().prop('type', 'text');
                } catch (error) {
                    // IE doesn't allow overriding the input type so we need to
                    // get the raw HTML code and change the input type before
                    // creating a new input from the code
                    var html = input.clone()[0].outerHTML;
                    html = html.replace('type=password', 'type=text');
                    clonedInput = $(html);

                    // Copy the data from the original input to the cloned one
                    clonedInput.data(input.data());
                }

                // Add placeholder and clone class and set the placeholder text
                // as input value
                clonedInput.addClass('placeholder clone');
                clonedInput.val(input.prop('placeholder'));

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
                // Add placeholder class and set the placeholder text as input value
                input.addClass('placeholder');
                input.val(input.prop('placeholder'));
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

    // Fire the blur event manuelly to get the placeholder fallback
    // when the page is loaded
    placeholder.blur();

    // Clear up some stuff before submitting the form
    placeholder.parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
            var input = $(this);

            // Remove cloned input fields
            if (input.hasClass('clone')) {
                input.remove();
                return;
            }

            // Reset the value of the input if it's equal to placeholder text
            if (input.val() == input.prop('placeholder')) {
                input.val('');
            }
        });
    });
}
