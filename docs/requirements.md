# Requisitos — Sistema de Gestão de Biblioteca Escolar

> Documento de referência para o squad. Baseado no desafio de desenvolvimento PTA 26.1.

---

## 1. Objetivo do Sistema

Prover uma ferramenta centralizada para administradores gerenciarem livros e locações **(Web)** e permitir que leitores consultem seu histórico de empréstimos e status de devolução **(Mobile)**, garantindo a integridade dos dados e o cumprimento dos prazos através de notificações automáticas.

---

## 2. Stack

| Camada          | Tecnologia                                         |
| --------------- | -------------------------------------------------- |
| Frontend Web    | Next.js 14 + TypeScript + Tailwind CSS + Shadcn UI |
| Backend         | Node.js + TypeScript + Express + Prisma 5          |
| Banco de dados  | PostgreSQL (Docker)                                |
| Mobile          | Expo (React Native + TypeScript)                   |
| E-mail          | Nodemailer (SMTP)                                  |
| Package manager | pnpm                                               |

---

## 3. Requisitos Funcionais

### 3.1 Web (Administração)

| ID   | Descrição                                                                                                                          |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| RF01 | O sistema deve exibir um dashboard com o total de livros, empréstimos ativos e livros em atraso.                                   |
| RF02 | O sistema deve apresentar um gráfico de distribuição de livros por categoria (Romance, Infantil, Tecnologia, História e Ciências). |
| RF03 | O sistema deve permitir o cadastro de livros com título, autor, ISBN, editora, ano, quantidade e categoria.                        |
| RF04 | O sistema deve atribuir automaticamente uma imagem de capa ao livro baseada na categoria selecionada.                              |
| RF05 | O sistema deve permitir a listagem de livros com filtros por título, autor e categoria.                                            |
| RF06 | O sistema deve permitir a exclusão de um livro do acervo.                                                                          |
| RF07 | O sistema deve registrar empréstimos vinculando o livro ao nome do cliente e e-mail.                                               |
| RF08 | O sistema deve exibir o histórico de empréstimos detalhado dentro da página de detalhes do livro.                                  |
| RF09 | O sistema deve permitir o envio de e-mail de lembrete para clientes com empréstimos atrasados através do botão "Enviar lembrete".  |

### 3.2 Mobile (Usuário)

| ID   | Descrição                                                                                                            |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
| RF10 | O aplicativo deve possuir um campo de busca para pesquisar empréstimos pelo nome do cliente.                         |
| RF11 | O sistema deve listar os empréstimos encontrados, exibindo nome do livro, datas de locação/devolução, status e capa. |

---

## 4. Regras de Negócio

### RN01 — Disponibilidade

Um empréstimo só pode ser realizado se a `quantidade_disponivel` do livro for **superior a zero**.

### RN02 — Atualização de estoque

- Ao **confirmar** um empréstimo → subtrair 1 de `quantidade_disponivel`
- Ao **devolver** → somar 1 de `quantidade_disponivel`
- Ambas as operações devem ser **atômicas** (transação Prisma)

### RN03 — Cálculo de atraso

O status `Atrasado` é calculado **dinamicamente** na leitura — nunca salvo no banco:

```
if (data_atual > data_prevista_devolucao && status != Devolvido) → Atrasado
```

### RN04 — Edição

- **Não é permitida** a edição de dados de livros após o cadastro
- Em caso de erro, o livro deve ser **excluído e recadastrado**
- Não implementar endpoint `PUT/PATCH` para livros
- **Não é possível excluir** um livro com empréstimo ativo (`Em_andamento`)

### RN05 — Autenticação

- O sistema **não possui** controle de acesso por senha
- Acesso livre para qualquer usuário na rede designada
- Não implementar login, JWT ou sessão

---

## 5. Validações de Formulário

| Campo             | Regra                                          |
| ----------------- | ---------------------------------------------- |
| ISBN              | 10 ou 13 dígitos numéricos                     |
| Data de devolução | Não pode ser anterior à data de locação        |
| E-mail            | Formato válido (exemplo@dominio.com)           |
| Todos os campos   | Obrigatórios no cadastro de livro e empréstimo |

---

## 6. Modelagem do Banco

### Entidade: Livro

```prisma
model Livro {
  id                    String       @id @default(uuid())
  titulo                String
  autor                 String
  isbn                  String
  editora               String
  ano                   Int
  quantidade_total      Int
  quantidade_disponivel Int
  categoria             Categoria
  emprestimos           Emprestimo[]
  createdAt             DateTime     @default(now())
}
```

### Entidade: Empréstimo

```prisma
model Emprestimo {
  id                      String   @id @default(uuid())
  livroId                 String
  nome_cliente            String
  email_cliente           String
  data_locacao            DateTime
  data_prevista_devolucao DateTime
  status                  Status   @default(Em_andamento)
  createdAt               DateTime @default(now())
  livro                   Livro    @relation(fields: [livroId], references: [id])
}
```

### Enums

```prisma
enum Categoria {
  Romance
  Infantil
  Tecnologia
  Historia
  Ciencias
}

enum Status {
  Em_andamento
  Devolvido
  Atrasado  // nunca salvo no banco — calculado na leitura (RN03)
}
```

---

## 7. Endpoints da API

### Livros

| Método | Rota        | Descrição                                               |
| ------ | ----------- | ------------------------------------------------------- |
| GET    | /livros     | Listar livros com filtros por título, autor e categoria |
| GET    | /livros/:id | Detalhes do livro + histórico de empréstimos            |
| POST   | /livros     | Cadastrar livro                                         |
| DELETE | /livros/:id | Excluir livro (bloqueado se tiver empréstimo ativo)     |

### Empréstimos

| Método | Rota                      | Descrição                                       |
| ------ | ------------------------- | ----------------------------------------------- |
| POST   | /emprestimos              | Registrar empréstimo                            |
| PATCH  | /emprestimos/:id/devolver | Registrar devolução                             |
| POST   | /emprestimos/:id/lembrete | Enviar e-mail de lembrete                       |
| GET    | /emprestimos?cliente=nome | Buscar empréstimos por nome do cliente (mobile) |

### Dashboard

| Método | Rota       | Descrição                                        |
| ------ | ---------- | ------------------------------------------------ |
| GET    | /dashboard | Retornar métricas, gráfico e últimos empréstimos |

---

## 8. Capas por Categoria

As capas são atribuídas automaticamente no frontend baseadas na categoria do livro. Não são salvas no banco.

| Categoria  | Arquivo                        |
| ---------- | ------------------------------ |
| Romance    | `/public/capas/romance.jpg`    |
| Tecnologia | `/public/capas/tecnologia.jpg` |
| Historia   | `/public/capas/historia.jpg`   |
| Ciencias   | `/public/capas/ciencias.jpg`   |
| Infantil   | `/public/capas/infantil.jpg`   |

> **Atenção:** o enum no banco usa `Historia` sem acento. Fazer o mapeamento no frontend antes de enviar pro backend.
