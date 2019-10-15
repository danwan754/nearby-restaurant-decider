var app=require("../verify-parameters.js");


describe("Verify Parameters Module.", function () {
    verify = new app.verifyClass;

    describe("Verify establishment type.", function () {
        it("Type 'restaurant' is acceptable.", function () {
            expect(verify.isEstablishment("Restaurant")).toBe(true);
        });
        it("Lowercase letters are acceptable.", function () {
            expect(verify.isEstablishment("restaurant")).toBe(true);
        });
        it("Uppercase letters are acceptable.", function () {
            expect(verify.isEstablishment("CAFE")).toBe(true);
        });
        it ("Type is not acceptable.", function () {
            expect(verify.isEstablishment("winery")).toBe(false);
        });
    });

    describe("Verify postal code format.", function () {
        it("Format like 'a1a1a1' is acceptable.", function() {
            expect(verify.isPostalCode("a1a1a1")).toBe(true);
        });
        it("Format like 'a1a111' is unacceptable.", function() {
            expect(verify.isPostalCode("1a1a1a")).toBe(false);
        });
        it("Format like '000000' is unacceptable.", function() {
            expect(verify.isPostalCode("000000")).toBe(false);
        });
        it("Uppercase letters are acceptable.", function() {
            expect(verify.isPostalCode("B2B2C3")).toBe(true);
        });
        it("Lowercase and uppercase letters are acceptable.", function() {
            expect(verify.isPostalCode("C3d4J6")).toBe(true);
        });
    });

    describe("Verify radius.", function() {
        it("Minimum radius is acceptable.", function () {
            value = verify.minRadius;
            expect(verify.isRadius(value)).toBe(true);
        });
        it("Maximum radius is acceptable.", function () {
            value = verify.maxRadius;
            expect(verify.isRadius(value)).toBe(true);
        });
        it("Less than minimum radius is unacceptable.", function () {
            value = verify.minRadius - 1;
            expect(verify.isRadius(value)).toBe(false);
        });
        it("More than maximum radius is unacceptable.", function () {
            value = verify.maxRadius + 1;
            expect(verify.isRadius(value)).toBe(false);
        });
        it("Within min and max radius is acceptable.", function () {
            value = (verify.minRadius + verify.maxRadius) / 2; 
            expect(verify.isRadius(value)).toBe(true);
        });
    });

    describe("Verify country code.", function () {
        it("Canada code allowed.", function () {
            expect(verify.isCountryCode("ca")).toBe(true);
        });
        it("US code not allowed.", function () {
            expect(verify.isCountryCode("us")).toBe(false);
        });
        it("Uppercase letters are acceptable.", function () {
            expect(verify.isCountryCode("CA")).toBe(true);
        });
    })

    // describe("Verify ")
});