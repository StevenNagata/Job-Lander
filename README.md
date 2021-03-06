# Job-Lander
A full stack JavaScript application for recent graduates who want to organize their job hunt

# Live Demo
 https://job-lander.herokuapp.com
  
# Usage
Clone and install dependencies.
```
git clone https://github.com/StevenNagata/Job-Lander.git
cd Job-Lander/
npm install
```
Create an '.env' file in the project root.
You will need an AWS bucket to save files to. 
Update you bucket policy to have public read access.
Put your S3 bucket name, Access key, and secret key into the .env file

```
PORT=3000
S3_BUCKET=xxxxxx
WS_ACCESS_KEY_ID=xxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxx
```
Run the application
```
npm run watch
```

# Technologies
<ul>
<li>React.js</li>
<li>Node.js</li>
<li>Express.js</li>
<li>JSON.server</li>
<li>HTML5</li>
<li>CSS3</li>
<li>JavaScript</li>
<li>Material UI</li>
<li>AWS</li>
<li>Multer</li>
<li>Multer S3</li>
  </ul>
 
 # App Features
<ol>
  <li>User can create a job prospect</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48097053-abb34d00-e1cd-11e8-9239-601f17d22150.gif"/>
  <br/>
  <li>User can edit a job prospect</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48097032-9dfdc780-e1cd-11e8-8b57-94263112812c.gif"/>
  <br/>
  <li>User can delete a job prospect</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48097115-cf769300-e1cd-11e8-8c37-786568fd67b8.gif"/>
  <br/>
  <li>User can create an event for a job prospect</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48097087-bcfc5980-e1cd-11e8-9cdc-a9570756f2d4.gif"/>
  <br/>
  <li>User can edit an event</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48097139-dac9be80-e1cd-11e8-9a67-eca2a582eeaf.gif"/>
  <br/>
  <li>User can delete an event</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48097150-e2896300-e1cd-11e8-80af-3e44f0fe11cb.gif"/>
  <br/>
  <li>User can favorite a job prospect</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48093328-ec0dcd80-e1c3-11e8-9ca1-49e51742b461.gif"/>
 <br/>
   <li>User can add a file to a job prospect</li>
  <br/>
<img src="https://user-images.githubusercontent.com/42354826/48100545-9abc0900-e1d8-11e8-8d9c-50553428da4f.gif"/>
  <br/>
</ol>
