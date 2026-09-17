Claro. Para esse fluxo eu montaria o plano pensando em **Playwright + testes E2E**, começando pelo cadastro do imóvel e dando atenção especial ao campo **CEP**.

 A página atual de anúncio apresenta inicialmente as opções **Endereço** e **CEP**. No fluxo por CEP, há um campo de CEP e, quando o CEP não é localizado, a página exibe a mensagem **“Não achamos esse CEP — Verifique o número e busque novamente”**. Também existem campos posteriores como endereço, nome, país, área e celular.  QuintoAndar Proprietários

 ## 1\. Escopo do teste

 **URL principal:**

 QuintoAndar — Anunciar imóvel

 ### Fluxo principal

```
Acessar página
      ↓
Selecionar "CEP"
      ↓
Informar CEP
      ↓
Buscar CEP
      ↓
Sistema encontra endereço
      ↓
Preencher dados do proprietário
      ↓
Clicar em "Começar cadastro"
      ↓
Validar próxima etapa
```

 O objetivo inicial não precisa ser completar todo o cadastro até publicação. Eu separaria os testes por **etapas**, para que um problema no CEP, por exemplo, não esconda problemas existentes nos outros campos.

---

 # 2\. Casos de teste — CEP

 | ID | Cenário | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| CEP-001 | CEP válido | `01310-100` | Endereço é localizado |
| CEP-002 | CEP válido sem máscara | `01310100` | Sistema aceita/formata ou informa corretamente |
| CEP-003 | CEP incompleto | `01310` | Busca não deve prosseguir |
| CEP-004 | CEP vazio | vazio | Validação de campo obrigatório |
| CEP-005 | CEP inválido | `00000-000` | Exibir mensagem de CEP não encontrado |
| CEP-006 | Letras | `ABCDE-FGH` | Campo rejeita/valida entrada |
| CEP-007 | Caracteres especiais | `@#$%-123` | Entrada inválida |
| CEP-008 | CEP com espaços | `01310-100` | Sistema trata espaços adequadamente |
| CEP-009 | Alterar CEP após busca | CEP A → CEP B | Endereço deve ser atualizado |
| CEP-010 | Busca repetida | mesmo CEP | Não deve duplicar/gerar estado inconsistente |
| CEP-011 | Falha de serviço | API de CEP indisponível | Usuário recebe tratamento adequado |
| CEP-012 | Campo recebe muitos caracteres | \> 8 dígitos | Não permitir valor fora do formato |

### Casos que eu considero essenciais para a primeira versão

 Começaria com:

```
CEP-001
CEP-004
CEP-005
CEP-006
CEP-009
CEP-011
```

 Isso cobre **happy path + validações + alteração de estado + erro externo**.

---

 # 3\. Casos de teste — Cadastro do imóvel

 Depois do CEP, podemos testar o restante do formulário.

 | ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CAD-001 | Acessar página | Página carregada corretamente |
| CAD-002 | Selecionar "CEP" | Fluxo de CEP é exibido |
| CAD-003 | Informar CEP válido | Endereço é localizado |
| CAD-004 | Informar nome | Campo aceita nome válido |
| CAD-005 | Nome vazio | Validação apresentada |
| CAD-006 | Telefone válido | Campo aceita telefone |
| CAD-007 | Telefone inválido | Validação apresentada |
| CAD-008 | Área válida | Campo aceita valor |
| CAD-009 | Área inválida | Validação apresentada |
| CAD-010 | Todos os campos válidos | Botão "Começar cadastro" permite avanço |
| CAD-011 | Campos obrigatórios vazios | Usuário não consegue avançar |
| CAD-012 | Checkbox de conteúdo | Estado pode ser alterado |
| CAD-013 | Recarregar página | Estado inicial é consistente |
| CAD-014 | Navegação mobile | Formulário utilizável |
| CAD-015 | Erro de API | Usuário recebe feedback |

A página atualmente apresenta, além do CEP/endereço, campos de **Nome, País, Área e Celular**, além da opção de receber conteúdos e do botão **“Começar cadastro”**.  QuintoAndar Proprietários

---

 # 4\. Estrutura do projeto Playwright

 Eu faria algo assim:

