#!/bin/bash

echo "================================"
echo "Docker Cleanup"
echo "================================"
echo ""
echo "Current images:"
docker images onetake-api-api --format "table {{.Tag}}\t{{.ID}}\t{{.CreatedAt}}\t{{.Size}}"

echo ""
echo "This will remove:"
echo "  - Untagged images (<none>)"
echo "  - Old backup-* images (keep last 5)"
echo ""
echo -n "Continue? (y/n): "
read CONFIRM

if [ "$CONFIRM" != "y" ]; then
    echo "Cancelled"
    exit 0
fi
    echo "Removing untagged images..."
    docker images onetake-api-api --filter "dangling=true" -q | xargs -r docker rmi
    
    echo "Removing old backups (keeping last 5)..."
    docker images onetake-api-api --format "{{.Tag}}" | \
        grep "^backup-" | \
        sort -r | \
        tail -n +6 | \
        xargs -I {} docker rmi onetake-api-api:{}
    echo ""
    echo "✅ Cleanup Complete!"
    echo ""
    echo "Remaining images:"
    docker images onetake-api-api