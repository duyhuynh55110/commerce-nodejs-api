# Commerce Nodejs API (Nodejs, MongoDB, Docker)

## I. Description
-------
- Demo project using **Nodejs**, **MongoDB** and **Docker** to develop
- Purpose you need to get when develop this project 
    + Basic folder structure for a nodejs project
    + How to build REST API use **Nodejs**, **MongoDB**
    + Understand how to build and run **Docker**

## II. Getting Started
-------
### 1. Dependencies
- Docker version >= 20.10.5 
    + Download for Mac [Download](https://docs.docker.com/desktop/mac/install/)
    + Download for Windows [Download](https://docs.docker.com/desktop/windows/install/)

### 2. Installing
To run it locally you need clone to your local
```
git clone https://github.com/duyhuynh55110/commerce-nodejs-api.git
```

After download you need build and run docker. Go to source code 
```
cd commerce-nodejs-api
``` 

Create .env file 
```
cp .env.local .env
```

Run docker container 
```
docker-compose up
```

If you see these messages. Congratulation it install successfully !!! <br/>
![Screen Shot 2021-10-19 at 10 54 01 AM](https://user-images.githubusercontent.com/51083161/137841202-cefae8e7-1ce3-4f39-abd3-e1dff8ea3074.png)

## III. Check Wiki to see more how to use
Connect to MongoDB using MongoDB Compass
> https://github.com/duyhuynh55110/commerce-nodejs-api/wiki/01.--Connect-to-MongoDB-using-MongoDB-Compass

How to run API using Postman
> https://github.com/duyhuynh55110/commerce-nodejs-api/wiki/02.-How-to-run-API-using-Postman

Create template data
> https://github.com/duyhuynh55110/commerce-nodejs-api/wiki/99.-Data-Seeder
