class Cliente {
  constructor(nome, cognome, eta) {
    //Cliente, con un Id unico nome, cognome ed eta del passeggero.
    if (typeof Cliente._nextId == "undefined") Cliente._nextId = 0;
    this.id = Cliente._nextId++;
    this.nome = nome; // ||""
    this.cognome = cognome; //|| ""
    this.eta = eta; //|| 0
    console.log(
      `Cliente: ${this.id},\n\t${this.nome} ${this.cognome}, ${this.eta}. `
    );
  }
  aggiungiPrenotazione(volo) {
    volo.aggiungiPrenotazione(this);
  }
  rimuoviPrenotazione(volo) {
    volo.rimuoviPrenotazione(this);
  }
}
class Volo {
  static _id = 0;

  constructor(max_passeggeri) {
    // identificativo univoco due var d'istanza denominate posti e attesa
    //Ogni volo ha un numero max di passeggeri (passato come parametro al costruttore).
    if (typeof Volo._nextId == "undefined") Volo._nextId = 0;
    this.id = Volo._nextId++;
    this.posti = new Map();
    this.attesa = [];
    this.max_passeggeri = max_passeggeri; // > 0 ? max_passeggeri : 1;
    console.log(`Volo: ${this.id},\n\t${this.max_passeggeri}`);
  }

  aggiungiPrenotazione(cliente) {
    //Quando un cliente prenota il volo, lo mettiamo in posti se c'e' ancora disponibilita',
    //altrimenti lo mettiamo in attesa
    this.posti.size < this.max_passeggeri
      ? this.posti.set(cliente.id, cliente)
      : this.attesa.push(cliente);
  }
  rimuoviPrenotazione(cliente) {
    //Quando un cliente in posti disdice il suo volo,
    //si libera un posto e prendiamo il primo elemento di attesa e lo trasferiamo su posti.
    if (this.posti.delete(cliente.id)) {
      let nuovoPasseggero = this.attesa.shift();
      if (nuovoPasseggero) this.posti.put(nuovoPasseggero.id, nuovoPasseggero);
    }
  }
}

class GestorePrenotazioni {
  constructor() {
    this.clienti = [
      new Cliente("Franco", "Verdi", 25),
      new Cliente("Lucia", "Bianchi", 23),
      new Cliente("Mario", "Rossi", 55),
      new Cliente("Alessandro", "Rosa", 33),
      new Cliente("Maria", "Verdi", 70),
    ];
    this.voli = [new Volo(150), new Volo(175), new Volo(150)];

    let franco = this.clienti[0];
    let airbus = this.voli[0];

    airbus.aggiungiPrenotazione(franco);
    franco.rimuoviPrenotazione(airbus);
    franco.aggiungiPrenotazione(airbus);
    airbus.rimuoviPrenotazione(franco);
  }
}

new GestorePrenotazioni();
