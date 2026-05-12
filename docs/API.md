# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend.vercel.app`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`

    ## Auth

    ### POST /auth/register

    Cria uma nova conta de aluno.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "senha": "minhasenha123",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `409` — Email já cadastrado

      ### POST /auth/login

    Autentica um aluno e retorna um token JWT.

    - Autenticação:** Não
    - **Body:**

    ```json
    {
      "email": "maria@email.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)

      ## Alunos

### GET /alunos

Lista todos os alunos.

- Autenticação: Não
- Body: Nenhum

- Resposta de sucesso: `200 OK`

```json
[
  {
    "id": 1,
    "nome": "Mateus",
    "email": "mateus@email.com",
    "cidade": "Salinas",
    "frase": "Nunca desistir",
    "planosFuturos": "Faculdade",
    "fotoUrl": "https://site.com/foto.jpg",
    "role": "USER",
    "criadoEm": "2026-05-12T10:00:00.000Z"
  }
]
```

- Erros:
  - `500` — Erro interno do servidor

### GET /alunos/:id

Busca um aluno pelo ID.

- Autenticação: Não
- Body: Nenhum

- Resposta de sucesso: `200 OK`

```json
{
  "id": 1,
  "nome": "Mateus",
  "email": "mateus@email.com",
  "cidade": "Salinas",
  "frase": "Nunca desistir",
  "planosFuturos": "Faculdade",
  "fotoUrl": "https://site.com/foto.jpg",
  "role": "USER",
  "criadoEm": "2026-05-12T10:00:00.000Z"
}
```

- Erros:
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

### PUT /alunos/:id

Atualiza o perfil do aluno.

- Autenticação: Bearer token

- Body:

```json
{
  "nome": "Mateus Henrique",
  "cidade": "Salinas",
  "frase": "Foco no futuro",
  "planosFuturos": "Engenharia",
  "fotoUrl": "https://site.com/foto.jpg"
}
```

- Resposta de sucesso: `200 OK`

```json
{
  "mensagem": "Perfil atualizado com sucesso"
}
```

- Erros:
  - `401` — Usuário não autenticado
  - `403` — Sem permissão para atualizar este perfil
  - `404` — Aluno não encontrado

### DELETE /alunos/:id

Remove um aluno.

- Autenticação: Bearer token (admin)
- Body: Nenhum

- Resposta de sucesso: `204 No Content`

- Erros:
  - `401` — Usuário não autenticado
  - `403` — Apenas administradores podem remover alunos
  - `404` — Aluno não encontrado

## Mensagens

### GET /mensagens

Lista todas as mensagens do mural.

- Autenticação: Não
- Body: Nenhum

- Resposta de sucesso: `200 OK`

```json
[
  {
    "id": 1,
    "texto": "Boa sorte para todos!",
    "imagemUrl": "https://site.com/imagem.jpg",
    "autorId": 1,
    "autor": {
      "id": 1,
      "nome": "Mateus",
      "fotoUrl": "https://site.com/foto.jpg"
    },
    "criadoEm": "2026-05-12T10:00:00.000Z"
  }
]
```

- Erros:
  - `500` — Erro interno do servidor

### POST /mensagens

Cria uma nova mensagem.

- Autenticação: Bearer token

- Body:

```json
{
  "texto": "Boa sorte para todos!",
  "imagemUrl": "https://site.com/imagem.jpg"
}
```

- Resposta de sucesso: `201 Created`

```json
{
  "mensagem": "Mensagem criada com sucesso"
}
```

- Erros:
  - `400` — Campo texto obrigatório
  - `401` — Usuário não autenticado

### DELETE /mensagens/:id

Exclui uma mensagem.

- Autenticação: Bearer token
- Body: Nenhum

- Resposta de sucesso: `204 No Content`

- Erros:
  - `401` — Usuário não autenticado
  - `403` — Sem permissão para excluir esta mensagem
  - `404` — Mensagem não encontrada