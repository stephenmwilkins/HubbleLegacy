

// Standard Normal variate using Box-Muller transform.
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}


var noise_canvas = document.getElementById('noise_canvas');
var noise_ctx = noise_canvas.getContext('2d');


// Create an image element
var noise_img = new Image();

//When the page first loads - draw the initial demo image
window.onload = noise_firstDraw();

function noise_firstDraw() {
    //preload the demo image
    // var initialImageURL = 'img/telescope/XDF_gr.png';
    var initialImageURL = 'img/telescope/M101.jpg';
    console.log('here');
    noise_draw(initialImageURL);

}

//takes any image URL and creates an un pixelated image /4 the orginal size of the image
function noise_draw (imgURL) {
    // Specify the src to load the image
    noise_img.crossOrigin="anonymous";
    noise_img.src = imgURL;

    noise_img.onload = function() {
        noise_canvas.height = noise_img.height;
        noise_canvas.width = noise_img.width;
        noise_ctx.drawImage(noise_img, 0, 0, noise_canvas.width, noise_canvas.height);
        add_noise();
    };




}

//
function add_noise() {

    var noise_val = Number(noise_slider.value);

    console.log(noise_val);
    console.log(randn_bm());

    /// draw original image
    noise_ctx.drawImage(noise_img,0,0);

    /// get data
    var data = noise_ctx.getImageData(0,0,noise_canvas.width,noise_canvas.height);

    var data_array = new Uint8ClampedArray(data.data);

    for (let i = 0; i < data_array.length; i += 4) {

      noise = Math.abs(noise_val*randn_bm());

      data_array[i + 0] = data_array[i + 0] + noise;
      data_array[i + 1] = data_array[i + 1] + noise;
      data_array[i + 2] = data_array[i + 2] + noise;

    }

    console.log('here');

    ndata = new ImageData(data_array, data.width, data.height);

    noise_ctx.putImageData(ndata,0,0);


}




noise_slider = document.getElementById('noise_slider')

// event listeneners for slider
noise_slider.addEventListener('change', add_noise, false);
