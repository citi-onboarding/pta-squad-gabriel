# Regras de Negócio — Mapeamento por Camada

> Referência técnica para o squad. Onde cada regra vive no código.

---

## RN01 — Disponibilidade

> Um empréstimo só pode ser realizado se `quantidade_disponivel > 0`

| Camada   | Implementação                                                  |
| -------- | -------------------------------------------------------------- |
| Frontend | Desabilitar botão "Emprestar" se `quantidade_disponivel == 0`  |
| Backend  | Verificar antes de criar empréstimo — retornar `400` se falhar |
| Banco    | Sem constraint — validação é no serviço                        |

⚠️ O frontend desabilita o botão, mas o **backend precisa validar também**.

---

## RN02 — Atualização de estoque

> Criar empréstimo subtrai 1. Devolver soma 1. Operação deve ser atômica.

| Camada   | Implementação                                                                        |
| -------- | ------------------------------------------------------------------------------------ |
| Frontend | Atualizar qtd exibida no card após resposta de sucesso da API                        |
| Backend  | Usar `prisma.$transaction()` — criar/devolver + atualizar qtd em uma única transação |
| Banco    | Transação Prisma garante atomicidade no PostgreSQL                                   |

> RN01 e RN02 sempre juntas — verificação e decremento na mesma transação.

---

## RN03 — Cálculo de atraso

> Status `Atrasado` é calculado dinamicamente — nunca salvo no banco.

| Camada   | Implementação                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------- |
| Frontend | Renderizar badge com o status que vier da API — não recalcular no front                               |
| Backend  | Em todo GET que retorna empréstimos: `if (now > dataPrevista && status !== 'Devolvido') → 'Atrasado'` |
| Banco    | Campo `status` guarda apenas `Em_andamento` ou `Devolvido`                                            |

```typescript
// Exemplo de cálculo no backend
const agora = new Date();
const status =
  emprestimo.status !== "Devolvido" &&
  agora > emprestimo.data_prevista_devolucao
    ? "Atrasado"
    : emprestimo.status;
```

---

## RN04 — Sem edição

> Não é permitida a edição de livros. Em caso de erro, excluir e recadastrar.

| Camada   | Implementação                                                                         |
| -------- | ------------------------------------------------------------------------------------- |
| Frontend | Não exibir botão de edição em lugar nenhum                                            |
| Backend  | Não implementar `PUT/PATCH` para livros. `DELETE` bloqueado se tiver empréstimo ativo |
| Banco    | Sem constraint — regra é comportamental                                               |

⚠️ `DELETE /livros/:id` retorna `400` se houver empréstimo com status `Em_andamento`.

---

## RN05 — Sem autenticação

> Acesso livre para qualquer usuário na rede.

| Camada   | Implementação                                               |
| -------- | ----------------------------------------------------------- |
| Frontend | Sem tela de login. Sem proteção de rotas                    |
| Backend  | Sem middleware de autenticação. Todos os endpoints públicos |
| Banco    | Sem tabela de usuários ou sessões                           |

---

## Regras implícitas nos requisitos

### RNI-01 — Validação de ISBN

- Regex: `/^\d{10}$|^\d{13}$/`
- Validar no **frontend** (antes de submeter) e no **backend** (no `POST /livros`)

### RNI-02 — Data de devolução

- Data de devolução não pode ser anterior ou igual à data de locação
- Validar no **frontend** e no **backend** (`POST /emprestimos`)

### RNI-03 — Lembrete só para atrasados

- Botão "Enviar Lembrete" visível apenas se `status === 'Atrasado'`
- Backend valida antes de enviar — retorna `400` se não estiver atrasado

### RNI-04 — Categoria e acento

- Enum no banco: `Historia` (sem acento)
- Display no frontend: `"História"` (com acento)
- Mapear antes de enviar pro backend:

```typescript
const categoriaMap: Record<string, string> = {
  História: "Historia",
};
```
