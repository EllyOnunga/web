// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress tracking
    initializeProgress();
    
    // Set up event listeners for all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
    
    // Reset button functionality
    document.getElementById('reset-btn').addEventListener('click', resetProgress);
    
    // Function to initialize progress from localStorage
    function initializeProgress() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let total = checkboxes.length;
        let completed = 0;
        
        checkboxes.forEach(checkbox => {
            const id = checkbox.id;
            const isCompleted = localStorage.getItem(id) === 'true';
            
            if (isCompleted) {
                checkbox.checked = true;
                completed++;
                // Add completed class to label
                const label = checkbox.nextElementSibling.nextElementSibling;
                label.classList.add('completed');
            }
        });
        
        updateProgressDisplay(completed, total);
    }
    
    // Function to update progress when checkboxes change
    function updateProgress() {
        const id = this.id;
        const isChecked = this.checked;
        
        // Save to localStorage
        localStorage.setItem(id, isChecked);
        
        // Update label styling
        const label = this.nextElementSibling.nextElementSibling;
        if (isChecked) {
            label.classList.add('completed');
        } else {
            label.classList.remove('completed');
        }
        
        // Update progress display
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const total = checkboxes.length;
        const completed = document.querySelectorAll('input[type="checkbox"]:checked').length;
        
        updateProgressDisplay(completed, total);
    }
    
    // Function to update progress display
    function updateProgressDisplay(completed, total) {
        const percentage = Math.round((completed / total) * 100);
        
        // Update progress bar
        document.getElementById('progress-bar').style.width = percentage + '%';
        
        // Update stats
        document.getElementById('completed-count').textContent = completed;
        document.getElementById('total-count').textContent = total;
        document.getElementById('percentage').textContent = percentage + '%';
    }
    
    // Function to reset progress
    function resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            // Clear all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
                localStorage.removeItem(checkbox.id);
                
                // Remove completed class from labels
                const label = checkbox.nextElementSibling.nextElementSibling;
                label.classList.remove('completed');
            });
            
            // Reset progress display
            updateProgressDisplay(0, document.querySelectorAll('input[type="checkbox"]').length);
        }
    }
});