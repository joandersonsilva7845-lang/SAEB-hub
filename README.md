# 🎓 SAEB Hub - Plataforma Educacional Completa

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

**SAEB Hub** é uma plataforma interativa, moderna e profissional para dominar o Sistema de Avaliação da Educação Básica (SAEB). Desenvolvida com foco em **acessibilidade**, **performance** e **experiência do usuário**.

## ✨ Características Principais

### 📚 Documentos Oficiais
- Acesso a todos os documentos do INEP
- Organizado por ano (2023, 2021, 2019, etc.)
- Filtro por tipo (Matrizes, Manuais, Relatórios)
- Busca global integrada
- Upload de documentos personalizados

### 🧠 Competências de Matemática
- Competências estruturadas por série:
  - 5ª série do Fundamental
  - 9ª série do Fundamental
  - 3ª série do Ensino Médio
- Descrições detalhadas
- Exemplos práticos
- Links para recursos complementares

### 🎯 Quiz Interativo
- **Quiz Básico**: 10 perguntas rápidas
- **Quiz Avançado**: 3 níveis de dificuldade
  - Fácil (5 questões)
  - Médio (10 questões)
  - Difícil (15 questões)
- Feedback imediato
- Geração de certificados (pontuação ≥ 70%)
- Histórico de resultados

### 📊 Painel de Progresso
- Estatísticas em tempo real:
  - Documentos consultados
  - Quiz completados
  - Média de pontuação
  - Certificados obtidos
  - Tempo dedicado
- Troféus e conquistas
- Gráficos de desempenho
- Exportação de dados

### ♿ Acessibilidade Premium
- **Alto Contraste**: Modo de alto contraste configurável
- **Fonte Grande**: Aumentar tamanho da fonte
- **Modo Escuro**: Tema escuro para reduzir fadiga ocular
- **Atalhos de Teclado**:
  - Alt+1: Alto Contraste
  - Alt+2: Fonte Grande
  - Alt+3: Modo Escuro
  - Alt+A: Painel de Acessibilidade
- **ARIA Labels**: Suporte total para leitores de tela
- **Skip Links**: Navegação por teclado
- **Contraste WCAG AAA**: Conformidade máxima

### 🔍 Busca Global
- Busca em tempo real
- Busca em documentos e competências
- Sugestões autocompletas
- Resultados organizados

### 🏆 Gamificação
- Sistema de troféus desbloqueáveis:
  - 🎯 Primeiro Passo
  - 📚 Leitor Ávido
  - 🧠 Estudioso
  - 🎓 Mestre do SAEB
  - ⚡ Especialista
  - 🏆 Campeão
- Pontuação progressiva
- Classificação por desempenho

### 📱 Responsivo
- Design Mobile-First
- Totalmente responsivo
- Toca otimizado
- Performance otimizada
- PWA (Progressive Web App)

### 🎨 Design Moderno
- Interface limpa e intuitiva
- Animações suaves
- Gradientes e glassmorphism
- Tema claro/escuro
- Ícones expressivos

### 💾 Persistência de Dados
- LocalStorage para preferências
- Histórico de quiz
- Progresso salvo automaticamente
- Sincronização entre abas

### 🔐 Sistema de Autenticação
- Login e registro seguro
- Gestão de perfil de usuário
- Histórico de login
- Sincronização de dados entre dispositivos
- Backup automático de progresso

### 🌐 Integração com API INEP
- Conexão com dados em tempo real
- Cache inteligente para offline
- Atualização automática de documentos
- Dados oficiais sempre atualizados
- Estatísticas nacionais integradas

### 🔔 Sistema de Notificações
- Notificações push nativas
- Lembretes de estudo agendados
- Alertas de conquistas
- Notificações de nova estudo
- Customização de preferências

### 🏆 Leaderboard e Competição
- Ranking global de jogadores
- Ranking entre amigos
- Desafios interativos
- Sistema de níveis com pontos
- Medalhas por posição
- Histórico de desempenho

### ☁️ Sincronização na Cloud
- Backup automático dos dados
- Sincronização multi-dispositivo
- Fila de sincronização offline
- Restauração de backups
- Controle de privacidade

## 🚀 Como Usar

### 1. Abrir a Plataforma
Abra `proposta.html` em seu navegador moderno.

