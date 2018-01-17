const chance = require('chance')(123);
const db = require('./server/db')
const { User, Watch, Review, Order, OrderWatch } = require('./server/db/models/')

const watches = []
const makes = ['Patek Phillippe', 'Heuer Carrera', 'Cartier', 'Ressence', 'Laurent Ferrier', 'Jaeger-LeCoultre', 'Parmigiani Fleurier', 'Panerai', 'Hermès', 'Van Cleef & Arpels', 'Audemars Piguet', 'Laurent Ferrier', 'Patek Phillippe', 'Greubel Forsey', 'Heuer Monaco', 'Panerai']
const models = ['5976/1G', '3147N \'Dato 45\'', 'Drive de Cartier Extra-Flat', 'Type 3', 'Galet Annual Calendar Montre École', 'Polaris Memovox Limited Edition', 'Kalpa Hebdomadaire', 'Lo Scienziato Luminor 1950 Tourbillon GMT Titanio', 'Carré H', 'Lady Arpels Planétarium', 'Royal Oak RD#2', 'Galet Annual Calendar Montre École', 'Reference 7130 Ladies\' World Time', '24 Secondes Contemporain', '1133B', 'PAM00671 Luminor Submersible 1950']
const complicationOptions = ['Simple chronograph', 'Simple calendar',	'Alarm',	'Annual calendar', 'Quarter repeater', 'Split-second flyback chronograph',	'Perpetual calendar',	'Half-quarter repeater', 'Independent second-hand chronograph',	'Equation of time',	'Five-minute repeater', 'Jumping second-hand chronograph', 'Moon phases', 'Minute repeater']
const imagesUrls = [
  'https://hodinkee.imgix.net/uploads/images/1477421076904-tmp56fru2czbwyfc-2022f0f37c8d47c135bb58e8f5a97978/PA210024.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=5688c45c181510ab259573d7212f5244',
  'https://hodinkee.imgix.net/uploads/images/1498205447614-3sp5gfqjsoe-6eb963da8e57f8dff5e3ae647a95e7c6/Benutzerdefinierter_Name267.tif?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=b9380d2427a12f85f5d10e601d57a97a',
  'https://hodinkee.imgix.net/uploads/images/1515780461467-euqvdhww5th-f82a0a995b2190369c9370a74e3fb2f7/drive_2017.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=ae2e4b5c7f0ef6d7c77d5e0d7ad9b59b',
  'https://hodinkee.imgix.net/uploads/block/inline_image/content_image/11595/talking_watches_with_tony_fadell_41.jpg?ixlib=rails-1.1.0&auto=format&ch=Width%2CDPR%2CSave-Data&fit=crop&fm=jpg&q=55&usm=12&w=820&dpr=2&s=51bec194d5f92827c59fd1224f9ec476',
  'https://hodinkee.imgix.net/uploads/block/two_up_image/content_image_1/88/BPB_3756.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=c7d48fcacd88e76815b492cbec779abe',
  'https://hodinkee.imgix.net/uploads/images/1515688609004-chten7i5a2-46bbecf9fee957189085575ee4116c7c/carreh_08.jpg?ixlib=rails-1.1.0&auto=format&ch=Width%2CDPR%2CSave-Data&fit=max&fm=jpg&h=656&q=55&usm=12&w=984&dpr=2&s=990e156261620cee05fd04392089bba0',
  'https://hodinkee.imgix.net/uploads/images/1515613920559-ouymgo7vep-ca0d890deecc5a5c8442bc9da1433686/polaris_worldtime_02.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=39cb8b7a27263e83e2bfc21400bdc914',
  'https://hodinkee.imgix.net/uploads/images/1515705832050-9w38j3d49rf-7393fbe876ad7ab2898bcbc04e120e88/PANERAI_-_PAM00767_Cat_Sdr.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=304235cb47a9b9ff639b42f753bf18f7',
  'https://hodinkee.imgix.net/uploads/images/1498138773392-z0uj6t7nh1r-df70a84fb76d774d43ee91f5b31c0cac/hero.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=02ceeeee77b5c1bd2c105716814a80ab',
  'https://hodinkee.imgix.net/uploads/images/1516110254601-2e7zeqx59t-fcc303dbff2206ee6b3c6139aec948ed/hero.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=757ccbd90b23814b0bef7b51d306b61b',
  'https://hodinkee.imgix.net/uploads/images/1516033088406-sknovcngsy-01e06648b73b4a9e67a642024dc93dac/P1150972.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=5ac091c5f553ce4351aafbfb2134a319',
  'https://hodinkee.imgix.net/uploads/images/1515707640227-alk57dw4a9p-bfd18bd39c65a41e19c0db4a706926c1/Laurent_Ferrier_AC_Hero.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=87f6d73c21a697d9c8783670ffda8ec6',
  'https://hodinkee.imgix.net/uploads/images/1489603744961-4plfp3pkkpahqozs-2836224f88e659591d366f047a31b216/7130G.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=1503c5b5dbe680209a6f53f5ee0d3042',
  'https://hodinkee.imgix.net/uploads/images/1482871686050-olm18y2l8deaifye-0f29dada96c17525b3b0e1a73d67f83e/hero_1-1.jpg?ixlib=rails-1.1.0&fit=crop&ch=Width%2CDPR%2CSave-Data&fm=jpg&q=55&auto=format&usm=12&s=c71757f3acfc7c9b848164c2f85f74a5',
  'https://hodinkee.imgix.net/uploads/block/inline_image/content_image/11589/talking_watches_with_tony_fadell_42.jpg?ixlib=rails-1.1.0&auto=format&ch=Width%2CDPR%2CSave-Data&fit=crop&fm=jpg&q=55&usm=12&w=820&dpr=2&s=d6f08b37c44d66eadfc48350130b9649',
  'https://hodinkee.imgix.net/uploads/images/1484751352818-f79jgl59p2ulnqvw-95af2d4a032b291796e74347dfb692d5/IMG_4329.JPG?ixlib=rails-1.1.0&auto=format&ch=Width%2CDPR%2CSave-Data&fit=crop&fm=jpg&q=55&usm=12&w=700&dpr=2&s=677f78fcf1426b636dd00f6a1821ddce'
]
const minYear = 1755, maxYear = 2018
const minPrice = 500000, maxPrice = 1500000
for (let i = 0; i < makes.length; i++) {
  let make = makes[i]
  let model = models[i]
  let complications = chance.pickone(complicationOptions)
  let imageUrl = imagesUrls[i]
  let year = chance.integer({min: minYear, max: maxYear})
  let price = chance.integer({min: minPrice, max: maxPrice})
  let available = chance.weighted([false, true], [10, 90])
  let id = i + 1
  watches.push({
    id,
    make,
    model,
    complications,
    imageUrl,
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
    let userId = user.id
    let rating = chance.integer({min: 1, max: 5})
    let content = chance.paragraph()
    reviews.push({
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
