import {
  selectedCategory,
  selectedCategoryLoadData,
} from "../scripts/utilities.js";
const categoriesApi = `https://openapi.programming-hero.com/api/peddy/categories`;

async function loadCategories() {
  try {
    const res = await fetch(categoriesApi);
    if (!res.ok) {
      throw new Error("Server Problem");
    }
    const data = await res.json();
    showCategories(data.categories);
  } catch (error) {}
}
const categoriesContainer = document.getElementById("pet_category_section");
function showCategories(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.id = `${item.category}`;
    div.classList.add("category");
    // div.classList.add("selectedCategory");
    div.innerHTML = `
    <img src="${item.category_icon}" alt="" />
            <h3>${item.category}</h3>
    `;
    categoriesContainer.appendChild(div);
  });
}

// Display All Data
const allDataAPI = `https://openapi.programming-hero.com/api/peddy/pets`;
selectedCategoryLoadData(allDataAPI, "pet_container");

// Clicked Categories
categoriesContainer.addEventListener("click", (e) => {
  const targetId = e.target.closest("div").id;
  if (targetId === "pet_category_section") {
    return;
  }
  const targetDiv = e.target.closest("div");
  const children = e.target.closest("div").parentNode.children;
  // console.log(e.target.closest("div").parentNode.children);
  selectedCategory(children, targetDiv);

  //  categorywise data
  const url = `https://openapi.programming-hero.com/api/peddy/category/${targetId}`;
  selectedCategoryLoadData(url, "pet_container");
  // console.log(url);
});

loadCategories();