```
quintoandar-playwright/
│
├── tests/
│   ├── cadastro-imovel.spec.ts
│   ├── cep.spec.ts
│   └── cadastro-validacoes.spec.ts
│
├── pages/
│   └── CadastroImovelPage.ts
│
├── fixtures/
│   └── test-data.ts
│
├── utils/
│   └── helpers.ts
│
├── playwright.config.ts
├── package.json
└── README.md
```

 Separar a página em **Page Object** evita colocar todos os locators diretamente nos testes.

---

 # 5\. Page Object

 Por exemplo:

```
import { Page, Locator } from '@playwright/test';

export class CadastroImovelPage {
  readonly page: Page;

  readonly opcaoCep: Locator;
  readonly campoCep: Locator;
  readonly botaoBuscar: Locator;

  readonly campoNome: Locator;
  readonly campoArea: Locator;
  readonly campoCelular: Locator;

  readonly botaoComecarCadastro: Locator;

  constructor(page: Page) {
    this.page = page;

    this.opcaoCep = page.getByRole('button', { name: 'CEP' });

    this.campoCep = page.getByLabel('CEP');

    this.botaoBuscar = page.getByRole('button', {
      name: /buscar/i
    });

    this.campoNome = page.getByLabel('Nome');

    this.campoArea = page.getByLabel('Área');

    this.campoCelular = page.getByLabel('Celular');

    this.botaoComecarCadastro = page.getByRole('button', {
      name: /começar cadastro/i
    });
  }

  async acessar() {
    await this.page.goto(
      'https://proprietario.quintoandar.com.br/anunciar-imovel'
    );
  }

  async selecionarCep() {
    await this.opcaoCep.click();
  }

  async preencherCep(cep: string) {
    await this.campoCep.fill(cep);
  }

  async buscarCep() {
    await this.botaoBuscar.click();
  }

  async preencherNome(nome: string) {
    await this.campoNome.fill(nome);
  }

  async preencherArea(area: string) {
    await this.campoArea.fill(area);
  }

  async preencherCelular(celular: string) {
    await this.campoCelular.fill(celular);
  }
}
```

 **Importante:** os locators acima são uma estrutura inicial. Antes de transformar isso em código definitivo, eu usaria o `playwright codegen` ou inspecionaria o DOM para confirmar os `role`, `label`, `name` e atributos disponíveis.

---

 # 6\. Teste do CEP válido

 Um teste inicial poderia ser:

```
import { test, expect } from '@playwright/test';
import { CadastroImovelPage } from '../pages/CadastroImovelPage';

test.describe('Cadastro de imóvel - CEP', () => {

  test('deve localizar imóvel através de CEP válido', async ({ page }) => {
    const cadastro = new CadastroImovelPage(page);

    await cadastro.acessar();

    await cadastro.selecionarCep();

    await cadastro.preencherCep('01310-100');

    await cadastro.buscarCep();

    await expect(
      page.getByText(/endereço/i)
    ).toBeVisible();
  });

});
```

 Eu evitaria inicialmente validar o texto exato do endereço, porque isso cria um teste muito acoplado aos dados retornados pelo serviço.

---

 # 7\. Teste de CEP inválido

 A própria página indica o comportamento esperado para um CEP que não foi encontrado: **“Não achamos esse CEP”**.  QuintoAndar Proprietários

```
test('deve informar quando o CEP não for encontrado', async ({ page }) => {
  const cadastro = new CadastroImovelPage(page);

  await cadastro.acessar();

  await cadastro.selecionarCep();

  await cadastro.preencherCep('00000-000');

  await cadastro.buscarCep();

  await expect(
    page.getByText('Não achamos esse CEP')
  ).toBeVisible();

  await expect(
    page.getByText(/Verifique o número e busque novamente/i)
  ).toBeVisible();
});
```

---

 # 8\. Data-driven testing

 Para o CEP, eu recomendo fortemente utilizar dados parametrizados:

```
const casosCep = [
  {
    nome: 'CEP válido',
    cep: '01310-100',
    esperado: 'sucesso',
  },
  {
    nome: 'CEP inexistente',
    cep: '00000-000',
    esperado: 'erro',
  },
  {
    nome: 'CEP incompleto',
    cep: '01310',
    esperado: 'erro',
  },
  {
    nome: 'CEP com letras',
    cep: 'ABCDE-FGH',
    esperado: 'erro',
  },
];
```

 E:

