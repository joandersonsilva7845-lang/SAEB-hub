// data.js
var saebDocuments = [
    {
        year: '2023',
        items: [
            {
                title: 'Matriz de Referência SAEB 2023 - Matemática',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/matrizes/saeb_2023_matriz_matematica.pdf'
            },
            {
                title: 'Manual de Aplicação SAEB 2023',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/documentos/saeb_2023_manual_de_aplicacao.pdf'
            },
            {
                title: 'Questionário do Estudante SAEB 2023',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/questionarios/saeb_2023_questionario_estudante.pdf'
            },
            {
                title: 'Relatório de Resultados SAEB 2023',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2023/relatorios/saeb_2023_relatorio_nacional.pdf'
            }
        ]
    },
    {
        year: '2021',
        items: [
            {
                title: 'Matriz de Referência SAEB 2021 - Matemática',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/matrizes/saeb_2021_matriz_matematica.pdf'
            },
            {
                title: 'Manual de Aplicação SAEB 2021',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/documentos/saeb_2021_manual_de_aplicacao.pdf'
            },
            {
                title: 'Questionário do Estudante SAEB 2021',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/questionarios/saeb_2021_questionario_estudante.pdf'
            },
            {
                title: 'Relatório de Resultados SAEB 2021',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2021/relatorios/saeb_2021_relatorio_nacional.pdf'
            }
        ]
    },
    {
        year: '2019',
        items: [
            {
                title: 'Matriz de Referência SAEB 2019 - Matemática',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/matrizes/saeb_2019_matriz_matematica.pdf'
            },
            {
                title: 'Manual de Aplicação SAEB 2019',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/documentos/saeb_2019_manual_de_aplicacao.pdf'
            },
            {
                title: 'Questionário do Estudante SAEB 2019',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/questionarios/saeb_2019_questionario_estudante.pdf'
            },
            {
                title: 'Relatório de Resultados SAEB 2019',
                url: 'https://download.inep.gov.br/educacao_basica/saeb/2019/relatorios/saeb_2019_relatorio_nacional.pdf'
            }
        ]
    }
];

var saebCompetencies = [
    {
        id: 'comp-5',
        label: '5ª série',
        title: 'Competências esperadas na 5ª série',
        details: [
            {
                summary: 'Operações e números',
                description: 'Espera-se que o estudante use operações básicas, compreenda frações e decimais e saiba resolver problemas com números naturais.',
                bullets: [
                    'Adição, subtração, multiplicação e divisão.',
                    'Frações equivalentes e comparação de números.',
                    'Números decimais e ordenação.'
                ]
            },
            {
                summary: 'Geometria e medidas',
                description: 'O aluno deve reconhecer figuras planas, calcular perímetro e área simples e trabalhar com medidas de comprimento, massa e tempo.',
                bullets: [
                    'Figuras geométricas básicas.',
                    'Perímetro de polígonos simples.',
                    'Unidades de medida e conversão.'
                ]
            },
            {
                summary: 'Estatística inicial',
                description: 'Desenvolver capacidade de ler gráficos, tabelas e entender informações coletadas pela escola.',
                bullets: [
                    'Leitura de tabelas e gráficos de barras.',
                    'Interpretação de informações quantitativas.'
                ]
            }
        ]
    },
    {
        id: 'comp-9',
        label: '9ª série',
        title: 'Competências esperadas na 9ª série',
        details: [
            {
                summary: 'Álgebra e expressões',
                description: 'O estudante deve manipular expressões algébricas, resolver equações e trabalhar com padrões numéricos.',
                bullets: [
                    'Equações do 1º grau e sistemas simples.',
                    'Expressões algébricas e simplificação.',
                    'Proporções e relações de proporcionalidade.'
                ]
            },
            {
                summary: 'Funções e variação',
                description: 'Reconhecer e interpretar funções lineares, tabelas e gráficos de variação.',
                bullets: [
                    'Função afim e linhas no plano cartesiano.',
                    'Interpretação de gráficos e tabelas.'
                ]
            },
            {
                summary: 'Geometria e espaço',
                description: 'O aluno deve trabalhar com ângulos, semelhança, áreas e volumes de sólidos geométricos.',
                bullets: [
                    'Ângulos, triângulos e quadriláteros.',
                    'Semelhança entre figuras.',
                    'Volume de prismas e cilindros.'
                ]
            }
        ]
    },
    {
        id: 'comp-3',
        label: '3ª série do ensino médio',
        title: 'Competências esperadas na 3ª série do ensino médio',
        details: [
            {
                summary: 'Funções e progressões',
                description: 'O estudante deve compreender funções lineares, quadráticas, exponenciais e analisar sequências numéricas.',
                bullets: [
                    'Funções polinomiais e exponenciais.',
                    'Gráficos e interpretação de funções.',
                    'Progressões aritméticas e geométricas.'
                ]
            },
            {
                summary: 'Trigonometria e geometria',
                description: 'Espera-se o domínio de relações trigonométricas, identidades e cálculos em triângulos.',
                bullets: [
                    'Funções trigonométricas básicas.',
                    'Lei dos senos e cossenos.',
                    'Áreas de figuras em coordenadas.'
                ]
            },
            {
                summary: 'Estatística e matemática financeira',
                description: 'O aluno deve interpretar dados, calcular medidas de tendência e resolver situações envolvendo juros e porcentagens.',
                bullets: [
                    'Média, mediana e interpretação de gráficos.',
                    'Juros simples e compostos.',
                    'Descontos, proporções e planos de pagamento.'
                ]
            }
        ]
    }
];

