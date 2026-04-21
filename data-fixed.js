/**
 * 📋 DATA.JS CORRIGIDO - ESTRUTURA COMPLETA DO SAEB HUB
 */

// Documentos por ano (já funciona)
var saebDocuments = [
    {
        year: '2023',
        items: [
            {
                title: 'Matriz de Referência SAEB 2023 - Matemática',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/matrizes/saeb_2023_matriz_matematica.pdf',
                type: 'Matriz'
            },
            {
                title: 'Manual de Aplicação SAEB 2023',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/documentos/saeb_2023_manual_de_aplicacao.pdf',
                type: 'Manual'
            },
            {
                title: 'Questionário do Estudante SAEB 2023',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/questionarios/saeb_2023_questionario_estudante.pdf',
                type: 'Questionário'
            },
            {
                title: 'Relatório de Resultados SAEB 2023',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/relatorios/saeb_2023_relatorio_nacional.pdf',
                type: 'Relatório'
            }
        ]
    },
    {
        year: '2021',
        items: [
            {
                title: 'Matriz de Referência SAEB 2021 - Matemática',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/matrizes/saeb_2021_matriz_matematica.pdf',
                type: 'Matriz'
            },
            {
                title: 'Manual de Aplicação SAEB 2021',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/documentos/saeb_2021_manual_de_aplicacao.pdf',
                type: 'Manual'
            },
            {
                title: 'Questionário do Estudante SAEB 2021',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/questionarios/saeb_2021_questionario_estudante.pdf',
                type: 'Questionário'
            },
            {
                title: 'Relatório de Resultados SAEB 2021',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/relatorios/saeb_2021_relatorio_nacional.pdf',
                type: 'Relatório'
            }
        ]
    },
    {
        year: '2019',
        items: [
            {
                title: 'Matriz de Referência SAEB 2019 - Matemática',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/matrizes/saeb_2019_matriz_matematica.pdf',
                type: 'Matriz'
            },
            {
                title: 'Manual de Aplicação SAEB 2019',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/documentos/saeb_2019_manual_de_aplicacao.pdf',
                type: 'Manual'
            },
            {
                title: 'Questionário do Estudante SAEB 2019',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/questionarios/saeb_2019_questionario_estudante.pdf',
                type: 'Questionário'
            },
            {
                title: 'Relatório de Resultados SAEB 2019',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/relatorios/saeb_2019_relatorio_nacional.pdf',
                type: 'Relatório'
            }
        ]
    }
];

