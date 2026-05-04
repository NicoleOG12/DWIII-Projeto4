import fs from 'fs/promises';
import fetch from 'node-fetch';

const arquivos = [
  'cli.js',
  'leitor.js',
  'httpValidacao.js',
  'server.js'
];

const rotas = [
  'http://localhost:3000/estoque',
  'http://localhost:3000/adm',
  'http://localhost:3000/log'
];

async function verificarArquivos() {
  const resultado = [];

  for (let arq of arquivos) {
    try {
      await fs.access(arq);
      resultado.push(`${arq}: OK`);
    } catch {
      resultado.push(`${arq}: FALTANDO`);
    }
  }

  return resultado;
}

async function verificarRotas() {
  const resultado = [];

  for (let rota of rotas) {
    try {
      const res = await fetch(rota);
      resultado.push(`${rota}: ${res.status}`);
    } catch {
      resultado.push(`${rota}: ERRO`);
    }
  }

  return resultado;
}

async function gerarLog() {
  const arquivosStatus = await verificarArquivos();
  const rotasStatus = await verificarRotas();

  const conteudo = `
===== RELATÓRIO DO SISTEMA =====
Data: ${new Date().toLocaleString()}

Arquivos:
${arquivosStatus.join('\n')}

Rotas:
${rotasStatus.join('\n')}

===============================

`;

  await fs.appendFile('log.txt', conteudo);
  console.log('✅ Log gerado!');
}

gerarLog();