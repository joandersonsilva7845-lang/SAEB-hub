// accordion.js
function initAccordion() {
    var accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach(function(title) {
        title.addEventListener('click', function() {
            var targetId = title.getAttribute('data-target');
            var content = document.getElementById(targetId);
            var isOpen = content.style.display === 'block';

            document.querySelectorAll('.accordion-content').forEach(function(el) {
                el.style.display = 'none';
            });
            document.querySelectorAll('.accordion-title').forEach(function(el) {
                el.classList.remove('active');
            });

            if (!isOpen) {
                content.style.display = 'block';
                title.classList.add('active');
            }
        });
    });
}
