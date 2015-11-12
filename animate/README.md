# Animate.js [![Build Status](https://travis-ci.org/jshjohnson/animate.svg?branch=develop)](https://travis-ci.org/jshjohnson/animate) [![Dependency Status](https://david-dm.org/Rowno/grunt-mocha-cli.svg)](https://david-dm.org/Rowno/grunt-mocha-cli)

Trigger animations on elements when they are in view.

##Installation
```html
<script src="/assets/js/dist/animate.js"></script>
<script>
    var animate = new Animate({
        target: '[data-animate]',
        animatedClass: 'js-animated',
        offset: 0.5,
        delay: 0,
        removeAnimations: true,
        reverse: false,
        debug: false,
        onLoad: true,
        onScroll: true,
        onResize: false,
        callback: function (element) {
            console.log(element)
        }
    });
    animate.init();
</script>
```

##Animating elements
#####`data-animate`

Default way of targeting an element to animate (no value required). This can be overridden to be a custom attribute or class.

#####`data-animation-classes`

Animations to be added to element when it is in view. To add multiple classes, seperate each class with a space (as you would normally).

###Optional element overrides
#####`data-animation-delay`

Overide the plugin `delay` per element.

#####`data-animation-offset`

Override the plugin `offset` per element.

#####`data-animate-remove`

Overide the plugin `removeAnimations` per element.

####Examples
```html
<div data-animate data-animation-classes="animated fadeIn"></div>
<div data-animate data-animation-classes="animated tada" data-animation-delay="1000"></div>
<div data-animate data-animation-classes="animated bounce" data-animation-offset="0.2"></div>
<div data-animate data-animation-classes="animated bounce" data-animation-remove="true"></div>
```

##Options
####target
Type: `String` Default: `[data-animate]`

Element/s to target. Once this element is in view, add animations.

####animatedClass
Type: `String` Default: `js-animated`

Class to be added to element once animation has completed.

####offset
Type: `Number` Default: `0.5` (50%)

Percentage of element that needs to be in the viewport before the animation triggers.

####delay
Type: `Number` Default: `0`

Milisecond delay before animation is added to element in view.

####removeAnimations
Type: `Boolean` Default: `true`

Whether animation classes set via the `data-animation-classes` attribute should removed when the animations complete.


####reverse
Type: `Boolean` Default: `false`

Once the element has left the top of the viewport (by the same offset), reset element.

####debug
Type: `Boolean` Default: `false`

Debugging information in console.

####onLoad
Type: `Boolean` Default: `true`

Whether to fire on DOMContentLoaded.

####onScroll
Type: `Boolean` Default: `true`

Whether to fire on scroll.

####onResize
Type: `Boolean` Default: `false`

Whether to fire on resize.

####callback
Type: `Function` Default: `function(){}`

Function to run once animation has completed (pass parameter to access the animated element).

##Methods
####init();
Initialises event listeners.
####kill();
Kills event listeners and resets options.
####render();
Adds/removes animations without the need for event listeners.

##Browser compatibility
Animate.js is supported in modern browsers from IE9 and above (i.e. browsers that support CSS animations). Due to discrepencies in support for `Element.classList`, I would recommend including the very good [classList polyfill](https://github.com/eligrey/classList.js/) before you include animate.js. I would also suggest using Modernizr to feature detect CSS animations/transitions and apply override styling for browsers that do not support those features.

Using SCSS, this may look like this:
```css
.animate {
    opacity: 0;
    .no-csstransitions &, .no-cssanimations &  {
        opacity: 1;
    }
}
```

##Development
To setup a local environment: clone this repo, navigate into it's directory in a terminal window and run the following command:
* ```npm install```

###Gulp tasks
* ```gulp dev```
* ```gulp test```
* ```gulp build```
