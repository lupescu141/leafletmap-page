const baseUrl =
  "https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants";

var map = L.map("map").setView([60.192059, 24.945831], 7);
const dialog = document.querySelector("dialog");
const menu_table = document.getElementById("menu_table");

export { baseUrl, map, dialog, menu_table };
