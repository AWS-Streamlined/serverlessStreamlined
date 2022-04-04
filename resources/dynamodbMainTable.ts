import { varToString } from "./utilities";

export const createMainTable = () => {
  const mainTable = {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      AttributeDefinitions: [
        {
          AttributeName: "PK",
          AttributeType: "S",
        },
        {
          AttributeName: "SK",
          AttributeType: "S",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      KeySchema: [
        {
          AttributeName: "PK",
          KeyType: "HASH",
        },
        {
          AttributeName: "SK",
          KeyType: "RANGE",
        },
      ],
    },
  };

  return {
    resources: { mainTable },
    name: { Ref: varToString({ mainTable }) },
    arn: { "Fn::GetAtt": [varToString({ mainTable }), "Arn"] },
  };
};
