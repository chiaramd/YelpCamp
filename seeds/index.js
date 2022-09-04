const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63114e7aeda5b720327b0084',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: { 
                type: 'Point', 
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/ddvphkuip/image/upload/v1662151061/YelpCamp/vxytadulmjgeeb70ius5.jpg',
                    filename: 'YelpCamp/vxytadulmjgeeb70ius5',
                },
                {
                    url: 'https://res.cloudinary.com/ddvphkuip/image/upload/v1662151060/YelpCamp/j053dxy3ibk6ogavlss5.jpg',
                    filename: 'YelpCamp/j053dxy3ibk6ogavlss5',
                },
                {
                    url: 'https://res.cloudinary.com/ddvphkuip/image/upload/v1662151060/YelpCamp/kayrlmsh51r7rh2fogzr.jpg',
                    filename: 'YelpCamp/kayrlmsh51r7rh2fogzr',
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos doloribus laudantium aliquam, non beatae eaque, commodi, obcaecati in sequi nulla quae. Illum tempora culpa dignissimos ratione nisi alias quaerat odio.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => db.close());