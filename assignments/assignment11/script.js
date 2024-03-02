document.addEventListener("DOMContentLoaded", function () {
  const trees = [
    {
      title: "Beech Tree",
      src: "images/Beechtree.jpeg",
      alt: "Beech",
      growthRate: "Medium",
      height: "50 to 70 feet",
      habitat: "Forests",
    },
    {
      title: "Blackcherry Tree",
      src: "images/BlackcherryTree.jpeg",
      alt: "Blackcherry",
      growthRate: "Fast",
      height: "50 to 80 feet",
      habitat: "Woodlands",
    },
    {
      title: "Magnolia Tree",
      src: "images/MagnoliaTree.webp",
      alt: "Magnolia",
      growthRate: "Slow",
      height: "20 to 80 feet",
      habitat: "Gardens and parks",
    },
    {
      title: "Willow Tree",
      src: "images/Willowtrees.jpeg",
      alt: "Willow",
      growthRate: "Rapid",
      height: "35 to 75 feet",
      habitat: "Wetlands",
    },
  ];

  const gallery = document.getElementById("treeGallery");

  trees.forEach((tree) => {
    const treeBox = document.createElement("div");
    treeBox.className = "tree-box";
    const title = document.createElement("h3");
    title.textContent = tree.title;
    treeBox.appendChild(title);
    const img = document.createElement("img");
    img.className = "tree-image";
    img.src = tree.src;
    img.alt = tree.alt;
    img.style.border = "2px solid #ccc"; // Add a border directly via JS

    // Event listener for displaying the pop-up
    img.addEventListener("click", () => {
      // Remove existing info box if present
      const existingBox = document.querySelector(".info-box");
      if (existingBox) {
        document.body.removeChild(existingBox);
      }

      const infoBox = document.createElement("div");
      infoBox.className = "info-box";
      infoBox.innerHTML = `
        <img src="${tree.src}" alt="${tree.alt}" style="width: 100px; height: auto;">
        <h3>${tree.title}</h3>
        <p>Growth Rate: ${tree.growthRate}</p>
        <p>Height: ${tree.height}</p>
        <p>Habitat: ${tree.habitat}</p>
        <button class="close-btn">Close</button>
      `;
      document.body.appendChild(infoBox);

      // Close the info box when the close button is clicked
      infoBox.querySelector(".close-btn").addEventListener("click", () => {
        document.body.removeChild(infoBox);
      });
    });

    treeBox.appendChild(img);
    gallery.appendChild(treeBox);
  });
});
