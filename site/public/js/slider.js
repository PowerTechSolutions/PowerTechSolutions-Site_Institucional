let count = 1;
document.getElementById("radio1").cheked = true;

setInterval(function() {
    nextImage();
}, 2000)

function nextImage() {
    count++;
    if (count >5) {
        count = 1;
    }

    document.getElementById("radio" + count).cheked = true;

}

const imgs =  document.getElementById("img");
const img = document.querySelectorAll("#img img")

let idx = 0;

function carrosel() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }

    imgs.style.transform = `translateX(${-idx*500} px)`
}

setInterval(carrosel,1800);