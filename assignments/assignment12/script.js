const getHouses = async () => {
  const url = "https://portiaportia.github.io/json/house-plans.json";
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const showHouses = async () => {
  let houses = await getHouses();
  console.log(houses);
  let houseContainer = document.getElementById("house-container");
  houses.forEach((house) => {
    houseContainer.append(getHouseItem(house));
  });
};

const getHouseItem = (house) => {
  let section = document.createElement("section");
  section.className = "house-item";

  let img = document.createElement("img"); // Correct variable name here
  img.src = `https://portiaportia.github.io/json/images/house-plans/${house.main_image}`; // Use main_image for src
  img.alt = house.name;
  img.className = "house-img";

  let details = document.createElement("div");
  details.className = "house-details";

  let name = document.createElement("h3");
  name.innerText = house.name;

  // Add bedrooms and bathrooms details
  let size = document.createElement("p");
  size.innerText = `Size: ${house.size} sqft`;

  let bedrooms = document.createElement("p");
  bedrooms.innerText = `Bedrooms: ${house.bedrooms}`;

  let bathrooms = document.createElement("p");
  bathrooms.innerText = `Bathrooms: ${house.bathrooms}`;

  details.append(name, size, bedrooms, bathrooms); // Append new elements
  section.append(img, details);

  return section;
};

window.onload = showHouses;
