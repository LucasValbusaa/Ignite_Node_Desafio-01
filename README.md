<h2 align="center">Desafio 01 🚀</h2>
<h5 align="center">Ignite - <a href="https://rocketseat.com.br/" >Rocketseat</a> - Trilha Node js</h5>

## 💻 Descrição

Desenvolver uma api para criação de um usuário com name e username, bem como fazer o CRUD de todos

## 🛠️ Funcionalidades

- Criar um usuário com `name` e `username`
- Criar um novo todo
- Listar os `todo` do usuario;
- Alterar o `title` e `deadline` de um _todo_ existente;
- Marcar um _todo_ como feito;
- Excluir um _todo_;

## 🔗 Rotas

- POST `/users` → criar um novo `usuario`

```JSON
//Exemplo de dados a serem enviados
{
	"name": "Lucas Valbusa",
	"username": "lucas.valbusa"
}
```

- GET `/todos` → lista os `todos` dos `usuarios`.

```JSON
//Exemplo de retorno
[
  {
    "id": "297ebd34-510e-4c2a-8801-606d696f9012",
    "title": "Nova tarefa",
    "done": false,
    "deadline": "2021-05-01T00:00:00.000Z",
    "created_at": "2021-12-01T22:49:43.447Z"
  }
]
```

- POST `/todos` → criar um novo `todo`.

```JSON
//Exemplo de dados a serem enviados
{
	"title":"Nova tarefa",
	"deadline": "2021-05-01"
}
```

- PUT `/todos/:id` → alterar a propriedade `title` e `date` do `todo`.

```JSON
// Passar o id do TODO no paramento
//Exemplo de dados a serem enviados
{
	"title": "Nova tafera 2",
	"deadline": "2021-12-01"
}

//Exemplo de dados de retorno
{
  "id": "297ebd34-510e-4c2a-8801-606d696f9012",
  "title": "Nova tafera 2",
  "done": false,
  "deadline": "2021-12-01",
  "created_at": "2021-12-01T22:49:43.447Z"
}
```

- PATCH `/todos/:id/done` → alterar a propriedade `done` para `true` do `todo`.

```JSON
//Exemplo de dados de retorno
{
  "id": "297ebd34-510e-4c2a-8801-606d696f9012",
  "title": "Nova tafera 2",
  "done": true,
  "deadline": "2021-12-01",
  "created_at": "2021-12-01T22:49:43.447Z"
}
```

- DELETE `/todos/:id` → deleta um `todo` pelo `id`.

```JSON
// Sem conteúdo de retorno apenas status 204 de confirmação
```

### 📝 Clonagem e uso

```bash
   #Clone
   git clone https://github.com/LucasValbusaa/Ignite_Node_Desafio-01.git

   #Install dependencies
   yarn

   #Run server
   yarn dev

   #Run tests
   yarn test
```
