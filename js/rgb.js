
$(function () {
  $(".thumb").click(function() {
    $(".thumb").removeClass("thumb_selected");
    $(this).addClass("thumb_selected");
  });
});

function loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      image_selection();
    }
  };
  xmlhttp.open("GET", "xml/rgb.xml", true);
  xmlhttp.send();
}

function image_selection() {
  filenames = xmlDoc.getElementsByTagName("filename");
  var image_name = filenames[0].childNodes[0].nodeValue;
  for (i = 0; i< filenames.length; i++) {
    var elem = document.createElement("img");

    elem.id = filenames[i].childNodes[0].nodeValue
    elem.src = "img/rgb/thumbs/"+elem.id+".jpg";
    elem.className = 'thumb';
    elem.href = '#make_rgb'
    // elem.style.filter = 'grayscale(80%)';
    elem.onclick = function(){
      scrollto();
      image.src = "img/rgb/images/"+this.id+".jpg"; init();
    };
    document.getElementById("thumb_container").appendChild(elem);
  }
}



const Rcanvas = document.getElementById("R");
const Gcanvas = document.getElementById("G");
const Bcanvas = document.getElementById("B");
const RGBcanvas = document.getElementById("RGB");

const Rslider = document.getElementById("rOffset");
const Gslider = document.getElementById("gOffset");
const Bslider = document.getElementById("bOffset");





// Create an image element
var image = new Image();
image.crossOrigin = "anonymous";
image.src = "img/rgb/images/"+this.id+".jpg";


// If the image is completely loaded before this script executes, call init().
if (image.complete) init();

// In case it is not loaded yet, we listen to its "load" event and call init() when it fires.
image.addEventListener("load", init);


function init() {

  // image.src = "img/"+image_name+".jpg";

  const RGBctx = RGBcanvas.getContext("2d");
  const Rctx = Rcanvas.getContext("2d");
  const Gctx = Gcanvas.getContext("2d");
  const Bctx = Bcanvas.getContext("2d");

  const width = 300;
  const height = 300;

  RGBcanvas.width = width;
  RGBcanvas.height = height;
  Rcanvas.width = width;
  Rcanvas.height = height;
  Gcanvas.width = width;
  Gcanvas.height = height;
  Bcanvas.width = width;
  Bcanvas.height = height;

  RGBctx.drawImage(image, 0, 0, width, height);



  Rslider.addEventListener("change", updateRGB);
  Gslider.addEventListener("change", updateRGB);
  Bslider.addEventListener("change", updateRGB);

  const imageData = RGBctx.getImageData(0, 0, width, height);

  updateRGB();


  function updateRGB() {

    var Rscale = Number(Rslider.value);
    var Gscale = Number(Gslider.value);
    var Bscale = Number(Bslider.value);

    var Rdata = new Uint8ClampedArray(imageData.data);
    var Gdata = new Uint8ClampedArray(imageData.data);
    var Bdata = new Uint8ClampedArray(imageData.data);

    for (let i = 0; i < imageData.data.length; i += 4) {

      Rdata[i + 0] = Rscale * imageData.data[i + 0];
      Rdata[i + 1] = Rscale * imageData.data[i + 0];
      Rdata[i + 2] = Rscale * imageData.data[i + 0];

      Gdata[i + 0] = Gscale * imageData.data[i + 1];
      Gdata[i + 1] = Gscale * imageData.data[i + 1];
      Gdata[i + 2] = Gscale * imageData.data[i + 1];

      Bdata[i + 0] = Bscale * imageData.data[i + 2];
      Bdata[i + 1] = Bscale * imageData.data[i + 2];
      Bdata[i + 2] = Bscale * imageData.data[i + 2];
    }

    R = new ImageData(Rdata, imageData.width, imageData.height)
    G = new ImageData(Gdata, imageData.width, imageData.height)
    B = new ImageData(Bdata, imageData.width, imageData.height)

    Rctx.putImageData(R, 0, 0);
    Gctx.putImageData(G, 0, 0);
    Bctx.putImageData(B, 0, 0);

    var RGBdata = new Uint8ClampedArray(imageData.data);

    for (let i = 0; i < imageData.data.length; i += 4) {
      RGBdata[i + 0] = Rscale * RGBdata[i + 0];
      RGBdata[i + 1] = Gscale * RGBdata[i + 1];
      RGBdata[i + 2] = Bscale * RGBdata[i + 2];
    }

    RGB = new ImageData(RGBdata, imageData.width, imageData.height);
    RGBctx.putImageData(RGB, 0, 0);

  }



var download = document.getElementById("download");

download.addEventListener('click', function(ev) {
    download.href = RGBcanvas.toDataURL();
    download.download = "my_"+image_name+".png";
}, false);


}
