import fs from 'fs/promises';
import fetch from 'node-fetch';

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

async function analisar() {
  let relatorio = `
===== ANÁLISE AUTOMÁTICA =====
Data: ${new Date().toLocaleString()}
`;

  console.log('🔍 Iniciando análise dos arquivos e rotas...');

  relatorio += `\nArquivos:\n`;
  for (let arq of arquivos) {
    try {
      await fs.access(arq);
      relatorio += `${arq}: OK\n`;
    } catch {
      relatorio += `${arq}: FALTANDO\n`;
    }
  }

  relatorio += `\nRotas:\n`;
  for (let rota of rotas) {
    try {
      const res = await fetch(rota);
      relatorio += `${rota}: ${res.status}\n`;
    } catch {
      relatorio += `${rota}: ERRO\n`;
    }
  }

  relatorio += `============================\n\n`;

  try {
    await fs.appendFile('log.txt', relatorio);
    console.log('✅ Relatório salvo no log.txt');
  } catch (erro) {
    console.error('❌ Erro ao salvar o relatório:', erro);
  }
}

analisar();