resource "aws_ssm_parameter" "datalake_bucket_name" {
  name        = "${local.parameter_prefix}/buckets/datalake"
  type        = "SecureString"
  value       = local.datalake_bucket
}

resource "aws_ssm_parameter" "function_role" {
  name        = "${local.parameter_prefix}/roles/function"
  type        = "SecureString"
  value       = aws_iam_role.function_role.arn
}

resource "aws_ssm_parameter" "event_bus" {
  name        = "${local.parameter_prefix}/event_bus"
  type        = "SecureString"
  value       = aws_cloudwatch_event_bus.event_bus.arn
}
