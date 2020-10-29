// We use javascript to write the following functions: 
// - `init` (initialize the document)
// - `reset` (reset the webpage by clearing all elements)
// - `validate` (validate if all inputs fields are collectly filled out)
// - `send` (allows us to submit the document)
// a function expression ( e.g. const print = function() {} ) and an arrow function HAVE to be called before they're invoked
// a regular function definition gets hoisted when the JS first loads, and can be called anywhere

const init = function() {
    document.getElementById('button-cancel').addEventListener('click', reset);
    document.getElementById('button-send').addEventListener('click', send);
};

const reset = function(ev) {
    // HTML will automatically put the form back to the initial state
    // unless we manually do that
    ev.preventDefault(); // we can reset programatically
    document.getElementById('form-user').reset(); // .reset is a METHOD that will clear all values contained inside the <form> tag (see HTML)
    console.log('The page should be reset here');

    // if you want to do anything else, you can....
    // build other logic HERE
};

const validate = function() {
    let valid = false;
    let failures = [];
    const first = document.getElementById('input-first');
    const password = document.getElementById('input-password');
    const email = document.getElementById('input-email');
    const select = document.getElementById('input-age'); // we can grab: .selectedIndex .options .length ....
    const check = document.getElementById('input-alive'); // we can grab: .checked .value
    // logic for "first":
    if (first.value === '') { // OR (!first.value) (a falsey value)
        failures.push({input: 'input-first', msg: 'Required field'}); 
    } 
    // logic for "password":
    if (password.value === '' || password.value.length < 8) {
        failures.push({input: 'input-password', msg: 'must be at least 8 characters'});
    }
    // logic for "email":
    if (email.value === '' || !email.value.includes('@')) { 
        failures.push({input: 'input-email', msg: 'Required field'}); 
    } 
    // logic for "select":
    if (select.selectedIndex === 0) { // the index of "under 20"
        failures.push({input: 'input-age', msg: 'Too young'});
    }
    // logic for "check":
    if (!check.checked) {
        failures.push({input: 'input-alive', msg: 'Must be alive!'});
    }
    return failures;
};

const send = function(ev) {
    ev.preventDefault(); // or ev.stopPropagation - prevents "bubbling up" to any parent element(s)
    let fails = validate(); // "validate" returns failures (above)
    if (fails.length === 0) { // if there are zero failures in the array
        document.getElementById('form-user').submit();
    } else {
        // output the messages resulting from the event:
        fails.forEach(obj => {
            const field = document.getElementById(obj.input);
            field.parentElement.classList.add('error');
            field.parentElement.setAttribute('data-errormsg', obj.msg); // inserts error msg string!
        })
    }

};
document.addEventListener('DOMContentLoaded', init); //