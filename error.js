
// return custom error message for errors from Google API requests
function getGoogleErrorMessage(status) {
    let message;
    switch(status) {
        case 'ZERO_RESULTS':
            message = 'No results found. Your location may be too remote. Maybe try a larger radius.';
            break;
        case 'OVER_QUERY_LIMIT':
            message = 'Quota for this website has been reached. Try another day.';
            break;
        case 'REQUEST_DENIED':
            message = 'API key is invalid. Please contact the site admin.';
            break;
        case 'INVALID_REQUEST':
            message = 'Missing parameter in request.';
            break;
        case 'UNKNOWN_ERROR':
            message = 'Unexpected server error. Please try again.';
            break;
    }
    return message;
}


function GoogleRequestException(status) {
    this.status = status;
    this.message = getGoogleErrorMessage(status);
    this.toString = function() {
       return this.status + " : " + this.message;
    };
 }

 function InvalidUserParameterException(status, message) {
    this.status = status;
    this.message = message;
    this.toString = function() {
       return this.status + " : " + this.message;
    };
 }

 module.exports = { GoogleRequestException, InvalidUserParameterException };