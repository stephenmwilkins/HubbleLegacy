



var combined_canvas = document.getElementById('combined_canvas');
var combined_ctx = combined_canvas.getContext('2d');
var combined_img = new Image();


// Create an image element


//When the page first loads - draw the initial demo image
window.onload = initialise();

function initialise() {
    //preload the demo image
    var initialImageURL = 'img/telescope/M101.jpg';
    draw(combined_img, initialImageURL, combined_canvas, combined_ctx, function(){update();});
}




//takes any image URL and creates an un pixelated image /4 the orginal size of the image
function draw (img, imgURL, canvas, ctx, initial_func) {

    // Specify the src to load the image
    img.crossOrigin="anonymous";
    img.src = imgURL;
    console.log('here');
    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        initial_func();
    };
}



// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}




function update() {

    console.log('update');

    var radius = Number(combined_optics_slider.value);
    var blocks = Number(combined_detector_slider.value);
    var noise_val = Number(combined_noise_slider.value);
    if (combined_atmosphere_switch.checked == true){radius += 10;}


    ctx = combined_ctx
    canvas = combined_canvas
    img = combined_img



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

    data = StackBlur.imageDataRGBA(data, 0, 0, img.width, img.height, radius);


    ctx.putImageData(data,0,0);

    ctx.drawImage(canvas,0,0);

    ctx.drawImage(canvas,0,0, w, h);

    pdata = ctx.getImageData(0,0,w,h);

    /// then draw that scaled image thumb back to fill canvas
    /// As smoothing is off the result will be pixelated
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    // //
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);

    // ctx.drawImage(canvas, 0, 0, w, h);

    /// get data
    // var data = ctx.getImageData(0,0,canvas.width,canvas.height);

    var data_array = new Uint8ClampedArray(pdata.data);

    for (let i = 0; i < data_array.length; i += 4) {

      data_array[i + 0] = data_array[i + 0] + Math.abs(noise_val*randn_bm());
      data_array[i + 1] = data_array[i + 1] + Math.abs(noise_val*randn_bm());
      data_array[i + 2] = data_array[i + 2] + Math.abs(noise_val*randn_bm());

    }

    ndata = new ImageData(data_array, pdata.width, pdata.height);

    ctx.putImageData(ndata,0,0);

    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);



}


combined_optics_slider.addEventListener('change', update, false);
combined_atmosphere_switch.addEventListener('change', update, false);
combined_detector_slider.addEventListener('change', update, false);
combined_noise_slider.addEventListener('change', update, false);
