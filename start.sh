#!/bin/bash

# Configuration
REGION="eu-north-1"
SECRET_ID="reactdashboard/prod/secrets"
ENV_FILE=".env"

echo "🔐 Fetching secrets securely from AWS Secrets Manager ($REGION)..."

# Fetch secret JSON using AWS CLI and parse it into an .env formatted file using jq
aws secretsmanager get-secret-value \
    --region "$REGION" \
    --secret-id "$SECRET_ID" \
    --query SecretString \
    --output text | jq -r 'to_entries|map("\(.key)=\(.value|tostring)")|.[]' > "$ENV_FILE"

# Make sure we actually fetched something
if [ ! -s "$ENV_FILE" ]; then
    echo "❌ Failed to retrieve secrets or parse them. Ensure your EC2 IAM role has SecretsManagerReadWrite permissions."
    exit 1
fi

echo "✅ Secrets successfully loaded into temporary .env file."
echo "🚀 Starting Docker Compose orchestration..."

# Start docker-compose
# It will automatically detect the local .env file we just created and inject its values into docker-compose.yml
docker-compose up -d --build

# Security cleanup
echo "🧹 Removing temporary .env file to prevent secrets living on disk..."
rm -f "$ENV_FILE"
echo "✅ Deployment successful and secured!"
