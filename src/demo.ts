// -------------------------------
// # Chapter 1. Type compatibility  
// The problem
// --------------------------------
// type Person = {
//     name: string;
// };

// type Car = {
//     name: string;
//     brand: string;
// };

// const someFunction = (person: Person): string => {
//     return person.name;
// };

// const aPerson: Person = { name: "Guillaume"};
// const aCar: Car = {name: "Corolla", brand: "Toyota"};

// someFunction(aPerson);
// someFunction(aCar);

// tips:
// 1. Typescript has to support mininal implicit commun interface for
//    anonymous objects.

// -------------------------------
// # Chapter 1. Type compatibility  
// The tag/branded technique
// --------------------------------
// type Person = {
//     tag: 'Person';
//     name: string;
// };

// type Car = {
//     tag: 'Car';
//     name: string;
//     brand: string;
// };

// const someFunction = (person: Person): string => {
//     return person.name;
// };

// const aPerson: Person = { tag: 'Person', name: "Guillaume"};
// const aCar: Car = { tag: 'Car', name: "Corolla", brand: "Toyota"};

// someFunction(aPerson);
// someFunction(aCar);


// -------------------------------
// # Chapter 1. Type compatibility  
// The class technique
// --------------------------------
// class Person {
//     // public name: string;
//     private name: string;
//     public year: number;
// }

// class Car {
//     //public name: string;
//     private name: string;
//     public year: number;
// }

// const someFunction = (person: Person): string => {
//     return "something"
// };

// someFunction(new Person());
// someFunction(new Car());

// -------------------------------
// # Chapter 2. Parsing 
// The problem
// --------------------------------
// import axios from 'axios';

// type MuseumInventory = {
//     totals: number;
// };

// const getKickstarters = async (): Promise<MuseumInventory> => {
//     // We could type this, this won't fix the problem.
//     const response = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");

//     return response.data;
// }

// const someParent = async () => {
//     const museumInventory = await getKickstarters();

//     console.log(`The museum has ${museumInventory.totals} items`);
// }

// someParent();

// -------------------------------
// # Chapter 2. Parsing 
// Manual parsing
//       !! TODO  !!
// --------------------------------
// import axios from 'axios';

// type MuseumInventory = {
//     totals: number;
// };

// const getKickstarters = async (): Promise<MuseumInventory> => {
//     // We could type this, this won't fix the problem.
//     const response = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");

//     // TODO
//     // TODO
//     // TODO
//     // TODO

//     return response.data;
// }

// const someParent = async () => {
//     const museumInventory = await getKickstarters();

//     console.log(`The museum has ${museumInventory.totals} items`);
// }

// someParent();

// -------------------------------
// # Chapter 2. Parsing 
// IO-TS handles the parsing
// --------------------------------
import { isRight, } from 'fp-ts/lib/Either';
import * as t from 'io-ts'
import * as D from "io-ts/Decoder"
import reporter from 'io-ts-reporters'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import * as E from 'fp-ts/Either'
import { flow } from 'fp-ts/function'
import { failure } from 'io-ts/PathReporter'

const User = t.interface({name: t.string})

const validations = User.decode({name: "swag"});

export function decode<I, A>(codec: t.Decoder<I, A>): (value: I) => A {
    return (value: I) => {
        const result = codec.decode(value);

        if (E.isLeft(result)) {
            throw new Error(reporter.report(result).reduce((a,b) => a + "\n" + b));
        } else {
            return result.right
        }
    }
  }

const a = decode(User)({});


