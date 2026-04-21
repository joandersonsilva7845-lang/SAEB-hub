// tabs.js
function activateTab(target) {
    var tabButtons = document.querySelectorAll('.tab-button');
    var tabPanels = document.querySelectorAll('.tab-panel');
    tabButtons.forEach(function(item) {
        item.classList.toggle('active', item.getAttribute('data-tab') === target);
    });
    tabPanels.forEach(function(panel) {
        panel.classList.toggle('active', panel.id === target);
    });
}

function bindTabs() {
    var tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            activateTab(button.getAttribute('data-tab'));
        });
    });
}

function bindQuickAccessLinks() {
    var quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var target = link.getAttribute('href').replace('#', '');
            if (target) {
                activateTab(target);
                var panel = document.getElementById(target);
                if (panel) {
                    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function bindCompetencyTabs() {
    var compTabButtons = document.querySelectorAll('.competency-tab-button');
    var compTabPanels = document.querySelectorAll('.competency-panel');
    compTabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var target = button.getAttribute('data-tab');
            compTabButtons.forEach(function(item) {
                item.classList.remove('active');
            });
            button.classList.add('active');
            compTabPanels.forEach(function(panel) {
                panel.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });
}
