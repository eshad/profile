# Git Activity Visualization Setup Guide

This guide will help you set up automatic GitHub activity updates for your portfolio, including support for private repositories.

## 🚀 Features

- **Real-time Activity Updates**: Automatically fetches your latest GitHub events
- **Private Repository Support**: Shows activity from private repos (with proper authentication)
- **Multiple Visualizations**:
  - Activity Timeline Chart (line chart)
  - Repository Distribution (pie chart)
  - Event Type Distribution (bar chart)
  - Recent Activity Timeline
  - Statistics Cards
- **Auto-refresh**: Updates every 6 hours via GitHub Actions
- **Private Project Badges**: Highlights contributions to private repositories

## 📋 Setup Instructions

### Option 1: Automatic Updates with GitHub Actions (Recommended)

#### Step 1: Create a Personal Access Token (for Private Repos)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name: `Portfolio Activity Updates`
4. Set expiration (recommended: 90 days or No expiration)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:user` (Read user profile data)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

#### Step 2: Add Token to Repository Secrets

1. Go to your repository on GitHub
2. Click Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `GH_ACTIVITY_TOKEN`
5. Value: Paste your Personal Access Token
6. Click "Add secret"

#### Step 3: Update the Workflow File

Edit `.github/workflows/update-activity.yml` and replace the fetch step:

```yaml
- name: Fetch GitHub Activity
  run: |
    curl -H "Accept: application/vnd.github.v3+json" \
         -H "Authorization: token ${{ secrets.GH_ACTIVITY_TOKEN }}" \
         https://api.github.com/users/eshad/events > activity.json
```

#### Step 4: Enable GitHub Actions

1. Go to your repository → Actions tab
2. If actions are disabled, click "Enable Actions"
3. The workflow will now run:
   - Every 6 hours automatically
   - On every push to main branch
   - Manually when you click "Run workflow"

### Option 2: Manual Updates

#### For Public Repos Only

```bash
# Run the update script
./update-activity.sh
```

#### For Public + Private Repos

```bash
# Create a .env file with your token
echo "GITHUB_TOKEN=your_token_here" > .env

# Run with authentication
curl -H "Accept: application/vnd.github.v3+json" \
     -H "Authorization: token $(cat .env | cut -d= -f2)" \
     https://api.github.com/users/eshad/events > activity.json
```

### Option 3: Update via Cron Job (Linux/Mac)

```bash
# Edit crontab
crontab -e

# Add this line to update every 6 hours
0 */6 * * * cd /path/to/git-profile && ./update-activity.sh
```

## 🔧 Configuration

### Customize Update Frequency

Edit `.github/workflows/update-activity.yml`:

```yaml
on:
  schedule:
    # Every 3 hours
    - cron: '0 */3 * * *'
    
    # Daily at midnight
    - cron: '0 0 * * *'
    
    # Every Monday at 9 AM
    - cron: '0 9 * * 1'
```

### Customize Display Settings

Edit `profile/assets/js/git-activity.js`:

```javascript
// Change number of recent activities shown
const recentActivities = this.activities.slice(0, 20); // Show 20 instead of 10

// Customize colors
const baseColors = [
  { bg: 'rgba(99, 102, 241, 0.6)', border: 'rgba(99, 102, 241, 1)' },
  // Add more colors...
];
```

## 📊 What Data is Displayed

The activity visualization shows:

1. **Total Events**: Count of all GitHub events
2. **Active Repositories**: Number of repos you've contributed to
3. **Most Active Repo**: Repository with most contributions
4. **Last Activity**: How recently you committed

Event types tracked:
- PushEvent (commits)
- CreateEvent (new repos/branches)
- PullRequestEvent
- IssuesEvent
- WatchEvent (starred repos)
- ForkEvent
- And more...

## 🔒 Privacy & Security

### Private Repository Visibility

- **Without Token**: Only shows public repository activity
- **With Token (repo scope)**: Shows private repository activity with a "Private" badge
- The token is stored securely in GitHub Secrets
- Never commit tokens to your repository

### Security Best Practices

1. ✅ Use GitHub repository secrets for tokens
2. ✅ Set token expiration dates
3. ✅ Use minimal required scopes
4. ✅ Rotate tokens regularly
5. ❌ Never commit `.env` files or tokens to git

## 🐛 Troubleshooting

### Activity not showing?

1. Check if `activity.json` exists and has data:
   ```bash
   cat activity.json | jq length
   ```

2. Check browser console for errors:
   - Open DevTools (F12)
   - Look for fetch errors or JSON parsing issues

3. Verify file paths:
   - `activity.json` should be in the root directory
   - Profile is in `profile/` subdirectory

### GitHub Actions not running?

1. Check Actions tab for error messages
2. Verify repository has Actions enabled
3. Check if token has correct permissions
4. Look at workflow run logs for details

### Private repos not showing?

1. Verify token has `repo` scope
2. Check token hasn't expired
3. Ensure token is correctly set in repository secrets
4. Test token manually:
   ```bash
   curl -H "Authorization: token YOUR_TOKEN" \
        https://api.github.com/users/eshad/events
   ```

## 🎨 Customization

### Change Color Scheme

Edit `profile/assets/css/styles.css`:

```css
/* Update CSS variables */
:root {
  --primary-color: hsl(230, 75%, 60%);
  --accent-color: hsl(170, 75%, 50%);
}
```

### Add More Charts

Edit `profile/assets/js/git-activity.js` and add new chart methods:

```javascript
createCustomChart(canvasId) {
  // Your custom Chart.js configuration
}
```

## 📝 API Rate Limits

- **Without Authentication**: 60 requests/hour
- **With Authentication**: 5,000 requests/hour

The workflow runs every 6 hours, well within limits.

## 🔄 Update Process Flow

```
┌─────────────────────────┐
│  GitHub Actions Timer   │
│    (Every 6 hours)      │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Fetch Latest Events    │
│  from GitHub API        │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Validate JSON Data     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Commit to Repository   │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Deploy to GitHub Pages │
│  (if enabled)           │
└─────────────────────────┘
```

## 📚 Additional Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## ✨ Tips

1. **Test Locally First**: Run `./update-activity.sh` before pushing to GitHub
2. **Check Activity Feed**: Visit `https://github.com/eshad?tab=activity` to see what will be displayed
3. **Monitor Actions**: Check the Actions tab regularly to ensure updates are working
4. **Customize Stats**: Edit the statistics cards to show metrics that matter to you

---

**Need Help?** Open an issue in the repository or check the GitHub API documentation.
