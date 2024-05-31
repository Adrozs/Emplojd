export async function getJobsBackend(query) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found");
    }

    const res = await fetch(
      `https://localhost:54686/search?search=${query}&page=1`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response:", res);

    if (!res.ok) {
      throw new Error(`Failed to get job. 😢 Status code: ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);

    if (data) {
      return data;
    } else {
      throw new Error("No jobs found in response");
    }
  } catch (error) {
    console.error("Failed to fetch jobs data:", error);
    throw new Error("Failed to fetch jobs data: " + error.message);
  }
}

export async function getOneBackendJob(id) {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`https://localhost:54686/ad/{adId}?adId=${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw Error(`Couldn't find job #${id}`);

  const jobs = await res.json();
  console.log(jobs);

  return jobs;
}

export async function getProfileInfo() {
  const token = localStorage.getItem("authToken");

  const res = await fetch(
    `https://localhost:54686/api/UserProfile/GetUserProfile`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw Error(`Couldn't find job #${id}`);

  const profile = await res.json();
  console.log(profile);

  return profile;
}

// function sendLikeDataBackend(
//   firstName,
//   lastName,
//   userInterestTags,
//   descriptiveWords,
//   jobId,
//   jobTitle,
//   jobDescription,
//   cvText,
//   temperature
// ) {
//   const token = localStorage.getItem("authToken");

//   const postData = {
//     firstname: firstname || "",
//     lastname: lastname || "",
//     userInterestTags: descriptiveWords || "",
//     descriptiveWords: interests || "",
//     jobId: job.id || "",
//     jobTitle: job.headline || "",
//     jobDescription: job.description.text || "",
//     cvText: null,
//     temperature: 1,
//   };

//   console.log("Sending cleaned data to backend:", postData);

//   axios
//     .post("https://localhost:54686/save-ad", postData, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       console.log("Gillad annons", response.data);
//     })
//     .catch((error) => {
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//       } else {
//         console.error("Error", error.message);
//       }
//     });
// }
