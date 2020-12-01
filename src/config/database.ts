import dynamoose from 'dynamoose';

if (process.env.STAGE === 'local') {
  dynamoose.aws.sdk.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ID,
    region: 'us-east-1',
  });
}

export default dynamoose;
