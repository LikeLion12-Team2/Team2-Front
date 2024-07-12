function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve plantId and accessToken from local storage

  const plantId = JSON.parse(localStorage.getItem("plantId"));
  const accessToken = getCookie("accessToken");
  const userId = localStorage.getItem("userId"); // Assuming userId is stored in local storage

  if (plantId && accessToken && userId) {
    const url = `http://3.34.241.109:8080/api/plant/allPlant/${userId}`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        displayPlants(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } else {
    console.error("Required data not found in local storage or cookies");
  }
});

function displayPlants(plants) {
  const plantContainer = document.querySelector(".container"); // Select plant container

  let keepIndex = 1; // Initialize plant-keep number
  let middleIndex = 1; // Initialize keep-middle number

  plants.forEach((plant) => {
    // Check if the plant status is "Complete"
    if (plant.status === "Complete") {
      const plantDiv = document.createElement("div");
      plantDiv.className = `keep-middle${middleIndex}`; // Set middle number

      let imageUrl;
      if (plant.type === "FLOWER") {
        imageUrl = "/sangchun-html/sangchun-img/Group 83.png"; // Flower image path
      } else if (plant.type === "TREE") {
        imageUrl = "/sangchun-html/sangchun-img/noto_deciduous-tree.png"; // Tree image path
      }

      plantDiv.innerHTML = `
        <a href="plant-keep${keepIndex}.html">
          <img src="${imageUrl}" alt="${plant.name}" />
        </a>
        <div class="keep-plantname">
          <p>${plant.name}</p>
        </div>
        <div class="keep-planttype">
          <p>${plant.type}</p>
        </div>
      `;

      plantContainer.appendChild(plantDiv); // Append created plant DIV

      keepIndex++; // Increment plant-keep number
      if (middleIndex < 4) {
        // Maximum of 4 for keep-middle
        middleIndex++;
      }
    }
  });
}
console.log(localStorage.getItem("plantId"));
