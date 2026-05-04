import { pegarLinks } from './leitor.js';
import { validarUrls } from './httpValidacao.js';

const entrada = process.argv[2];

if (!entrada) {
  console.log('❌ Passe uma URL ou arquivo.');
  process.exit(1);
}

(async () => {
  const links = await pegarLinks(entrada);
  await validarUrls(links);
})();