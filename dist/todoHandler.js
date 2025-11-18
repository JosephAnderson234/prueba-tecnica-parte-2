"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client_dynamodb_2 = require("@aws-sdk/client-dynamodb");
const uuid_1 = require("uuid");
const TABLE_NAME = process.env.TABLE_NAME;
const client = new client_dynamodb_1.DynamoDBClient({});
const handler = async (event) => {
    try {
        const method = event.httpMethod;
        console.log("Received method:", method);
        if (method === "GET") {
            const command = new client_dynamodb_2.ScanCommand({
                TableName: TABLE_NAME,
            });
            const response = await client.send(command);
            const items = response.Items?.map((i) => {
                return {
                    id: i.id_todo.S,
                    titulo: i.titulo.S,
                    completada: i.completada.BOOL,
                };
            });
            return {
                statusCode: 200,
                body: JSON.stringify(items),
            };
        }
        if (method === "POST") {
            if (!event.body) {
                return { statusCode: 400, body: "Body requerido" };
            }
            const data = JSON.parse(event.body);
            if (!data.titulo || typeof data.titulo !== "string") {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "El campo 'titulo' es obligatorio y debe ser string" }),
                };
            }
            const item = {
                id_todo: (0, uuid_1.v4)(),
                titulo: data.titulo,
                completada: false,
            };
            const putCommand = new client_dynamodb_2.PutItemCommand({
                TableName: TABLE_NAME,
                Item: {
                    id_todo: { S: item.id_todo },
                    titulo: { S: item.titulo },
                    completada: { BOOL: item.completada },
                },
            });
            await client.send(putCommand);
            return {
                statusCode: 200,
                body: JSON.stringify(item),
            };
        }
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Método no soportado" }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error interno", details: error.message }),
        };
    }
};
exports.handler = handler;
