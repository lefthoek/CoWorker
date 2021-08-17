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



locals {
  environment_name = "lefthoek-prototypes"
  name = "datalake"
  role = "${local.environment_name}-${local.name}-role"
  bucket = "${local.environment_name}-${local.name}-bucket"
  parameter_prefix="/${local.environment_name}/${local.name}"
}

resource "aws_s3_bucket" "datalake_bucket" {
  bucket = local.bucket
  acl    = "private"

  tags = {
    Environment = local.environment_name
  }
}

data "aws_iam_policy_document" "datalake_bucket_read_access" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.datalake_bucket.arn,
      "${aws_s3_bucket.datalake_bucket.arn}/*"
    ]
  }
}

data "aws_iam_policy_document" "datalake_bucket_write_access" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl"
    ]

    resources = [
      aws_s3_bucket.datalake_bucket.arn,
      "${aws_s3_bucket.datalake_bucket.arn}/*"
    ]
  }
}

resource "aws_iam_policy" "datalake_bucket_read_access" {
  name = "${local.bucket}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.datalake_bucket_read_access.json
}

resource "aws_iam_policy" "datalake_bucket_write_access" {
  name = "${local.bucket}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.datalake_bucket_write_access.json
}

resource "aws_ssm_parameter" "datalake_bucket_name" {
  name        = "${local.parameter_prefix}/bucket"
  type        = "SecureString"
  value       = local.bucket
}

data "aws_iam_policy_document" "lambda_role_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "slack_role" {
  name                = local.role
  assume_role_policy = data.aws_iam_policy_document.lambda_role_assume_role_policy.json
  managed_policy_arns = [
    aws_iam_policy.datalake_bucket_read_access.arn,
    aws_iam_policy.datalake_bucket_write_access.arn
  ]
}

resource "aws_ssm_parameter" "slack_role" {
  name        = "${local.parameter_prefix}/role"
  type        = "SecureString"
  value       = aws_iam_role.slack_role.arn
}
