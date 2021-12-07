// -------------------------------
// # Chapter 2. Parsing
// IO-TS handles the parsing
// --------------------------------
import axios from "axios";
import { decode } from "../../lib/decoder";
import * as t from "io-ts";

const MuseumInventory = t.type({
  totals: t.number,
});

const getKickstarters = async (): Promise<t.TypeOf<typeof MuseumInventory>> => {
  // We could type this, this won't fix the problem.
  const response = await axios.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects"
  );

  return decode(MuseumInventory)(response);
};

const someParent = async () => {
  const museumInventory = await getKickstarters();

  console.log(`The museum has ${museumInventory.totals} items`);
};

someParent();