var saebQuizAnswers = {
    1: 'Não. O SAEB não altera a nota do aluno na escola. Ele avalia o aprendizado e gera indicadores para políticas educacionais.',
    2: 'Sim. O SAEB é uma avaliação nacional aplicada pelo INEP em diferentes regiões do Brasil.',
    3: 'Não. O Enem é usado para ingresso no ensino superior, enquanto o SAEB mede a qualidade da educação básica.'
};

var saebQuizQuestions = [
    {
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
        question: 'Quais disciplinas são avaliadas pelo SAEB?',
        options: ['Matemática e Língua Portuguesa', 'Ciências e História', 'Educação Física e Artes'],
        correct: 0,
        explanation: 'O SAEB foca principalmente em Matemática e Língua Portuguesa para a avaliação nacional.'
    },
    {
        question: 'O SAEB atribui nota escolar individual ao aluno?',
        options: ['Não, ele gera indicadores coletivos', 'Sim, é uma nota de boletim', 'Apenas para escolas privadas'],
        correct: 0,
        explanation: 'O SAEB gera indicadores coletivos e não substitui a nota individual do boletim escolar.'
    },
    {
        question: 'Quais séries participam do SAEB?',
        options: ['5ª, 9ª e 3ª série do Ensino Médio', '1ª, 2ª e 3ª séries do Fundamental', 'Só o 9º ano'],
        correct: 0,
        explanation: 'O SAEB avalia alunos do 5º e 9º anos do Fundamental e da 3ª série do Ensino Médio.'
    },
    {
        question: 'Em que ano o SAEB foi criado?',
        options: ['1990', '1980', '2000'],
        correct: 0,
        explanation: 'O SAEB foi criado em 1990 como primeira avaliação da educação básica no Brasil.'
    },
    {
        question: 'O SAEB usa qual metodologia de cálculo?',
        options: ['TRI (Teoria de Resposta ao Item)', 'Média Aritmética', 'Mediana'],
        correct: 0,
        explanation: 'O SAEB utiliza TRI desde 1990 para maior precisão na medição de competências.'
    },
    {
        question: 'Qual instituição é responsável pelo SAEB?',
        options: ['INEP', 'MEC', 'UNESCO'],
        correct: 0,
        explanation: 'O INEP (Instituto Nacional de Estudos e Pesquisas) é responsável pela organização e correção do SAEB.'
    },
    {
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
        question: 'Com que frequência o SAEB é realizado?',
        options: ['Anualmente', 'A cada 2 anos', 'A cada 3 anos'],
        correct: 0,
        explanation: 'O SAEB é realizado anualmente desde sua consolidação em 1995.'
    },
    {
        question: 'O SAEB pode ser usado para que fins?',
        options: [
            'Diagnosticar problemas, orientar políticas e avaliar programas educacionais',
            'Punir escolas com baixo desempenho',
            'Selecionar alunos para bolsas'
        ],
        correct: 0,
        explanation: 'O SAEB é uma ferramenta de diagnóstico e orientação, não de punição ou seleção individual.'
    }
];

// Quiz Avançadas por Dificuldade
var advancedQuizQuestions = {
    easy: [
        {
            question: 'O que significa SAEB?',
            options: [
                'Sistema de Avaliação da Educação Básica',
                'Serviço de Análise da Educação Brasileira',
                'Sociedade de Aperfeiçoamento Educacional'
            ],
            correct: 0,
            difficulty: 'easy'
        },
        {
            question: 'Qual é o foco principal do SAEB?',
            options: ['Educação básica', 'Educação superior', 'Profissional'],
            correct: 0,
            difficulty: 'easy'
        }
    ],
    medium: [
        {
            question: 'Como a TRI funciona no SAEB?',
            options: [
                'Considera dificuldade das questões e qualidade das respostas',
                'É apenas uma média de acertos',
                'Cada questão tem o mesmo peso'
            ],
            correct: 0,
            difficulty: 'medium'
        }
    ],
    hard: [
        {
            question: 'Quais são os indicadores gerados pelo SAEB?',
            options: [
                'Proficiência, taxa de participação e fatores contextuais',
                'Apenas pontuação média',
                'Dados aleatórios'
            ],
            correct: 0,
            difficulty: 'hard'
        }
    ]
};
