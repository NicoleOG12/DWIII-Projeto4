# Validador de URLs com Backend Integrado (DWIII-Projeto4)

## ✨ Sobre o projeto

Evolução da ferramenta de linha de comando em Node.js (Projeto 3), agora integrada a uma estrutura completa de backend. O sistema continua validando a conectividade das URLs e traduzindo os códigos HTTP com cores no terminal, mas agora conta com rotas web em Express, configurações dinâmicas e um sistema automatizado de geração de logs de integridade.

## 👩‍💻 Autoras

- [Nicole Oliveira Gonçalves](https://github.com/NicoleOG12)
- [Stela dos Santos Montenegro](https://github.com/stela-sm)

## 📌 Novas Funcionalidades (Projeto 4)

- **Servidor Web:** API rodando com Express, baseada em um arquivo de configuração dinâmico (`config.json`).
- **Rotas de Acesso:**
  - `/estoque`: Retorna os dados de um arquivo `.json` simulando o banco de dados do site.
  - `/log`: Exibe via web o conteúdo do `log.txt` contendo o histórico de análise.
  - `/adm`: Painel administrativo que demonstra o status de integridade do projeto (se os arquivos essenciais e rotas estão OK).
- **Análise Automatizada:** Script autônomo que varre o sistema, testa rotas e insere automaticamente o relatório de saúde no arquivo `log.txt`.

## 🗂️ Arquivos principais

- `src/server/server.js` — estrutura do servidor Express e rotas.
- `src/cli/cli.js` — ponto de entrada e interface de linha de comando.
- `src/cli/leitor.js` — processamento e extração de URLs (fs/promises e RegEx).
- `src/cli/httpValidacao.js` — requisições com node-fetch e validação de regras de negócio.
- `src/scripts/analise.js` — script de verificação automatizada.
- `config.json` — configurações globais da aplicação.

## ✅ Regras de validação (CLI)

- `200` → Site no ar e operante! 🟢
- `400 / 404` → Página não encontrada. 🔴
- `500` → Erro interno no servidor do site. 🟡
- Erros de conexão/DNS → Domínio inexistente ou erro de rede. 🔴

## 🛠️ Tecnologias
<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="50"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" width="50"/>
</p>

## 🚀 Como usar

### 1. Instalação
```bash
npm install
```

### 2. Rodando o Servidor (Backend)
É necessário deixar o servidor rodando para acessar as rotas web e testar a aplicação.
```bash
node src/server/server.js
```
*Acesse: http://localhost:3000/estoque | /adm | /log*

### 3. Rodando o CLI (Validador de Links)
Em outro terminal:
```bash
node src/cli/cli.js https://www.exemplo.com.br
node src/cli/cli.js ./README.md
```

### 4. Rodando o Script de Análise
Gera o relatório de integridade (com o servidor web rodando):
```bash
node src/scripts/analise.js
```
