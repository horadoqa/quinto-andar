const { test, expect } = require('@playwright/test');
const { CadastroImovelPage } = require('../pages/CadastroImovelPage');
const { dadosFormulario } = require('../fixtures/form.data');

test('FORM-001 — deve permitir cadastro com todos os dados válidos', async ({ page }) => {
  const cadastro = new CadastroImovelPage(page);

  await cadastro.acessar();

  await cadastro.preencherCep(dadosFormulario.cep.valido);
  await expect(cadastro.campoCep).toHaveValue(
    dadosFormulario.cep.valido
  );

  await cadastro.preencherNome(dadosFormulario.nome.valido);
  await cadastro.preencherArea(dadosFormulario.area.valida);
  await cadastro.preencherTelefone(dadosFormulario.telefone.valido);

  await cadastro.clicarComecarCadastro();
});


test('FORM-002 - não deve avançar com campos obrigatórios vazios', async ({ page }) => {
  const cadastro = new CadastroImovelPage(page);

  await cadastro.acessar();

  await cadastro.clicarComecarCadastro();

  // await expect(cadastro.mensagemCepObrigatorio).toBeVisible();
  // await expect(cadastro.mensagemNomeObrigatorio).toBeVisible();
  // await expect(cadastro.mensagemAreaObrigatorio).toBeVisible();
  // await expect(cadastro.mensagemTelefoneObrigatorio).toBeVisible();

  await cadastro.validarCamposObrigatorios();
});


test('FORM-003 — deve manter os dados preenchidos após uma validação', async ({ page }) => {
  const cadastro = new CadastroImovelPage(page);

  await cadastro.acessar();

  await cadastro.preencherCep(dadosFormulario.cep.valido);

  await cadastro.clicarComecarCadastro();

  await expect(cadastro.mensagemNomeObrigatorio).toBeVisible();

  await expect(cadastro.campoCep).toHaveValue(
    dadosFormulario.cep.valido
  );
});

test('FORM-004 — deve permitir corrigir um campo inválido e prosseguir', async ({ page }) => {
    const cadastro = new CadastroImovelPage(page);

    await cadastro.acessar();

    await cadastro.preencherCep(dadosFormulario.cep.invalido);

    await expect(cadastro.campoCep).toHaveValue(
        dadosFormulario.cep.invalido
    );

    await cadastro.campoCep.blur();

    await expect(cadastro.mensagemCepNaoEncontrado).toBeVisible({
        timeout: 10000,
    });

    await cadastro.preencherCep(dadosFormulario.cep.valido);

    await expect(cadastro.mensagemCepNaoEncontrado).not.toBeVisible();

    await cadastro.preencherNome(dadosFormulario.nome.valido);
    await cadastro.preencherArea(dadosFormulario.area.valida);
    await cadastro.preencherTelefone(dadosFormulario.telefone.valido);

    await cadastro.clicarComecarCadastro();
});
