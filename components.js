import { menu_table } from "./variables.js";
import { fetchDailyMenu } from "./utils.js";

//For daily menu information
const restaurant_daily = async (html_element) => {
  console.log(html_element.ParentNode.id);
  const daily_menu = await fetchDailyMenu(html_element.ParentNode.id);
  const { courses } = daily_menu;

  //Adds daily menu content to dialog
  courses.forEach((element) => {
    menuHtml = menuHtml.concat(
      `<tr><th>Name: ${element.name}</th><th>Price: ${element.price}</th></tr>`
    );
  });

  menuHtml = menuHtml.concat(`<button onClick = "exitModal()">exit</button>`);

  menu_table.innerHTML = menuHtml;
};

const map_set_markers = (restaurants, map) => {
  //create buttom for marker
  const button = document.createElement("button");
  button.textContent = "Päivän menu";
  button.addEventListener("click", function (event) {
    console.log("This button works!");
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //Setting markers to map
  restaurants.forEach((element) => {
    var marker = L.marker([
      element.location.coordinates[1],
      element.location.coordinates[0],
    ])
      .addTo(map)
      .on("click", onClick);
    marker
      .bindPopup(
        `<div id="${element._id}" class= "flex flex-col">
        <h1>${element.name} - ${element.company} </h1>
       <p>${element.address}</p> 
       <p>${element.city}</p>
       <button>Päivän menu</button>
       <br>
       <button>Viikon menu</button>
       </div>
      `
      )
      .openPopup();

    function onClick(e) {}
  });
};

export { map_set_markers, restaurant_daily };
