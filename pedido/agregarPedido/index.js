'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});
exports.handler = async (event,context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let datas = await event.params.querystring;

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "MiniSuperSa-Pedido",
         Item:{
            "id": datas.id,
            "monto_total": datas.monto_total,
            "direccion": datas.direccion
        }
    }
    try{
        const data = await documentClient.put(params).promise();
        responseBody = data;
        responseBody = params.Item;
        statusCode = 202;
    }catch(err){
        responseBody = "incapaz de agregar el pedido"
        statusCode = 403;
    }
    const response = {
        statusCode: statusCode,
        body: responseBody
    };

    return response;
}; 