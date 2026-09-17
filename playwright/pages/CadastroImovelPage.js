const { expect } = require('@playwright/test');

class CadastroImovelPage {
  constructor(page) {
    this.page = page;

    // Campos
    this.campoCep = page.locator('#cep');
    this.campoNome = page.locator('#name');
    this.campoArea = page.locator('#area');
    this.campoTelefone = page.locator('#phone');

    // Botão
    this.botaoComecarCadastro = page.getByTestId(
      'button-submit-data-test-id'
    );

    // =========================
    // CEP
    // =========================

    // Mensagem CEP inválido
    this.mensagemErroCep = page.locator('#a11y_error_cep_0');

    // Mensagem CEP obrigatório
    this.mensagemCepObrigatorio = page
      .locator('#a11y_error_cep_0')
      .locator('xpath=..')
      .getByText('Campo obrigatório', { exact: true });

    // Mensagens CEP não encontrado
    this.mensagemCepNaoEncontrado = page.getByText(
      'Não achamos esse CEP',
      { exact: true }
    );

    this.mensagemVerifiqueCep = page.getByText(
      'Verifique o número e busque novamente',
      { exact: true }
    );

    this.linkBuscarPeloEndereco = page.getByText(
      'BUSCAR PELO ENDEREÇO',
      { exact: true }
    );

    // =========================
    // NOME
    // =========================

    this.mensagemNomeObrigatorio = page
      .locator('#a11y_error_name_0')
      .locator('xpath=..')
      .getByText('Campo obrigatório', { exact: true });

    // =========================
    // ÁREA
    // =========================

    this.mensagemAreaObrigatorio = page
      .locator('#a11y_error_area_0')
      .locator('xpath=..')
      .getByText('Campo obrigatório', { exact: true });

    // =========================
    // TELEFONE
    // =========================

    this.mensagemTelefoneObrigatorio = page
      .locator('#a11y_error_phone_0')
      .locator('xpath=..')
      .getByText('Este campo é obrigatório', { exact: true });
  }

  async acessar() {
    await this.page.goto(
      'https://proprietario.quintoandar.com.br/anunciar-imovel',
      { waitUntil: 'domcontentloaded' }
    );
  }

  async selecionarCep() {
    await expect(this.campoCep).toBeVisible();
    await this.campoCep.click();
  }

  async preencherCep(cep) {
    await this.campoCep.fill(cep);
  }

  async preencherNome(nome) {
    await expect(this.campoNome).toBeVisible();
    await this.campoNome.fill(nome);
  }

  async preencherArea(area) {
    await expect(this.campoArea).toBeVisible();
    await this.campoArea.fill(area);
  }

  async preencherTelefone(telefone) {
    await expect(this.campoTelefone).toBeVisible();
    await this.campoTelefone.fill(telefone);
  }

  async clicarComecarCadastro() {
    await expect(this.botaoComecarCadastro).toBeVisible();
    await this.botaoComecarCadastro.click();
  }

  async validarMensagemCepInvalido() {
    await expect(this.mensagemErroCep).toBeVisible();
  }

  async validarMensagemCampoObrigatorio() {
    await expect(this.mensagemCepObrigatorio).toBeVisible();
  }

  async validarCamposObrigatorios() {
    await expect(this.mensagemCepObrigatorio).toBeVisible();
    await expect(this.mensagemNomeObrigatorio).toBeVisible();
    await expect(this.mensagemAreaObrigatorio).toBeVisible();
    await expect(this.mensagemTelefoneObrigatorio).toBeVisible();
  }

}

module.exports = { CadastroImovelPage };
