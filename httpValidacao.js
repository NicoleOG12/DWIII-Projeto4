import fetch from 'node-fetch';
import chalk from 'chalk';

function traduzStatus(status) {
  switch (status) {
    case 200:
      return chalk.green('Site no ar e operante!');
    case 400:
    case 404:
      return chalk.red('Página não encontrada.');
    case 500:
      return chalk.yellow('Erro interno no servidor do site.');
    default:
      return `Status desconhecido: ${status}`;
  }
}

export async function validarUrls(listaUrls) {
  const resultados = [];

  for (let url of listaUrls) {
    try {
      const res = await fetch(url);
      const msg = traduzStatus(res.status);

      console.log(`${url} → ${msg}`);

      resultados.push({
        url,
        status: res.status,
        mensagem: msg
      });

    } catch (erro) {
      const msgErro = chalk.red('Domínio inexistente ou erro de rede.');

      console.log(`${url} → ${msgErro}`);

      resultados.push({
        url,
        erro: msgErro
      });
    }
  }

  return resultados;
}