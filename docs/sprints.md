# Backlog — Sistema de Gestão de Biblioteca Escolar

## Sprint 1 — Fundação

1. Navbar/Header
2. Card de livro (inclui capa automática por categoria)
3. Barra de busca + filtro de categoria
4. Formulário de cadastro de livro (inclui seletor de categoria)
5. CRUD de livros (GET, POST, DELETE, GET /:id)

## Sprint 2 — Livros e empréstimos

1. Página /livros — Listagem de livros
2. Página /cadastro — Cadastrar novo livro
3. Página provisória / — Dashboard
4. Integrar CRUD de livros (GET, POST, DELETE)
5. Integrar modal de detalhes com GET /livros/:id
6. Modal de detalhes do livro
7. Modal de realizar empréstimo
8. CRUD de empréstimos (POST, PATCH /devolver, POST /lembrete, GET ?cliente=nome)

## Sprint 3 — Dashboard, integrações e e-mail

1. Card de métrica (dashboard)
2. Gráfico de barras por categoria
3. Tabela de últimos empréstimos
4. GET /dashboard — métricas e gráfico
5. Integrar modal de empréstimo com POST /emprestimos
6. Serviço de e-mail (Nodemailer + template HTML)
7. Integrar botão Enviar Lembrete com POST /emprestimos/:id/lembrete
8. Integrar botão Devolver com PATCH /emprestimos/:id/devolver
9. Integrar dashboard com GET /dashboard

## Sprint 4 — Mobile

1. Header "Meus Empréstimos"
2. Campo de busca + botão Buscar
3. Card de empréstimo (título, status, datas)
4. Tela única de busca + listagem de empréstimos
5. Integrar tela mobile com GET /emprestimos?cliente=nome
