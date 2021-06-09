

var uranus_images = [];
for (var i = 0; i < 133; i++) {
    uranus_images[i] = new Image();
    uranus_images[i].src = "img/story/uranus/"+i+".png";
}

function update_uranus() {
    var imgid = uranus_slider.value;
    console.log(imgid);
    document.getElementById("uranus").src = "img/story/uranus/"+imgid+".png";
}

// event listeneners for slider
uranus_slider.addEventListener('input', update_uranus, false);
