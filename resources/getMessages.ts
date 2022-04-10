import { createFunctionHandler } from "@resources/createFunctionHandler";
import { AwsCfInstruction } from "@serverless/typescript";

export const getMessages = (mainTableArn: AwsCfInstruction, mainTableName: AwsCfInstruction) =>
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
