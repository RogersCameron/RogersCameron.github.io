const texts = ["Game Pulse", "ゲームパルス", "Spiel Puls", "게임 펄스"]; // Texts in English, Japanese, German, and Korean
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

    // Fetch and display games
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            const gamesContainer = document.getElementById('gamesContainer');

            // Clear existing content
            gamesContainer.innerHTML = '';

            // Loop through each game in the JSON and create HTML content
            data.games.forEach(game => {
                const gameElement = document.createElement('article');
                gameElement.innerHTML = `
                    <a href="${game.url}">
                        <h3>${game.title}</h3>
                        <img src="${game.img_name}" alt="Game Image">
                    </a>
                    <p>${game.description}</p>
                    <p>Genre: ${game.genre}<p>
                    <p>Platforms: ${game.platforms}</p>
                    
                `;
                gamesContainer.appendChild(gameElement);
            });
        })
        .catch(error => console.error('Error loading game data:', error));

        fetch('stories.json')
        .then(response => response.json())
        .then(data => {
            const storiesContainer = document.getElementById('storiesContainer');

            // Loop through each story and create HTML content
            data.stories.forEach(story => {
                const storyElement = document.createElement('article');
                storyElement.innerHTML = `
                    <a href="${story.link}">
                        <h3>${story.title}</h3>
                        <img src="${story.img_name}" alt="Story Image">
                    </a>
                    <p>${story.description}</p>
                    
                `;
                storiesContainer.appendChild(storyElement);
            });
        })
        .catch(error => console.error('Error loading story data:', error));
});
