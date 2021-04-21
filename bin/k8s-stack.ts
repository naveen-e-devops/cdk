#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { K8SStackStack } from '../lib/k8s-stack-stack';
/*import {iamstack} from '../lib/iam-stack';*/
import {CloudFrontStack} from '../lib/cloudfront';

const app = new cdk.App();
new K8SStackStack(app, 'K8SStackStack');
new CloudFrontStack(app,'CloudFrontStack')
