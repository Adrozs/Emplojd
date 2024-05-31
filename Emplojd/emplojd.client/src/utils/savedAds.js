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
    .post("https://localhost:54686/save-ad", postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Gillad annons", response.data);
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

/* Saved coverletters */
// function getCoverLetter() {
//   const token = localStorage.getItem("authToken");

//   return axios
//     .get("https://localhost:54686/saved-letters", {
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       console.log(response.data);
//       return response;
//     })
//     .catch((error) => {
//       return null;
//     });
// }

export {
  sendLikeDataBackend,
  getLikeDataBackend,
  deleteLikeDataBackend,
};
