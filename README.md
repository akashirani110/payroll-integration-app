# Pineapple Payroll Integration
This NodeJS Typescript project uses Xero API using the xero-node SDK and OAuth 2.0 in the backend app and React in the frontend app.


## Setting up Xero Organization 
Create an OAuth 2.0 app in Xero to get a *CLIENT_ID* and *CLIENT_SECRET*.

* Create a free Xero user account (if you don't have one) 
* Login to Xero Developer center https://developer.xero.com/myapps
* Click "New app"
* Enter your app details (your redirect URI: `http://localhost:${PORT}`)
* Click "Create App"
* Click "Generate a secret". Store Client ID and Client Secret it will be required for next steps
* Ensure you have Postman Installed
* If you are stuck anywhere follow this link https://www.youtube.com/watch?v=iIYI_JIUHfk

## Setting up the project in your system
Follow these steps in order to access the Employee and Employer features
* Clone the project in your terminal

`git clone https://github.com/cloud-down-au/payroll-project.git`

* Go to the folder Payroll Project

`cd payroll-project`



* Ensure you have node install in your system, else go to https://nodejs.org/en/. 

* Enter the command `node -v` hit Enter, you should be able view the version of node installed in your system.
* Enter `npm install` in same directory to install the dependencies required. 
* Go to folder `front-end` and Enter the command `npm install` again to install the dependencies. 
* Open the root directory in your editor tool. 
* Rename the `sample.env` file to `.env` file. 
* Enter your Xero Organization Client ID and Client Secret and save the file



```
CLIENT_ID=...
CLIENT_SECRET=...
REDIRECT_URI='http://localhost:{$PORT}/callback'
```
### How to Setup MySQL 
* Ensure you have MySQL setup in your system. We have used XAMPP for accessing MySQL. 
* You can download and install XAMPP from this link https://www.apachefriends.org/download.html Follow the instructions and you are good to go. 
* Once XAMPP is installed. Open the control panel. Click start on both Apache and MySQL. 
* Click Admin on MySQL, you will be redirected to http://localhost/phpmyadmin/
* Click on Import then select pineapple_payroll.sql file in the root directory of this project
* Open `.env` file and add these following lines and the file should have all these contents. 
```
CLIENT_ID='34412D51E15A40A19C14B1399A9BC7'...
CLIENT_SECRET='wHQ4yeyHDJ4HoUI7yyy2Jwhcm31AdvKR-rUfPkjGAopq6E'...
REDIRECT_URI='http://localhost:5000/callback'
DATABASE_HOST='localhost'
DATABASE_NAME='pineapple_payroll'
DATABASE_USERNAME='root'
DATABASE_PASSWORD='123'
```
* Above contents will change based on your MYSQL credentials and Xero Organization 

### Accessing Employee Feature

* Open the terminal in your editor. Enter the below command and Enter

```
npm run dev
```
* A default browser will open with address https://localhost:5000 
* Enter Login Details and give consent to access data, after this you will be redirected to http://localhost:3000/d/settings/integration
* Since there is no front-end to view the Employee Feature, you need to have have Postman installed. 
* Open Postman on the top left click on import. Click on link and paste this https://www.getpostman.com/collections/7c44046e52e67fba703e and hit Enter to continue

* Click on Pineapple, you should be able to view six request.
* Click on Find Employee. Enter Details of Employee i.e. firstName, lastName, Employee Email, Employee User ID and Pineapple user id and Hit Enter
* If the employee exist in your Organization. You will be get the response as `success:true` with status 200. 
* You can now update the following details of that Employee. 
  - Primary Bank Account
  - Add Savings Account
  - Change Pay Calendar
  - Change Savings Account default Amount
* Go the respective Request and enter the details required and change the details.


### Accessing Employer Feature -Front and Backend
* Let the current terminal be running at port 5000. Open another terminal. 
* Go to frontend folder with `cd frontend`. Enter the command
 `npm start` 
* Your browser will open a new webpage running at port 3000. Wait for the page to load. 
* Click sign up button on the top right corner to register with the Pineapple app
* Next you need to log in with xero by providing your credentials and your consent as well
* After you have provided your consent, you will be redirected to the Sign up form of Pinepple
  where you will see your company details such as Organisation name and ABN with which you just logged in   from Xero to connect with Pineapple
* Click next and you will be then redirected to personal details form where you need to fill all your       details
* Your details will be stored in the database along with the token generated by xero for future usage.




## Lost Souls
The enslaved (team) members responsible for the delivery of the project are as follows:

* Atirach Intaraudom (s3750202) - @atirudom
* Nandan K N (s751674) - @nandan
* Akash [fill your name]
* Zhaofend Guo [fill your name]



