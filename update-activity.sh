#!/bin/bash

# Update GitHub Activity Script
# Fetches comprehensive GitHub data for better statistics

USERNAME="eshad"

echo "🔄 Fetching comprehensive GitHub data for user: $USERNAME"

# Fetch recent events (up to 100)
echo "📊 Fetching recent events..."
curl -s -H "Accept: application/vnd.github.v3+json" \
     "https://api.github.com/users/$USERNAME/events?per_page=100" > activity.json

# Fetch user stats
echo "📈 Fetching user statistics..."
curl -s "https://api.github.com/users/$USERNAME" > user_stats.json

# Fetch repositories  
echo "📦 Fetching repositories..."
curl -s "https://api.github.com/users/$USERNAME/repos?per_page=100&sort=updated" > repos.json

# Validate
if [ -f activity.json ] && jq empty activity.json 2>/dev/null; then
    EVENT_COUNT=$(jq length activity.json 2>/dev/null || echo '0')
    REPO_COUNT=$(jq length repos.json 2>/dev/null || echo '0')
    
    echo ""
    echo "✅ Data fetched successfully!"
    echo "   📊 Events: $EVENT_COUNT"
    echo "   📦 Repos: $REPO_COUNT"
    echo "   📄 Saved to: activity.json, user_stats.json, repos.json"
else
    echo "❌ Error: Failed to fetch data"
    exit 1
fi

echo ""
echo "💡 Tip: For private repos, use token:"
echo "   curl -H 'Authorization: token YOUR_TOKEN' ..."
