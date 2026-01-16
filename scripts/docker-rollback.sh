set -e

echo "======================================"
echo "Docker Image Rollback"
echo "======================================"
echo ""
echo "Available images:"
echo ""

docker images onetake-api-api --format "table {{.Tag}}\t{{.ID}}\t{{.CreatedAt}}\t{{.Size}}" | head -20

echo ""
echo "======================================"
echo -n "Enter tag or image ID to rollback to: "
read ROLLBACK_TARGET

if [ -z "$ROLLBACK_TARGET" ]; then
    echo "Error: No tag provided"
    exit 1
fi

echo ""
echo "Rolling back to: ${ROLLBACK_TARGET}"
echo ""

docker-compose down
docker tag onetake-api-api:${ROLLBACK_TARGET} onetake-api-api:latest

docker-compose up -d

echo ""
echo "Rollback complete!"
echo "Now running: onetake-api-api:${ROLLBACK_TARGET}"  
echo ""
echo "Check logs with: docker-compose logs -f"