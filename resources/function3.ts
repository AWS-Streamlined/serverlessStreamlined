import { createFunctionHandler } from "@resources/createFunctionHandler";
import { AuthorizerConfig, ServerlessParameter } from "./utilities";

export const function3 = (authorizer: AuthorizerConfig, userPoolId: ServerlessParameter, identityPoolId: ServerlessParameter) =>
  createFunctionHandler("function3", "/function3", "POST", authorizer, [], {
    COGNITO_POOL_ID: userPoolId,
    COGNITO_IDENTITY_POOL_ID: identityPoolId,
  });
