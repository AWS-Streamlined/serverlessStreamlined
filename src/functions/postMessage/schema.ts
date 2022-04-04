export const schema = {
  type: "object",
  properties: {
    body: {
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
} as const;

export type Event = {
  body: {
    name: string;
    message: string;
  };
};
