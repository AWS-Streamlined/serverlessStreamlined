import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpErrorHandler from "@middy/http-error-handler";
import cors from "@middy/http-cors";
import validator from "@middy/validator";
import httpSecurityHeaders from "@middy/http-security-headers";
import httpResponseSerializer from "@middy/http-response-serializer";

export const middyfy = (handler: any, inputSchema?: Record<string, unknown>, outputSchema?: Record<string, unknown>, origins: string[] = ["*"]) => {
  const middyfiedHandler = middy(handler)
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(httpSecurityHeaders())
    .use(
      cors({
        origins: origins,
      }),
    )
    .use(
      httpResponseSerializer({
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
        default: "application/json",
      }),
    )
    .use(
      // httpErrorHandler has to be the last error handler, i.e. the last middle to implement the onError
      httpErrorHandler({
        logger: (err) => {
          console.error(err);
        },
        fallbackMessage: "Something unexpected happened!",
      }),
    );

  if (inputSchema || outputSchema) {
    middyfiedHandler.use(
      validator({
        inputSchema: inputSchema,
        outputSchema: outputSchema,
      }),
    );
  }

  return middyfiedHandler;
};
