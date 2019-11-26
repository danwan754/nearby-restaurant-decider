## Nearby Restaurant Decider

Can't decide where to eat? Let this app choose for you. (Only available for Canada.)<br>

This app will randomly choose a nearby establishment with high ratings. Get information on location, contact, opening hours, pictures, and reviews.

The intention is for you to eat at the first location shown. However, you can skip this result and get another location, if you must.

![Demo gif](../assets/demo.gif)

#### How the app works

First, the user provides the required inputs and starts the search. The postal code is geocoded to get the latitude and longitude, which are then used to request a list of nearby establishments. A random establishment from the list will be chosen and presented to the user in detail. The user can skip the currently displayed establishment and details of another random establishment from the remainder of the list will be displayed.

------------------------------
#### Provide the following 3 inputs:
##### 1. Establishment type:
- restaurant
- cafe
- bar
- bakery

##### 2. Radius:
- 200 to 2500 meters

##### 3. Postal Code:
- Ex. v2h4k5

------------------
### Development / Demo

#### Environment variables:
|Required: | |
:---|---|
| GOOGLE_API_KEY | API key to retreive result data, ie. location, photos, reviews, ... |
| | |
|**Optional:** | |
| PORT | Port number to run server, defaults to 3001 |
| NEARBY_RESTAURANT_EMAIL | Email address for receiving feedback through contact form |
| NEARBY_RESTAURANT_EMAIL_PASSWORD | Password for the email |

Example of setting an environment variable in a Linux terminal:
> export GOOGLE_API_KEY="some_value"

### Install and run
> git clone https://github.com/danwan754/nearby-restaurant-decider.git<br>
> cd nearby-restaurant-decider<br>
> npm install<br>
> npm start

The above commands starts up the client, but the server also needs to be running. 
Open another terminal and in the */nearby-restaurant-decider/server* directory,  run:
> npm install<br>
> node server.js

Now the website should be usuable.

#### External APIs used:
Google Geocoding API<br>
Google Places API
