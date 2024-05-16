import axios from "axios";

function sendLikeData(
  id,
  headline,
  employer,
  occupation,
  logo,
  working_hours_type,
  employment_type,
  workplace_address,
  publication_date
) {
  axios
    .post("http://localhost:3001/likes", {
      id: id,
      headline: headline,
      employer: employer,
      occupation: occupation,
      logo: logo,
      working_hours_type: working_hours_type,
      employment_type: employment_type,
      workplace_address: workplace_address,
      publication_date: publication_date,
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
