# Quick Start Guide - Git Activity Integration

## 🎯 Get Started in 3 Steps

### Step 1: Update Activity Data (Manual - First Time)

```bash
# Run this command in your terminal
./update-activity.sh
```

Or use curl directly:
```bash
curl https://api.github.com/users/eshad/events > activity.json
```

### Step 2: Test Locally

Open `index.html` in your browser or use a local server:

```bash
# Option 1: Python (recommended)
python3 -m http.server 8000

# Option 2: PHP
php -S localhost:8000

# Option 3: Node.js (with http-server)
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

### Step 3: Enable Automatic Updates (Optional but Recommended)

#### For Public Repos Only (Easy Setup)
1. Push your code to GitHub
2. GitHub Actions will automatically run every 6 hours
3. Done! ✅

#### For Private Repos (Requires Token)
1. Create a Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scope: `repo`
   - Copy the token

2. Add token to repository:
   - Go to your repo → Settings → Secrets → Actions
   - Click "New repository secret"
   - Name: `GH_ACTIVITY_TOKEN`
   - Value: Your token
   - Save

3. Push your code to GitHub
4. Done! ✅

## 📁 File Structure

```
profile/  (This is your git repository)
├── activity.json                    # Your GitHub activity data
├── .github/
│   └── workflows/
│       └── update-activity.yml      # Auto-update workflow
├── index.html                       # Your portfolio (now with Git Activity section)
├── assets/
│   ├── css/
│   │   └── styles.css              # Styles (includes Git Activity styles)
│   └── js/
│       └── git-activity.js         # Visualization logic
├── update-activity.sh              # Manual update script
├── GIT_ACTIVITY_SETUP.md          # Detailed setup guide
└── QUICKSTART.md                   # This file
```

## 🎨 What You'll See

After setup, your portfolio will have a new "Development Activity" section with:

1. **📊 Statistics Cards**
   - Total Events
   - Active Repositories
   - Most Active Repo
   - Last Activity Time

2. **📈 Activity Timeline Chart**
   - Line chart showing your activity over time

3. **🥧 Repository Distribution**
   - Pie chart showing contributions per repository

4. **📊 Event Types Chart**
   - Bar chart showing types of activities (Push, Create, etc.)

5. **⏱️ Recent Activity Timeline**
   - List of your 10 most recent GitHub events
   - Shows if project is private with a badge

## 🔧 Customization Quick Tips

### Change Update Frequency

Edit `.github/workflows/update-activity.yml`:
```yaml
schedule:
  - cron: '0 */3 * * *'  # Every 3 hours instead of 6
```

### Show More Activities

Edit `assets/js/git-activity.js` line ~241:
```javascript
const recentActivities = this.activities.slice(0, 20); // Show 20 instead of 10
```

### Change Colors

Edit `assets/css/styles.css` at the top:
```css
:root {
  --primary-color: hsl(230, 75%, 60%);  /* Change these values */
  --accent-color: hsl(170, 75%, 50%);
}
```

## ⚡ Manual Update Command

To manually update anytime:

```bash
# Public repos only
curl https://api.github.com/users/eshad/events > activity.json

# With your token (for private repos)
curl -H "Authorization: token YOUR_TOKEN_HERE" \
     https://api.github.com/users/eshad/events > activity.json
```

## 🚨 Troubleshooting

### Charts not showing?
1. Open browser console (F12)
2. Check for errors
3. Verify `activity.json` exists and has data:
   ```bash
   cat activity.json | head
   ```

### "N/A" showing in stats?
- The activity.json file is empty or not found
- Run the update script: `./update-activity.sh`

### Private repos not appearing?
- You need a Personal Access Token with `repo` scope
- See Step 3 above for setup

## 📚 More Help

- Full setup guide: See `GIT_ACTIVITY_SETUP.md`
- GitHub API docs: https://docs.github.com/en/rest
- Chart.js docs: https://www.chartjs.org/

---

**That's it!** Your portfolio now has beautiful, automatically-updating GitHub activity visualizations! 🎉
