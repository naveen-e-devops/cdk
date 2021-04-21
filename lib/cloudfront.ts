import * as cdk from '@aws-cdk/core';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as s3 from '@aws-cdk/aws-s3';
import { CachePolicy, CloudFrontWebDistribution } from '@aws-cdk/aws-cloudfront';
import { Duration } from '@aws-cdk/core';
import { Z_DEFAULT_COMPRESSION } from 'zlib';
export class CloudFrontStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


// Creates a distribution for a S3 bucket.

const mynews3bucket = new s3.Bucket(this, 'mynews3bucket', {
    bucketName: "mynucfbuckettest"
});

const myCachePolicy = new cloudfront.CachePolicy(this, 'myCachePolicy', {
    cachePolicyName: 'MyPolicy',
    comment: 'A default policy',
    defaultTtl: Duration.days(2), 
    minTtl: Duration.minutes(1),
    maxTtl: Duration.days(10),
    cookieBehavior: cloudfront.CacheCookieBehavior.all(),
    headerBehavior: cloudfront.CacheHeaderBehavior.allowList('X-CustomHeader'),
    queryStringBehavior: cloudfront.CacheQueryStringBehavior.denyList('username'),
    enableAcceptEncodingGzip: true,
    enableAcceptEncodingBrotli: true,
  });

// creating cloudfromation distribution
const distribution = new CloudFrontWebDistribution(this, 'MyDistribution', {
    originConfigs: [
      {
        s3OriginSource: {
        s3BucketSource: mynews3bucket,
        },
        behaviors : [ 
            {isDefaultBehavior: true}],
      }
    ]
  });
  new cloudfront.Distribution(this, 'myDistCustomPolicy', {
    defaultBehavior: {
      origin: mynews3bucket,
      cachePolicy: myCachePolicy,
      originRequestPolicy: myOriginRequestPolicy,
    },
  });
}
}