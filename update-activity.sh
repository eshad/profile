#!/bin/bash

# Update GitHub Activity Script
# This script fetches your latest GitHub activity and updates activity.json

echo "🔄 Fetching GitHub activity for user: eshad"

# Fetch the activity data
curl -H "Accept: application/vnd.github.v3+json" \
     https://api.github.com/users/eshad/events > activity.json

# Check if the request was successful
if [ $? -eq 0 ]; then
    # Verify it's valid JSON
    if jq empty activity.json 2>/dev/null; then
        EVENT_COUNT=$(jq length activity.json)
        echo "✅ Successfully fetched $EVENT_COUNT events"
        echo "📄 Activity data saved to activity.json"
        
        # Optional: Copy to profile directory for local testing
        if [ -d "profile" ]; then
            cp activity.json profile/activity.json
            echo "📋 Copied to profile/activity.json"
        fi
    else
        echo "❌ Error: Invalid JSON response"
        exit 1
    fi
else
    echo "❌ Error: Failed to fetch activity data"
    exit 1
fi

echo ""
echo "💡 Tip: To include private repository events, create a Personal Access Token"
echo "   and use: curl -H 'Authorization: token YOUR_TOKEN' ..."
