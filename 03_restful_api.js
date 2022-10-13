const http = require("http");
const PORT = process.env.PORT || 3000;

var people = [
  {
    id: 1,
    nome: "Dario",
    cognome: "Frongi",
    eta: 30,
  },
  {
    id: 2,
    nome: "Mario",
    cognome: "Rossi",
    eta: 30,
  },
];

const server = http.createServer(async (req, res) => {
  /*
    if (!req.headers.host !== "api.myapi.it")
    res
    .writeHead(400, { "Content-Type": "application/json" })
    .end(JSON.stringify({ message: "wrong host" })); */
  let notFound = () =>
    res
      .writeHead(404, { "Content-Type": "application/json" })
      .end(JSON.stringify({ message: "Route does not exist" }));

  let path = req.url.substring(1).split("/");
  if (path[0] !== "v1" || path[1] !== "people") {
    notFound();
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });

  if (path[2] === undefined && req.method === "GET") {
    res.write(JSON.stringify(people));
    res.end();
    return;
  }

  let clientId = path[3] ? parseInt(path[3]) : false;

  if (req.method === "DELETE") {
    res.write(JSON.stringify(people));
    res.end();
  }

  notFound();
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
