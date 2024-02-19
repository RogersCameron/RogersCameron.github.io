document.addEventListener('DOMContentLoaded', () => {
    const bounceLink = document.getElementById('bounceLink');
    const commandTitle = document.getElementById('commandTitle');
    const innerBox1 = document.querySelector('#inner-box1');
    const innerBox2 = document.querySelector('#inner-box2');
    const descriptionDiv = document.querySelector('.description'); 

    let isBouncing = false;
    let direction = 1;
    let position = 0;

    const yogaImages = [
        { src: 'images/yoga1.jpg', desc: 'arm up pose' },
        { src: 'images/yoga2.jpg', desc: 'downward pose' },
        { src: 'images/yoga3.jpg', desc: 'ballerina pose' },
        { src: 'images/yoga4.jpg', desc: 'siting pose' },
        { src: 'images/yoga5.jpg', desc: 'arm cross pose' },
        { src: 'images/yoga6.jpg', desc: 'leg pose' },
        { src: 'images/yoga7.jpg', desc: 'leg pose 2' },
        { src: 'images/yoga8.jpg', desc: 'wall pose' },
        
    ];

    const bounce = () => {
        if (!isBouncing) return;
        const innerBoxHeight = innerBox1.clientHeight;
        const imgHeight = innerBox1.querySelector('img').clientHeight;

        if (position <= 0) {
            direction = 1;
        } else if (position >= innerBoxHeight - imgHeight) {
            direction = -1;
        }
        position += direction * 5;

        innerBox1.querySelector('img').style.transform = `translateY(${position}px)`;

        requestAnimationFrame(bounce);
    };

    bounceLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link action
        isBouncing = !isBouncing;
        bounceLink.textContent = isBouncing ? 'Stop Bounce' : 'Start Bounce';
        if (isBouncing) bounce();
    });


    document.getElementById('linkExercise1').addEventListener('click', (e) => {
        e.preventDefault();
        innerBox1.style.display = 'block';
        innerBox2.style.display = 'none';
        commandTitle.textContent = 'Bounce Ball';
        bounceButton.style.display = 'block';
        
    });
    document.getElementById('linkExercise2').addEventListener('click', (e) => {
        e.preventDefault();
        innerBox1.style.display = 'none';
        
        innerBox2.style.display = 'flex'; // Use flex to organize containers vertically
        innerBox2.flexDirection = 'column';
        commandTitle.textContent = 'Yoga Fun';
        innerBox2.innerHTML = ''; // Clear the container
    
        yogaImages.forEach((image) => {
            const container = document.createElement('div');
            container.className = 'yoga-image-container';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.marginBottom = '10px';
    
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = 'Yoga pose';
            img.style.width = '100px'; // Adjust based on your preference
            img.style.cursor = 'pointer';
    
            const desc = document.createElement('div');
            desc.textContent = image.desc;
            desc.className = 'image-description';
            desc.style.display = 'none'; // Initially hidden
            desc.style.marginLeft = '20px';
    
            img.addEventListener('click', () => {
                // Toggle the display of the description
                desc.style.display = desc.style.display === 'none' ? 'block' : 'none';
            });
    
            container.appendChild(img);
            container.appendChild(desc);
            innerBox2.appendChild(container);
        });
    });
    
});
