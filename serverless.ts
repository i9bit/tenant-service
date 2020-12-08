import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
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
      forceExclude: ['aws-sdk'],
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    apiName: 'tenant-service',
    stackName: 'tenant-service',
    stage: 'dev',
    tags: {
      service: 'tenant-service',
    },
    timeout: 30,
    logRetentionInDays: 30,
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    tracing: {
      apiGateway: true,
      lambda: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DEBUG: '*',
    },
  },
  functions: {
    app: {
      tags: {
        function: 'tenant-service',
      },
      role: 'LambdaRole',
      name: 'tenant-service-app',
      handler: 'src/server.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: '/',
            cors: true,
          },
        },
        {
          http: {
            method: 'GET',
            path: '/',
            cors: true,
          },
        },
        {
          http: {
            method: 'GET',
            path: '/{id}/organizations',
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
            method: 'GET',
            path: '/tenants/{id}/organizations/{organization_id}',
            request: {
              parameters: {
                paths: {
                  id: true,
                  organization_id: true,
                },
              },
            },
          },
        },
        {
          http: {
            method: 'POST',
            path: '/{id}/organizations',
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
  resources: {
    Resources: {
      LambdaRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'TenantServiceRole',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: {
              Effect: 'Allow',
              Principal: {
                Service: ['lambda.amazonaws.com'],
              },
              Action: 'sts:AssumeRole',
            },
          },
          Policies: [
            {
              PolicyName: 'tenant-service-policy',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: [
                      'logs:createLogGroup',
                      'logs:createLogStream',
                      'logs:putLogEvents',
                    ],
                    Resource: 'arn:aws:logs:us-east-1:*:*:*:*',
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'dynamodb:GetItem',
                      'dynamodb:PutItem',
                      'dynamodb:Scan',
                      'dynamodb:UpdateItem',
                      'dynamodb:CreateTable',
                      'dynamodb:DescribeTable',
                      'dynamodb:DeleteItem',
                      'dynamodb:Query',
                    ],
                    Resource: 'arn:aws:dynamodb:us-east-1:*:table/Tenants',
                  },
                  {
                    Effect: 'Allow',
                    Action: ['dynamodb:Scan', 'dynamodb:Query'],
                    Resource:
                      'arn:aws:dynamodb:us-east-1:*:table/Tenants/index/*',
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'xray:PutTraceSegments',
                      'xray:PutTelemetryRecords',
                    ],
                    Resource: '*',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
