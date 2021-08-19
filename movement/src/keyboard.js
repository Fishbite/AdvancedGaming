/* ****** The Keyboard Function ****** */

/* 
    This keyboard function creates key objects that listen
    for specific keyboard events.

    Use it like this:

    let keyObject = keyboard(asciiKeyCodeNumber)

    where `keyObject` is the key that we want to add an
    event listener for. Then we can assign `press` and `release`
    methods to the keyObject like this:

    keyObject.press = function(){
        // Key object pressed
    }

    keyObject.release = function() {
        // Key object released
    }

    We have also added isUp and isDown methods to our
    keyObjects tht we can check when required. This will let
    us know whether the key has been released or not and do
    something like this:

    if (space.isDown) {
        // Do this!
    }

    if (space.isUp) {
        // Do this!
    }
*/