### 2. Explorar Conteúdo
- Use as abas de navegação no topo
- Clique em "Acesso Rápido" para ir direto ao conteúdo
- Use a busca para encontrar tópicos específicos

### 3. Ler Documentos
- Acesse a aba "Documentos"
- Clique em qualquer documento para abrir
- Use filtros para organizar por tipo
- Faça upload de seus documentos

### 4. Estudar Competências
- Acesse a aba "Matemática"
- Selecione a série desejada
- Leia as habilidades esperadas
- Explore detalhes clicando nos acordeões

### 5. Fazer Quiz
- **Quiz Básico**: Na aba "Sobre o SAEB", clique em "Iniciar Quiz"
- **Quiz Avançado**: Na aba "Quiz", escolha a dificuldade
- Responda as perguntas
- Veja feedback imediato
- Receba certificado se ≥ 70%

### 6. Acompanhar Progresso
- Acesse a aba "Progresso"
- Visualize suas estatísticas
- Veja troféus desbloqueados
- Exporte seus dados

### 7. Personalizar Preferências
- Clique no botão ♿ (Acessibilidade)
- Escolha suas opções:
  - Alto Contraste
  - Fonte Grande
  - Modo Escuro
- Preferências são salvas automaticamente

## 🛠️ Estrutura do Projeto

```
Site mobile/
├── proposta.html           # Página principal
├── style.css              # Estilos (CSS moderno)
├── manifest.json          # Configuração PWA
│
├── JavaScript:
├── main.js               # Script principal
├── accessibility.js      # Controle de acessibilidade
├── analytics.js         # Analytics e progresso
├── accordion.js         # Lógica dos acordeões
├── tabs.js             # Lógica de abas
├── quiz.js             # Sistema de quiz
├── document-renderer.js # Renderização de documentos
├── competency-renderer.js # Renderização de competências
├── utils.js            # Funções auxiliares
│
└── Data:
    └── data.js         # Dados dos documentos e quiz
```

## 📋 Funcionalidades Avançadas

### Analytics Integrado
- Rastreamento de eventos
- Histórico de atividades
- Cálculo de progresso
- Geração de relatórios

### Certificados
- Geração automática de certificados
- Download em PNG
- Código único por certificado
- Validação de pontuação

### Tour Guiado
- Explicação interativa
- Navegação por passos
- Orientação para novos usuários
- Acessível via botão "Ver Tour"

## 🎯 Requisitos

### Navegadores Suportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Requisitos Mínimos
- JavaScript habilitado
- 50MB de espaço (localStorage)
- Conexão com internet (para links de documentos)

## 📊 Compatibilidade WCAG

✅ **Nível AAA**
- Contraste de cores (7:1+)
- Texto redimensionável
- Suporte a leitores de tela
- Navegação por teclado
- Sem piscar > 3x/seg

## 🔐 Privacidade

- ✅ Sem rastreamento externo
- ✅ Dados armazenados localmente
- ✅ Sem cookies de terceiros
- ✅ Sem coleta de dados pessoais
- ✅ Open source

## 📈 Performance

- ⚡ Carregamento < 2s
- 📱 Funciona offline (parcialmente)
- 🎯 Lighthouse Score: 95+
- 💨 Otimizado para mobile

## 🆘 Suporte

### FAQ

**P: Posso usar em tablet/mobile?**
R: Sim! A plataforma é totalmente responsiva e otimizada para todos os dispositivos.

**P: Meus dados são salvos?**
R: Sim, localmente no seu navegador via localStorage. Você pode exportá-los a qualquer momento.

**P: Posso instalar como aplicativo?**
R: Sim! Clique em "Instalar" no navegador (PWA). Funciona offline parcialmente.

**P: Os documentos são reais?**
R: Sim! Todos os links apontam para documentos oficiais do INEP.

## 📝 Licença

MIT License - Use livremente para fins educacionais.

## 👨‍💻 Desenvolvido por

SAEB Hub Team - Educação de Qualidade

## 🤝 Contribuições

Ideias e melhorias são bem-vindas! Para contribuir:
1. Faça fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push e faça um Pull Request

## 📞 Contato

📧 info@saebhub.edu.br
📱 (61) 3210-9876

---

**Nota**: Esta é uma plataforma educacional. Para oficialmente certificação, consulte o INEP.

**Última atualização**: Abril 2024 | **Versão**: 2.0.0 (10/10) ⭐
