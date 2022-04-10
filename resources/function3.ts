import { createFunctionHandler } from "@resources/createFunctionHandler";
import { AwsCfInstruction } from "@serverless/typescript";
import { AuthorizerConfig } from "./utilities";

export const function3 = (authorizer: AuthorizerConfig, userPoolId: AwsCfInstruction, identityPoolId: AwsCfInstruction) =>
  createFunctionHandler("function3", "/function3", "POST", authorizer, [], {
    COGNITO_POOL_ID: userPoolId,
    COGNITO_IDENTITY_POOL_ID: identityPoolId,
  });
