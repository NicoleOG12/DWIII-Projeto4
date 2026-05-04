import express from 'express';
import fs from 'fs/promises';

const config = JSON.parse(
  await fs.readFile('./config.json', 'utf-8')
);

const app = express();

/* /estoque */
app.get('/estoque', async (req, res) => {
  try {
    const dados = await fs.readFile('estoque.json', 'utf-8');
    res.json(JSON.parse(dados));
  } catch {
    res.status(500).json({ erro: 'Erro ao ler estoque' });
  }
});

/* /adm */
app.get('/adm', async (req, res) => {
  const arquivos = [
    'cli.js',
    'leitor.js',
    'httpValidacao.js',
    'server.js'
  ];

  let html = `
    <h1>Painel Administrativo</h1>
    <h2>Status dos Arquivos</h2>
    <ul>
  `;

  for (let arq of arquivos) {
    try {
      await fs.access(arq);
      html += `<li style="color:green">${arq}: OK</li>`;
    } catch {
      html += `<li style="color:red">${arq}: FALTANDO</li>`;
    }
  }

  html += `
    </ul>
    <hr>
    <a href="/estoque">Ver Estoque</a><br><br>
    <a href="/log">Ver Logs</a>
  `;

  res.send(html);
});

/* /log */
app.get('/log', async (req, res) => {
  try {
    const log = await fs.readFile('log.txt', 'utf-8');
    res.send(`<pre>${log}</pre>`);
  } catch {
    res.status(500).send('Erro ao ler log');
  }
});

app.listen(config.porta, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${config.porta}`);
});