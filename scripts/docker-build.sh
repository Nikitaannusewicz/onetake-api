set -e

GIT_COMMIT=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git branch --show-current)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "===================================="
echo "🐳 Building Docker Image"
echo "===================================="
echo "Git Commit: ${GIT_COMMIT}"
echo "Git Branch: ${GIT_BRANCH}"
echo "Timestamp: ${TIMPESTAMP}"
echo "===================================="

docker-compose build

echo ""
echo "Tagging image..."
docker tag onetake-api:latest onetake-api-api:${GIT_COMMIT}
docker tag onetake-api:latest onetake-api-api:${GIT_BRANCH}
docker tag onetake-api:latest onetake-api-api:$backup-${TIMESTAMP}

echo ""
echo "✅ Build complete"
echo ""
echo "Available tags:"
echo " - onetake-api-api:latest"
echo " - onetake-api-api:${GIT_COMMIT}"
echo " - onetake-api-api:${GIT_BRANCH}-latest"
echo " - onetake-api-api:backup-${TIMESTAMP}"
echo ""
