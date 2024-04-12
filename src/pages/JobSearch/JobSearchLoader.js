import { getJobs } from "../../services/apiJobs";

export async function loader(params) {
  console.log(params);
  const { formData } = params;
  if (formData) {
    const { city } = formData;
    console.log("City:", city);

    const menu = await getJobs(city);
    return menu;
  } else {
    // console.log("No form data found in params");
    // const backup = await getJobs("javascript");
    return null;
  }
}
