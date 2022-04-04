export const varToString = (varObj: Record<string, unknown>) => Object.keys(varObj)[0];

export type ServerlessParameter = string | { Ref: string } | { "Fn::GetAtt": string[] };

export type AuthorizerConfig =
  | { arn: ServerlessParameter }
  | {
      name: string;
      identitySource: string;
      type: string;
    };
