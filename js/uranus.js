





function update_uranus() {
    var imgid = uranus_slider.value;
    console.log(imgid);
    document.getElementById("uranus").src = "img/story/uranus/"+imgid+".png";
}

// event listeneners for slider
uranus_slider.addEventListener('input', update_uranus, false);
