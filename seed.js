const chance = require('chance')(123);
const db = require('./server/db')
const { User, Watch, Review, Order, OrderWatch } = require('./server/db/models/')

const watches = []
const makes = ['Cartier', 'Laurent Ferrier', 'A. Lange & Söhne', 'Richard Mille', 'Baume & Mercier', 'Urwerk', 'Jaeger-LeCoultre', 'Parmigiani Fleurier', 'Panerai', 'Hermeès']
const models = ['Drive de Cartier Extra-Flat', 'Galet Annual Calendar Montre École', 'Saxonia Triple Split', 'RM 53-01 Tourbillon Pablo Mac Donough', 'Clifton Club Legend Tributes', 'UR-210 Black Platinum', 'Polaris Memovox Limited Edition', 'Kalpa Hebdomadaire', 'Lo Scienziato  Luminor 1950 Tourbillon GMT Titanio', 'Carré H']
const complicationOptions = ['Simple chronograph', 'Simple calendar',	'Alarm', 'Counter chronograph',	'Annual calendar', 'Quarter repeater', 'Split-second flyback chronograph',	'Perpetual calendar',	'Half-quarter repeater', 'Independent second-hand chronograph',	'Equation of time',	'Five-minute repeater', 'Jumping second-hand chronograph', 'Moon phases', 'Minute repeater']
const minYear = 1755, maxYear = 2018
const minPrice = 500000, maxPrice = 1500000
for (let i = 0; i < makes.length; i++) {
  let make = makes[i]
  let model = models[i]
  let complications = chance.pickone(complicationOptions)
  let year = chance.integer({min: minYear, max: maxYear})
  let price = chance.integer({min: minPrice, max: maxPrice})
  let available = chance.weighted([false, true], [10, 90])
  let id = i + 1
  watches.push({
    id,
    make,
    model,
    complications,
    year,
    price,
    available
  })
}

const users = []
const admins = ['Sam Chai', 'Jesse Moskowitz', 'Allen Johnson', 'Josh Luria']
const names = ['David Sehl', 'Sandy Mak', 'Kevin Ho', 'James DeLay', 'Shayan Sheikh', 'Eetai Ben-Sasson', 'Sarah Zhao', 'Owen Hagerty', 'Robin Luongo', 'Bryan Clark', 'Josh Baruch', 'Shannen Ye', 'Vesna Tan', 'Han Hung', 'Jonathan Schwartz', 'Jeff Hatcher', 'Yahua Chen', 'Ari Kramer', 'Guanhong Chen', 'Kenneth Koch', 'Sam Alsmadi', 'Abraham Johnson', 'Diana Lease', 'Elis Dervishi', 'Mark Lopez', 'Samuel Kwon', 'Abel McElroy', 'Hassan Elsherbini', 'Randy Tsao', 'Tim LaTorre', 'Jon Rea', 'Vanessa Jimenez', 'James Abels', 'William Lee', 'Arnold Salas', 'Benjamin Friedman', 'Daniel Hollcraft', 'Jeffrey Cheung', 'Daniela Tizon', 'Leigh Blechman', 'Elizabeth Farrier', 'Maxwell Legocki', 'Vinit Parkar', 'Hunsoo Kim', 'Jason Ioannides']
//add user helper function
const addUsers = (i, namesList, isAdmin) => {
  let [firstName, lastName] = namesList[i].split(' ')
  let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`
  let password = '123'
  let id = users.length + 1
  users.push({
    id,
    firstName,
    lastName,
    email,
    password,
    isAdmin
  })
}
for (let i = 0; i < admins.length; i++) {
  addUsers(i, admins, true)
}
for (let i = 0; i < names.length; i++) {
  addUsers(i, names, false)
}


const orders = []
const statuses = ['created', 'processing', 'cancelled', 'completed']
//every user has a chance to have an order
users.map(user => {
  //max orders is 5
  let numOrders = chance.integer({min: 0, max: 5})
  let userId = user.id
  for (let j = 0; j < numOrders ; j++) {
    //If first order, create cart order, else create other order
    let id = orders.length + 1
    let status = j === 0 ? 'cart' : chance.pickone(statuses)
    orders.push({
      id,
      status,
      userId
    })
  }
})

const reviews = []
//every watch has a review
watches.map(watch => {
  let watchId = watch.id
  //every watch has at max 5 reviews
  let reviewUsers = chance.pickset(users, chance.integer({min: 0, max: 5}))
  reviewUsers.map(user => {
    const numWords = chance.natural({
      min: 1,
      max: 8
    })
    let title = chance.sentence({words: numWords})
    .replace(/\b\w/g, function (m) {
      return m.toUpperCase()
    })
    .slice(0, -1)
    let userId = user.id
    let rating = chance.integer({min: 1, max: 5})
    let content = chance.paragraph()
    reviews.push({
      title,
      watchId,
      userId,
      rating,
      content
    })
  })
})

const orderWatches = [];
//every order has a watch
orders.map(order => {
  let orderId = order.id;
  //every order has at max 5 watches
  let randWatches = chance.pickset(watches, chance.integer({min: 0, max: 5}))
  randWatches.forEach(watch => {
    let watchId = watch.id
    let fixedPrice = chance.integer({min: minPrice, max: maxPrice})
    let quantity = chance.integer({min: 1, max: 4})
    orderWatches.push({
      watchId,
      orderId,
      fixedPrice,
      quantity
    })
  })
})

watches.map(watch => delete watch.id)
users.map(user => delete user.id)
orders.map(order => delete order.id)

const seed = () =>
  Promise.all(watches.map(watch => Watch.create(watch)))
  .then(() => Promise.all(users.map(user => User.create(user))))
  .then(() => Promise.all(orders.map(order => Order.create(order))))
  .then(() => Promise.all(reviews.map(review => Review.create(review))))
  .then(() => Promise.all(orderWatches.map(orderWatch => OrderWatch.create(orderWatch))))

const main = () => {
  console.log('Syncing db...')
  db.sync({
      force: true
    })
    .then(() => {
      console.log('Seeding database...')
      return seed()
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.stack)
    })
    .then(() => {
      console.log('Seeding done!')
      db.close();
      return null
    })
}

main()
