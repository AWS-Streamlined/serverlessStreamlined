import { middyfy } from "@functions/middleware";
import { validateEnvVariables } from "@functions/utilities";

type Dependencies = {
  userPoolId: string;
  identityPoolId: string;
};

export const builder = (deps: Dependencies) => {
  const userPoolId = deps.userPoolId;
  const identityPoolId = deps.identityPoolId;

  const handler = async () => {
    console.log("Hello from function 3!");
    console.log(`Your user pool ID is ${userPoolId}, and your identity pool ID is ${identityPoolId}`);

    return {
      statusCode: 200,
    };
  };

  return handler;
};

export const main = middyfy(
  builder({
    userPoolId: validateEnvVariables("COGNITO_POOL_ID"),
    identityPoolId: validateEnvVariables("COGNITO_IDENTITY_POOL_ID"),
  }),
);
