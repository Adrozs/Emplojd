export async function getJobsBackend(query) {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found");
    }

    const res = await fetch(
      `https://emplojdserver20240531231628.azurewebsites.net/search?search=${query}&page=1`,
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

  const res = await fetch(
    `https://emplojdserver20240531231628.azurewebsites.net/ad/{adId}?adId=${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw Error(`Couldn't find job #${id}`);

  const jobs = await res.json();
  console.log(jobs);

  return jobs;
}

export async function getProfileInfo() {
  const token = localStorage.getItem("authToken");

  const res = await fetch(
    `https://emplojdserver20240531231628.azurewebsites.net/api/UserProfile/GetUserProfile`,
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
