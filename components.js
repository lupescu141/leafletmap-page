import { menu_table, dialog } from "./variables.js";
import { fetchDailyMenu, fetchWeeklyMenu } from "./utils.js";

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
    //making html elements for marker popup
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    div.id = `${element._id}`;
    div.className = "flex flex-col";
    h1.appendChild(
      document.createTextNode(`${element.name} - ${element.company}`)
    );
    div.appendChild(h1);
    p1.appendChild(document.createTextNode(`${element.address}`));
    div.appendChild(p1);
    p2.appendChild(document.createTextNode(`${element.city}`));
    div.appendChild(p2);
    button1.appendChild(document.createTextNode("Päivän menu"));
    button1.addEventListener("click", async () => {
      console.log(div.id);
      const daily_menu = await fetchDailyMenu(div.id);
      const { courses } = daily_menu;

      //Adds daily menu content to dialog
      courses.forEach((element) => {
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(`${element.name}`));
        const th2 = document.createElement("th");
        th2.appendChild(document.createTextNode(`${element.price}`));
        const th3 = document.createElement("th");
        th3.appendChild(document.createTextNode(`${element.diets}`));
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        menu_table.appendChild(tr);
      });
      //for closing dialog and deleting content
      const closebutton = document.createElement("button");
      closebutton.appendChild(document.createTextNode("Poistu"));
      closebutton.addEventListener("click", () => {
        menu_table.textContent = "";
        dialog.close();
      });
      menu_table.appendChild(closebutton);
      dialog.showModal();
    });

    div.appendChild(button1);
    button2.appendChild(document.createTextNode("Viikon menu"));
    div.appendChild(button2);
    button2.addEventListener("click", async () => {
      console.log(div.id);
      const weekly_menu = await fetchWeeklyMenu(div.id);
      const { days } = weekly_menu;

      days.forEach((element) => {
        const { courses, date } = element;

        const h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(`${date}`));
        menu_table.appendChild(h2);

        //Adds daily menu content to dialog
        courses.forEach((element) => {
          const tr = document.createElement("tr");
          const th1 = document.createElement("th");
          th1.appendChild(document.createTextNode(`${element.name}`));
          const th2 = document.createElement("th");
          th2.appendChild(document.createTextNode(`${element.price}`));
          const th3 = document.createElement("th");
          th3.appendChild(document.createTextNode(`${element.diets}`));
          tr.appendChild(th1);
          tr.appendChild(th2);
          tr.appendChild(th3);
          menu_table.appendChild(tr);
        });
      });

      const closebutton = document.createElement("button");
      closebutton.appendChild(document.createTextNode("Poistu"));
      closebutton.addEventListener("click", () => {
        menu_table.textContent = "";
        dialog.close();
      });
      menu_table.appendChild(closebutton);
      dialog.showModal();
    });

    var marker = L.marker([
      element.location.coordinates[1],
      element.location.coordinates[0],
    ])
      .addTo(map)
      .on("click", onClick);
    marker.bindPopup(div).openPopup();

    function onClick(e) {}
  });
};

export { map_set_markers };
