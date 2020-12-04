import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  configValidationMode: 'warn',
  service: {
    name: 'tenant-service',
  },
  frameworkVersion: '2',
  package: {
    excludeDevDependencies: true,
    individually: true,
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    apiName: 'tenant-service',
    timeout: 30,
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DEBUG: '*',
    },
  },
  functions: {
    app: {
      name: 'tenant-service-app',
      handler: 'src/server.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: '/tenants',
            cors: true,
          },
        },
        {
          http: {
            method: 'GET',
            path: '/tenants',
            cors: true,
          },
        },
        {
          http: {
            method: 'GET',
            path: '/tenants/{id}/organizations',
            cors: true,
            request: {
              parameters: {
                paths: {
                  id: true,
                },
              },
            },
          },
        },
        {
          http: {
            method: 'POST',
            path: '/tenants/{id}/organizations',
            cors: true,
            request: {
              parameters: {
                paths: {
                  id: true,
                },
              },
            },
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
