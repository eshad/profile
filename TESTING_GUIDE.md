# Testing Guide - GitHub Activity Integration

## 🧪 Pre-Deployment Testing Checklist

### 1. Local Development Server Test

```bash
cd /Volumes/MyExternal/personal/git-profile/profile
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

### 2. Visual Verification

#### GitHub Statistics Section
- [ ] **GitHub Stats Card** loads and displays contribution count
- [ ] **Streak Stats** shows current and longest streaks
- [ ] **Top Languages** displays programming language breakdown
- [ ] **Contribution Calendar** shows 415+ contributions with green squares
- [ ] **GitHub Metrics** displays detailed activity breakdown
- [ ] **Activity Graph** shows 365-day visualization
- [ ] **Trophy Showcase** displays achievement badges
- [ ] **Profile Views Counter** increments on page load
- [ ] **Animated Badges** (5 badges) display correctly

#### Activity Timeline
- [ ] **Recent Activity** section shows last 10 GitHub events
- [ ] Each event displays:
  - Event type (Push, Create, etc.)
  - Time ago (e.g., "11 days ago")
  - Repository name with link
  - Private badge (if applicable)
- [ ] Timeline animations trigger on page load
- [ ] Hover effects work on timeline items

#### Loading States
- [ ] Images show shimmer effect while loading
- [ ] Shimmer stops when images fully load
- [ ] Broken images show fallback URLs
- [ ] No console errors in browser DevTools

### 3. Responsive Design Test

Test on different screen sizes:

#### Desktop (1920x1080)
```bash
# Open in browser and resize window
```
- [ ] Stats cards display in 3 columns
- [ ] Full-width cards span entire row
- [ ] All images scale properly
- [ ] No horizontal scrolling

#### Tablet (768x1024)
- [ ] Stats cards display in 2 columns
- [ ] Timeline is readable
- [ ] Images resize appropriately
- [ ] Touch interactions work

#### Mobile (375x667)
- [ ] Stats cards display in 1 column
- [ ] All text is legible
- [ ] Images scale down properly
- [ ] No content overflow

### 4. Browser Compatibility Test

Test in multiple browsers:

- [ ] **Chrome/Chromium** - Latest version
- [ ] **Firefox** - Latest version
- [ ] **Safari** - Latest version (macOS/iOS)
- [ ] **Edge** - Latest version

### 5. Performance Test

Open Browser DevTools (F12) → Network tab:

- [ ] Total page load time < 5 seconds
- [ ] No failed requests (red items)
- [ ] Activity.json loads successfully
- [ ] All API images load (or show fallbacks)
- [ ] JavaScript executes without errors

#### Console Check (F12 → Console tab)
Expected output:
```
✅ Loaded activity data from: activity.json
```

No errors should appear (warnings are okay).

### 6. JavaScript Functionality Test

#### Activity Timeline
Open Console (F12) and run:
```javascript
// Check if activity data loaded
fetch('activity.json').then(r => r.json()).then(d => console.log(`✅ ${d.length} events loaded`))
```

Expected: `✅ 11 events loaded` (or similar)

#### Timeline Items
```javascript
// Check timeline rendering
document.querySelectorAll('.timeline-item').length
```

Expected: `10` (shows last 10 events)

### 7. API Endpoint Verification

Test each API endpoint manually:

```bash
# GitHub Stats
curl -I "https://github-readme-stats-git-masterrstaa-rickstaa.vercel.app/api?username=eshad&show_icons=true"

# Streak Stats  
curl -I "https://github-readme-streak-stats.herokuapp.com/?user=eshad"

# Contribution Calendar
curl -I "https://ghchart.rshah.org/6366f1/eshad"
```

All should return `HTTP 200 OK` or `HTTP 2xx`.

### 8. Dark Mode Test

- [ ] All images have transparent backgrounds
- [ ] Text is readable on dark background
- [ ] No white boxes around stat cards
- [ ] Contribution calendar green colors visible

### 9. Accessibility Test

- [ ] All images have `alt` attributes
- [ ] Links have descriptive text
- [ ] Keyboard navigation works (Tab key)
- [ ] Color contrast meets WCAG standards

### 10. GitHub Actions Test (Optional)

If deployed to GitHub:

```bash
# Check workflow status
cd /Volumes/MyExternal/personal/git-profile/profile
git add .
git commit -m "Update portfolio with improved GitHub stats"
git push origin main
```

- [ ] GitHub Actions workflow runs successfully
- [ ] activity.json updates every 6 hours
- [ ] No workflow errors in Actions tab

---

## 🐛 Troubleshooting

### Issue: Stats cards show empty/blank

**Solution**: The API might be rate-limited or down.
- Check browser console for errors
- Try the fallback URLs in HTML
- Wait a few minutes and refresh

### Issue: Activity timeline is empty

**Solution**: activity.json might not have data.
```bash
./update-activity.sh
# Then refresh browser
```

### Issue: Images have white backgrounds

**Solution**: This was fixed in latest update.
- Verify `bg_color=00000000` in all API URLs
- Clear browser cache (Cmd+Shift+R)

### Issue: Shimmer effect doesn't stop

**Solution**: Image failed to load.
- Check Network tab for failed requests
- Verify API endpoints are accessible
- Check for CORS issues

### Issue: Contribution count shows 0

**Solution**: External API fetches real data.
- This is not using local activity.json
- Verify GitHub username is correct (`eshad`)
- API might be temporarily down

---

## ✅ Production Deployment Checklist

Before deploying to production:

- [ ] All tests above pass
- [ ] No console errors
- [ ] Images load correctly
- [ ] Activity timeline shows data
- [ ] Responsive design works
- [ ] GitHub Actions workflow configured
- [ ] `GH_ACTIVITY_TOKEN` secret set (if needed)
- [ ] DNS records configured
- [ ] SSL certificate active
- [ ] Analytics tracking added (optional)

---

## 📊 Expected Results

### GitHub Stats Section
- **Total Contributions**: 415-425 visible
- **Current Streak**: Varies based on activity
- **Top Languages**: Ruby, JavaScript, Python, etc.
- **Activity Timeline**: Last 10 events from activity.json

### Performance Metrics
- **Page Load Time**: 2-4 seconds
- **First Contentful Paint**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **Lighthouse Score**: 90+ (Performance)

---

## 🚀 Next Steps After Testing

1. **If all tests pass**:
   ```bash
   cd /Volumes/MyExternal/personal/git-profile/profile
   git add .
   git commit -m "Finalize GitHub activity integration"
   git push origin main
   ```

2. **If tests fail**:
   - Document the failing test
   - Check the Troubleshooting section
   - Review browser console errors
   - Verify API endpoints are accessible

3. **Monitor after deployment**:
   - Check GitHub Actions runs every 6 hours
   - Verify activity.json updates automatically
   - Monitor API rate limits (if applicable)
   - Check analytics for any 404 errors

---

## 📞 Support

If you encounter issues not covered in this guide:

1. Check browser console (F12 → Console)
2. Check Network tab (F12 → Network)
3. Verify activity.json exists and has data
4. Test API endpoints manually with curl
5. Clear browser cache and try again

---

**Last Updated**: January 13, 2026
**Version**: 2.0
**Status**: Ready for Production ✅
