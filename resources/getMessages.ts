import { createFunctionHandler } from "@resources/createFunctionHandler";
import { ServerlessParameter } from "./utilities";

export const getMessages = (mainTableArn: ServerlessParameter, mainTableName: ServerlessParameter) =>
  createFunctionHandler(
    "getMessages",
    "/messages",
    "GET",
    undefined,
    [
      {
        Action: ["dynamodb:Query"],
        Resource: [mainTableArn],
        Effect: "Allow",
      },
    ],
    {
      MAIN_TABLE_NAME: mainTableName,
    },
  );
