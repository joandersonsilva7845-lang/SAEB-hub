// competency-renderer.js
function renderCompetencyTabs() {
    var competencyTabs = document.getElementById('competencyTabs');
    var competencyPanels = document.getElementById('competencyPanels');
    clearChildren(competencyTabs);
    clearChildren(competencyPanels);

    saebCompetencies.forEach(function(section, index) {
        var tabButton = createElement('button', {
            className: 'competency-tab-button' + (index === 0 ? ' active' : ''),
            'data-tab': section.id
        }, section.label);
        competencyTabs.appendChild(tabButton);

        var panel = createElement('div', {
            id: section.id,
            className: 'competency-panel' + (index === 0 ? ' active' : '')
        });

        var group = createElement('div', { className: 'competency-group' });
        group.appendChild(createElement('h3', null, section.title));

        section.details.forEach(function(detail, detailIndex) {
            var detailsElem = createElement('details');
            if (detailIndex === 0) {
                detailsElem.open = true;
            }
            detailsElem.appendChild(createElement('summary', null, detail.summary));
            detailsElem.appendChild(createElement('p', null, detail.description));

            var bulletsList = createElement('ul');
            detail.bullets.forEach(function(bullet) {
                bulletsList.appendChild(createElement('li', null, bullet));
            });
            detailsElem.appendChild(bulletsList);
            group.appendChild(detailsElem);
        });

        panel.appendChild(group);
        competencyPanels.appendChild(panel);
    });
}
