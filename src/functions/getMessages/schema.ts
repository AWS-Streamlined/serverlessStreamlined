export const responseSchema = {
  type: "object",
  properties: {
    statusCode: {
      type: "number",
    },
    body: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
        required: ["name", "message"],
      },
    },
  },
} as const;

export type Event = {
  queryStringParameters: {
    name: string;
  };
};

export type Response = {
  statusCode: number;
  body: {
    name: string;
    message: string;
  }[];
};
