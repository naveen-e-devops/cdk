/*import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as iam from '@aws-cdk/aws-iam';
import * as ec2 from '@aws-cdk/aws-ec2';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export class iamstack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   const  stsassumepolicy = new iam.Policy(this, 'stsassumepolicy',{
     policyName: 'tpci-aws-eks-stsassumerolepolicy',
     force: true,
     statements: [
       new iam.PolicyStatement({
         sid: 'eks',
         effect: iam.Effect.ALLOW,  
         actions: [
           'sts:AssumeRole',
         ],
         resources: [`arn:aws:iam::814445629751:role/K8SStackStack-EksclusterMastersRoleD85283BE-X2TQI3LEP2NI`]
       })
     ]
   });

}
}