```
for (const caso of casosCep) {
  test(`CEP - ${caso.nome}`, async ({ page }) => {

    const cadastro = new CadastroImovelPage(page);

    await cadastro.acessar();
    await cadastro.selecionarCep();
    await cadastro.preencherCep(caso.cep);

    if (caso.esperado === 'sucesso') {
      await cadastro.buscarCep();

      // validação do sucesso
    } else {
      await cadastro.buscarCep();

      // validação do erro
    }
  });
}
```

 Isso facilita muito aumentar a cobertura sem duplicar código.

---

 # 9\. Teste de API do CEP

 Esse é um ponto que eu colocaria no plano de testes desde o começo.

 Além do E2E:

```
Browser
   ↓
QuintoAndar
   ↓
API de endereço/CEP
```

 podemos testar a reação do frontend quando essa API:

 - retorna 200;
- retorna CEP inexistente;
- retorna 400;
- retorna 500;
- demora;
- fica indisponível;
- retorna JSON incompleto.

 Com Playwright:

```
await page.route('**/api/**', async route => {
  await route.fulfill({
    status: 500,
    contentType: 'application/json',
    body: JSON.stringify({
      error: 'Internal Server Error'
    })
  });
});
```

 O `**/api/**` é apenas ilustrativo. **Eu não colocaria esse endpoint no código antes de descobrir a chamada real feita pela aplicação.**

 Uma boa estratégia é executar:

```
npx playwright test --trace on
```

 e também observar as requisições no Playwright/DevTools para identificar a API real.

---

 # 10\. Cenário E2E completo

 Depois dos testes isolados de CEP, criaria um teste de negócio:

```
CT-E2E-001

Dado que o proprietário acessa "Anunciar imóvel"

Quando seleciona "CEP"

E informa um CEP válido

E o endereço é encontrado

E informa seu nome

E informa área

E informa celular

E clica em "Começar cadastro"

Então o sistema deve avançar para a próxima etapa
```

 Esse é o teste que eu colocaria como **smoke test**.

---

 # 11\. Smoke x Regression

 Eu dividiria a suíte assim:

 ### Smoke

 Executar em todo deploy:

```
✓ Página abre
✓ CEP válido
✓ CEP inválido
✓ Preenchimento mínimo
✓ Avanço do cadastro
```

 ### Regression

 Executar no pipeline completo:

```
✓ Todos os CEPs
✓ Campos obrigatórios
✓ Campos inválidos
✓ Máscaras
✓ Limites de caracteres
✓ API indisponível
✓ Timeout
✓ Responsividade
✓ Navegação
✓ Recarregamento
✓ Acessibilidade
```

---

 # 12\. O que eu testaria especificamente no CEP

 Além de "CEP válido/inválido", há alguns bugs interessantes para procurar:

 **Máscara**

```
01310100
   ↓
01310-100
```

 **Colagem**

```
Ctrl + V → 01310-100
```

 **Alteração**

```
01310-100
     ↓
20040-020
```

 O endereço antigo não pode permanecer.

 **Race condition**

```
CEP A → buscar
CEP B → buscar
```

 Se a resposta de A chegar depois da resposta de B, o endereço exibido não deveria voltar para A.

 **Duplo clique**

```
Buscar
Buscar
Buscar
```

 Verificar se isso gera múltiplas requisições ou estado inconsistente.

 **Enter**

```
preencher CEP
↓
pressionar Enter
```

 Verificar se o comportamento é equivalente ao botão Buscar.

---

 ## 13\. Critérios de aceite

 Eu fecharia o plano com estes critérios:

 - O campo CEP aceita somente formato válido.
- CEP válido retorna o endereço correspondente.
- CEP inexistente apresenta mensagem compreensível.
- CEP incompleto não dispara uma busca inválida.
- Erros do serviço são tratados sem quebrar a página.
- Alterar o CEP atualiza o endereço.
- O usuário consegue avançar somente com os dados obrigatórios válidos.
- Nenhum dado de um CEP anterior permanece após uma nova busca.
- O fluxo funciona em Chromium, Firefox e WebKit.
- O teste não depende de `waitForTimeout()`.

 ### Próximo passo

 Se você quiser transformar isso em um **projeto Playwright completo**, eu posso montar a estrutura com:

```
playwright.config.ts
pages/CadastroImovelPage.ts
tests/cep.spec.ts
tests/cadastro-imovel.spec.ts
fixtures/cep.json
```

 incluindo **locators, `test.describe`, parametrização dos CEPs, screenshots, trace, retry e execução em CI/CD**.