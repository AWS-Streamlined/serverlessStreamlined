import { createFunctionHandler } from "@resources/createFunctionHandler";
import { ServerlessParameter } from "./utilities";

export const postMessage = (mainTableArn: ServerlessParameter, mainTableName: ServerlessParameter) =>
  createFunctionHandler(
    "postMessage",
    "/messages",
    "POST",
    undefined,
    [
      {
        Action: ["dynamodb:UpdateItem"],
        Resource: [mainTableArn],
        Effect: "Allow",
      },
    ],
    {
      MAIN_TABLE_NAME: mainTableName,
    },
  );
