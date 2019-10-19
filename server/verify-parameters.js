    
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
        const establishmentLowerCase = establishment.toLowerCase();
        if (this.isEstablishment(establishmentLowerCase)) {
            return establishmentLowerCase;
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
            const message = "Invalid parameter for radius; " + "\'" + radius + "\'" + " is out of acceptable range from " + this.minRadius + " to " + this.maxRadius + ".";
            res.status(400).send(message);
        }
    }

    // Return countryCode if it exists. (Canada only for now)
    verifyCountryCode(countryCode, res) {
        const countryCodeLowerCase = countryCode.toLowerCase();
        if (this.isCountryCode(countryCodeLowerCase)) {
            return countryCode;
        }
        else {
            const message = "Invalid parameter for country code; " + "\'" + countryCode + "\'" + " is not acceptable. Only Canada (ca) is supported at the moment.";
            res.status(400).send(message);
        }
    }


    isEstablishment(establishment) {
        if (this.establishments.includes(establishment)) {
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
        if (this.countryCodes.includes(countryCode)) {
            return true;
        }
        return false;
    }
 }

 var exports=module.exports={};
 exports.verifyClass=VerifyParameters;