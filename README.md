# M. Hasan's Portfolio

Professional portfolio website with integrated GitHub activity visualization.

## 🚀 Quick Start

```bash
# 1. Clone or navigate to the project
cd /Volumes/MyExternal/personal/git-profile/profile

# 2. Update your GitHub activity data (optional - auto-updates via GitHub Actions)
./update-activity.sh

# 3. Start a local server for testing
python3 -m http.server 8000

# 4. Open http://localhost:8000 in your browser
```

## 🎯 Latest Updates (Jan 2026)

### ✅ Improvements Made
- **Fixed API Issues**: Updated GitHub Stats API to use alternative reliable endpoints
- **Added Loading States**: Implemented shimmer effect for images while they load
- **Transparent Backgrounds**: All stats cards now have transparent backgrounds for dark theme
- **Better Error Handling**: Added fallback URLs for failed API requests
- **Activity Timeline**: Verified and tested recent activity display from activity.json
- **Responsive Design**: All stats cards are mobile-friendly and responsive

### 🔧 Technical Changes
1. **API Endpoints Updated**:
   - Changed from `github-readme-stats.vercel.app` to `github-readme-stats-git-masterrstaa-rickstaa.vercel.app`
   - Added fallback URLs for reliability
   - All backgrounds set to transparent (`bg_color=00000000`)

2. **CSS Enhancements**:
   - Added shimmer loading animation for stat images
   - Min-height of 150px for proper skeleton display
   - Animation stops when images load

3. **Activity Timeline**:
   - Verified activity.json is properly loaded
   - JavaScript correctly processes and displays events
   - Shows recent 10 events with time ago formatting

## 📂 Project Structure

```
profile/
├── index.html                      # Main portfolio page
├── activity.json                   # GitHub activity data (auto-updated)
├── assets/
│   ├── css/
│   │   └── styles.css             # All styles including Git Activity
│   ├── js/
│   │   ├── main.js                # Main JavaScript
│   │   └── git-activity.js        # Git Activity visualizations
│   ├── img/                       # Images
│   ├── pdf/                       # Resume PDFs
│   └── favicons/                  # Favicon files
├── images/                         # Project screenshots
├── .github/
│   └── workflows/
│       └── update-activity.yml    # Auto-update GitHub activity
├── update-activity.sh             # Manual update script
├── QUICKSTART.md                  # Quick start guide
├── GIT_ACTIVITY_SETUP.md         # Detailed setup guide
└── README.md                      # This file
```

## ✨ Features

### Portfolio Sections
- 🏠 **Home** - Introduction with dynamic typing effect
- 👤 **About** - Professional background and experience
- 📚 **Skills** - Technical competencies and expertise
- 📊 **Git Activity** - Live GitHub activity with charts (NEW!)
- 💼 **Services** - Service offerings
- 🎨 **Work** - Project portfolio with videos
- 📞 **Contact** - Contact form and information

### Git Activity Dashboard
- **Real-time statistics**: Events, repos, activity timeline
- **Interactive charts**: Timeline, distribution, event types
- **Activity timeline**: Recent commits and events
- **Private repo badges**: Highlights private contributions
- **Auto-updates**: Every 6 hours via GitHub Actions

## 🔄 Updating GitHub Activity

### Automatic (Recommended)
GitHub Actions automatically updates `activity.json` every 6 hours.

To include private repos:
1. Create a Personal Access Token with `repo` scope
2. Add it as `GH_ACTIVITY_TOKEN` in repository secrets
3. Done! Private repos will now show with a badge

### Manual
```bash
# Run the update script
./update-activity.sh

# Or use curl directly
curl https://api.github.com/users/eshad/events > activity.json

# With token for private repos
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/users/eshad/events > activity.json
```

## 🎨 Customization

### Theme
Toggle between light/dark themes using the moon icon in the header.

### Colors
Edit CSS variables in `assets/css/styles.css`:
```css
:root {
  --primary-color: hsl(230, 75%, 60%);
  --accent-color: hsl(170, 75%, 50%);
}
```

### Activity Display
Edit `assets/js/git-activity.js`:
```javascript
// Show more recent activities (line ~241)
const recentActivities = this.activities.slice(0, 20);

// Customize chart colors (line ~177)
const baseColors = [...];
```

### Update Frequency
Edit `.github/workflows/update-activity.yml`:
```yaml
schedule:
  - cron: '0 */3 * * *'  # Every 3 hours
```

## 🛠️ Development

### Local Server Options

**Python** (recommended):
```bash
python3 -m http.server 8000
```

**PHP**:
```bash
php -S localhost:8000
```

**Node.js**:
```bash
npx http-server -p 8000
```

### Testing
1. Make changes to HTML/CSS/JS files
2. Refresh browser to see changes
3. Check browser console for errors (F12)

## 📊 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js 4.4.0
- **Icons**: BoxIcons
- **Animations**: ScrollReveal, Swiper
- **Automation**: GitHub Actions
- **API**: GitHub REST API v3

## 🔐 Security

- Tokens stored in GitHub Secrets only
- `.gitignore` prevents accidental commits
- No sensitive data in repository
- HTTPS for all external resources

## 📝 Documentation

- **QUICKSTART.md** - Get started in 3 steps
- **GIT_ACTIVITY_SETUP.md** - Detailed setup guide for Git Activity feature
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details

## 🐛 Troubleshooting

### Charts not showing?
1. Check if `activity.json` exists and has data
2. Open browser console (F12) for errors
3. Run `./update-activity.sh` to regenerate data

### GitHub Actions not running?
1. Check Actions tab in GitHub repository
2. Ensure Actions are enabled
3. Verify workflow file syntax
4. Check repository secrets for token

### Private repos not appearing?
1. Verify Personal Access Token has `repo` scope
2. Check token is set as `GH_ACTIVITY_TOKEN` in secrets
3. Manually test: `curl -H "Authorization: token TOKEN" https://api.github.com/users/eshad/events`

## 📞 Contact

- **LinkedIn**: [eshad-hasan](https://www.linkedin.com/in/eshad-hasan/)
- **GitHub**: [@eshad](https://github.com/eshad)
- **Email**: uiu025@gmail.com

## 📄 License

Personal portfolio website. All rights reserved.

---

**Built with ❤️ by M. Hasan**

Last Updated: January 2026
