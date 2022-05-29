# Pharmacy Automation

[Turkish Documentation](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/README-tr.md)

**THE PROJECT SUMMARY:**

Many pharmacies still use the credit system, and people who buy medicine and cannot afford it, make a part of the medicine payment and write the rest as debt, and these can be forgotten by the pharmacists, which is reflected in the pharmacy cash register as a negative balance and a deficit occurs in the cash register.

This system was developed as a solution to this problem, our aim is to keep people who came to the pharmacy and bought their medicine but could not pay their full amount in the system and to reduce the deficit in the pharmacy's safe.

The determining factor here will be the TR Identity Number.

**NodeJs** was used in the project, and **MongoDb** was preferred as the database.


## Promotion

[![Watch the video](https://i.hizliresim.com/3z3cwyo.png)](https://youtu.be/E8d4P2p-hXs)

# Packets (NPM)

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

## Start

http://localhost:3000<br>
npm **start**<br>

## Demo
http://eczane-otomasyon.herokuapp.com<br>
**Username:** demo<br>
**Password:** demo12345

## Database Models

[administration.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/administration.js "administration.js")<br>
[api.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/api.js "api.js")<br>
[debt.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/debt.js "debt.js")<br>
[medicine.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/medicine.js "medicine.js")<br>
[pharmacy.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/models/pharmacy.js "pharmacy.js")<br>

## Controllers

[apiController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/apiController.js "apiController.js")<br>
[authController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/authController.js "authController.js")<br>
[debtController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/debtController.js "debtController.js")<br>
[medicineController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/medicineController.js "medicineController.js")<br>
[pageController.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/controllers/pageController.js "pageController.js")<br>

## Middlewares

[apiMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/apiMiddleware.js "apiMiddleware.js")<br>
[authMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/authMiddleware.js "authMiddleware.js")<br>
[pendingMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/pendingMiddleware.js "pendingMiddleware.js")<br>
[redirectMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/redirectMiddleware.js "redirectMiddleware.js")<br>
[roleMiddleware.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/middlewares/roleMiddleware.js "roleMiddleware.js")<br>

## Routes

[administrationRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/administrationRoute.js "administrationRoute.js")<br>
[apiRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/apiRoute.js "apiRoute.js")<br>
[debtRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/debtRoute.js "debtRoute.js")<br>
[medicineRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/medicineRoute.js "medicineRoute.js")<br>
[pageRoute.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/routes/pageRoute.js "pageRoute.js")<br>


# Register/Login Validation

[authValidation.js](https://github.com/fatihgumus59/Eczane-Otomasyonu/blob/master/validations/authValidation.js "authValidation.js")

# About the project

The **Express** module was used in the project, and the **ejs** module was used in the template engine. The project was written according to the **MVC** architecture. Validation processes in the system were provided with **joi**. The **multer** library was used to load the drug image. The **qrcode** library was used for QR operations. **bcrypt** is used for encryption operations. The **mongoose** library was used for registration to the **MongoDB** database as the database. A 32-character alphanumeric token was created for the Rest API, api security was provided by this token, and the **rand-token** library was used.

## From The Project

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

You can access the mobile design of the project via this [link](https://www.behance.net/gallery/144389355/Eczane-Otomasyonu)

