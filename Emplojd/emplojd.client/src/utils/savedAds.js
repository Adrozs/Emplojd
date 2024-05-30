import axios from "axios";

function getLikeDataBackend() {
  const token = localStorage.getItem("authToken");

  return axios
    .get("https://localhost:54686/saved-ads", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}

function sendLikeDataBackend(platsbankenJobAdId, headline, employer) {
  const token = localStorage.getItem("authToken");

  axios
    .post(
      "https://localhost:54686/save-ad",
      {
        platsbankenJobAdId: platsbankenJobAdId,
        headline: headline,
        employer: employer,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("Gillad annons", response.data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

function deleteLikeDataBackend(platsbankenJobAdId) {
  const token = localStorage.getItem("authToken");
  return axios
    .delete("https://localhost:54686/saved-ad", {
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
      return response.data;
    })
    .catch((error) => {
      console.error("Error", error);
      return null;
    });
}

export { sendLikeDataBackend, getLikeDataBackend, deleteLikeDataBackend };
