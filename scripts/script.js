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
function showCategories(data) {
  const categoriesContainer = document.getElementById("pet_category_section");
  data.forEach((item) => {
    const div = document.createElement("div");
    div.id = `${item.id}`;
    div.classList.add("category");
    // div.classList.add("selectedCategory");
    div.innerHTML = `
    <img src="${item.category_icon}" alt="" />
            <h3>${item.category}</h3>
    `;
    categoriesContainer.appendChild(div);
  });
}
loadCategories();
