// sendLikeData.js
import axios from "axios";

function sendLikeData(id, headline) {
  axios
    .post("http://localhost:3001/likes", {
      id: id,
      headline: headline,
    })
    .then((response) => {
      console.log("Gillad annons", response.data);
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

export { sendLikeData };
