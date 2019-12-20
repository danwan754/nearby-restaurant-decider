## Nearby Restaurant Decider

Can't decide where to eat? Let this app choose for you. (Only available for Canada.)<br>

This app will randomly choose a nearby establishment with high ratings. Get information on location, contact, opening hours, pictures, and reviews.

The intention is for you to eat at the first location shown. However, you can skip this result and get another location, if you must.

Demo: https://nearby-restaurant-decider.herokuapp.com/<br><br>

![Demo gif](../assets/demo.gif)

#### How the app works

First, the user provides the required inputs and starts the search. The postal code is geocoded to get the latitude and longitude, which are then used to request a list of nearby establishments. A random establishment from the list will be chosen and presented to the user in detail. The user can skip the currently displayed establishment and details of another random establishment from the remainder of the list will be displayed.

------------------
### Development / Demo
\* *Caution on cloning app for demo: an API key for Google Cloud Services is required and registering is quite tedious*

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

Set the required environment variable:
> GOOGLE_API_KEY="\<YOUR API KEY\>"

Clone this repo and change into this project's directory:
> git clone https://github.com/danwan754/nearby-restaurant-decider.git;<br>
> cd nearby-restaurant-decider;

Install the server dependencies and then run the server:
> npm install;<br>
> npm start;

Install client dependencies and run client development server by opening another terminal and in the */nearby-restaurant-decider/client* directory,  run:
> npm install;<br>
> npm start;

Now the web app can be accessed in http://localhost:3000/


#### External APIs used:
Google Geocoding API<br>
Google Places API
