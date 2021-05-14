


var optics_canvas = document.getElementById('optics_canvas');
var optics_ctx = optics_canvas.getContext('2d');
var optics_img = new Image();

var atmosphere_canvas = document.getElementById('atmosphere_canvas');
var atmosphere_ctx = atmosphere_canvas.getContext('2d');
var atmosphere_img = new Image();

var detector_canvas = document.getElementById('detector_canvas');
var detector_ctx = detector_canvas.getContext('2d');
var detector_img = new Image();


// Create an image element


//When the page first loads - draw the initial demo image
window.onload = initialise();

function initialise() {
    //preload the demo image
    var initialImageURL = 'img/telescope/M101.jpg';
    draw(optics_img, initialImageURL, optics_canvas, optics_ctx, function(){blur(optics_img, optics_canvas, optics_ctx, 10);});
    draw(atmosphere_img, initialImageURL, atmosphere_canvas, atmosphere_ctx, function(){console.log('dummy function');});
    draw(detector_img, initialImageURL, detector_canvas, detector_ctx, function(){pixelate(detector_img, detector_canvas, detector_ctx, 10);});
}




//takes any image URL and creates an un pixelated image /4 the orginal size of the image
function draw (img, imgURL, canvas, ctx, initial_func) {

    console.log('called draw');

    // Specify the src to load the image
    img.crossOrigin="anonymous";
    img.src = imgURL;

    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        initial_func();
    };
}







function blur(img, canvas, ctx, radius) {


    /// draw original image to the scaled size

    console.log('start blur');

    ctx.drawImage(img,0,0);

    var data = ctx.getImageData(0,0,canvas.width,canvas.height);

    data = StackBlur.imageDataRGBA(data, 0, 0, img.width, img.height, radius);

    ctx.putImageData(data,0,0);
    ctx.drawImage(canvas,0,0);

}



//
function pixelate(img, canvas, ctx, blocks) {

    //dynamically adjust canvas size to the size of the uploaded image
    canvas.height = img.height;
    canvas.width = img.width;

    /// if in play mode use that value, else use slider value
    var size = blocks * 0.01,

    /// cache scaled width and height
    w = canvas.width * size,
    h = canvas.height * size;

    /// draw original image to the scaled size

    ctx.drawImage(img,0,0);


    var data = ctx.getImageData(0,0, canvas.width, canvas.height);


    ctx.putImageData(data,0,0);

    ctx.drawImage(canvas,0,0);

    ctx.drawImage(canvas,0,0, w, h);

    /// then draw that scaled image thumb back to fill canvas
    /// As smoothing is off the result will be pixelated
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    // //
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    // ctx.drawImage(canvas, 0, 0, w, h);

}














function optics() {
    var radius = Number(optics_slider.value);
    console.log('triggered optics')
    blur(optics_img, optics_canvas, optics_ctx, radius)
}

// event listeneners for slider
optics_slider.addEventListener('change', optics, false);



function atmosphere() {
    if (atmosphere_switch.checked == true){
      blur(atmosphere_img, atmosphere_canvas, atmosphere_ctx, 20)
    } else {
      blur(atmosphere_img, atmosphere_canvas, atmosphere_ctx, 1)
    }
}

// event listeneners for slider
atmosphere_switch.addEventListener('change', atmosphere, false);




function detector() {
    var blocks = Number(detector_slider.value);
    console.log('triggered detector')
    pixelate(detector_img, detector_canvas, detector_ctx, blocks)
}

// event listeneners for slider
detector_slider.addEventListener('change', detector, false);
