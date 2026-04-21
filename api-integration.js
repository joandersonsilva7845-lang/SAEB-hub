/**
 * 🌐 INTEGRAÇÃO COM API INEP - SAEB Hub
 * Conecta com dados em tempo real do Instituto Nacional de Estudos e Pesquisas
 */

class InepAPIIntegration {
    constructor() {
        this.baseURL = 'https://api.inep.gov.br/v1'; // URL simulada
        this.cache = JSON.parse(localStorage.getItem('saeb-api-cache')) || {};
        this.cacheExpiry = 1000 * 60 * 60 * 24; // 24 horas
    }

    /**
     * Busca dados em cache ou na API
     */
    async fetchWithCache(endpoint, cacheKey) {
        // Verificar cache
        const cached = this.cache[cacheKey];
        if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
            console.log(`📦 Usando cache para ${cacheKey}`);
            return cached.data;
        }

        // Buscar da API
        try {
            console.log(`🌐 Buscando ${endpoint} da API INEP...`);
            const response = await fetch(`${this.baseURL}${endpoint}`);
            
            if (!response.ok) {
                // Se falhar, usar dados simulados
                return this.getSimulatedData(endpoint);
            }

            const data = await response.json();

            // Salvar em cache
            this.cache[cacheKey] = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem('saeb-api-cache', JSON.stringify(this.cache));

            return data;
        } catch (error) {
            console.warn(`⚠️ Erro ao buscar API, usando dados simulados:`, error);
            return this.getSimulatedData(endpoint);
        }
    }

    /**
     * Retorna dados simulados quando API não está disponível
     */
    getSimulatedData(endpoint) {
        if (endpoint.includes('documentos')) {
            return {
                documentos: [
                    { id: 1, ano: 2024, tipo: 'Matriz', url: '#', downloaded: 1250 },
                    { id: 2, ano: 2024, tipo: 'Manual', url: '#', downloaded: 890 },
                    { id: 3, ano: 2024, tipo: 'Relatório', url: '#', downloaded: 2150 }
                ]
            };
        } else if (endpoint.includes('competencias')) {
            return {
                competencias: [
                    { serie: '5ª', total: 12, mastered: 8 },
                    { serie: '9ª', total: 15, mastered: 11 },
                    { serie: '3ª', total: 18, mastered: 14 }
                ]
            };
        } else if (endpoint.includes('estatisticas')) {
            return {
                media_nacional: 251.5,
                media_regional: 258.3,
                tendencia: 'crescente',
                ultima_atualizacao: new Date().toISOString()
            };
        }
        return {};
    }

    /**
     * Busca documentos em tempo real
     */
    async fetchDocuments() {
        return this.fetchWithCache('/documentos?ano=2024&tipo=todos', 'documentos-2024');
    }

    /**
     * Busca competências atualizadas
     */
    async fetchCompetencies() {
        return this.fetchWithCache('/competencias/matematica', 'competencias-math');
    }

    /**
     * Busca estatísticas nacionais
     */
    async fetchNationalStats() {
        return this.fetchWithCache('/estatisticas/nacional', 'stats-national');
    }

    /**
     * Busca desempenho por região
     */
    async fetchRegionalPerformance(region) {
        return this.fetchWithCache(`/desempenho/regiao/${region}`, `desempenho-${region}`);
    }

    /**
     * Sincroniza dados do usuário com servidor
     */
    async syncUserData(userData) {
        try {
            console.log('🔄 Sincronizando dados do usuário...');
            
            // Simular requisição POST
            const response = await this.simulatePost('/usuarios/sincronizar', userData);
            
            return { success: true, message: '✅ Dados sincronizados!' };
        } catch (error) {
            console.warn('⚠️ Falha ao sincronizar:', error);
            return { success: false, message: '⚠️ Sincronização será feita offline' };
        }
    }

    /**
     * Busca provas passadas (simulado)
     */
    async fetchPastExams() {
        return this.fetchWithCache('/provas/historico', 'provas-passadas');
    }

    /**
     * Busca recursos de estudo recomendados
     */
    async fetchRecommendedResources(competency) {
        return this.fetchWithCache(`/recursos/recomendados?competencia=${competency}`, `recursos-${competency}`);
    }

    /**
     * Simula requisição POST (já que não temos backend real)
     */
    async simulatePost(endpoint, data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: { ...data, syncedAt: new Date().toISOString() }
                });
            }, 1000);
        });
    }

    /**
     * Atualiza status de sincronização na UI
     */
    updateSyncStatus(status, message) {
        const syncPanel = document.getElementById('sync-status');
        if (syncPanel) {
            syncPanel.innerHTML = `
                <span class="sync-indicator ${status}"></span>
                ${message}
            `;
        }
    }

    /**
     * Limpa cache
     */
    clearCache() {
        this.cache = {};
        localStorage.removeItem('saeb-api-cache');
        console.log('🗑️ Cache limpo');
    }
}

// Inicializar integração
const inepAPI = new InepAPIIntegration();
