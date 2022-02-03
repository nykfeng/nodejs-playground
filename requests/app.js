import got from "got";

(async () => {
  console.log(await got.get("https://seekingalpha.com/market-news/m-a"));
})();
