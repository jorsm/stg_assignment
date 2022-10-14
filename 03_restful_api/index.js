const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const { StatusCodes } = require("http-status-codes");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

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
// GET che restituisca tutti i clienti presenti
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json(people);
});
// PUT che aggiorni l’età e/o nome e/o cognome di un cliente
router.put("/:personID", (req, res) => {
  const { personID } = req.params;
  let { nome, cognome, eta } = req.body;
  const personIndex = people.findIndex((person) => person.id == personID);

  if (personIndex > -1) {
    let person = people[personIndex];
    person = {
      id: person.id,
      nome: nome || person.nome,
      cognome: cognome || person.cognome,
      eta: eta || person.eta,
    };
    people[personIndex] = person;
    console.log("person updated: ", person);
    res.status(StatusCodes.OK).json(person);
  } else res.status(404).send("Person not found");
});
// DELETE che elimina la prenotazione di un cliente
router.delete("/:personID", (req, res) => {
  const { personID } = req.params;
  const personIndex = people.findIndex((person) => person.id == personID);

  if (personIndex > -1) {
    const [person] = people.splice(personIndex, 1);
    console.log("person deleted: ", person);
    res.status(StatusCodes.OK).json(person);
  } else res.status(404).send("Person not found");
});

app.use("/v1/people", router);

app.use((req, res) => res.status(404).send("Route does not exist"));
app.use((err, req, res) => res.status(400).send(err.message()));

//Start server
const port = process.env?.PORT || 5000;
app.listen(port, () => console.log(`Server is listening port ${port}...`));
