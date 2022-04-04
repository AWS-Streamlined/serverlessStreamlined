import { varToString } from "./utilities";

export const createUserPool = () => {
  const identityPoolRole = {
    Type: "AWS::IAM::Role",
    Properties: {
      RoleName: "identity-pool-role-${self:custom.resourceSuffix}",
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Federated: "cognito-identity.amazonaws.com",
            },
            Action: "sts:AssumeRoleWithWebIdentity",
            Condition: {
              StringEquals: {
                "cognito-identity.amazonaws.com:aud": {
                  Ref: "identityPool",
                },
              },
              "ForAnyValue:StringLike": {
                "cognito-identity.amazonaws.com:amr": "authenticated",
              },
            },
          },
        ],
      },
      Policies: [
        {
          PolicyName: "identity-pool-policy-${self:custom.resourceSuffix}",
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: ["mobileanalytics:PutEvents"],
                Resource: ["*"],
              },
            ],
          },
        },
      ],
    },
  };
  const userPool = {
    Type: "AWS::Cognito::UserPool",
    Properties: {
      UserPoolName: "user-pool-${self:custom.resourceSuffix}",
      AutoVerifiedAttributes: ["email"],
      UsernameAttributes: ["email"],
    },
  };

  const client = {
    Type: "AWS::Cognito::UserPoolClient",
    Properties: {
      UserPoolId: {
        Ref: "userPool",
      },
    },
  };

  const identityPool = {
    Type: "AWS::Cognito::IdentityPool",
    Properties: {
      IdentityPoolName: "identity-pool-${self:custom.resourceSuffix}",
      AllowUnauthenticatedIdentities: false,
      AllowClassicFlow: false,
      CognitoIdentityProviders: [
        {
          ClientId: {
            Ref: "client",
          },
          ProviderName: {
            "Fn::GetAtt": ["userPool", "ProviderName"],
          },
          ServerSideTokenCheck: false,
        },
      ],
    },
  };

  const identityPoolRoleAttachement = {
    Type: "AWS::Cognito::IdentityPoolRoleAttachment",
    Properties: {
      IdentityPoolId: {
        Ref: "identityPool",
      },
      Roles: {
        authenticated: {
          "Fn::GetAtt": ["identityPoolRole", "Arn"],
        },
      },
    },
  };

  return {
    resources: {
      userPool,
      client,
      identityPool,
      identityPoolRole,
      identityPoolRoleAttachement,
    },
    userPoolId: { Ref: varToString({ userPool }) },
    userPoolArn: { "Fn::GetAtt": [varToString({ userPool }), "Arn"] },
    clientId: { Ref: varToString({ client: client }) },
    identityPoolId: { Ref: varToString({ identityPool }) },
  };
};
