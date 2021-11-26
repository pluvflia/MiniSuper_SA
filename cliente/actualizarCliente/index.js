'use strict';
const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-2"});
exports.handler = async (event,context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

    let datas = await event.params.querystring;

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "MiniSuperSa-Cliente",
         Key:{
            "id": datas.id
        },
        UpdateExpression: "set direccion = :d",
        ExpressionAttributeValues: {
            ":d": datas.direccion
        },
        ReturnValues: "UPDATED_NEW"
    };
    try{
        const data = await documentClient.update(params).promise();
        responseBody = data;
        statusCode = 206;
    }catch(err){
        responseBody = "incapaz de actualizar el cliente";
        statusCode = 403;
    }
    const response = {
        statusCode: statusCode,
        body: responseBody
    };

    return response;
};