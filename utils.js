import { baseUrl } from "./variables.js";

const fetchData = async (url) => {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(url);
    const restaurants = await fetch(baseUrl, options);
    const result = await restaurants.json();
    console.log(restaurants);
    console.log(result);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchDailyMenu = async (id) => {
  try {
    const url = `https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/fi`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const dailyMenu = await fetch(url, options);
    const result = await dailyMenu.json();
    console.log(dailyMenu);
    console.log(result);
    return result;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const fetchWeeklyMenu = async (id) => {
  try {
    const url = `https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${id}/fi`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const dailyMenu = await fetch(url, options);
    const result = await dailyMenu.json();
    console.log(dailyMenu);
    console.log(result);
    return result;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export { fetchData, fetchDailyMenu, fetchWeeklyMenu };
