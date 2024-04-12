// const API_URL = "https://react-fast-pizza-api.onrender.com/api";

const query = "javascript";
const API_URL = "https://jobsearch.api.jobtechdev.se/search";

export async function getMenu() {
  try {
    const res = await fetch(`${API_URL}?q=${query}&limit=100`);
    if (!res.ok) {
      throw Error("Failed to get job");
    }
    const { hits: jobs } = await res.json();
    console.log(jobs);
    return jobs;
  } catch (error) {
    throw Error("Failed to fetch menu data: " + error.message);
  }
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
