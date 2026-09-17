const dadosFormulario = {
  cep: {
    valido: '01001-000',
    incompleto: '01001',
    vazio: '',
    invalido: '12345-678',
    letras: 'abcdef'
  },

  nome: {
    valido: 'João da Silva',
    vazio: '',
    numeros: '123456'
  },

  area: {
    valida: '21',
    letras: 'abc',
    vazia: ''
  },

  telefone: {
    valido: '999999999',
    letras: 'abcdef',
    vazio: ''
  }
};


module.exports = {
  dadosFormulario
};
