$(document).ready(function () {
  const frases = [
    "uma escola que nasceu para formar homens e mulheres de governo, para a glória de Deus.",
    "uma escola que deseja conhecer seu filho de verdade. Que ensina a pensar com clareza, enxergar o mundo com uma cosmovisão cristã e aprender com ferramentas clássicas que atravessaram séculos.",
    "uma escola que caminha junto com os pais, em oração, na busca pela formação de homens e mulheres semelhantes a Cristo.",
    "uma escola que acredita que educar é formar líderes, e que cada aluno carrega um chamado — para servir, governar e transformar o mundo para a glória de Deus.",
    "uma escola que entende a educação como uma jornada — onde o aluno descobre, cresce e se desenvolve em todas as áreas: espiritual, intelectual, emocional, física e social."
  ];

  function formatarFrase(frase) {
  const palavrasDestaque = [
    "cosmovisão cristã",
    "espiritual",
    "intelectual",
    "emocional",
    "física",
    "social",
    "junto com os pais",
    "educar é formar líderes"
  ];

  palavrasDestaque.forEach(palavra => {
    const regex = new RegExp(palavra.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
    frase = frase.replace(regex, `<span class="destaque">${palavra}</span>`);
  });

  return frase;
}

  function digitarTextoComHtml(texto, $elemento, callback) {
    let i = 0;
    let tagAberta = false;
    let bufferTag = "";

    function digitar() {
      if (i >= texto.length) {
        setTimeout(callback, 2500);
        return;
      }

      const char = texto[i];

      if (char === "<") {
        tagAberta = true;
        bufferTag += char;
      } else if (char === ">" && tagAberta) {
        bufferTag += char;
        $elemento.append(bufferTag);
        bufferTag = "";
        tagAberta = false;
      } else if (tagAberta) {
        bufferTag += char;
      } else {
        $elemento.append(char);
      }

      i++;
      setTimeout(digitar, 50);
    }

    digitar();
  }

  let fraseAtual = 0;
  const $elemento = $("#frase-digitada");

  function apagarTexto(callback) {
    const texto = $elemento.text();
    let i = texto.length;
    const intervalo = setInterval(function () {
      if (i > 0) {
        $elemento.text(texto.substring(0, i - 1));
        i--;
      } else {
        clearInterval(intervalo);
        setTimeout(callback, 500);
      }
    }, 30);
  }

  function iniciarAnimacao() {
    $elemento.html("");
    const fraseFormatada = formatarFrase(frases[fraseAtual]);
    digitarTextoComHtml(fraseFormatada, $elemento, function () {
      apagarTexto(function () {
        fraseAtual = (fraseAtual + 1) % frases.length;
        iniciarAnimacao();
      });
    });
  }

  iniciarAnimacao();
});
