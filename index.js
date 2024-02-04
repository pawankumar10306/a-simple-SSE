const express = require("express");

const app = express();
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&format=txt');
      const joke = await response.text();
    //   console.log(joke);

      res.write(`data: ${JSON.stringify(joke)}\n\n`);
    } catch (error) {
      console.error('Error fetching joke:', error.message);
    }
  };

  setInterval(fetchJoke, 10000);
});

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
