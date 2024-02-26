document.addEventListener('DOMContentLoaded', () => {
    // Advertisement Banner
    const advertisements = [
        "Sale: 50% off all items!",
        "New collection launch this weekend.",
        "Sign up for our newsletter and get 10% off.",
        "Limited time offer: Buy one get one free!",
        "Exclusive online sale starts tomorrow!"
    ];

    let currentAdIndex = 0;

    function displayNextAdvertisement() {
        // Corrected to match the ID in the HTML
        const adBanner = document.getElementById('advertisement');
        adBanner.innerText = advertisements[currentAdIndex];
        currentAdIndex = (currentAdIndex + 1) % advertisements.length;
    }

    // Initially display the first advertisement
    displayNextAdvertisement();
    // Change the advertisement every 2 seconds
    setInterval(displayNextAdvertisement, 2000);

   // Images and Attributions
const imagesWithAttributions = [
    { src: "images/garden.jpg", attribution: "Image by vecstock on <a href='https://www.freepik.com'>Freepik</a>" },
    { src: "images/golden.jpg", attribution: "Image by wirestock on <a href='https://www.freepik.com'>Freepik</a>" },
    { src: "images/mountain-lake.jpg", attribution: "Image by wirestock on <a href='https://www.freepik.com'>Freepik</a>" },
    { src: "images/small-house.jpg", attribution: "Image by wirestock on <a href='https://www.freepik.com'>Freepik</a>" },
    { src: "images/snow.jpg", attribution: "Image by wirestock on <a href='https://www.freepik.com'>Freepik</a>" },
];


    const imagesSection = document.querySelector('.images');

    imagesWithAttributions.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = "Image"; // Simplified for clarity
        imagesSection.appendChild(imgElement);

        const attributionElement = document.createElement('p');
        attributionElement.innerHTML = image.attribution;
        imagesSection.appendChild(attributionElement);
    });
});
