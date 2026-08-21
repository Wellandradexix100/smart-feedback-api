# Smart Feedback API

Uma API RESTful inteligente para gestão de feedbacks de clientes, com integração nativa de Inteligência Artificial para análise automática de sentimentos e categorização.

## 📌 Sobre o Projeto

Este projeto tem como objetivo não apenas armazenar feedbacks de clientes, mas também enriquecê-los utilizando IA (Google Gemini). Ao enviar um novo feedback, a API automaticamente processa o texto e retorna a classificação de sentimento (Positivo, Negativo ou Neutro), a categoria do assunto (Produto, Atendimento, Bug ou Sugestão) e até mesmo um rascunho de resposta educada para o suporte ao cliente utilizar.

## 🎯 Problemas que Resolvemos (Casos de Uso)
Em operações de atendimento ao cliente (SAC) de médio e grande porte, a triagem manual de milhares de feedbacks gera lentidão e custos elevados. Esta API resolve problemas críticos como:
1. **Gargalo na Triagem:** Feedbacks não estruturados demoram a chegar no setor correto. A API categoriza automaticamente (ex: "Bug" vai direto para TI, "Atendimento" vai para o RH).
2. **Tempo de Resposta Elevado:** Clientes irritados odeiam esperar. A IA gera instantaneamente um rascunho de resposta empático e profissional, reduzindo o tempo de resposta do atendente de minutos para segundos.
3. **Análise de Clima:** Gestores não conseguem ler todos os reviews manualmente. O sistema classifica o sentimento de forma quantitativa (Positivo, Negativo, Neutro), permitindo a geração de gráficos e métricas sobre a satisfação do cliente em tempo real.

## 🚀 Funcionalidades

- **Autenticação:** Sistema de login seguro com geração e validação de token JWT.
- **Gestão de Feedbacks (CRUD):** 
  - Cadastro de novos feedbacks.
  - Listagem com suporte a paginação e filtros (por sentimento e categoria).
  - Busca de feedback por ID.
  - Remoção de feedbacks antigos ou incorretos.
- **Inteligência Artificial (Gemini):**
  - Análise de Sentimento automática.
  - Categorização do assunto.
  - Geração de "draft" (rascunho) de resposta para o cliente.
- **Segurança e Validação:** Rotas protegidas (Middlewares de Autenticação) e validação estrita de dados de entrada utilizando o Zod.

## 📍 Endpoints da API

**Usuários & Autenticação**
* `POST /api/` - Cria um novo usuário.
* `POST /api/login` - Autentica o usuário e retorna o Token JWT.
* `GET /api/:id` - Retorna os dados do usuário (Requer Token).

**Feedbacks (Requer Token JWT)**
* `POST /api/feedbacks/` - Cria um feedback e processa a IA (Gemini).
* `GET /api/feedbacks/` - Lista todos os feedbacks do usuário logado (Aceita filtros na URL: `?humor=POSITIVO&categoria=PRODUTO`).
* `GET /api/feedbacks/:id` - Retorna os detalhes de um feedback específico.
* `DELETE /api/feedbacks/:id` - Deleta um feedback.


## 🛠️ Tecnologias Utilizadas

- **Node.js** com **Express**
- **TypeScript**
- **Prisma ORM** com **PostgreSQL**
- **Zod** (Validação de dados)
- **Bcrypt** & **JsonWebToken (JWT)** (Criptografia e Segurança)
- **Google Gemini SDK** (IA generativa)

## 📦 Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (v18+ recomendado)
- Banco de Dados PostgreSQL configurado
- Uma chave de API gratuita do [Google AI Studio](https://aistudio.google.com/)

### Passo a Passo

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/smart-feedback-api.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Faça uma cópia do arquivo `.env.example` e renomeie para `.env`:
     - O Windows (ou Linux/Mac) aceita a cópia direta.
   - Preencha o `.env` com a URL do seu banco, sua chave JWT e sua API Key do Gemini.

4. Execute as migrations do banco de dados (Prisma):
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Inicie a aplicação:
   ```bash
   npm run dev
   ```
   A API estará rodando em `http://localhost:3000`.

## 🧪 Próximos Passos (Diferenciais)

- [x] **Documentação:** Configuração do Swagger/OpenAPI.
- [x] **Docker:** Adicionar `docker-compose.yml` para infraestrutura em poucos comandos.

