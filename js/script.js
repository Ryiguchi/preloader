"use strict";

const header = document.querySelector(".header");
const preloadEl = document.querySelector(".preload-container");
const imgGallery = document.querySelector(".main-container");

const unsplashAPI = "https://api.unsplash.com/photos/random";

const unsplashParams = {
  params: {
    count: "30",
    orientation: "landscape",
  },
  headers: {
    Authorization: "Client-ID fx-luDDEPewJ2HwjQlutgRvU4BMhyxTbESg5SDs_FkI",
  },
};

const getPics = () => axios.get(unsplashAPI, unsplashParams);

const handleErrors = (error) => {
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

const setPictures = async () => {
  try {
    let markup = "";
    const { data } = await getPics();
    const promises = await data.map((img) => {
      return new Promise((resolve, reject) => {
        const url = img.urls.regular;
        const { alt_description: alt } = img;
        const link = img.user.links.html;
        const { name } = img.user;
        const imgEl = new Image();

        imgEl.src = url;
        imgEl.alt = alt;

        imgEl.onload = () => resolve(imgEl);
        imgEl.onerror = () => reject();

        markup += `
        <div class="image-container">
          ${imgEl.outerHTML}
          <div class="author-container">
            <a target="_blank" href="${link}" class="author"> Photo by: ${name} </a>
          </div>
        </div>
      `;
      });
    });

    await Promise.all(promises);

    header.insertAdjacentHTML("afterend", markup);

    imgGallery.classList.remove("hidden");
    preloadEl.classList.add("hidden");
  } catch (error) {
    handleErrors(error);
  }
};

setPictures();
