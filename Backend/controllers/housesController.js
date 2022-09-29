const fetch = require('node-fetch');
const keys = require('../../keysBackend');

const createErr = (errInfo) => {
    const { method, type, err } = errInfo;
    return { 
      log: `housesController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: `Error occurred in housesController.${method}. Check server logs for more details.` }
    };
};

const housesController = {};



housesController.getHouses = async (req, res, next) =>{
    try{
        console.log(req.query)
        const { lat, lng } = req.query;
        const requestUrl = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?latitude=${lat}&longitude=${lng}&radius=2`;
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'APIKey': keys.ATTOM_API_KEY
            }
        });
        const resData = await response.json();
        const houses = [];
        // parse thru properties adding to res.locals.houses obj
        for(const house of resData.property){
            console.log('\nAddress:');
            console.log(house.address);
            console.log('Location:');
            console.log(house.location);

            houses.push({
                address: house.address.oneLine,
                location: { 
                    lat: Number(house.location.latitude),
                    lng: Number(house.location.longitude)
                }
            });
        }
        res.locals.houses = houses;
        return next();
    }
    catch(err){
        const errObj = createErr({method: 'getHouses', err: err});
        return next(errObj);
    }
}

module.exports = housesController;