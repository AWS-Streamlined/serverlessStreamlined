Repository that acts as a template for a Typescript serverless application hosted on AWS with the Serverless Framework.

It contains the following best practices:

- Optimized Typescript configuration
- Optimized serverless configuration for Typescript AWS Lambda functions
- Serverless configuration written with Typescript
- Different modules for resources creation, which promotes separation of concern and clarify dependencies across resources
- A few utility functions that allows to re-use code when creating resources
- Optimized packaging of your AWS Lambda functions with the [serverless-bundle plugin](https://github.com/AnomalyInnovations/serverless-bundle)
- AWS Lambda functions bootstrapped with [Middy](https://middy.js.org/) middlewares, which provides another set of best practices

Example of usage:

```
curl -X POST -H 'Content-Type: application/json' https://<your_rest_api_url>/dev/messages -d '{ "name": "Louis", "message": "Hello Serverless Streamlined!" }'
curl -X GET https://<your_rest_api_url>/dev/messages?name=Louis
```
