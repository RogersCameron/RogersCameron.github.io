 // Toggle visibility and functionality based on Exercise links
 document.getElementById("linkExercise1").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("textbox").style.display = "block";
    document.getElementById("squareRangeSlider").style.display = "none";
    document.getElementById("commandTitle").textContent = "Enter Command";
    // Disconnect slider from image control
    document.getElementById("squareRangeSlider").removeEventListener("input", updateImageBySlider);
});

document.getElementById("linkExercise2").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("textbox").style.display = "none";
    document.getElementById("squareRangeSlider").style.display = "block";
    document.getElementById("commandTitle").textContent = "Yoga Slide";
    // Connect slider to image control
    document.getElementById("squareRangeSlider").addEventListener("input", updateImageBySlider);
    // Update image immediately in case the slider was already moved
    updateImageBySlider();
});
const updateImageBySlider = () => {
    const sliderValue = document.getElementById("squareRangeSlider").value;
    const img = document.getElementById("image");
    let imgSrc;

    if (sliderValue <= 12) {
        imgSrc = "images/yoga1.jpg";
    } else if (sliderValue <= 25) {
        imgSrc = "images/yoga2.jpg";
    } else if (sliderValue <= 37) {
        imgSrc = "images/yoga3.jpg";
    } else if (sliderValue <= 50) {
        imgSrc = "images/yoga4.jpg";
    } else if (sliderValue <= 62) {
        imgSrc = "images/yoga5.jpg";
    } else if (sliderValue <= 75) {
        imgSrc = "images/yoga6.jpg";
    } else if (sliderValue <= 87) {
        imgSrc = "images/yoga7.jpg";
    } else {
        imgSrc = "images/yoga8.jpg";
    }


    img.src = imgSrc;
};

// Define the changeImage function
const changeImage = () => {
    const text = document.getElementById("textbox").value.toLowerCase().trim();
    const img = document.getElementById("image");

    // Use the last character of the input text to determine the image
    const lastChar = text.slice(-1);

    let imgSrc = "images/original.jpg"; // Default path, will be used if no conditions match

    // Check the last character and update imgSrc accordingly
    switch (lastChar) {
        case "b":
            imgSrc = "images/read.jpg";
            break;
        case "c":
            imgSrc = "images/clown.jpg";
            break;
        case "p":
            imgSrc = "images/birthday.jpg";
            break;
        case "r":
            imgSrc = "images/rain.jpg";
            break;
        case "s":
            imgSrc = "images/shovel.jpg";
            break;
        case "w":
            imgSrc = "images/work.jpg";
            break;
        default:
            imgSrc = "images/original.jpg"; // Ensure there's a default case that resets to original.jpg
    }

    // Update the image source based on imgSrc
    img.src = imgSrc;
};

// Attach the changeImage function as an event listener to the textbox for the keyup event
document.getElementById("textbox").addEventListener("keyup", changeImage);

