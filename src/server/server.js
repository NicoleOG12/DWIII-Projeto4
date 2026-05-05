import express from 'express';
import fs from 'fs/promises';
import fetch from 'node-fetch';
import path from 'path';

const app = express();

/* 🔹 BASE DO PROJETO */
const basePath = process.cwd();

/* 🔹 servir front */
app.use(express.static(path.join(basePath, '../../public')));

/* 🔹 config */
const config = JSON.parse(
  await fs.readFile(path.join(basePath, '../../config.json'), 'utf-8')
);

/* 🔹 /estoque */
app.get('/estoque', async (req, res) => {
  try {
    const dados = await fs.readFile(
      path.join(basePath, 'src/data/estoque.json'),
      'utf-8'
    );
    res.json(JSON.parse(dados));
  } catch (e) {
    console.log(e);
    res.status(500).json({ erro: 'Erro ao ler estoque' });
  }
});

/* 🔹 /log */
app.get('/log', async (req, res) => {
  try {
    const log = await fs.readFile(
      path.join(basePath, 'log.txt'),
      'utf-8'
    );
    res.send(`<pre>${log}</pre>`);
  } catch (e) {
    console.log(e);
    res.status(500).send('Erro ao ler log');
  }
});

/* 🔹 /adm */
app.get('/adm', async (req, res) => {

  const arquivos = [
    'src/cli/cli.js',
    'src/cli/leitor.js',
    'src/cli/httpValidacao.js',
    'src/server/server.js'
  ];

  const rotas = [
    'http://localhost:3000/estoque',
    'http://localhost:3000/log'
  ];

  let html = `<h1>🔧 Diagnóstico do Sistema</h1>`;

  /* arquivos */
  html += `<h2>Arquivos</h2><ul>`;
  for (let arq of arquivos) {
    try {
      await fs.access(path.join(basePath, arq));
      html += `<li style="color:green">${arq}: OK</li>`;
    } catch {
      html += `<li style="color:red">${arq}: FALTANDO</li>`;
    }
  }
  html += `</ul>`;

  /* rotas */
  html += `<h2>Rotas</h2><ul>`;
  for (let rota of rotas) {
    try {
      const resposta = await fetch(rota);
      html += `<li>${rota}: ${resposta.status}</li>`;
    } catch {
      html += `<li style="color:red">${rota}: ERRO</li>`;
    }
  }
  html += `</ul>`;

  res.send(html);
});

/* 🔹 start */
app.listen(config.porta, () => {
  console.log(`🚀 http://localhost:${config.porta}`);
});