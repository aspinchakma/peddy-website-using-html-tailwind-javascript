import {
  getDataUsingId,
  selectedCategory,
  selectedCategoryLoadData,
  selectedPetPicture,
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

// liked items
document.getElementById("pet_container").addEventListener("click", (e) => {
  if (e.target.classList.contains("like")) {
    const srcLink =
      e.target.parentNode.parentNode.parentNode.children[0].children[0].getAttribute(
        "src"
      );
    selectedPetPicture(srcLink);
  }
});

document.getElementById("pet_container").addEventListener("click", (e) => {
  if (e.target.classList.contains("details_button")) {
    const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id;
    getDataUsingId(itemId);
    my_modal_4.showModal();
  }
});
document.getElementById("closed_modal_button").addEventListener("click", () => {
  my_modal_4.close();

  // Reset inner html on modal
  document.getElementById("modal_content_container").innerHTML = "";
});
// adopted button
document.getElementById("pet_container").addEventListener("click", (e) => {
  console.log();
  if (e.target.classList.contains("adopt")) {
    e.target.classList.add("adopted");
    if (e.target.innerText != "Adopted") {
      document.getElementById("Adopted").showModal();
    }
    e.target.innerText = "Adopted";
  }
});

document.getElementById("count_down_button").addEventListener("click", (e) => {
  document.getElementById("Adopted").close();
});
