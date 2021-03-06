const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();


const pageRoute = require('./routes/pageRoute');
const medicineRoute = require('./routes/medicineRoute');
const debtRoute = require('./routes/debtRoute');
const adminRoute = require('./routes/administrationRoute');
const apiRoute = require('./routes/apiRoute');

const app = express();

//connect db
mongoose.connect(process.env.MONGO_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB Success');
});


// kullanıcının giriş yapıp yapmadığını global tanımladık.
global.userIN = null;
// kullanıcı giriş yapmış ise ismi her sayfadan erişilebilir durumda.
global.userName = null;

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));

app.use(express.json())  //req.body'den gelen verileri yakalamak için
app.use(express.urlencoded({ extended: true })) //req.body'den gelen verileri yakalamak için
app.use(flash());


app.use(
  session({
    secret: 'eczane-otomasyon',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_LOCAL,clear_interval: 3600 })
  })
);

app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  userName = req.session.userName;
  next();
})

app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})

app.use('/', pageRoute);
app.use('/ilaclar', medicineRoute);
app.use('/kisiler', debtRoute);
app.use('/auth', adminRoute);
app.use('/api',apiRoute);

app.use(function(req, res, next) {
  res.status(404).render('pages-404',{
    page_name:'Sayfa Bulunamadı',
    message:'Üzgünüz, sayfa bulunamadı.'
  });
});

app.use(function(req, res, next) {
  res.status(500).render('pages-500',{
    page_name:'Sunucu Hatası',
    message:'İç sunucu hatası'
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta başlatıldı.`);
});
