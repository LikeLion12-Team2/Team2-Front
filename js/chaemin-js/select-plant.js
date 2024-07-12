document.addEventListener("DOMContentLoaded", () => {
  const treeElement = document.getElementById("select-tree");
  const flowerElement = document.getElementById("select-flower");

  treeElement.addEventListener("click", () => {
    localStorage.setItem("plantType", "TREE");
  });

  flowerElement.addEventListener("click", () => {
    localStorage.setItem("plantType", "FLOWER");
  });
});
