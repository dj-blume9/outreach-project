import {CountryCode, parsePhoneNumberFromString} from "libphonenumber-js";

export const formatPhoneNumber = (number: string, countryCode: CountryCode = 'US') => {
    const phoneNumber = parsePhoneNumberFromString(number, countryCode);
    return phoneNumber ? phoneNumber.formatNational() : number;
};