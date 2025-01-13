import { fetchData, fetchDailyMenu } from "./utils.js";
import { baseUrl, map } from "./variables.js";
import { map_set_markers, restaurant_daily } from "./components.js";

//Resets modal data when exiting
window.exitModal = () => {
  dialog.close();
  restaurantInfo.textContent = "";
  menu.textContent = "";
};

const main = async () => {
  try {
    // Fetching restaurants data.
    const restaurants = await fetchData(baseUrl);

    // Sorting restaurants table
    restaurants.sort((a, b) => a.name.localeCompare(b.name));

    // Setting map-markers
    map_set_markers(restaurants, map);
  } catch (err) {
    console.log(err);
  }
};

main();
