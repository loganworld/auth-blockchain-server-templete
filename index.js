const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
require("dotenv").config();

{
  //mongodb connection
  mongoose
    .connect(
      process.env.MONGOURI || "mongodb://localhost:27017/db_tankgame_evmos",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  // express server
  const router = express.Router();
  const cors = require("cors");
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(fileUpload());
  app.use(
    cors({
      origin: "*",
      methods: ["POST", "GET"],
    })
  );

  const routes = require("./app/router-rest");
  routes(router);
  app.use("/api", router);
}
{
  const io = new Server(server, {
    pingInterval: 30005,		//An interval how often a ping is sent
    pingTimeout: 5000,		//The time a client has to respont to a ping before it is desired dead
    upgradeTimeout: 3000,		//The time a client has to fullfill the upgrade
    allowUpgrades: true,		//Allows upgrading Long-Polling to websockets. This is strongly recommended for connecting for WebGL builds or other browserbased stuff and true is the default.
    cookie: false,			//We do not need a persistence cookie for the demo - If you are using a load balöance, you might need it.
    serveClient: true,		//This is not required for communication with our asset but we enable it for a web based testing tool. You can leave it enabled for example to connect your webbased service to the same server (this hosts a js file).
    allowEIO3: false,			//This is only for testing purpose. We do make sure, that we do not accidentially work with compat mode.
    cors: {
      origin: "*"				//Allow connection from any referrer (most likely this is what you will want for game clients - for WebGL the domain of your sebsite MIGHT also work)
    }
  });
  //socketIO server
  const SocketListner = require("./app/router-socket");
  SocketListner(io);
}


app.use(express.static(__dirname + '/build'));
app.get('/*', function (req, res) {
  let urlIndex = -1;
  const staticUrls = ["static", "manifest", "favicon", "logo"];
  staticUrls.forEach((staticUrl) => {
    console.log(staticUrl);
    if (urlIndex != -1) return;
    urlIndex = req.url.indexOf(staticUrl)
  })

  if (urlIndex != -1) {
    console.log(__dirname + '/build/' + req.url.slice(urlIndex));
    return res.sendFile(__dirname + '/build/' + req.url.slice(urlIndex));
  }

  res.sendFile(__dirname + '/build/index.html', function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.SERVER_PORT || 5000;
server.listen(port, () => console.log(`Running on port ${port}`));
