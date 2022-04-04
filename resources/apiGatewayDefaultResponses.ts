export const apiGatewayDefaultResponse4xx = () => ({
  GatewayResponseDefault4XX: {
    Type: "AWS::ApiGateway::GatewayResponse",
    Properties: {
      ResponseParameters: {
        "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
        "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
      },
      ResponseType: "DEFAULT_4XX",
      RestApiId: { Ref: "ApiGatewayRestApi" },
    },
  },
});

export const apiGatewayDefaultResponse5xx = () => ({
  GatewayResponseDefault5XX: {
    Type: "AWS::ApiGateway::GatewayResponse",
    Properties: {
      ResponseParameters: {
        "gatewayresponse.header.Access-Control-Allow-Origin": "'*'",
        "gatewayresponse.header.Access-Control-Allow-Headers": "'*'",
      },
      ResponseType: "DEFAULT_5XX",
      RestApiId: { Ref: "ApiGatewayRestApi" },
    },
  },
});
