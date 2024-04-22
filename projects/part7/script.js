const texts = ["Game Pulse", "ゲームパルス", "Spiel Puls","게임 펄스"]; // Texts in English, Japanese, and German
const logo = document.getElementById("typing-logo");
let currentIndex = 0;

function updateText() {
    logo.textContent = texts[currentIndex];
    // Trick to re-trigger the animation
    logo.style.animation = 'none';
    logo.offsetHeight; // Trigger reflow
    logo.style.animation = '';

    currentIndex = (currentIndex + 1) % texts.length; // Move to the next index or loop back to 0
    setTimeout(updateText, 4500); // Wait for the current animation + pause, then update text
}

updateText(); // Initial call to start the cycle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
document.addEventListener('DOMContentLoaded', (event) => {
    let slides = document.querySelectorAll('.slide');
    let index = 0;

    function cycleSlides() {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        
        slides[index].classList.add('active');
        index = (index + 1) % slides.length; // Loop back to the first slide
    }

    setInterval(cycleSlides, 3000); // Change slide every 3 seconds
});
