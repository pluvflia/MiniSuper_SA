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
        Key:{
            "id" : datas.id
        }
    }
    try{
        await documentClient.delete(params).promise();
        responseBody = JSON.stringify("Se elimino el id: "+  datas.id + "  correctamente");
        statusCode = 204;
    }catch(err){
        responseBody = "incapaz de eliminar el pedido"
        statusCode = 403;
    }
    const response = {
        statusCode: statusCode,
        body: responseBody
    };

    return response;
};