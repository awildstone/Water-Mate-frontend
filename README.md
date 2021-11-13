
## Database Management

##### API

[MapQuest Geocoding API](https://developer.mapquest.com/documentation/geocoding-api/) for getting and saving a user's current geolocation lat/long coordinates.

[Sunset and sunrise times API](https://sunrise-sunset.org/api) for gathering solar data in a user's location.

##### Database Schema

[https://app.quickdatabasediagrams.com/#/d/mxfbkG](https://app.quickdatabasediagrams.com/#/d/mxfbkG)

![](https://user-images.githubusercontent.com/11568530/136269527-ad96618f-b55c-4ef6-8e06-852880730954.png)


## Capstone 2 Proposal

##### 1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however, if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project. 

The backend of this application will be in Python/Flask and the frontend of this application will be Node.js/React.

##### 2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application? 

This will be an evenly focused full stack application. 

The backend will handle logic to authenticate user requests, make calculations using data from an external api and existing user data in the database, and will serve the client data via api endpoints. The backend will handle user authentication (signup, login/logout) and generate a user session (stored in the browser in a cookie) to manage and authenticate requests.

The frontend will display data to an end user, and handle sanitation of data a user attempts to add to their account via forms. Frontend will dynamically give user feedback about missing or invalid inputs before a request is made to the server.

##### 3. Will this be a website? A mobile app? Something else? 

This is a website that will run out of a browser, but I will optimize the site for mobile browsers by creating a responsive layout.

##### 4. What goal will your project be designed to achieve? 

This project will help people who grow or care for indoor plants organize their plants into collections (identified by the location in their home), calculate a custom watering schedule for each plant, and notify the user when it is time to water the plant.

The calculation of the plant’s water schedule is accomplished using data from a solar api, data about the user’s location, data on base care requirements for the type of plant, and user input data on the plant’s location/proximity to a lightsource. Each time a plant is watered the app will get a forecast of solar data and calculate the next date the app should remind the user to water the plant.

##### 5. What kind of users will visit your app? In other words, what is the demographic of your users? 

Any person who owns houseplants and wants to create a watering schedule for those plants.

##### 6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API. 

Base care requirements for plants (optimal light conditions and max days without water) were collected from various plant care websites and are stored in an excel spreadsheet that is converted into a database table. The data can be modified, and uploaded into the database without affecting other users of the data as the data is read-only to other parts of the application.

Solar forecasting and solar data is gathered front the Sunrise-Sunset solar API.

Data on the user’s lat/long location is gathered on signup (or if the user modifies their location from their user profile). The Mapquest Geolocation API is used to calculate and save a user’s lat/long data. 

##### 7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information:

###### a. What does your database schema look like? 

[https://app.quickdatabasediagrams.com/#/d/mxfbkG](https://app.quickdatabasediagrams.com/#/d/mxfbkG) 

###### b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data. 

If the mapquest API is down users may have difficulty signing up. Robust error handling and user messaging is needed to communicate those issues to users trying to sign up or update their geolocation.

If the sunrise-sunset API is down the app will not be able to generate a solar forecast and calculate the next water date for a plant. Robust error handling is needed, and messaging to the end user to notify them if the request fails or the API is down.

###### c. Is there any sensitive information you need to secure? 

User passwords which will be encrypted.

###### d. What functionality will your app include? 

* Users will have the ability to create one or many collections to organize their plants (such as home or office).
* Users will have the ability to create rooms inside a collection (such as office or bedroom).
* Users can select the lightsource types for a room (Southwest window, artificial light, etc).
* Users can create and add plants to rooms in their collection. Upon creation the user selects an image of the plant to upload (or a default image is added if no image is uploaded), the name of the plant, select the type of plant from the plant type database, and select the lightsource the plant is closest to.
* Users can modify or delete details on plants, rooms, or collections.
Users can view a plant’s detail history on waterings and other care in a history table.


###### e. What will the user flow look like? 

After a user signs up for the first time they are directed to a getting-started page that details how to set up their collection and how to use the water manager to water or snooze a plant’s water schedule.

Users cannot access certain features until they have completed prerequisites required in the setup. The user dashboard offers a birdeye view of a user’s collection and will hide features from the user until prerequisites are completed. For example, a user cannot create a plant or room until a collection has been created. Once a collection is created, users will have the ability to create a room and select the lightsources available in the room (without a room with lightsources a plant cannot be added). Finally, a user can create a new plant by adding it to an existing room. Steps are repeated to add new rooms (selecting the lightsources), then adding plants to those rooms to complete the collection.

When a returning user loggs into the app, they are directed to the water-manager where they can view all plants that are ready to be watered. Users can click a button to add notes about the plant, then select the snooze or water button. Selecting the water button will calculate a new water date for the plant and remove the plant from view in the water manager. Selecting snooze will adjust the new water date +3 days and remove the plant from the view.

Users can only view/modify Collections, Rooms, and Plants that they created. Only authenticated users can access any of these features of the app.

###### f. What features make your site more than a CRUD app? What are your stretch goals?

This app helps with organizing a collection, and helps manage a care schedule for many types of plants with different care needs. 

Users can learn tips for better plant care through the use of this app in the getting started guides and through use of the water manager or through review of a plant’s care history. In the event that a plant dies, a user can learn from mistakes through review of the plant’s care history.

Stretch goals are to create a notification system where a user can create daily or weekly reminders via email (or text?) when there are plants that need care in the water manager.

Other stretch goals - tooltips that help users learn more about the app in context. Modifiers for the water schedule algorithm (such as distance from a window, or external obstacles that block sunlight like a building or tree).

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
