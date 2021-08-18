import * as cloud9 from '@aws-cdk/aws-cloud9';
import { CloneRepository } from '@aws-cdk/aws-cloud9';
import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core';
import * as codecommit from '@aws-cdk/aws-codecommit';

const LAB_KEYPAIR_NM = 'lab-key-pair';
export class Cloud9Stack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const keyname = new cdk.CfnParameter(this, 'KeyName', {
        type: 'String',
        default: LAB_KEYPAIR_NM
      })    

     const cloud9vpc = new ec2.Vpc(this, 'Cloud9VPC',{
        maxAzs: 1,
        natGateways:1                
      })
      const c9dev = new cloud9.Ec2Environment(this, 'Cloud9Env', {
          vpc: cloud9vpc,
          instanceType: new ec2.InstanceType('t3.large'),     
          

      }); 

      
      new cdk.CfnOutput(this, 'URL', {value: c9dev.ideUrl});
      new cdk.CfnOutput(this, 'Key Name', { value: LAB_KEYPAIR_NM })
      new cdk.CfnOutput(this, 'eks-cluster-name', { value: 'jamcluster.clusterName' })
      new cdk.CfnOutput(this, 'deployedpods', { value: '5' })
    }   
}