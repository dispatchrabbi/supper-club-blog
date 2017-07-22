const restaurants = [
{
  name: 'Boltwood',
  website: 'http://www.boltwoodevanston.com/',
  reservations: 'http://www.boltwoodevanston.com/reservations/',
  address: `
804 Davis Street
Evanston, IL 60201
`,
  phone: '847.859.2880',
},
{
  name: 'The Publican',
  website: 'http://www.thepublicanrestaurant.com/',
  reservations: 'http://www.thepublicanrestaurant.com/reservations/',
  address: `
837 W Fulton Market
Chicago, IL 60607
`,
  phone: '312.733.9555',
},
{
  name: 'Sarkis',
  website: 'http://www.cafesarkis.com/main.html',
  reservations: 'http://www.cafesarkis.com/menu.html',
  address: `
2632 Gross Point Road
Evanston, IL 60201
`,
  phone: '847-328-9703',
},
];

module.exports = restaurants.map(r => (r.address = r.address.trim(), r));
