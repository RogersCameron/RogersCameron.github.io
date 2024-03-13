async function getHouses() {
  const url = "https://portiaportia.github.io/json/house-plans.json";
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

function showHouses(houses) {
  let houseContainer = document.getElementById("house-container");
  houses.forEach((house) => {
    houseContainer.appendChild(getHouseItem(house));
  });
}

function getHouseItem(house) {
  let section = document.createElement("section");
  section.className = "house-item";

  let img = document.createElement("img");
  img.src = `https://portiaportia.github.io/json/images/house-plans/${house.main_image}`;
  img.alt = house.name;
  img.className = "main-img";

  let details = document.createElement("div");
  details.className = "house-details";

  let name = document.createElement("h3");
  name.innerText = house.name;

  let size = document.createElement("p");
  size.innerText = `Size: ${house.size} sqft`;

  let bedrooms = document.createElement("p");
  bedrooms.innerText = `Bedrooms: ${house.bedrooms}`;

  details.append(name, size, bedrooms);
  section.append(img, details);

  // Check if the house has floor plans
  if (house.floor_plans && house.floor_plans.length > 0) {
    let floorPlanContainer = document.createElement("div");
    floorPlanContainer.className = "floor-plan-container";

    let floorPlanName = document.createElement("p"); // Create element for floor plan name
    floorPlanName.innerText = house.floor_plans[0].name; // Display the name of the first floor plan
    floorPlanContainer.appendChild(floorPlanName);

    let index = 0; // Start with the first floor plan
    let floorPlanImg = document.createElement("img");
    floorPlanImg.src = `https://portiaportia.github.io/json/images/house-plans/${house.floor_plans[index].image}`;
    floorPlanImg.alt = house.floor_plans[index].name;
    floorPlanImg.className = "floor-plan-img";
    floorPlanContainer.appendChild(floorPlanImg);

    // Function to rotate through floor plans
    setInterval(() => {
      index = (index + 1) % house.floor_plans.length;
      floorPlanName.innerText = house.floor_plans[index].name; // Update the floor plan name
      floorPlanImg.src = `https://portiaportia.github.io/json/images/house-plans/${house.floor_plans[index].image}`;
      floorPlanImg.alt = house.floor_plans[index].name;
    }, 10000); // Change floor plan every 10 seconds

    section.appendChild(floorPlanContainer);
  }

  return section;
}

window.onload = async function () {
  try {
    const houses = await getHouses();
    showHouses(houses);
  } catch (error) {
    console.error(error);
  }
};
