//request-response döngüsü içerisinde kalan herşeye middleware denir.

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fileUpload = require('express-fileupload'); // modülü kullanıma alıyoruz.
const methodOverride = require('method-override');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');
const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

//TEMPLATE ENGINE
app.set('view engine', 'ejs'); //

//MIDDLEWEARS
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //body bilgisini yakalamak için 2 adet middleware fonksiyonunu kullanmamız gerekir.
app.use(express.json());
app.use(fileUpload()); // middleware olarak kaydediyoruz.
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);


app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı `);
});
