'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});
exports.handler = async (event,context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let datas = await event.params.querystring;

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "MiniSuperSa-Producto",
         Key:{
            "id": datas.id,
        }
    }
    try{
        const data = await documentClient.get(params).promise();
        responseBody = data
        statusCode = 203;
    }catch(err){
        responseBody = "incapaz de obtener el producto"
        statusCode = 403;
    }
    const response = {
        statusCode: statusCode,
        body: responseBody
    };

    return response;
};