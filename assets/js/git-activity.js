/*=============== GIT ACTIVITY VISUALIZATION ===============*/

class GitActivityVisualizer {
  constructor(activityData) {
    this.activities = activityData;
    this.processData();
  }

  processData() {
    // Process repository data
    this.repoStats = {};
    this.dailyActivity = {};
    this.eventTypes = {};
    
    this.activities.forEach(activity => {
      const repoName = activity.repo.name.split('/')[1];
      const date = new Date(activity.created_at).toLocaleDateString();
      const eventType = activity.type;
      
      // Count by repository
      this.repoStats[repoName] = (this.repoStats[repoName] || 0) + 1;
      
      // Count by date
      this.dailyActivity[date] = (this.dailyActivity[date] || 0) + 1;
      
      // Count by event type
      this.eventTypes[eventType] = (this.eventTypes[eventType] || 0) + 1;
    });
  }

  getStats() {
    return {
      totalEvents: this.activities.length,
      repositories: Object.keys(this.repoStats).length,
      dateRange: this.getDateRange(),
      mostActiveRepo: this.getMostActiveRepo(),
      recentActivity: this.getRecentActivity()
    };
  }

  getDateRange() {
    const dates = this.activities.map(a => new Date(a.created_at));
    const earliest = new Date(Math.min(...dates));
    const latest = new Date(Math.max(...dates));
    return `${earliest.toLocaleDateString()} - ${latest.toLocaleDateString()}`;
  }

  getMostActiveRepo() {
    let maxCount = 0;
    let topRepo = '';
    for (const [repo, count] of Object.entries(this.repoStats)) {
      if (count > maxCount) {
        maxCount = count;
        topRepo = repo;
      }
    }
    return topRepo;
  }

  getRecentActivity() {
    const daysSinceLastActivity = Math.floor(
      (Date.now() - new Date(this.activities[0].created_at)) / (1000 * 60 * 60 * 24)
    );
    return daysSinceLastActivity === 0 ? 'Today' : `${daysSinceLastActivity} days ago`;
  }

  // Create repository distribution chart
  createRepoChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = Object.keys(this.repoStats);
    const data = Object.values(this.repoStats);
    const colors = this.generateColors(labels.length);

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
              padding: 15,
              font: { size: 12 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.parsed} events`;
              }
            }
          }
        }
      }
    });
  }

  // Create activity timeline chart
  createTimelineChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const sortedDates = Object.keys(this.dailyActivity).sort((a, b) => 
      new Date(a) - new Date(b)
    );
    const data = sortedDates.map(date => this.dailyActivity[date]);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: sortedDates,
        datasets: [{
          label: 'Activity Events',
          data: data,
          borderColor: 'rgba(99, 102, 241, 1)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
              stepSize: 1
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            }
          },
          x: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
              maxRotation: 45,
              minRotation: 45
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff'
          }
        }
      }
    });
  }

  // Create event type bar chart
  createEventTypeChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = Object.keys(this.eventTypes).map(type => 
      type.replace('Event', '')
    );
    const data = Object.values(this.eventTypes);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Events',
          data: data,
          backgroundColor: 'rgba(52, 211, 153, 0.6)',
          borderColor: 'rgba(52, 211, 153, 1)',
          borderWidth: 2,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
              stepSize: 1
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            }
          },
          x: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Create activity timeline list
  createActivityTimeline(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const recentActivities = this.activities.slice(0, 10);
    
    container.innerHTML = recentActivities.map((activity, index) => {
      const date = new Date(activity.created_at);
      const repoName = activity.repo.name;
      const eventType = activity.type.replace('Event', '');
      const timeAgo = this.getTimeAgo(date);
      const isPrivate = activity.public === false;
      
      const privateBadge = isPrivate 
        ? '<span class="timeline-private-badge"><i class="bx bxs-lock-alt"></i> Private</span>' 
        : '';
      
      return `
        <div class="timeline-item fade-in delay-${Math.min(index + 1, 5)}">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-event-type">${eventType}</span>
              <span class="timeline-date">${timeAgo}</span>
            </div>
            <div class="timeline-repo">
              <i class='bx bxl-github'></i>
              <a href="https://github.com/${repoName}" target="_blank">${repoName}</a>
              ${privateBadge}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Trigger animations
    setTimeout(() => {
      container.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('visible');
      });
    }, 100);
  }

  getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
      }
    }
    
    return 'Just now';
  }

  generateColors(count) {
    const baseColors = [
      { bg: 'rgba(99, 102, 241, 0.6)', border: 'rgba(99, 102, 241, 1)' },
      { bg: 'rgba(52, 211, 153, 0.6)', border: 'rgba(52, 211, 153, 1)' },
      { bg: 'rgba(251, 146, 60, 0.6)', border: 'rgba(251, 146, 60, 1)' },
      { bg: 'rgba(244, 63, 94, 0.6)', border: 'rgba(244, 63, 94, 1)' },
      { bg: 'rgba(168, 85, 247, 0.6)', border: 'rgba(168, 85, 247, 1)' }
    ];
    
    const colors = { bg: [], border: [] };
    for (let i = 0; i < count; i++) {
      const color = baseColors[i % baseColors.length];
      colors.bg.push(color.bg);
      colors.border.push(color.border);
    }
    
    return colors;
  }

  // Populate stats cards
  populateStatsCards() {
    const stats = this.getStats();
    
    document.getElementById('total-events').textContent = stats.totalEvents;
    document.getElementById('total-repos').textContent = stats.repositories;
    document.getElementById('most-active-repo').textContent = stats.mostActiveRepo;
    document.getElementById('recent-activity').textContent = stats.recentActivity;
  }

  // Initialize all visualizations
  initialize() {
    this.populateStatsCards();
    this.createRepoChart('repoChart');
    this.createTimelineChart('activityTimelineChart');
    this.createEventTypeChart('eventTypeChart');
    this.createActivityTimeline('activityTimeline');
  }
}

// Load and initialize
document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Try multiple paths for activity.json
    let activityData = null;
    const paths = [
      'activity.json',          // Same directory as index.html
      './activity.json',        // Relative path
      '../activity.json',       // Parent directory
      '/activity.json'          // Root path
    ];
    
    for (const path of paths) {
      try {
        const response = await fetch(path);
        if (response.ok) {
          activityData = await response.json();
          console.log(`✅ Loaded activity data from: ${path}`);
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (activityData && activityData.length > 0) {
      const visualizer = new GitActivityVisualizer(activityData);
      visualizer.initialize();
    } else {
      console.warn('⚠️  No activity data found. Run ./update-activity.sh to generate activity.json');
      // Show a message to the user
      const statsCards = document.querySelectorAll('.git-stat-card h3');
      statsCards.forEach(card => {
        if (card.textContent === '0' || card.textContent === '-') {
          card.textContent = 'N/A';
        }
      });
    }
  } catch (error) {
    console.error('❌ Error loading Git activity data:', error);
  }
});
