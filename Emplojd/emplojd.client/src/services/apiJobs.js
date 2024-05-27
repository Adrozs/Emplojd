/* const API_URL = "https://jobsearch.api.jobtechdev.se/search";

export async function getJobs(query) {
  try {
    const res = await fetch(`${API_URL}?q=${query}&limit=40`);
    if (!res.ok) {
      throw Error("Failed to get job. 😢");
    }
    const { hits: jobs } = await res.json();
    console.log(jobs);
    return jobs;
  } catch (error) {
    throw Error("Failed to fetch jobs data: " + error.message);
  }
}

export async function getOneJob(id) {
  const res = await fetch(`${API_URL}?q=${id}`);
  if (!res.ok) throw Error(`Couldn't find job #${id}`);

  const { hits: jobs } = await res.json();
  if (jobs.length === 0) throw Error(`No job found with ID ${id}`);

  return jobs[0];
}
export async function createLetter(newOrder) {
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
    throw Error("Failed creating your cover letter");
  }
}

export async function updateLetter(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your cv");
  }
}
 */
