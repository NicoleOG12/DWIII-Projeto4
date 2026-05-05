import fs from 'fs/promises';

const regexLink = /(https?:\/\/[^\s]+)/g;

function extrairLinks(texto) {
  return texto.match(regexLink) || [];
}

export async function pegarLinks(caminho) {
  if (caminho.endsWith('.md') || caminho.endsWith('.txt')) {
    const texto = await fs.readFile(caminho, 'utf-8');
    return extrairLinks(texto);
  } else {
    return [caminho];
  }
}