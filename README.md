GEO-NOVO is an interactive website where users can add some of their favorite locations around their city.

TECH:
ReactJs: Front-End framework
Mysql: Database to store information on pins and comments
Cloudinary: Third Party app to upload images to, which creates a url linking to that picture
ExpressJs: Used for our Server.
Passport/Google- used to authenticate a user and sign them in
NodeJs-Command  Line tool that runs server side scripts
AWS: Deployed with S3 buckets

How to start the app:
To start the app simply  run npm install then npm run dev in one terminal and npm start in another and the page will be on localhost: 3000
Evironment variables:
in a .env file incude:
Will need to create a cloudinary account and add your cloud name to the file along with your  cloudinary API key and API secret
also add a google maps api key to the file and
for google O-auth you will need  a client id and client secret


Schema: https://dbdiagram.io/d/60213bfd80d742080a39a582
USER GUIDE:

When the page loads the user will see our homepage with an interactive map of the city of New Orleans. From there the user should find a navigation bar located above the map.

If the user is new to the site, they should venture over to our register page via the link in the navigation bar to create an account.

If the user already has an account they can also find our login page in our navigation bar. After the user had logged in or registered, they will be able to then search the city for interesting or cool spots indicated by a marker on the map.

When clicked, the marker will pop up and display an image, description, a favorite button inicated by a heart, and a comment box where the user can leave a comment on a marker.

The user can also contribute their own markers to the map! Simply click the ADD & DRAG button, place a marker on the location that you find interesting, then click the add pin button. From there you can give the marker a description, and even upload your own photo to the marker. Find your way back to the home screen and you'll be able to see your marker on the map!




