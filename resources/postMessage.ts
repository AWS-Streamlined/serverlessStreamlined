import { createFunctionHandler } from "@resources/createFunctionHandler";
import { AwsCfInstruction } from "@serverless/typescript";

export const postMessage = (mainTableArn: AwsCfInstruction, mainTableName: AwsCfInstruction) =>
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
