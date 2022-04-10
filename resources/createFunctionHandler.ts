import { AwsCfInstruction } from "@serverless/typescript";
import { AuthorizerConfig } from "./utilities";

export type AdditionalPolicyStatement = {
  Action: string[];
  Resource: AwsCfInstruction[];
  Effect: "Allow" | "Deny";
};

export const createFunctionHandler = (
  functionName: string,
  path: string,
  method: string,
  authorizer?: AuthorizerConfig,
  policyStatements: AdditionalPolicyStatement[] = [],
  environmentVariables: { [key: string]: AwsCfInstruction } | undefined = undefined,
  timeout = 5,
  memorySize = 256,
) => {
  const resourceName = functionName.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

  return {
    handler: `./src/functions/${functionName}/handler.main`,
    environment: environmentVariables,
    iamRoleStatementsName: `${resourceName}-exec-role-pulumi-serverless-journey`,
    iamRoleStatementsInherit: true,
    iamRoleStatements: policyStatements,
    timeout,
    memorySize,
    events: [
      {
        http: {
          path,
          method,
          authorizer,
          cors: true,
        },
      },
    ],
  };
};
