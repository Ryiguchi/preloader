import axios from "axios";

import { UNSPLASH_API, UNSPLASH_PARAMS } from "./defaults.utils";

export const handleErrors = (error) => {
  if (error.response) {
    console.log(
      `Your request was made but the server responded with a failed status code! (${error.response.status})`
    );
  } else if (error.request) {
    console.log("Your request was made but no response was received!");
  } else {
    console.log(
      "Something happened in setting up the request that triggered an Error!"
    );
  }
};

export const getPics = axios.get(UNSPLASH_API, UNSPLASH_PARAMS);
