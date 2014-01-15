/**

 select a random soound-effect from don-martin list
 https://raw.github.com/cjwinchester/cjwinchester.github.io/master/sandbox/martin/martin.js
 google-search for an image - https://github.com/dariusk/node-google-images

 how about... this returns the following object:

 { sound: 'a sfx',
   description: 'the description',
   image: 'base64-encoded image'
 }

 issue: image type?
 issue: can't base64-encode in browser. no matter what:

 http://stackoverflow.com/questions/6544821/how-to-access-the-image-at-a-jpeg-url-to-a-base64-encoding-javascript
   '[Converting a URL into a base64-encoded image in the browser]
    won't be possible because of same-origin policy - images that
    you load from other sites might contain sensitive data, you
    are only allowed to show them to the user but not to read out
    their data. You might be able to do it if that other site
    cooperates (via CORS) but I doubt that you want to rely on it.
    So you won't be able to implement this on the client side -
    you should send the URL to your server and the server should
    then download the image.'

 https://gist.github.com/jfsiii/804225



 the more I think about it... the more I don't need this to be a node.js thing, despite setting the project up that way
 my plan is to use this in the browser.
 yes, yes -- browserify
 but why bother with node in the first place?

 other than... I'm used to it, right now?

 aaand, becuase of base64 discoveries (can't do in browser)
 mmmmmaybe this should be a heroku thing?
 time to try that out.

 **/



var sfx = require('./sfx.js').don_martin,
    gim = require('google-images'),
    _ = require('underscore');


// hunh. here I am, doing it again. hrm.
Array.prototype.pick = function() {
    return this[Math.floor(Math.random()*this.length)];
};

// or... use https://github.com/dariusk/outslide/blob/master/index.html

// I heard of google-images from a dariusk repo, seems to be used @ https://github.com/dariusk/ao3/blob/c2f24379ca177dc02c043ff026470c208a83665b/index.sj


var martin = sfx.pick();

var blob = { sound: martin.sound, description: martin.description };

var processResults = function(err, images) {

    var img = images.pick();

    blob.image = img.url;

    console.log(blob);

};


gim.search(martin.description, processResults);
