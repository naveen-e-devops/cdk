import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as iam from '@aws-cdk/aws-iam';
import * as ec2 from '@aws-cdk/aws-ec2';
import { PolicyStatement } from '@aws-cdk/aws-iam';
export class K8SStackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here


    // creating iam role for cluster
    const EksRole = new iam.Role(this, 'EksRole', {
      roleName: 'tpci-aws-eks-role',
      assumedBy: new iam.ServicePrincipal('eks.amazonaws.com'),
      managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSClusterPolicy'),
      ],
  });


  // Creating kubernetes cluster
  const Ekscluster = new eks.FargateCluster(this, 'Ekscluster', {
      //vpc: DefaultVpc
      vpcSubnets: [{ 
        subnetType: 
        ec2.SubnetType.PRIVATE,
      }],
      version: eks.KubernetesVersion.V1_18,
      clusterName: 'tpci-eks-cluster',
      role: EksRole,
      endpointAccess: eks.EndpointAccess.PUBLIC,
  });

  Ekscluster.addNodegroupCapacity('eks-node-grop',{
    instanceTypes: [new ec2.InstanceType('t2.micro')],
    minSize: 1,
    diskSize: 20,    
  });
    
   const eksdescribecluster = new iam.Role(this, 'eksdescribecluster', {
     roleName: 'tpci-aws-eks-describe-role',
     assumedBy: new iam.AccountPrincipal('814445629751'),
     inlinePolicies:{
      eksdescribecluster: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            actions: [
              'eks:Describe',
            ],
            resources:['*'],
          })
        ]
      }) 
    }
   });

   const  stsassumepolicy = new iam.Policy(this, 'stsassumepolicy',{
     policyName: 'tpci-aws-eks-stsassumerolepolicy',
     statements: [
       new iam.PolicyStatement({
         actions: [
           'sts:AssumeRole',
         ],
         resources: ['arn:aws:iam::814445629751:role/K8SStackStack-EksclusterMastersRoleD85283BE-X2TQI3LEP2NI']
       })
     ]
   })
  }
}
