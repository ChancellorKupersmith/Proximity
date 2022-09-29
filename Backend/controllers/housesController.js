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
        const { lat, lng } = req.body;
        const requestUrl = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?latitude=${lat}&longitude=${lng}&radius=2`;
        const response = await fetch(requestUrl, {
            method: 'get',
            headers: {
                'accept': 'application/json',
                'APIKey': keys.ATTOM_API_KEY
            }
        });
        const resData = await response.json();
        // parse thru properties 
        for(const house of resData.property){
            console.log('\nAddress:');
            console.log(house.address);
            console.log('Location:');
            console.log(house.location);
        }
        return next();
    }
    catch(err){
        const errObj = createErr({method: 'getHouses', err: err});
        return next(errObj);
    }
}

module.exports = housesController;