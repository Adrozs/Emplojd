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
      console.log("Hämtade gillade annonser", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error", error);
      return [];
    });
}

export { sendLikeData, getLikeData };
