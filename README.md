
## Water Mate

[Water Mate](https://www.watermate.app/) is an application that helps plant lovers organize their plant collections and calculates a custom water schedule for each plant.

[https://www.watermate.app/](https://www.watermate.app/)

### Technologies Used

###### Backend
Water Mate has a backend API that handles client requests [the Git repository is here](https://github.com/awildstone/Water-Mate-backend). The backend is responsible for handling user authentication, user CRUD actions, communicating with all external APIs and calculations for the water and solar algorithms.

* The backend API is built on the Python Flask framework and uses Flask-SQLAlchemy ORM.
* Postgres database is used for persisting user data.
* [S3 (Boto3)](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html) is used for persisting user uploaded images.

###### Frontend
Water Mate has a frontend user application that is built with React (using create-react-app). 

* The UI elements are built with [Material UI](https://mui.com/) components.
* Forms are built using the [Formik](https://formik.org/) library with [Yup](https://github.com/jquense/yup) validation schema library.

### How it works

###### User Flow
After a user signs up for the first time they are directed to a getting-started page that details how to set up their collection and how to use the water manager to water or snooze a plant’s water schedule.

Users cannot access certain features until they have completed prerequisites required in the setup. The user dashboard offers a birdeye view of a user’s collection and will hide features from the user until prerequisites are completed. For example, a user cannot create a plant or room until a collection has been created. 

Once a collection is created, users will have the ability to create a room and select the lightsources available in the room. With lightsources added to the room, a user can create a new plant by adding it to an existing room. Steps are repeated to add new rooms (selecting the lightsources for the room), then adding plants to those rooms to complete the collection.

When a returning user logs into the app, they are directed to the water-manager where they can view all plants that are ready to be watered. Users can click a button to add notes about the plant, then select the snooze or water button. Selecting the water button will calculate a new water date for the plant and remove the plant from view in the water manager. Selecting snooze will adjust the new water date + 3 days and remove the plant from the view.

Users can only view/modify Collections, Rooms, and Plants that they created. Only authenticated users can access any of these features of the app.

###### Organization

Users get started by adding their Collection(s), then adding Rooms, Lightsources, and Plants into their collection.

* Users can organize their plants into Collection(s) like Home or Work.
* Inside a user's collection are Rooms like Bedroom or Kitchen.
* Rooms organize Lightsources (like Artifical lights South, or East window) and Plants!
* Users add Rooms to their Collection, select the Lightsource available in the Room, then add their Plant to the room selecting the plant's type and lightsource on creation.

###### Water Algorithm

The Water Mate algorithm uses user location data, plant location and species data, and real time solar data to calculate a custom water schedule for each plant in a user's collection. 

* A solar forcast that is unique to the user's location and the time of year is used to calculate a watering schedule for a plant with consideration of the plant's type and the care and light requirements that plant needs (and recieves) in the user's home.
* The algorithm uses a solar forcast API to account for changes and adjust the watering schedule for a plant. 
* Changes such as seasonal (transitioning from winter to the summer growing season) or even moving your plant's location in your home (changing its lightsource). 
* The algorithm also considers less than optimal conditions based on the plant's type and adjusts accordingly.

### Features

###### Dashboard

The Dashboard is where a user can create and manage their plant collection(s). Users have a birdseye view of a Collection and can toggle between multiple Collection views.

I created the Dashboard because I wanted users to have one place where they can Add, Edit, or Delete elements in their Collection and easily toggle between Collections if a user has multiple.

###### Water Manager

The Water Manager is the next main feature of Water Mate. The Water Manager will display all of the plants that need to be watered for a user. In this view a user can mark plants watered, snooze a plant's water schedule, and leave notes about the water/snooze event (optional). Once a water or snooze action is taken on a plant, the plant disappears from the Water Manager view until it needs care again.

Users can sort the current plants that need watering by most urgent (plants that are far past their recommended water date by species), last water date, or plant species type. Users can also filter plants that need watering by their room.

I created this view so that there is one place a user can go each day to manage all of their plants that need water. The sorting and filtering options for this view were added to give options for users to strategically tackle their plant care routine that day. The notes feature is an optional tool for users to log record of the plant's care such as fertilization, pest prevention/pest discovery, and a log of water/snooze events. Notes about a plant are all logged in a plant's care history table.

###### Other Features

1. **Plant Detail View** is a detailed view for each plant in a collection. Here a user can view/edit details about a plant, view the plant's care history, modify the plant's water schedule, and delete the plant if it died :(
2. **Plant History** displays all of the care actions (water or snooze) a plant has. This view is helpful for users looking for notes about care, or deciding if a water schedule should be modified.
3. **Plant Water Schedule** is where a user can modify the water schedule for their plant if they determine the automation needs tweeking. Users can also turn off the water automation entirely and set a manual water schedule (this feature is especially helpful for very controlled environments such as artificial light).
3. **User Profile** allows a user to view/edit the details of their account. A user can modify their user details, update their geolocation, and delete their account if needed.


### API

[MapQuest Geocoding API](https://developer.mapquest.com/documentation/geocoding-api/) for getting and saving a user's current geolocation lat/long coordinates.

[Sunset and sunrise times API](https://sunrise-sunset.org/api) for gathering solar data in a user's location.

### Database Schema

[https://app.quickdatabasediagrams.com/#/d/mxfbkG](https://app.quickdatabasediagrams.com/#/d/mxfbkG)

![](https://user-images.githubusercontent.com/11568530/143668498-8e84f1b1-f65a-49e2-9cc2-423ccc572cf8.png)


### Changelog

- 2/19/2023: Add new `Water Now` feature in the plant profile that allows a user to water a plant immediately if the plant schedule is behind and not accessible to water in the `Water Manager`.
![](/public/images/water-now-feature.png)

