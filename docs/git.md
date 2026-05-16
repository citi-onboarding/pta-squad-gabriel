# Git & GitHub — Boas Práticas

> Guia para o squad do projeto Biblioteca Escolar.

---

## Commits

Mensagem de commit em **inglês**, seguindo o padrão **Conventional Commits**:

```
type: short description of what was done
```

### Tipos

| Tipo       | Quando usar                                      |
| ---------- | ------------------------------------------------ |
| `feat`     | Nova funcionalidade                              |
| `fix`      | Correção de bug                                  |
| `chore`    | Configuração, dependência, sem impacto no código |
| `refactor` | Melhoria de código sem mudar comportamento       |
| `style`    | Formatação, espaçamento, sem lógica              |

### Exemplos

```bash
# ✅ Correto
feat: add book card with automatic cover by category
fix: correct ISBN validation on form
chore: install nodemailer dependency
refactor: move cover mapping to utils file

# ❌ Errado
changes
fixed
test
arrumei
```

> Commit pequeno e frequente é melhor que um commit gigante no final do dia.

---

## Branches

Nunca codar direto na `main`. Cada task vira uma branch:

```bash
git checkout -b feat/book-card
git checkout -b feat/books-crud
git checkout -b fix/isbn-validation
```

Padrão: `type/task-name` em kebab-case.

---

## Fluxo do dia a dia

```bash
# 1. Antes de começar, atualiza a main
git checkout main
git pull

# 2. Cria a branch da task
git checkout -b feat/task-name

# 3. Codou, commita
git add .
git commit -m "feat: description of what was done"

# 4. Sobe a branch
git push origin feat/task-name

# 5. Abre PR no GitHub
```

---

## Pull Request

### Título

Seguir o mesmo padrão dos commits:

```
feat: add book registration form with category selection
```

### Descrição

```markdown
## What was done

- Added book registration form component
- Added visual category selector with cover images
- Added field validations (required fields and ISBN format)
- Used Shadcn UI components (Input, Button, Label)

## How to test

1. Access /livros/novo
2. Try to submit the form empty — should show error messages
3. Fill in an invalid ISBN — should show specific error
4. Select a category — should highlight and show cover image
5. Fill in all fields correctly and submit — should log form data in console

## Screenshots

(adicionar print da tela)

## Notes

- API integration pending (TODO in handleSubmit)
- Cover images must be placed in /public/capas/
```

### Regras

- Pelo menos **uma pessoa** do squad revisa antes de mergear
- **Nunca mergeia** o próprio PR sem revisão
- Um PR por task — não misturar features

---

## Regras gerais

- ❌ Nunca dá `push` direto na `main`
- ✅ Sempre atualiza a `main` antes de criar uma branch nova
- ✅ Se demorar muito numa branch, roda `git pull origin main` pra se manter atualizado
- ❌ Nunca commita o arquivo `.env` — deve estar no `.gitignore`
