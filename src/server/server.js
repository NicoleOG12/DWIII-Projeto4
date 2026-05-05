import express from 'express';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import path from 'path';

const app = express();
const basePath = process.cwd();

app.use(express.static(path.join(basePath, 'public')));

const config = JSON.parse(
  await fs.readFile(path.join(basePath, 'config.json'), 'utf-8')
);

app.get('/estoque', async (req, res) => {
  try {
    const dados = await fs.readFile(
      path.join(basePath, 'src/data/estoque.json'),
      'utf-8'
    );
    const estoque = JSON.parse(dados);

    let html = `
      <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Estoque</title>
      </head>
      <body>
        <div class="container">
          <h1>📦 Estoque</h1>
          <ul class="cards">
    `;

    estoque.forEach(item => {
      html += `<li class="card">${item.nome} - R$ ${item.preco}</li>`;
    });

    html += `
          </ul>
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (e) {
    console.log(e);
    res.status(500).send('<h1>Erro ao carregar o estoque</h1>');
  }
});

app.get('/log', async (req, res) => {
  try {
    const log = await fs.readFile(
      path.join(basePath, 'log.txt'),
      'utf-8'
    );

    const html = `
      <html>
      <head>
        <link rel="stylesheet" href="/style.css">
        <title>Logs</title>
      </head>
      <body>
        <div class="container">
          <h1>📄 Logs</h1>
          <pre>${log}</pre>
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (e) {
    console.log(e);
    res.status(500).send('<h1>Erro ao carregar os logs</h1>');
  }
});

app.get('/adm', async (req, res) => {
  const arquivos = [
    'src/cli/cli.js',
    'src/cli/leitor.js',
    'src/cli/httpValidacao.js',
    'src/server/server.js'
  ];

  const rotas = [
    'http://localhost:3000/estoque',
    'http://localhost:3000/adm',
    'http://localhost:3000/log'
  ];

  let status = {
    arquivos: {},
    rotas: {}
  };

  for (let arq of arquivos) {
    try {
      await fs.access(arq);
      status.arquivos[arq] = 'OK';
    } catch {
      status.arquivos[arq] = 'FALTANDO';
    }
  }

  for (let rota of rotas) {
    try {
      const resRota = await fetch(rota);
      status.rotas[rota] = resRota.status;
    } catch {
      status.rotas[rota] = 'ERRO';
    }
  }

  let html = `
    <html>
    <head>
      <link rel="stylesheet" href="/style.css">
      <title>Painel Administrativo</title>
    </head>
    <body>
      <div class="container">
        <h1>🔧 Painel Administrativo</h1>
        <h2>Arquivos</h2>
        <ul class="cards">
  `;

  for (const [arquivo, statusArq] of Object.entries(status.arquivos)) {
    html += `<li class="card">${arquivo}: ${statusArq}</li>`;
  }

  html += `</ul><h2>Rotas</h2><ul class="cards">`;

  for (const [rota, statusRota] of Object.entries(status.rotas)) {
    html += `<li class="card">${rota}: ${statusRota}</li>`;
  }

  html += `
        </ul>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.listen(config.porta, () => {
  console.log(`🚀 http://localhost:${config.porta}`);
});