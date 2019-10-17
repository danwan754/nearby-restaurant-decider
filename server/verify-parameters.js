    
 class VerifyParameters {


    constructor() {
        this.establishments = ['restaurant', 'cafe', 'bakery', 'bar'];
        this.countryCodes = ['ca'];
        this.minRadius = 500;
        this.maxRadius = 5000;

        this.verifyEstablishment = this.verifyEstablishment.bind(this);
        this.verifyPostalCode = this.verifyPostalCode.bind(this);
        this.verifyRadius = this.verifyRadius.bind(this);
        this.verifyCountryCode = this.verifyCountryCode.bind(this);
        this.isEstablishment = this.isEstablishment.bind(this);
        this.isPostalCode = this.isPostalCode.bind(this);
        this.isRadius = this.isRadius.bind(this);
        this.isCountryCode = this.isCountryCode.bind(this);
    }


    // Return establishment if parameter is acceptable
    verifyEstablishment(establishment, res) {
        if (this.isEstablishment(establishment)) {
            return establishment;
        }
        else {
            const message = "Invalid parameter for establishment; " + "\'" + establishment + "\'" + " is unacceptable.";
            res.status(400).send(message);
        }
    }

    // Return postal_code if it is in correct postal code format (Canada)
    verifyPostalCode(postalCode, res) {
        if (this.isPostalCode(postalCode)) {
            return postalCode;
        }
        else {
            const message = "Invalid parameter for postal code; " + "\'" + postalCode + "\'" + " is in unacceptable format.";
            res.status(400).send(message);
        }
    }

    // Return radius if it is in range 1000 - 5000
    verifyRadius(radius, res) {
        if (this.isRadius(radius)) {
            return radius;
        }
        else {
            const message = "Invalid parameter for radius; " + "\'" + radius + "\'" + " is out of acceptable range from " + minRadius + " to " + maxRadius;
            res.status(400).send(message);
        }
    }

    // Return countryCode if it exists. (Canada only for now)
    verifyCountryCode(countryCode, res) {
        if (this.isCountryCode(countryCode)) {
            return countryCode;
        }
        else {
            const message = "Invalid parameter for country code; " + "\'" + countryCode + "\'" + " is not acceptable. Only Canada (ca) is supported at the moment.";
            res.status(400).send(message);
        }
    }


    isEstablishment(establishment) {
        const establishmentLowerCase = establishment.toLowerCase();
        if (this.establishments.includes(establishmentLowerCase)) {
            return true;
        }
        return false;
    }

    isPostalCode(postalCode) {
        if (/[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]/.test(postalCode)) {
            return true;
        }
        return false;
    }

    isRadius(radius) {
        if (radius >= this.minRadius && radius <= this.maxRadius) {
            return true;
        }
        return false;
    }

    isCountryCode(countryCode) {
        const countryCodeLowerCase = countryCode.toLowerCase();
        if (this.countryCodes.includes(countryCodeLowerCase)) {
            return true;
        }
        return false;
    }
 }

 var exports=module.exports={};
 exports.verifyClass=VerifyParameters;