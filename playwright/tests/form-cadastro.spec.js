const { test, expect } = require('@playwright/test');

const { CadastroImovelPage } = require('../pages/CadastroImovelPage');
const { dadosFormulario } = require('../fixtures/form.data');

test.describe('Cadastro de imóvel - CEP', () => {

  test.beforeEach(async ({ page }) => {
    const cadastro = new CadastroImovelPage(page);

    await cadastro.acessar();
    await cadastro.selecionarCep();
  });

  // test('CEP-001 - deve validar CEP incompleto', async ({ page }) => {
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherCep(dadosFormulario.cep.incompleto);
  //   await cadastro.clicarComecarCadastro();
  // });


  // test('CEP-002 - deve validar CEP vazio', async ({ page }) => {
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherCep(dadosFormulario.cep.vazio);
  //   await cadastro.clicarComecarCadastro();
  //   await expect(cadastro.mensagemCampoObrigatorio).toBeVisible();
  //   await expect(cadastro.mensagemCampoObrigatorio).toHaveText('Campo obrigatório');
  // });


  // test('CEP-003 - deve informar CEP não encontrado', async ({ page }) => {
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherCep(dadosFormulario.cep.invalido);

  //   await cadastro.clicarComecarCadastro();

  //   await expect(cadastro.mensagemCepNaoEncontrado).toBeVisible();
  //   await expect(cadastro.mensagemVerifiqueCep).toBeVisible();
  //   await expect(cadastro.linkBuscarPeloEndereco).toBeVisible();
  // });


  //   test('CEP-004 - não deve aceitar letras', async ({ page }) => {
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherCep(dadosFormulario.cep.letras);

  //   const valor = await cadastro.campoCep.inputValue();

  //   expect(valor).not.toMatch(/[A-Za-z]/);
  // });


  // test('CEP-005 - CEP válido', async ({ page }) => {
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherCep(dadosFormulario.cep.valido);

  //   await cadastro.clicarComecarCadastro();

  //   await expect(cadastro.campoNome).toBeVisible();

  //   // await cadastro.preencherNome(cepData.nome.nome);
  //   // await cadastro.preencherArea(cepData.area.area);
  //   // await cadastro.preencherTelefone(cepData.telefone.telefone);
  // });

// Eu adicionaria:

// CEP-006 — não deve aceitar caracteres especiais

// Ex.: @#$%

// Verificar se esses caracteres são bloqueados.

// CEP-007 — deve aceitar CEP com máscara

// Ex.: 01001-000

// Verificar se o campo mantém/forma corretamente a máscara.

// CEP-008 — deve aceitar CEP sem máscara

// Ex.: 01001000

// Caso a aplicação permita esse formato.

// CEP-009 — não deve aceitar mais que 8 dígitos

// Ex.: 010010001

// Excelente para testar limite do campo.



  // test('NOME-001 - deve validar nome vazio', async ({ page }) => {
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherCep(dadosFormulario.cep.valido);

  //   await cadastro.clicarComecarCadastro();

  //   await expect(cadastro.mensagemNomeObrigatorio).toBeVisible();
  //   await expect(cadastro.mensagemNomeObrigatorio).toHaveText(
  //     'Campo obrigatório'
  //   );
  // });


  // test('NOME-002 - não deve aceitar números', async ({ page }) => { // TEM ERRO NO CÓDIGO, POIS O CAMPO NOME ACEITA NÚMEROS, PRECISA SER CORRIGIDO
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherNome(dadosFormulario.nome.numeros);

  //   const valor = await cadastro.campoNome.inputValue();

  //   expect(valor).not.toMatch(/[0-9]/);
  // });

//   Eu criaria:

// NOME-001 — campo obrigatório

// NOME-002 — não deve aceitar números

// NOME-003 — deve aceitar nome e sobrenome

// João da Silva

// NOME-004 — deve aceitar acentos

// João Gonçalves

// José Álvares

// NOME-005 — não deve aceitar apenas espaços

// " "

// NOME-006 — limite máximo de caracteres

// Se existir uma regra de tamanho.


  //   test('ÁREA-001 - Não deve aceitar letras', async ({ page }) => { // TEM ERRO NO CÓDIGO, POIS O CAMPO ÁREA ACEITA LETRAS, PRECISA SER CORRIGIDO
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherArea(dadosFormulario.area.letras);

  //   const valor = await cadastro.campoArea.inputValue();

  //   expect(valor).not.toMatch(/[A-Za-z]/);
  // });

//   Área
// Além do teste de letras:

// ÁREA-001 — não deve aceitar letras

// ÁREA-002 — não deve aceitar caracteres especiais

// ÁREA-003 — não deve aceitar valor negativo

// -21

// ÁREA-004 — não deve aceitar zero

// Se imóvel com 0 m² não fizer sentido para a regra de negócio.

// ÁREA-005 — deve aceitar somente números

// 21

// ÁREA-006 — limite de caracteres

// Ex.: uma área absurdamente grande.

// Um ponto que vale investigar é se a área aceita decimal. Dependendo do requisito, 21,5 ou 21.5 pode ser válido. Não criaria o teste antes de saber qual formato a aplicação espera.


  // test('TELEFONE-001 - Não deve aceitar letras', async ({ page }) => { // TEM ERRO NO CÓDIGO, POIS O CAMPO TELEFONE ACEITA LETRAS, PRECISA SER CORRIGIDO
  //   const cadastro = new CadastroImovelPage(page);

  //   await cadastro.preencherTelefone(dadosFormulario.telefone.letras);

  //   const valor = await cadastro.campoTelefone.inputValue();

  //   expect(valor).not.toMatch(/[A-Za-z]/);
  // });

//   Além do que você já encontrou:

// TELEFONE-001 — não deve aceitar letras

// TELEFONE-002 — campo obrigatório

// TELEFONE-003 — telefone incompleto

// TELEFONE-004 — telefone válido

// TELEFONE-005 — não deve aceitar caracteres inválidos

// TELEFONE-006 — verificar máscara/formatação


});
