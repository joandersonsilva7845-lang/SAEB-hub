/**
 * 📂 SISTEMA DE ACORDEÕES COMPLETO - SAEB Hub
 */

function initAccordion() {
    console.log('📂 Inicializando acordeões...');
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Fechar todos os acordeões
            const allItems = header.closest('.accordion')?.querySelectorAll('.accordion-item') || 
                           document.querySelectorAll('.accordion-item');
            allItems.forEach(accordionItem => {
                if (accordionItem !== item) {
                    accordionItem.classList.remove('active');
                    const content = accordionItem.querySelector('.accordion-content');
                    if (content) content.style.maxHeight = '0';
                }
            });
            
            // Toggle item atual
            if (isActive) {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                if (content) content.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', initAccordion);
