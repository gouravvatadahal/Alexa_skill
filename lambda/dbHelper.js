var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
const tableName = "Alexa_CreateCase";

var dbHelper = function () { };
var docClient = new AWS.DynamoDB.DocumentClient();

dbHelper.prototype.getdata = (PhoneNumber) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: "#PhoneNumber = :PhoneNumber",
            ExpressionAttributeNames: {
                "#PhoneNumber": "PhoneNumber"
            },
            ExpressionAttributeValues: {
                ":PhoneNumber": PhoneNumber
            }
        }
        docClient.query(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            } 
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            resolve(data.Items)
            
        })
    });
}


module.exports = new dbHelper();