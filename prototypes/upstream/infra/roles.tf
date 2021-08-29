resource "aws_iam_role" "function_role" {
  name                = local.role
  assume_role_policy = data.aws_iam_policy_document.lambda_role_assume_role_policy.json
  managed_policy_arns = [
    aws_iam_policy.datalake_bucket_read_access.arn,
    aws_iam_policy.datalake_bucket_write_access.arn,
    aws_iam_policy.event_bus_write_access.arn,
    aws_iam_policy.auth_lookup_table_access.arn,
    var.lambda_basic_execution_role
  ]
}

