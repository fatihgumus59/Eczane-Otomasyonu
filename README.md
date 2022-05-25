# Eczane Otomasyonu

**PROJE ÖZETİ:**

Birçok eczanede halen veresiye sistemi kullanılmakta ilaç alıp parası yetmeyen kişiler ilaç ödemesinin bir kısmını yapıp kalanını borç olarak yazdırıyor ve daha sonra bu eczacılar tarafından unutulabiliyor bu da eczane kasasına eksi bakiye olarak yansıyor ve kasada açık meydana geliyor.

Bu soruna çözüm olarak bu sistem geliştirildi, amacımız eczaneye gelip ilacını almış ama parasının tamamını ödeyememiş kişileri sistemde tutmak ve eczanenin kasasındaki açığı azaltmak.

Burada belirleyici faktör TC Kimlik numarası olacaktır sistemde insanları diğer insanlardan ayıran faktör TC Kimlik numarasıdır zira aynı isimde aynı soy isimde onlarca insan olabilir ve bu karmaşıklığa sebep olabilir.

Projede **NodeJs** kullanılmıştır veritabanı olarak ise **MongoDb** tercih edilmiştir.


# Paketler (NPM)

    - bcrypt 
    - connect-flash
    - connect-mongo
    - dotenv
    - ejs
    - express
    - express-session
    - http-status
    - joi
    - method-override
    - mongoose
    - multer
    - qrcode
    - rand-token
    - nodemon

## Başlatma

http://localhost:3000
npm **start**

## Veritabanı Modelleri

[administration.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/administration.js "administration.js")<br>
[api.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/api.js "api.js")<br>
[debt.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/debt.js "debt.js")<br>
[medicine.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/medicine.js "medicine.js")<br>
[pharmacy.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/pharmacy.js "pharmacy.js")<br>

## Kontroller

[apiController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/apiController.js "apiController.js")<br>
[authController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/authController.js "authController.js")<br>
[debtController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/debtController.js "debtController.js")<br>
[medicineController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/medicineController.js "medicineController.js")<br>
[pageController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/pageController.js "pageController.js")<br>

## Ara Katman

[apiMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/apiMiddleware.js "apiMiddleware.js")<br>
[authMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/authMiddleware.js "authMiddleware.js")<br>
[pendingMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/pendingMiddleware.js "pendingMiddleware.js")<br>
[redirectMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/redirectMiddleware.js "redirectMiddleware.js")<br>
[roleMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/roleMiddleware.js "roleMiddleware.js")<br>

## Yönlendirmeler

[administrationRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/administrationRoute.js "administrationRoute.js")<br>
[apiRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/apiRoute.js "apiRoute.js")<br>
[debtRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/debtRoute.js "debtRoute.js")<br>
[medicineRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/medicineRoute.js "medicineRoute.js")<br>
[pageRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/pageRoute.js "pageRoute.js")<br>


# Kayıt/Giriş Doğrulama

[authValidation.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/validations/authValidation.js "authValidation.js")

# Proje Hakkında

Proje'de **Express** modülü kullanıldı, template engine kısmında ise **ejs** modülü kullanıldı. Proje **MVC** mimarisine göre yazıldı. Sistemde validasyon işlemleri **joi** ile sağlandı. İlaç resmini yüklemek için **multer** kütüphanesi kullanıldı. Qr işlemleri için **qrcode** kütüphanesi kullanıldı. Şifreleme işlemleri için **bcrypt** kullanıldı. Veritabanı olarak **MongoDB** veritabanına kayıt işlemleri için ise **mongoose** kütüphanesi kullanıldı. Rest API için 32 karakterlik alfanümerik bir token oluşturuldu, bu token sayesinde api güvenliği sağlandı **rand-token** kütüphanesi kullanıldı.

## Proje İçinden

![enter image description here](https://i.hizliresim.com/fmarkrg.png)
![enter image description here](https://i.hizliresim.com/gzmi2np.png)
![enter image description here](https://i.hizliresim.com/na209lk.png)
![enter image description here](https://i.hizliresim.com/cxbe8p8.png)
![enter image description here](https://i.hizliresim.com/mcitg3l.png)
![enter image description here](https://i.hizliresim.com/6lotgpk.png)
![enter image description here](https://i.hizliresim.com/a5w4frl.png)
![enter image description here](https://i.hizliresim.com/1w572se.png)
![enter image description here](https://i.hizliresim.com/i2f6zjk.png)
![enter image description here](https://i.hizliresim.com/2eceksy.png)
![enter image description here](https://i.hizliresim.com/bl5ogtq.png)
![enter image description here](https://i.hizliresim.com/pvqhaxr.png)
![enter image description here](https://i.hizliresim.com/gzvhyyd.png)

Projenin mobil tasarımına bu [link](https://www.behance.net/gallery/144389355/Eczane-Otomasyonu) üzerinden erişebilirsiniz.

