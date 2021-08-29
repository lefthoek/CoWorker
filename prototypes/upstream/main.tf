terraform {
  backend "remote" {
    organization = "lefthoek"
    workspaces {
      name = "prototypes"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.54.0"
    }
  }

  required_version = "~> 1.0.0"
}

provider "aws" {
  profile = "default"
  region = "eu-west-1"
}

module "infra" {
  source = "./infra"
  lambda_basic_execution_role = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  environment_name = "lefthoek-prototypes"
}

