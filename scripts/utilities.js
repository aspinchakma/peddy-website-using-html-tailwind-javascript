export function selectedCategory(data, selected) {
  for (let category of data) {
    category.classList.remove("selectedCategory");
  }
  selected.classList.add("selectedCategory");
}
const loadingSpinner = document.getElementById("loading_spinner");
export async function selectedCategoryLoadData(url, container) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.pets === undefined) {
      showData(data.data, container);
      return;
    }

    showData(data.pets, container);
  } catch (error) {}
}
export let showingDataUI = null;
function showData(data, container) {
  // accessing data for sorting
  showingDataUI = data;
  if (data.length !== 0 || data.length === undefined);
  const petContainer = document.getElementById(container);
  petContainer.innerHTML = "";
  data.forEach((pet) => {
    const div = document.createElement("div");
    div.id = `${pet.petId}`;
    div.innerHTML = `
      <div class="card bg-base-100 w-full shadow-sm pet p-5">
            <figure>
              <img
                src="${pet.image}"
                alt="Shoes"
                class="rounded-xl h-[200px] object-cover"
              />
            </figure>
            <div>
              <h2 class="card-title text-2xl my-2">${pet.pet_name}</h2>
              <p>
                <i class="fa-solid fa-dna"></i
                ><span>Breed: ${pet.breed ? pet.breed : "conceal"}</span>
              </p>
              <p>
                <i class="fa-regular fa-calendar"></i> <span>Birth: ${
                  pet.date_of_birth ? pet.date_of_birth : "Private"
                }</span>
              </p>
              <p>
                <i class="fa-solid fa-mercury"></i> <span>Gender: ${
                  pet.gender ? pet.gender : "Surprise"
                }</span>
              </p>
              <p>
                <i class="fa-solid fa-dollar-sign"></i><span>Price : ${
                  pet.price ? pet.price : "Surprise"
                }$</span>
              </p>
              <div class="card-actions flex justify-between mt-4">
                <i class="fa-regular fa-thumbs-up like cursor-pointer"></i>
                <button class="adopt">Adopt</button>
                <button class="details_button">Details</button>
              </div>
            </div>
          </div>
      
      `;
    petContainer.appendChild(div);
  });
}

// sort by price

document.getElementById("sort_by_price").addEventListener("click", () => {
  const sortedData = showingDataUI.sort((a, b) => b.price - a.price);
  showData(sortedData, "pet_container");
});

// like and selected image
const dataArray = [];
export function selectedPetPicture(data) {
  // check data
  if (dataArray.includes(data)) {
    return;
  } else {
    dataArray.push(data);
  }
  // set data
  const selectedContainer = document.getElementById("selectedPetContainer");
  const img = document.createElement("img");
  img.classList.add("mt-4");
  img.classList.add("rounded-[10px]");
  img.setAttribute("src", data);
  selectedContainer.appendChild(img);
}
// show data using id

export async function getDataUsingId(id) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    const data = await res.json();
    showOnModal(data.petData);
  } catch (error) {}
}

function showOnModal(data) {
  console.log(data);
}
