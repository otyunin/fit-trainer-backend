# fit-trainer (Back-end)

Internship project at InCode Group.
 
 ## Getting started
    $ git clone https://github.com/otyunin/fit-trainer-backend.git
    $ cd fit-trainer-backend
    $ npm install    
 
  You must start the MongoDB database before starting the server. 
  
      On Linux:
          $ sudo service mongod start
      On Windows:
          C:\Program Files\MongoDB\Server\<YOUR_VERSION>\bin\mongod.exe
          
Then start the server: 
         
     $ npm run start     
     
 The server is running on the [http://localhost:8080/](http://localhost:8080/)
 
**Front-end part [here](https://github.com/otyunin/fit-trainer-frontend.git/)**

 ## If the port is occupied by another process:
 
      On Linux:
          $ fuser -k -n tcp <PortNumber>
          $ kill -9 <ProcessID>
      On Windows:
          $ netstat -ano | findstr :<PortNumber>
          $ taskkill /PID <ProcessID> /F
 
 ## Scripts
 Start production:
  
     $ npm run start
     
 Start dev (nodemon):
   
      $ npm run dev

