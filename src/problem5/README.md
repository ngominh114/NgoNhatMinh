# How to run
Follow this instruction step-by-step to setup the application on your machine.
### 1. Install NodeJs

This application is build with NodeJs so in order to run this application you need to install NodeJs on your machine. The installer can be download from NodeJs [official website](https://nodejs.org/en/download)

### 2. Install all the dependencies

1. Open a terminal and route it to the root folder of the project
2. Run the following command: ```npm install``` and wait until all the required packages are installed successfully

### 3. Create the local .env file
1. Copy the content of file .env.example to another file and name it ```.env```
2. Change the value of all the variables inside ```.env``` according to your own configuration

### 4. Run the application
1. Open a terminal at the root folder of the project
2. Run the following command ```npm run start``` to run the application or ```npm run dev``` for development mode (this will enhance developer experience by running the application with ```nodemon``` which will allow you to hot update the change to the running app without restarting it). The application will run on your localhost and listen to the port that was configured in the ```.env``` file.