// ✅ COMPETÊNCIAS DIVIDIDAS POR ANO (2023, 2021, 2019)
var saebCompetencies = [
    {
        year: '2023',
        series: [
            {
                id: 'comp-5-2023',
                label: '5ª série (2023)',
                details: [
                    {
                        summary: 'Operações e números',
                        description: 'Espera-se que o estudante use operações básicas, compreenda frações e decimais e saiba resolver problemas com números naturais.',
                        details: [
                            'Adição, subtração, multiplicação e divisão.',
                            'Frações equivalentes e comparação de números.',
                            'Números decimais e ordenação.'
                        ]
                    },
                    {
                        summary: 'Geometria e medidas',
                        description: 'O aluno deve reconhecer figuras planas, calcular perímetro e área simples e trabalhar com medidas.',
                        details: [
                            'Figuras geométricas básicas.',
                            'Perímetro de polígonos simples.',
                            'Unidades de medida e conversão.'
                        ]
                    },
                    {
                        summary: 'Estatística inicial',
                        description: 'Desenvolver capacidade de ler gráficos e tabelas.',
                        details: [
                            'Leitura de tabelas e gráficos de barras.',
                            'Interpretação de informações quantitativas.'
                        ]
                    }
                ]
            },
            {
                id: 'comp-9-2023',
                label: '9ª série (2023)',
                details: [
                    {
                        summary: 'Álgebra e equações',
                        description: 'Resolver equações de primeiro e segundo grau, trabalhar com expressões algébricas.',
                        details: [
                            'Equações do 1º grau.',
                            'Sistema de equações.',
                            'Polinômios e fatoração.'
                        ]
                    },
                    {
                        summary: 'Trigonometria básica',
                        description: 'Introdução a seno, cosseno e tangente.',
                        details: [
                            'Relações trigonométricas.',
                            'Ângulos e arcos.',
                            'Aplicações práticas.'
                        ]
                    }
                ]
            },
            {
                id: 'comp-3m-2023',
                label: '3ª série Médio (2023)',
                details: [
                    {
                        summary: 'Análise combinatória',
                        description: 'Permutações, combinações e arranjos.',
                        details: [
                            'Fatorial e binômio de Newton.',
                            'Probabilidade teórica e empírica.',
                            'Distribuição de probabilidade.'
                        ]
                    },
                    {
                        summary: 'Cálculo integral',
                        description: 'Conceitos básicos de integração.',
                        details: [
                            'Antiderivada e integral indefinida.',
                            'Integral definida.',
                            'Aplicações de cálculo.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        year: '2021',
        series: [
            {
                id: 'comp-5-2021',
                label: '5ª série (2021)',
                details: [
                    {
                        summary: 'Números e operações',
                        description: 'Domínio de operações básicas com inteiros e decimais.',
                        details: [
                            'Números inteiros e operações.',
                            'Frações e decimais.',
                            'Resolução de problemas.'
                        ]
                    }
                ]
            },
            {
                id: 'comp-9-2021',
                label: '9ª série (2021)',
                details: [
                    {
                        summary: 'Álgebra intermediária',
                        description: 'Conceitos mais avançados de equações.',
                        details: [
                            'Sistemas de equações.',
                            'Funções quadráticas.',
                            'Inequações.'
                        ]
                    }
                ]
            }
        ]
    },
    {
        year: '2019',
        series: [
            {
                id: 'comp-5-2019',
                label: '5ª série (2019)',
                details: [
                    {
                        summary: 'Fundamentos de matemática',
                        description: 'Base sólida em operações e cálculo.',
                        details: [
                            'Operações básicas.',
                            'Frações simples.',
                            'Resolução de problemas contextualizados.'
                        ]
                    }
                ]
            }
        ]
    }
];

// ✅ PERGUNTAS DO QUIZ COM RESPOSTAS CORRETAS - DIVIDIDAS POR DIFICULDADE
var saebQuizQuestions = [
    // ===== FÁCIL (5 perguntas) =====
    {
        difficulty: 'easy',
        question: 'Qual é o principal objetivo do SAEB?',
        options: [
            'Medir a aprendizagem de estudantes e apoiar políticas educacionais.',
            'Classificar alunos para vagas em universidades.',
            'Avaliar apenas o desempenho dos professores.'
        ],
        correct: 0,
        explanation: 'O SAEB busca medir aprendizagem e orientar políticas públicas, não selecionar para o ensino superior.'
    },
    {
        difficulty: 'easy',
        question: 'Quais disciplinas são avaliadas pelo SAEB?',
        options: [
            'Matemática e Língua Portuguesa',
            'Ciências e História',
            'Educação Física e Artes'
        ],
        correct: 0,
        explanation: 'O SAEB foca principalmente em Matemática e Língua Portuguesa para a avaliação nacional.'
    },
    {
        difficulty: 'easy',
        question: 'O SAEB atribui nota escolar individual ao aluno?',
        options: [
            'Não, ele gera indicadores coletivos',
            'Sim, é uma nota de boletim',
            'Apenas para escolas privadas'
        ],
        correct: 0,
        explanation: 'O SAEB gera indicadores coletivos e não substitui a nota individual do boletim escolar.'
    },
    {
        difficulty: 'easy',
        question: 'Quais séries participam do SAEB?',
        options: [
            '5ª, 9ª e 3ª série do Ensino Médio',
            '1ª, 2ª e 3ª séries do Fundamental',
            'Só o 9º ano'
        ],
        correct: 0,
        explanation: 'O SAEB avalia alunos do 5º e 9º anos do Fundamental e da 3ª série do Ensino Médio.'
    },
    {
        difficulty: 'easy',
        question: 'Em que ano o SAEB foi criado?',
        options: [
            '1990',
            '1980',
            '2000'
        ],
        correct: 0,
        explanation: 'O SAEB foi criado em 1990 como primeira avaliação da educação básica no Brasil.'
    },

    // ===== MÉDIO (10 perguntas) =====
    {
        difficulty: 'medium',
        question: 'O SAEB usa qual metodologia de cálculo?',
        options: [
            'TRI (Teoria de Resposta ao Item)',
            'Média Aritmética',
            'Mediana'
        ],
        correct: 0,
        explanation: 'O SAEB utiliza TRI desde 1990 para maior precisão na medição de competências.'
    },
    {
        difficulty: 'medium',
        question: 'Qual instituição é responsável pelo SAEB?',
        options: [
            'INEP',
            'MEC',
            'UNESCO'
        ],
        correct: 0,
        explanation: 'O INEP (Instituto Nacional de Estudos e Pesquisas) é responsável pela organização e correção do SAEB.'
    },
    {
        difficulty: 'medium',
        question: 'Qual é a escala de níveis de desempenho do SAEB?',
        options: [
            'Insuficiente, Básico, Adequado, Avançado',
            'Péssimo, Ruim, Bom, Ótimo',
            'Baixo, Médio, Alto, Superior'
        ],
        correct: 0,
        explanation: 'Os níveis são: Insuficiente, Básico, Adequado e Avançado.'
    },
    {
        difficulty: 'medium',
        question: 'Com que frequência o SAEB é realizado?',
        options: [
            'Anualmente',
            'A cada 2 anos',
            'A cada 3 anos'
        ],
        correct: 0,
        explanation: 'O SAEB é realizado anualmente desde sua consolidação em 1995.'
    },
    {
        difficulty: 'medium',
        question: 'O SAEB pode ser usado para que fins?',
        options: [
            'Diagnosticar problemas, orientar políticas e avaliar programas educacionais',
            'Punir escolas com baixo desempenho',
            'Selecionar alunos para bolsas'
        ],
        correct: 0,
        explanation: 'O SAEB é uma ferramenta de diagnóstico e orientação, não de punição ou seleção individual.'
    },
    {
        difficulty: 'medium',
        question: 'Qual a diferença entre SAEB e Prova Brasil?',
        options: [
            'Prova Brasil é uma modalidade do SAEB com amostra universal',
            'São sistemas completamente diferentes',
            'Prova Brasil é para universidades'
        ],
        correct: 0,
        explanation: 'Prova Brasil é parte do SAEB desde 2005, avaliando todas as escolas de redes urbanas.'
    },
    {
        difficulty: 'medium',
        question: 'Como a TRI (Teoria de Resposta ao Item) funciona?',
        options: [
            'Estima a habilidade do estudante considerando padrão de acerto/erro em diferentes itens',
            'Simplesmente conta quantas questões foram acertadas',
            'Ignora respostas incorretas completamente'
        ],
        correct: 0,
        explanation: 'A TRI analisa não apenas acertos, mas padrões de resposta para estimar com precisão a habilidade real.'
    },
    {
        difficulty: 'medium',
        question: 'Qual é o impacto da escala SAEB?',
        options: [
            'Fornece indicadores para políticas públicas, acompanhamento de qualidade e diagnóstico',
            'Afeta diretamente notas de alunos em escolas',
            'Só é usado para pesquisas acadêmicas'
        ],
        correct: 0,
        explanation: 'Os resultados do SAEB influenciam investimentos, programas federais e ações de melhoria nas escolas.'
    },
    {
        difficulty: 'medium',
        question: 'Em qual contexto o SAEB se destaca internacionalmente?',
        options: [
            'Como referência de avaliação de qualidade educacional em larga escala',
            'Como o único teste educacional do mundo',
            'Apenas em países da América Latina'
        ],
        correct: 0,
        explanation: 'O SAEB é reconhecido globalmente por sua metodologia rigorosa e importância para políticas educacionais.'
    },
    {
        difficulty: 'medium',
        question: 'Qual série do Ensino Médio participa do SAEB?',
        options: [
            '3ª série',
            '1ª série',
            '2ª série'
        ],
        correct: 0,
        explanation: 'Apenas a 3ª série do Ensino Médio participa da avaliação do SAEB.'
    },
    {
        difficulty: 'medium',
        question: 'Qual é a amostragem do SAEB?',
        options: [
            'Abrange alunos de escolas públicas e privadas selecionadas em todo o Brasil',
            'Avalia 100% dos alunos do país',
            'Só avalia escolas urbanas'
        ],
        correct: 0,
        explanation: 'O SAEB utiliza amostragem estratificada representativa de toda a população educacional brasileira.'
    },

    // ===== DIFÍCIL (15 perguntas) =====
    {
        difficulty: 'hard',
        question: 'Como o SAEB utiliza dados socioeconômicos na análise?',
        options: [
            'Para controlar variáveis que afetam desempenho e gerar análises mais contextualizadas',
            'Apenas para separar escolas públicas de privadas',
            'Não utiliza dados socioeconômicos'
        ],
        correct: 0,
        explanation: 'O SAEB coleta dados socioeconômicos para análise multivariada, controlando fatores que influenciam o aprendizado.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é a relação entre SAEB e o Índice de Desenvolvimento da Educação Básica (IDEB)?',
        options: [
            'O SAEB fornece dados de desempenho que compõem o cálculo do IDEB',
            'São sistemas totalmente desconectados',
            'O IDEB é anterior ao SAEB'
        ],
        correct: 0,
        explanation: 'O IDEB integra dados de desempenho do SAEB com informações de fluxo escolar para gerar um indicador síntese.'
    },
    {
        difficulty: 'hard',
        question: 'Como a Matriz de Referência do SAEB estrutura as habilidades?',
        options: [
            'Por competências e habilidades específicas distribuídas em temas/eixos temáticos',
            'Apenas por tópicos isolados sem conexão',
            'De forma aleatória baseada em opiniões'
        ],
        correct: 0,
        explanation: 'A Matriz organiza habilidades em eixos temáticos e competências, permitindo diagnóstico detalhado por área.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é a importância da comparabilidade das escalas SAEB ao longo do tempo?',
        options: [
            'Permite análise de tendências e evolução da qualidade educacional ao longo dos anos',
            'É apenas para fins estatísticos sem utilidade prática',
            'Não há necessidade de comparação entre anos'
        ],
        correct: 0,
        explanation: 'A continuidade da escala desde 1990 permite avaliar mudanças reais na qualidade educacional do país.'
    },
    {
        difficulty: 'hard',
        question: 'Como os itens do SAEB são calibrados para diferentes dificuldades?',
        options: [
            'Através de análise estatística complexa de respostas de grandes amostras durante pré-testes',
            'Arbitrariamente pelos avaliadores',
            'Não são calibrados'
        ],
        correct: 0,
        explanation: 'Itens passam por pré-testes com amostras representativas para calibração precisa através da TRI.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é o papel dos itens "âncoras" na metodologia SAEB?',
        options: [
            'Itens de dificuldade conhecida que mantêm a comparabilidade da escala entre anos',
            'Itens descartados por dificuldade extrema',
            'Apenas para treinar os avaliadores'
        ],
        correct: 0,
        explanation: 'Itens âncoras com calibragem conhecida são mantidos entre edições para garantir comparabilidade de escalas.'
    },
    {
        difficulty: 'hard',
        question: 'Como o SAEB diferencia competências cognitivas em matemática?',
        options: [
            'Por níveis de complexidade: reprodução, conexão e reflexão',
            'Apenas por operações matemáticas básicas',
            'Não diferencia competências'
        ],
        correct: 0,
        explanation: 'O SAEB estrutura competências em três níveis de complexidade cognitiva para avaliação multidimensional.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é a implicação da "validade de constructo" no SAEB?',
        options: [
            'Garante que o teste mede efetivamente as habilidades que pretende medir',
            'É apenas um termo técnico sem aplicação prática',
            'Não afeta a confiabilidade do SAEB'
        ],
        correct: 0,
        explanation: 'A validade de constructo assegura que o SAEB mede genuinamente competências educacionais, não artefatos.'
    },
    {
        difficulty: 'hard',
        question: 'Como a correção de questões abertas no SAEB garante confiabilidade?',
        options: [
            'Através de treinamento rigoroso de corretores, dupla correção e sistemas de calibração',
            'Uma única pessoa corrige todas as respostas abertas',
            'Não há controle de qualidade na correção'
        ],
        correct: 0,
        explanation: 'O SAEB utiliza protocolos rigorosos, dupla correção discordante e calibração contínua de corretores.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é o significado de "efeito teto" e "efeito piso" no SAEB?',
        options: [
            'Quando muitos alunos acertam tudo (teto) ou erram tudo (piso), reduzindo discriminação',
            'São apenas termos teóricos sem relevância prática',
            'Referem-se a salas de prova'
        ],
        correct: 0,
        explanation: 'Esses efeitos limitam a capacidade do teste de discriminar alunos e informar políticas adequadamente.'
    },
    {
        difficulty: 'hard',
        question: 'Como o SAEB aborda a questão da equidade nas avaliações?',
        options: [
            'Analisa desempenho desagregado por grupos socioeconômicos, raciais e regionais para identificar disparidades',
            'Assume que todos os alunos têm acesso igual a oportunidades',
            'Não considera aspectos de equidade'
        ],
        correct: 0,
        explanation: 'O SAEB desagrega resultados para revelar desigualdades e informar políticas de equidade educacional.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é a relação entre SAEB e currículo escolar?',
        options: [
            'A Matriz de Referência do SAEB guia o currículo, mas não o substitui completamente',
            'O SAEB ignora completamente o currículo escolar',
            'O SAEB determina 100% do currículo'
        ],
        correct: 0,
        explanation: 'A Matriz oferece referência, mas escolas mantêm autonomia curricular dentro de diretrizes educacionais.'
    },
    {
        difficulty: 'hard',
        question: 'Como o SAEB lida com a "regressão ao fenômeno de Galton" em análises longitudinais?',
        options: [
            'Utiliza modelos estatísticos avançados que controlam a variabilidade natural entre medições',
            'Ignora variabilidade estatística completamente',
            'Não faz análises longitudinais'
        ],
        correct: 0,
        explanation: 'O SAEB emprega metodologias sofisticadas para diferenciar tendências reais de flutuações estatísticas.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é a importância do "feedback diagnóstico" fornecido pelo SAEB às escolas?',
        options: [
            'Permite identificação de lacunas específicas de aprendizado por competência para planejamento de intervenções',
            'É apenas informação agregada sem utilidade diagnóstica',
            'Não fornece feedback às escolas'
        ],
        correct: 0,
        explanation: 'Relatórios diagnósticos permitem que escolas identifiquem pontos fracos e implementem melhorias direcionadas.'
    },
    {
        difficulty: 'hard',
        question: 'Como o SAEB adapta sua metodologia para incluir tecnologias digitais?',
        options: [
            'Desenvolvimento de versões digitais mantendo comparabilidade com edições anteriores através de estudos de ancoragem',
            'Abandona completamente metodologia anterior',
            'Não incorpora tecnologia digital'
        ],
        correct: 0,
        explanation: 'O SAEB evolui para plataformas digitais enquanto garante continuidade das escalas através de estudos rigorosos.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é o impacto da TRI no diagnóstico educacional em relação a escalas tradicionais?',
        options: [
            'TRI oferece precisão superior ao rastrear habilidades complexas independentemente do padrão de respostas',
            'TRI e escalas tradicionais produzem resultados idênticos',
            'TRI é menos preciso que contagem simples de acertos'
        ],
        correct: 0,
        explanation: 'A TRI permite comparabilidade longitudinal e diagnóstico multidimensional impossíveis com escalas simples.'
    },
    {
        difficulty: 'hard',
        question: 'Como os vieses culturais e linguísticos são mitigados no SAEB?',
        options: [
            'Análise de funcionamento diferencial de itens (DIF) para identificar questões com viés para grupos específicos',
            'O SAEB ignora questões culturais completamente',
            'Não há preocupação com vieses'
        ],
        correct: 0,
        explanation: 'O SAEB monitora ativamente para itens com funcionamento diferencial que vantajam ou desvantajam grupos.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é a relação entre proficiência SAEB e currículo formal?',
        options: [
            'Proficiência mede competências esperadas conforme currículo, mas transcende conteúdos específicos',
            'Proficiência e currículo são conceitos totalmente distintos',
            'SAEB avalia apenas conteúdos prescritos no currículo'
        ],
        correct: 0,
        explanation: 'A Matriz de Referência reflete objetivos curriculares mas enfatiza competências transversais e aplicadas.'
    },
    {
        difficulty: 'hard',
        question: 'Como mudanças nas escalas SAEB ao longo de edições garantem continuidade temporal?',
        options: [
            'Através de itens âncoras administrados em múltiplas edições e modelos de equalização estatística',
            'Escalas são completamente redesenhadas a cada edição',
            'Não existe método para garantir continuidade'
        ],
        correct: 0,
        explanation: 'Itens âncoras e modelos de TRI multidimensionais mantêm a escala comparável ao longo dos 30+ anos.'
    },
    {
        difficulty: 'hard',
        question: 'Qual é o significado de proficiência "esperada para a série" no SAEB?',
        options: [
            'Nível que demonstra domínio adequado de competências necessárias ao término da série',
            'Nota mínima para aprovação escolar',
            'Percentual de acertos esperado'
        ],
        correct: 0,
        explanation: 'Proficiência adequada indica competências previstas na Matriz de Referência, não necessariamente na prática escolar.'
    },
    {
        difficulty: 'hard',
        question: 'Como o SAEB contribui para redução de desigualdades educacionais?',
        options: [
            'Diagnosticando disparidades por região, raça, sexo e nível socioeconômico para políticas compensatórias',
            'Eliminando diferenças entre alunos através de teste único',
            'Não tem relação com desigualdades'
        ],
        correct: 0,
        explanation: 'Desagregação de dados revela disparidades, informando investimentos focalizados em grupos vulneráveis.'
    }
];

console.log('✅ Dados carregados: ' + saebDocuments.length + ' anos, ' + saebCompetencies.length + ' anos de competências, ' + saebQuizQuestions.length + ' perguntas');
