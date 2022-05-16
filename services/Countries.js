const axios = require('axios');

const countriesApi = axios.create({
    baseURL: 'https://restcountries.com/v3.1'
});

const methods = {
    async getByAlphaCode(countryCode){
        try{
            const response = await countriesApi.get(`/alpha/${countryCode}`);
            if(response.status !== 200){
                throw new Error("A requisição não deu certo!");
            }
            return response.data;
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = methods;