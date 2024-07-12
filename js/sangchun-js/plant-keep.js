const plantIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Add all plant IDs you want to fetch
const accessToken = "your-access-token-here"; // Replace with actual access token
const baseUrl = "http://3.34.241.109:8080/api/wateringanddate/";

async function fetchPlantData(plantId) {
  const response = await fetch(`${baseUrl}${plantId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    console.error(`Failed to fetch data for plant ${plantId}`);
    return null;
  }
  return response.json();
}

function updatePlantInfo(plantId, data) {
  if (!data) return;

  const nameElement = document.querySelector(`#plantname-${plantId} p`);
  const typeElement = document.querySelector(`#planttype-${plantId} p`);
  const imgElement = document.querySelector(`#plant-keep-${plantId}`);

  if (nameElement) nameElement.textContent = data.name || "Unknown";
  if (typeElement)
    typeElement.textContent =
      data.type === "TREE" ? "나무" : data.type === "FLOWER" ? "꽃" : "기타";
  if (imgElement) imgElement.src = data.imageUrl || "default-image.jpg";
}

plantIds.forEach(async (plantId) => {
  const data = await fetchPlantData(plantId);
  updatePlantInfo(plantId, data);
});
