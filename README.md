# api-desafio-mobile

> API desenvolvida para ser utilizada como base para o desafio de mobile da iClinic

## Utilizando

- Clone ou baixe este repositório

```bash
git clone https://github.com/iclinic/api-desafio-mobile.git
```

- Instale as dependências

```bash
npm install
```

- Scripts disponíveis

| Ações              | Comando             |
| ------------------ | ------------------- |
| Iniciar o servidor | `npm run start:api` |

## Interagindo com a API

Este servidor expõe um total de 8 rotas, sendo:

- 3 rotas para a autenticação do usuário
- 5 rotas para a gestão das localizações

## Autenticação

### Login

- URL: `/auth/login`
- Verb: POST
- Type: JSON
- Body:
  - email: `required`
  - password: `required`
- Example:

```json
// POST => http://localhost/auth/login
{
  "email": "admin@development.com",
  "password": "admin123"
}
```

- Reponse:
  - Type: JSON

```json
// POST => http://localhost/auth/login
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODE2OCwibmFtZSI6IkRldmVsb3BlciIsImVtYWlsIjoiZGV2QGljbGluaWMuY29tLmJyIiwiaWF0IjoxNTQ3MjA0ODcxLCJleHAiOjE1NDcyOTEyNzF9.KR1CX_tqDx1dQxDdv45-w_lLKUhSAyBUXy5yKS51TyM"
}
```

### Registro

- URL: `/auth/register`
- Verb: POST
- Type: JSON
- Body:
  - name: `required`
  - email: `required`
  - password: `required`
- Example:

```json
// POST => http://localhost/auth/register
{
  "name": "Administrator",
  "email": "admin@development.com",
  "password": "admin123"
}
```

- Response:
  - Type: JSON

```json
// POST => http://localhost/auth/register
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nzg3LCJuYW1lIjoiUGF1bG8gRWR1YXJkbyIsImVtYWlsIjoicGF1bG8uZWR1YXJkb0BpY2xpbmljLmNvbS5iciIsImlhdCI6MTU0NzIwNjQ"
}
```

### Logout

- URL: `/auth/logout`
- Verb: GET
- Type: JSON
- Response:
  - Type: JSON

```json
// GET => http://localhost/auth/logout
{
  "auth": false,
  "token": null
}
```

## Localizações

### Todas as localizações

- URL: `/locations`
- Verb: GET
- Type: JSON
- Header:
  - x-access-token: `required`
- Response:
  - Type: JSON

```json
// GET => http://localhost/locations
[
  {
    "id": 8654,
    "createdBy": 787,
    "name": "Nome da Localização",
    "address": "Endereço da Localização",
    "phone": "(16) 98765-4321",
    "type": "Tipo da Localização",
    "lat": "10.5432",
    "lng": "-11.4321",
    "description": "Descrição da Localização"
  }
]
```

### Adicionar Localização

- URL: `/locations`
- Verb: POST
- Type: JSON
- Header:
  - x-access-token: `required`
- Body:
  - name: `required`
  - address: `required`
  - phone: `required` | `format: (00) 00000-0000`
  - type: `required`
  - lat: `required`
  - lng: `required`
  - description: `required`
- Example:

```json
{
  "name": "Nome da Localização",
  "address": "Endereço da Localização",
  "phone": "(11) 12346-5432",
  "type": "Tipo da Localização",
  "lat": "10.2345",
  "lng": "-10.2345",
  "description": "Descrição da Localização"
}
```

- Response:
  - Type: JSON

```json
// POST => http://localhost/locations
{
  "id": 8654,
  "createdBy": 787,
  "name": "Nome da Localização",
  "address": "Endereço da Localização",
  "phone": "(11) 12346-5432",
  "type": "Tipo da Localização",
  "lat": "10.2345",
  "lng": "-10.2345",
  "description": "Descrição da Localização"
}
```

### Requisitar Localização Expecífica

- URL: `/locations/:locationId`
- Verb: GET
- Type: JSON
- Header:
  - x-access-token: `required`
- Response:
  - Type: JSON

```json
// GET => http://localhost/locations/8654
{
  "id": 8654,
  "createdBy": 787,
  "name": "Nome da Localização",
  "address": "Endereço da Localização",
  "phone": "(16) 98765-4321",
  "type": "Tipo da Localização",
  "lat": "10.5432",
  "lng": "-11.4321",
  "description": "Descrição da Localização"
}
```

### Atualizar Localização Expecífica

- URL: `/locations/:locationId`
- Verb: PUT
- Type: JSON
- Header:
  - x-access-token: `required`
- Body:
  - name: `required`
  - address: `required`
  - phone: `required` | `format: (00) 00000-0000`
  - type: `required`
  - lat: `required`
  - lng: `required`
  - description: `required`
- Example:

```json
{
  "name": "Nome da Localização - Atualizado",
  "address": "Endereço da Localização - Atualizado",
  "phone": "(11) 12346-5432",
  "type": "Tipo da Localização - Atualizado",
  "lat": "10.2345",
  "lng": "-10.2345",
  "description": "Descrição da Localização - Atualizado"
}
```

- Response:
  - Type: JSON

```json
// PUT => http://localhost/locations/8654
{
  "id": 8654,
  "createdBy": 787,
  "name": "Nome da Localização - Atualizado",
  "address": "Endereço da Localização - Atualizado",
  "phone": "(11) 12346-5432",
  "type": "Tipo da Localização - Atualizado",
  "lat": "10.2345",
  "lng": "-10.2345",
  "description": "Descrição da Localização - Atualizado"
}
```

### Excluir Localização Expecífica

- URL: `/locations/:locationId`
- Verb: DEL
- Type: JSON
- Header:
  - x-access-token: `required`
- Body:
  - name: `required`
  - address: `required`
  - phone: `required` | `format: (00) 00000-0000`
  - type: `required`
  - lat: `required`
  - lng: `required`
  - description: `required`
- Response:
  - Type: JSON

```json
// DEL => http://localhost/locations/8654
true
```

## License

[MIT](https://github.com/iclinic/api-desafio-mobile/blob/master/LICENSE)

[license-badge]: https://img.shields.io/github/license/pauloedurezende/api-desafio-mobile.svg
[license-url]: https://opensource.org/licenses/MIT
