const Africa = require.context('./Africa', true, /.png$/);
const Asia = require.context('./Asia', true, /.png$/);
const Europe = require.context('./Europe', true, /.png$/);
const MiddleEast = require.context('./Middle East', true, /.png$/);
const NorthAmerica = require.context('./North America', true, /.png$/);
const Oceania = require.context('./Oceania', true, /.png$/);
const SouthAmerica = require.context('./South America', true, /.png$/);

const obj = {};
Africa.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 11); // remove the file extension
    // console.log("the countryCode: ", countryCode, ";");
    obj[countryCode] = Africa(key);
});
Asia.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 11); // remove the file extension
    // console.log("the countryCode: ", countryCode, ";");
    obj[countryCode] = Asia(key);
});
Europe.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 11); // remove the file extension
    // console.log("the countryCode: ", countryCode, ";");
    obj[countryCode] = Europe(key);
});
MiddleEast.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 11); // remove the file extension
    // console.log("the countryCode: ", countryCode, ";");
    obj[countryCode] = MiddleEast(key);
});
NorthAmerica.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 11); // remove the file extension
    // console.log("the countryCode: ", countryCode, ";");
    obj[countryCode] = NorthAmerica(key);
});
Oceania.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 11); // remove the file extension
    // console.log("the countryCode: ", countryCode, ";");
    obj[countryCode] = Oceania(key);
});
SouthAmerica.keys().forEach((key) => {
    const countryCode = key.split('./').pop() // remove the first 2 characters
        .substring(0, key.length - 11); // remove the file extension
    // console.log("the countryCode: ", countryCode, ";");
    obj[countryCode] = SouthAmerica(key);
});
export default obj;