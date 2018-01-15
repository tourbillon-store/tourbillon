const chance = require('chance')(123);
const db = require('./server/db')
const { User, Watch, Review, Order, OrderWatch } = require('./server/db/models/')

const watches = []
const makes = ['Cartier', 'Laurent Ferrier', 'A. Lange & Söhne', 'Richard Mille', 'Baume & Mercier', 'Urwerk', 'Jaeger-LeCoultre', 'Parmigiani Fleurier', 'Panerai', 'Hermeès']
const models = ['Drive de Cartier Extra-Flat', 'Galet Annual Calendar Montre École', 'Saxonia Triple Split', 'RM 53-01 Tourbillon Pablo Mac Donough', 'Clifton Club Legend Tributes', 'UR-210 Black Platinum', 'Polaris Memovox Limited Edition', 'Kalpa Hebdomadaire', 'Lo Scienziato  Luminor 1950 Tourbillon GMT Titanio', 'Carré H']
const complications = ['Simple chronograph', 'Simple calendar',	'Alarm', 'Counter chronograph',	'Annual calendar', 'Quarter repeater', 'Split-second flyback chronograph',	'Perpetual calendar',	'Half-quarter repeater', 'Independent second-hand chronograph',	'Equation of time',	'Five-minute repeater', 'Jumping second-hand chronograph', 'Moon phases', 'Minute repeater']
const minYear = 2000, maxYear = 2018
const minPrice = 500000, maxPrice = 1500000
for (let i = 0; i < makes.length; i++) {
  let make = makes[i]
  let model = models[i]
  let complication = chance.pickone(complications)
  let year = chance.integer({min: minYear, max: maxYear})
  let price = chance.integer({min: minPrice, max: maxPrice})
  watches.push({
    make,
    model,
    complication,
    year,
    price
  })
}

const users = []
const names = ['David Sehl', 'Sandy Mak', 'Jesse Moskowitz', 'Kevin Ho', 'James DeLay', 'Shayan Sheikh', 'Eetai Ben-Sasson', 'Sarah Zhao', 'Owen Hagerty', 'Robin Luongo', 'Bryan Clark', 'Josh Baruch', 'Shannen Ye', 'Vesna Tan', 'Han Hung', 'Jonathan Schwartz', 'Jeff Hatcher', 'Yahua Chen', 'Ari Kramer', 'Guanhong Chen', 'Kenneth Koch', 'Sam Alsmadi', 'Abraham Johnson', 'Allen Johnson', 'Diana Lease', 'Elis Dervishi', 'Mark Lopez', 'Samuel Kwon', 'Abel McElroy', 'Hassan Elsherbini', 'Randy Tsao', 'Tim LaTorre', 'Jon Rea', 'Vanessa Jimenez', 'James Abels', 'William Lee', 'Arnold Salas', 'Benjamin Friedman', 'Josh Luria', 'Daniel Hollcraft', 'Jeffrey Cheung', 'Daniela Tizon', 'Leigh Blechman', 'Elizabeth Farrier', 'Samuel Chai', 'Maxwell Legocki', 'Vinit Parkar', 'Hunsoo Kim', 'Jason Ioannides'];
names.map(name => {
  let [firstName, lastName] = name.split(' ');
  let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
  users.push({
    firstName,
    lastName,
    email
  })
})

const orders = []
const statuses = ['cart', 'created', 'processing', 'cancelled', 'completed']
const numOrders = 20
for (let i = 0; i < numOrders; i++) {
  let status = chance.pickone(statuses)
  let userId = chance.integer({min: 0, max: users.length - 1})
  orders.push({
    status,
    userId
  })
}

const reviews = []
const numReviews = 50
for (let i = 0;i < numReviews; i++) {
  let watchId = chance.integer({min: 0, max: watches.length - 1})
  let userId = chance.integer({min: 0, max: users.length - 1})
  let rating = chance.integer({min: 0, max: 5})
  let content = chance.paragraph()
  reviews.push({
    watchId,
    userId,
    rating,
    content
  })
}

const orderWatches = [];
//every watch has an order
for (let i = 0; i < watches.length; i++) {
  //a watch can be on max all orders.
  let randOrders = chance.integer({min: 0, max: numOrders})
  let watchId = i;
  let orderId = chance.integer({min: 0, max: randOrders})
  let fixedPrice = chance.integer({min: minPrice, max: maxPrice})
  let quantity = chance.integer({min: 0, max: 4})
  orderWatches.push({
    watchId,
    orderId,
    fixedPrice,
    quantity
  })
}

const seed = () =>
  Promise.all(watches.map(watch =>
    Watch.create(watch)))
    .then(() =>
    Promise.all(users.map(user =>
      Users.create(user)
    ))
  );
  .then(() =>
    Promise.all(orders.map(order =>
      Order.create(order)
    ))
  );

const main = () => {
  console.log('Syncing db...');
  db.sync({
      force: true
    })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      console.log('Seeding done!');
      db.close();
      return null;
    });
};

main();
