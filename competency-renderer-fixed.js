/**
 * 🧠 RENDERIZAÇÃO DE COMPETÊNCIAS - SAEB Hub
 * Divididas por ANO (2023, 2021, 2019)
 */

function renderCompetencyTabs() {
    console.log('🧠 Renderizando competências por ano...');
    
    const container = document.getElementById('competenciesContent');
    if (!container || !saebCompetencies) return;
    
    container.innerHTML = '';
    
    // Criar abas de ANOS
    const yearsHTML = saebCompetencies.map((yearData, index) => `
        <button class="series-tab ${index === 0 ? 'active' : ''}" 
                onclick="showCompetencyYear(${index})"
                style="cursor: pointer; padding: 12px 20px; background: var(--bg-surface); 
                       border: 2px solid var(--border-color); border-radius: 8px; 
                       font-weight: 600; transition: all 0.3s;">
            📅 ${yearData.year}
        </button>
    `).join('');
    
    container.innerHTML = `
        <div class="series-tabs" style="display: flex; gap: 12px; margin-bottom: 25px; flex-wrap: wrap;">
            ${yearsHTML}
        </div>
        <div id="competencyContent" class="competencies-content"></div>
    `;
    
    // Mostrar primeiro ano
    showCompetencyYear(0);
}

function showCompetencyYear(yearIndex) {
    console.log(`🧠 Mostrando competências do ano ${yearIndex}...`);
    
    const contentContainer = document.getElementById('competencyContent');
    if (!contentContainer || !saebCompetencies) return;
    
    const yearData = saebCompetencies[yearIndex];
    const tabs = document.querySelectorAll('.series-tab');
    
    // Atualizar classe active
    tabs.forEach((tab, i) => {
        if (i === yearIndex) {
            tab.classList.add('active');
            tab.style.background = 'var(--primary)';
            tab.style.color = 'white';
            tab.style.borderColor = 'var(--primary)';
        } else {
            tab.classList.remove('active');
            tab.style.background = 'var(--bg-surface)';
            tab.style.color = 'var(--text-dark)';
            tab.style.borderColor = 'var(--border-color)';
        }
    });
    
    // Renderizar séries dentro do ano
    let html = '<div style="display: grid; gap: 20px;">';
    
    yearData.series.forEach((serie, serieIndex) => {
        html += `
            <div style="border: 2px solid var(--border-color); border-radius: 12px; overflow: hidden; 
                       background: var(--bg-surface);">
                <div style="padding: 15px; background: var(--primary); color: white; font-weight: 600; 
                           font-size: 1.1em;">
                    ${serie.label}
                </div>
                <div style="padding: 15px;">
                    ${serie.details.map((detail, detailIndex) => `
                        <div style="background: var(--bg-base); padding: 15px; border-radius: 8px; 
                                   margin-bottom: ${detailIndex < serie.details.length - 1 ? '12px' : '0'}; 
                                   cursor: pointer; transition: all 0.3s;"
                             onmouseover="this.style.background = 'var(--bg-surface)'"
                             onmouseout="this.style.background = 'var(--bg-base)'">
                            <div style="font-weight: 600; color: var(--primary); margin-bottom: 8px;">
                                ${detail.summary}
                            </div>
                            <div style="font-size: 0.95em; color: var(--text-muted); margin-bottom: 10px;">
                                ${detail.description}
                            </div>
                            ${detail.details ? `
                                <ul style="margin-left: 20px; margin-top: 10px; color: var(--text-dark); 
                                          font-size: 0.9em;">
                                    ${detail.details.map(d => `<li>${d}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contentContainer.innerHTML = html;
}

function bindCompetencyTabs() {
    renderCompetencyTabs();
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', () => {
    renderCompetencyTabs();
});

