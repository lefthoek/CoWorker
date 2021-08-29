variable "lambda_basic_execution_role" {
  type = string
}

variable "environment_name" {
  type = string
}

locals {
  name = "infra"
  role = "${var.environment_name}-${local.name}-role"
  datalake_bucket = "${var.environment_name}-${local.name}-datalake-bucket"
  auth_lookup_table = "${var.environment_name}-${local.name}-auth-lookup-table"
  event_bus       = "${var.environment_name}-${local.name}-event-bus"
  parameter_prefix ="/${var.environment_name}"
}
