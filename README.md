# MyMusic App

## Description

This project involves the use of TF-IDF vectoriser in python to create recommendations based on your favourite songs and Then uses Spotipy to integrate users. For the purpose of this project this accesses my playlists and recent songs

<br />

## Tech-Stack Used

 1. Frontend: ReactJS
 2. Backend: Python Flask
 3. Machine Learning Algorithm Used: Scikit-learn TF-IDF vectoriser
 4. Language Used for ML: Python
 
# Setting the Project Up
 
## STEP 1: Downloading the Repository

Download the Repositry from the github page
<br />

<img src="readmeimages/downloading.png" width="50%"> 
<br />

## STEP 2: Setting up the Set Execution policy before creating the virtual environment

Open the powershell with admin access 
<br />
<img src="readmeimages/pic1.png" width="50%">
<br />

Execute the following Set-ExecutionPolicy unrestricted command and then answer Y to configure
<br />
<img src="readmeimages/pic2.png" width="50%"> 
<br />

## STEP 3: Configuring the files

Delete the package.json and package-lock.json from the mymusic folder and manifest.json from the ppublic folder
<br/>
<img src="readmeimages/pic3.png" width="50%">
<br />
<br/>
<img src="readmeimages/pic4.png" width="50%">
<br/>
<br/>

Download package.json, package-lock.json and manifest.json 
<br/>
<img src="readmeimages/pic5.png" width="50%">
<br />
<br/>
manifest.json is in public directory
<br/>
<br/>
<img src="readmeimages/pic6.png" width="50%">
<br/>
<br/>

Replacing the previously deleted files with the newly downloaded ones
<br/>
<img src="readmeimages/pic7.png" width="50%">
<br/>
<br/>
<img src="readmeimages/pic8.png" width="50%">

## STEP 4: Adding the venv and setting up the frontend and backend
1. In the powershell terminal move to engage-project
    <br/>
    <br/>
    - pip install virtualenv 
    - virtualenv env
    - .\env\Scripts\activate.ps1
    
    <br />
    <img src="readmeimages/carbon.png" width="50%">
    <br/>
2. Install flask in the virtual environment
   <br/>
   <br />
   - pip install flask
   <br />
   <img src="readmeimages/flaskinstall.png" width="50%">
   <br />
3. Configuring the react
   <br />
   <br />
   - cd mymusic
   - npm install
   <br />
   <img src="readmeimages/npm.png" width="50%">
   <br/>
4. Moving back into the directory to run these pip commands
    <br />
    <br />
    - cd ..
    - pip install spotipy
    - pip install flask-cors
    - pip install pandas
    - pip install python-dotenv
    - pip install scikit-learn
    - pip install matplotlib
    <br />
    <br />
    <img src="readmeimages/npm.png" width="50%">
    <br />
   
5. Running flask to run the backend
    <br />
    <br />
    - flask run
    <br/>
    <br />
    <img src="readmeimages/flaskrun.png" width="50%">
    <br />
   
6. Start the react server
    <br />
    <br />
    - cd mymusic
    - npm start
    <br />
    <br />
    <img src="readmeimages/npmstart.png" width="50%">
    <br />
    
7. The page should load on localhost:3000 and the backend on localhost:5000
