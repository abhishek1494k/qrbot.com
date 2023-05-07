 
<!-- | `Admin` |
| :-----: |  -->

<!-- https://qrbot.netlify.app/html/admin
admin@gmail.com
admin -->

<!-- <img src="mongodb+srv://QRBot:QRBot@qrbot.oagp3ux.mongodb.net/QRBot?retryWrites=true&w=majority" /> -->
<!-- port=5500 -->
<!-- token_secret="Secret" -->

<div align="center"  width="65" height="75">
  <img src="https://github.com/abhishek1494k/QRBOT.com/blob/main/Images/QR%20BOT.png?raw=true" alt="html" width="120" height="120"/>
</div>

QR Bot is a web application built using Nodejs, Expressjs, Mongoose, and MongoDB. The system is designed to allow users to generate number of QR Code and download the genrated QR image. It also help the users to analyse the generated QR code.  

## Tech Stacks Used

<p align = "center">
<img src="https://github.com/PrinceCorwin/Useful-tech-icons/blob/main/images/HTML.png" alt="html" width="55" height="55"/>
<img src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" alt="CSS" width="50" height="55"/>
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="js" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/nodejs.png" alt="nodejs" width="50" height="50"/>
<img src="https://res.cloudinary.com/kc-cloud/images/f_auto,q_auto/v1651772163/expressjslogo/expressjslogo.webp?_i=AA" alt="express" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/mongodb-leaf.png" alt="mongo" width="50" height="50"/> 
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" width="50" height="50"/>
  
</p>
<hr>

## Features 
-  Authentication
-  APIValidation
-  Responsive
-  Cross Platform
-  Signup/signin/Logout
-  QR Generator 
-  QR Analyser


## Run Locally
### Clone this Project

```
https://github.com/abhishek1494k/QRBOT.com
```

### Install npm Packages

```javascript
npm i --global
```

### Go to Backend Folder
```javascript
cd backend
```

### Run Server
```javascript
npx nodemon index.js
```

### Runs the project in the development mode
```
[http://localhost:5500]
```

### Environment Variables Required
`mongoURL`

`key`

`PORT`

`Nodemailer Password`

## NPM Packages
<p align = "center">
<img src="https://repository-images.githubusercontent.com/139898859/9617c480-81c2-11ea-94fc-322231ead1f0" alt="bcrypt.png" width="70" height="50"/>
<img src="https://github.com/faraz412/cozy-passenger-4798/blob/main/Frontend/Files/cors.png?raw=true" alt="cors" width="70" height="50"/>
<img src="https://github.com/faraz412/cozy-passenger-4798/blob/main/Frontend/Files/download.png?raw=true" alt="dotenv" width="60" height="50"/>
<img src="https://github.com/faraz412/cozy-passenger-4798/blob/main/Frontend/Files/JWT.png?raw=true" alt="jwt" width="70" height="50"/>
<img src="https://4008838.fs1.hubspotusercontent-na1.net/hubfs/4008838/mogoose-logo.png" alt="mongoose.png" width="70" height="70"/>     
<img src="https://i0.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1" alt="nodemailer" width="50" height="70"/>
<img src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png" alt="nodemon.png" width="50" height="50"/>
<img src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wNmFkMDUxNjc0NDA0NTVjOTQzYzE4NWIwNmM4NjBmMD9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.fJ4Me0BC-QzMrHKVqZzMx9CzgTcYb06jEt9nk9NxC2c" alt="otpgen.png" width="50" height="50"/>
</p>
   
## API Endpoints
   #### Home
```javascript
GET  /api/
```
   #### User Signup
```javascript
POST  /api/signup
```
  #### User Signin
```javascript
POST  /api/login
```
  #### User Logout
```javascript
POST  /api/logout
```
   #### QR 
```javascript
POST /api/qr/post
```

   ####  Admin Operations
 ```javascript
 GET /api/user/detail/
 ```
 
 ```javascript
 POST /api/user/block/
 ```
 
 ```javascript
 GET /api/user/block/details/
 ```
 
 ```javascript
 POST /api/user/unblock/
 ```
 
 ```javascript
 DELETE /api/user/delete
 ```
 
  

 ### 
`USERS DATA...`

    {"first_name":"harsh thakur",
    "email":"harsh@gmail.com",
    "password":"123456"  }

 ### 
`QR DATA...`

    {"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJO1Bmu2stkBmmOJXmyHN5G7UHmeA4xr5z0whR9JZF&s",
     "size":"150 x 150"
    "email":"abhisek@gmail.com"}
  


 <div align = "center">
 
| `Project Highlights` |
| :------------------: | 

 <img src="https://user-images.githubusercontent.com/112754448/221420942-4551e750-966f-4529-942e-0a96c8c260b1.png" width="600" height="250" />
 <img src="https://user-images.githubusercontent.com/112754448/221421124-5499cac6-4088-49ea-a22f-aae4da046310.png" width="600" height="250"/>
 <img src="https://user-images.githubusercontent.com/112754448/221421133-44a7c58b-e803-4107-ae76-8806e14a022d.png" width="600" height="250"/>
 <img src="https://user-images.githubusercontent.com/112754448/221421205-c42d3aa1-0609-4eee-b248-184d9562e5de.png" width="600" height="250"/>
 <img src="https://user-images.githubusercontent.com/112754448/221421220-db91dccc-16bb-40eb-9e33-45ca065f176f.png" width="600" height="250"/>
 
 ![image](https://user-images.githubusercontent.com/112754448/236664863-d999408c-2c7d-465f-a18b-dd70191975e8.png)

![image](https://user-images.githubusercontent.com/112754448/236664881-b299e261-42e0-4b5c-ae73-436e27cb2450.png)

 ![image](https://user-images.githubusercontent.com/112754448/236664961-8d75f7ce-170a-435e-a0f3-ec420cedc062.png)

 
<div/>
  

| `Demo` |
| :----: | 
   

[https://qrbot.netlify.app/]

Scan for Deployed Link: 

<img width="10%" src="https://user-images.githubusercontent.com/112754448/221485971-48d43e07-9a4f-4e48-b2ed-0552e9e7624a.png"><br>

 
| `Authors` |
| :-------: | 

 [@abhishek1494k](https://github.com/abhishek1494k) 
 
 [@utdsi](https://github.com/utdsi) 
 
 [@Akashfw](https://github.com/Akashfw) 
 
 [@Yunuslala](https://github.com/Yunuslala) 
 
 [@Yuvraj1307](https://github.com/Yuvraj1307) 

