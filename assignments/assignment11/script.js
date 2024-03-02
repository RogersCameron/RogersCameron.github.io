document.addEventListener("DOMContentLoaded", function () {
  class Tree {
    constructor(title, src, alt, growthRate, height, habitat) {
      this.title = title;
      this.src = src;
      this.alt = alt;
      this.growthRate = growthRate;
      this.height = height;
      this.habitat = habitat;
    }

    getSection() {
      const img = document.createElement("img");
      img.className = "tree-image";
      img.src = this.src;
      img.alt = this.alt;
      img.style.border = "2px solid #ccc";

      const title = document.createElement("h3");
      title.textContent = this.title;

      const treeBox = document.createElement("div");
      treeBox.className = "tree-box";
      treeBox.appendChild(title);
      treeBox.appendChild(img);

      return treeBox;
    }

    getExpandedSection() {
      const infoBox = document.createElement("div");
      infoBox.className = "info-box";
      infoBox.innerHTML = `
        <img src="${this.src}" alt="${this.alt}" style="width: 100px; height: auto;">
        <h3>${this.title}</h3>
        <p>Growth Rate: ${this.growthRate}</p>
        <p>Height: ${this.height}</p>
        <p>Habitat: ${this.habitat}</p>
        <button class="close-btn">Close</button>
      `;
      return infoBox;
    }
  }

  const trees = [
    new Tree(
      "Beech Tree",
      "images/Beechtree.jpeg",
      "Beech",
      "Medium",
      "50 to 70 feet",
      "Forests",
    ),
    new Tree(
      "Blackcherry Tree",
      "images/BlackcherryTree.jpeg",
      "Blackcherry",
      "Fast",
      "50 to 80 feet",
      "Woodlands",
    ),
    new Tree(
      "Magnolia Tree",
      "images/MagnoliaTree.webp",
      "Magnolia",
      "Slow",
      "20 to 80 feet",
      "Gardens and parks",
    ),
    new Tree(
      "Willow Tree",
      "images/Willowtrees.jpeg",
      "Willow",
      "Rapid",
      "35 to 75 feet",
      "Wetlands",
    ),
  ];

  const gallery = document.getElementById("treeGallery");

  trees.forEach((tree) => {
    const treeBox = tree.getSection();
    gallery.appendChild(treeBox);

    treeBox.addEventListener("click", () => {
      const existingBox = document.querySelector(".info-box");
      if (existingBox) {
        document.body.removeChild(existingBox);
      }
      const infoBox = tree.getExpandedSection();
      document.body.appendChild(infoBox);
      infoBox.querySelector(".close-btn").addEventListener("click", () => {
        document.body.removeChild(infoBox);
      });
    });
  });
});
