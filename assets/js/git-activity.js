/*=============== GIT ACTIVITY ===============*/
// GitHub statistics are now handled by external API images
// This file can be used for future enhancements if needed

document.addEventListener('DOMContentLoaded', function() {
  console.log('✅ GitHub profile section loaded');

  // Add smooth loading animation to stat images
  const statImages = document.querySelectorAll('.stat-image, .trophies-image, .repo-card-image');
  statImages.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    // If image is already cached, show it
    if (img.complete) {
      img.style.opacity = '1';
    }
  });
});
