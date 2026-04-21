/**
 * 📄 RENDERIZAÇÃO DE DOCUMENTOS - SAEB Hub
 */

function renderDocumentYears() {
    console.log('📄 Renderizando documentos...');
    
    const container = document.getElementById('documentsContainer');
    if (!container || !saebDocuments) return;
    
    container.innerHTML = '';
    
    saebDocuments.forEach(year => {
        const yearSection = document.createElement('div');
        yearSection.className = 'documents-year-section';
        yearSection.innerHTML = `
            <h3 style="color: var(--primary); margin-bottom: 15px; font-size: 1.3em;">
                📅 ${year.year}
            </h3>
            <div class="documents-list" style="display: grid; gap: 10px;">
                ${year.items.map(doc => `
                    <a href="${doc.url}" target="_blank" rel="noopener" class="document-item" 
                       onclick="trackDocumentView('${doc.title}')">
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 15px; 
                                    background: var(--bg-surface); border-radius: 8px; border: 1px solid var(--border-color);
                                    transition: all 0.3s; cursor: pointer;">
                            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                                <span style="font-size: 1.5em;">📄</span>
                                <div>
                                    <div style="font-weight: 600; color: var(--text-dark);">${doc.title}</div>
                                    <div style="font-size: 0.85em; color: var(--text-muted);">${doc.type || 'Documento'}</div>
                                </div>
                            </div>
                            <span style="color: var(--primary); font-weight: 600;">Abrir →</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
        
        container.appendChild(yearSection);
    });
}

function trackDocumentView(title) {
    console.log(`📖 Visualizando documento: ${title}`);
    if (typeof analytics !== 'undefined') {
        analytics.trackDocumentView(title);
    }
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', renderDocumentYears);
