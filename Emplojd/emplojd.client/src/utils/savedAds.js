import axios from "axios";

async function getLikeDataBackend() {
  const token = localStorage.getItem("authToken");

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (favorites.length === 0) {
    return null;
  }

  return axios
    .get("https://emplojdserver20240531231628.azurewebsites.net/saved-ads", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.error("Error fetching liked jobs:", error);
      return null;
    });
}

function sendLikeDataBackend(
  platsbankenJobAdId,
  headline,
  employer,
  description,
  employment_Type,
  working_Hours_Type,
  occupation,
  workplace_Address,
  publication_Date,
  logo_Url
) {
  const token = localStorage.getItem("authToken");

  const postData = {
    platsbankenJobAdId: platsbankenJobAdId || "",
    headline: headline || "",
    employer: employer || "",
    description: description?.text_formatted || "",
    employment_Type: employment_Type.label || "",
    working_Hours_Type: working_Hours_Type.label || "",
    occupation: occupation.label || "", //
    workplace_Address: workplace_Address.municipality || "",
    publication_Date: publication_Date || "",
    logo_Url: logo_Url || "",
  };

  console.log("Sending cleaned data to backend:", postData);

  axios
    .post(
      "https://emplojdserver20240531231628.azurewebsites.net/save-ad",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("Gillad annons", response.data);
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push(headline);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error", error.message);
      }
    });
}

function deleteLikeDataBackend(platsbankenJobAdId) {
  const token = localStorage.getItem("authToken");
  return axios
    .delete("https://emplojdserver20240531231628.azurewebsites.net/saved-ad", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        platsbankenJobAdId: platsbankenJobAdId,
      },
    })
    .then((response) => {
      console.log("Annonsen har tagits bort", response.data);
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = favorites.filter(
        (headline) => headline !== response.data.headline
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return response.data;
    })
    .catch((error) => {
      console.error("Error", error);
      return null;
    });
}

export { sendLikeDataBackend, getLikeDataBackend, deleteLikeDataBackend };
