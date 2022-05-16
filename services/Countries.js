const axios = require('axios');

const countriesApi = axios.create({
    baseURL: 'https://restcountries.com/v3.1'
});

const methods = {
    async getByAlphaCode(countryCode){
        try{
            const response = await countriesApi.get(`/alpha/${countryCode}`);
            //Caso ocorra erro no consumo da api, neste if estamos forçando o erro a cair dentro do catch.
            if(response.status !== 200){
                throw new Error("A requisição não deu certo!");
            }

            //Caso de tudo certo, irá retornar o json (resposta do servidor da api). O axios já configurou tudo que vem no json da API dentro do método data.

            return response.data;
        } catch(err){
            console.log(err);
        }
    }
}

//Testando o cosumo da API, passando o alphacode do Brasil. No resultado, veremos que o próprio axios pega o JSON e converte pra JS. Para verificar o resultado, descomente a linha de baixo e executa este arquivo (node ./services/Countries.js).
methods.getByAlphaCode("BRA").then(result => console.log(result));

module.exports = methods;