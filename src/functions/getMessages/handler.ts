import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { middyfy } from "@functions/middleware";
import { validateEnvVariables } from "@functions/utilities";
import { Event, Response, responseSchema } from "./schema";

type Dependencies = {
  region: string;
  mainTableName: string;
};

export const builder = (deps: Dependencies) => {
  const mainTableName = deps.mainTableName;
  const ddbClient = new DynamoDBClient({ region: deps.region });

  const handler = async (event: Event): Promise<Response> => {
    console.log("Hello from function 2!");

    const updateItem = new QueryCommand({
      TableName: mainTableName,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
      ExpressionAttributeValues: {
        ":pk": {
          S: `U#${event.queryStringParameters.name}`,
        },
        ":sk": {
          S: `T#`,
        },
      },
    });

    const result = await ddbClient.send(updateItem);

    return {
      statusCode: 200,
      body: result.Items
        ? result.Items.map((item) => ({
            name: item.username.S ? item.username.S : "",
            message: item.message.S ? item.message.S : "",
          }))
        : [],
    };
  };

  return handler;
};

export const main = middyfy(
  builder({
    region: validateEnvVariables("AWS_REGION"),
    mainTableName: validateEnvVariables("MAIN_TABLE_NAME"),
  }),
  undefined,
  responseSchema,
);
