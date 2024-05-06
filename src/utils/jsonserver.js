import axios from "axios";

function sendLikeData(id, headline, employer, occupation, logo) {
  axios
    .post("http://localhost:3001/likes", {
      id: id,
      headline: headline,
      employer: employer,
      occupation: occupation,
      logo: logo,
    })
    .then((response) => {
      console.log("Gillad annons", response.data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

function getLikeData() {
  return axios
    .get("http://localhost:3001/likes")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error", error);
      return [];
    });
}

function deleteLikeData(id) {
  return axios
    .delete(`http://localhost:3001/likes/${id}`)
    .then((response) => {
      console.log("Annonsen har tagits bort", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error", error);
      return null;
    });
}

export { sendLikeData, getLikeData, deleteLikeData };
