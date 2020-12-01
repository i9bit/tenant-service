import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

const STS = new AWS.STS();

export const SQS = new AWS.SQS({ apiVersion: '2012-11-05' });
export const account = STS.getCallerIdentity();

export default AWS;
