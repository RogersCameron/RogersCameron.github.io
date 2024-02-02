window.onload = function() {
    document.getElementById('squareRangeSlider').oninput = function() {
        var rotationDegree = this.value * 3.6; 
        var image = document.getElementById('rotatingImage');
        image.style.transform = 'rotate(' + rotationDegree + 'deg)';
    };

};
const showStar = () => {
    const starElement = document.getElementById("star");
    if (starElement) {
        starElement.classList.remove("hidden");
    }
};

function changeImage(){
    var img = document.getElementById("firstImage");
    img.src = "https://place-hold.it/200x200/brown";
}
