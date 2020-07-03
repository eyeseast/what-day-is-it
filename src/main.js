import { GiphyFetch } from "@giphy/js-fetch-api";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const gf = new GiphyFetch(process.env.GIPHY_API_KEY);

async function render() {
  const day = DAYS[new Date().getDay()];
  const h1 = document.querySelector("h1");

  h1.textContent = `It's ${day}!`;

  const { data: gif } = await gf.random({
    tag: day,
    type: "gifs",
    rating: "g",
  });

  const video = document.createElement("video");

  Object.assign(video, {
    autoplay: true,
    muted: true,
    loop: true,
    playsInline: true,
    src: gif.image_mp4_url,
  });

  video.addEventListener("canplay", (e) => {
    video.classList.add("loaded");
  });

  document.body.appendChild(video);

  window.gif = gif;
  window.video = video;
}

render();
