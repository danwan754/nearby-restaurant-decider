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
##### Required:
GOOGLE_API_KEY &nbsp;&nbsp;&nbsp;&nbsp; (API key to retreive all result data ie. location, photos, reviews, ...)

##### Optional:
PORT  &nbsp;&nbsp;&nbsp;&nbsp; (port number to run server, defaults to 3001)<br>
NEARBY_RESTAURANT_EMAIL &nbsp;&nbsp;&nbsp;&nbsp; (email address for receiving feedback through contact form)<br>
NEARBY_RESTAURANT_EMAIL_PASSWORD  &nbsp;&nbsp;&nbsp;&nbsp; (password for the email)


#### External APIs used:
Google Geocoding API<br>
Google Places API
