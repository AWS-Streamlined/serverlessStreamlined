import { createUserPool } from "@resources/cognitoUserPool";
import { apiGatewayDefaultResponse4xx, apiGatewayDefaultResponse5xx } from "@resources/apiGatewayDefaultResponses";
import { postMessage } from "@resources/postMessage";
import { getMessages } from "@resources/getMessages";
import { function3 } from "@resources/function3";
import { createMainTable } from "@resources/dynamodbMainTable";
import type { AWS } from "@serverless/typescript";

const cognitoUserPool = createUserPool();
const ddbMainTable = createMainTable();

const cognitoAuthorizer = {
  name: "cognitoAuthorizer",
  type: "COGNITO_USER_POOLS",
  arn: cognitoUserPool.userPoolArn,
};

const serverlessConfiguration: AWS = {
  service: "serverless-streamlined",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "us-east-1",
    stage: "dev",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps",
    },
  },
  plugins: ["serverless-bundle", "serverless-iam-roles-per-function"],
  custom: {
    stage: "${opt:stage, self:provider.stage}",
    resourceSuffix: "ss-${self:provider.region}-${self:custom.stage}",
    bundle: {
      sourcemaps: false, // Source maps are slow with the serverless-bundle. Only enable if needed
    },
  },
  package: {
    individually: true,
  },
  functions: {
    postMessage: postMessage(ddbMainTable.arn, ddbMainTable.name),
    getMessages: getMessages(ddbMainTable.arn, ddbMainTable.name),
    function3: function3(cognitoAuthorizer, cognitoUserPool.userPoolId, cognitoUserPool.identityPoolId),
  },
  resources: {
    Resources: {
      ...apiGatewayDefaultResponse4xx(),
      ...apiGatewayDefaultResponse5xx(),
      ...cognitoUserPool.resources,
      ...ddbMainTable.resources,
    },
  },
};

module.exports = serverlessConfiguration;
