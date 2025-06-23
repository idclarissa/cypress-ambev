// cypress/support/utils.js

export function gerarNomeAleatorio() {
  const numerosAleatorios = Math.floor(1000 + Math.random() * 9000);
  return `ambevtest${numerosAleatorios}`;
}

export function gerarNomeUnicoComTimestamp() {
  return `ambevtest${Date.now()}`;
}

export function gerarEmailAleatorio() {
  return `ambevtest${Date.now()}@teste.com`;
}
