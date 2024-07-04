// PROFILE DROPDOWN ##############################################################################################################################
// PROFILE DROPDOWN ##############################################################################################################################

document.addEventListener('DOMContentLoaded', function() {
  var profileButton = document.querySelector('.profile-container__account-button');
  var dropdownMenu = document.querySelector('.profile-dropdown-menu');
  var svgIcon = document.querySelector('.profile-container__content--svg svg');

  profileButton.addEventListener('click', function(event) {
      var isHidden = dropdownMenu.style.display === 'none';
      dropdownMenu.style.display = isHidden ? 'block' : 'none';

      svgIcon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';

      event.stopPropagation();
  });

  document.addEventListener('click', function(event) {
      if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.style.display = 'none';
          svgIcon.style.transform = 'rotate(0deg)';
      }
  });
});

// PROFILE DROPDOWN ##############################################################################################################################
// PROFILE DROPDOWN ##############################################################################################################################

// MODAL OPENING #################################################################################################################################
// MODAL OPENING #################################################################################################################################

// Função auxiliar para resetar campos específicos de cada modal
// Esta função redefine os campos de um formulário específico e faz ajustes específicos para o modal de bancos.
function resetModalFields(formSelector) {
  const form = document.querySelector(formSelector);
  form?.reset();  // Redefine todos os campos do formulário

  // Reset específico para o modal de bancos
  // Esconde todos os botões de excluir banco dentro do modal
  document.querySelectorAll(".modal-delete-bank").forEach(button => button.style.display = 'none');
  
  const inputs = document.querySelectorAll(`${formSelector} input`);
  // Limpa o valor de todos os campos de input, exceto os de tipo submit e o token CSRF
  inputs.forEach(input => {
    if (input.type !== 'submit' && input.name !== 'csrfmiddlewaretoken') {
      input.value = '';
    }
  });
}

// Função unificada para manipular a abertura e fechamento de modais
// Esta função configura os eventos de abrir e fechar para modais específicos.
function handleModal(openBtnSelector, modalSelector, formSelector, config = {}) {
  const openBtn = document.querySelector(openBtnSelector);  // Botão que abre o modal
  const modal = document.querySelector(modalSelector);  // O modal propriamente dito

  // Adiciona evento de clique no botão para abrir o modal e desativar o scroll da página
  openBtn.addEventListener('click', () => {
    modal.showModal();  // Abre o modal
    document.body.style.overflow = 'hidden';  // Desativa o scroll da página
  });

  // Função que fecha o modal, reativa o scroll da página, redefine os campos do formulário e reseta o valor do saldo inicial
  const closeModalFunc = () => {
    modal.close();  // Fecha o modal
    document.body.style.overflow = '';  // Reativa o scroll da página
    resetModalFields(formSelector);  // Reseta os campos do formulário do modal
    document.getElementById('bank-initial-balance').value = "R$ ";  // Reseta o campo de saldo inicial
  };

  // Adiciona eventos para fechar o modal ao clicar no botão de fechar, pressionar 'Esc' ou quando o modal é fechado de outra maneira
  const closeBtn = document.querySelector(config.closeBtnSelector);
  closeBtn?.addEventListener('click', closeModalFunc);
  modal.addEventListener('keydown', (e) => e.key === 'Escape' && closeModalFunc());
  modal.addEventListener('close', closeModalFunc);
}

document.addEventListener('DOMContentLoaded', () => {
  // Configuração do modal de bancos
  // Definindo os seletores para o botão de abrir, o modal, o formulário dentro do modal e o botão de fechar do modal de bancos
  const modalConfig = {
    openBtn: '.add-bank', 
    modal: '.banks-modal', 
    form: '.banks-modal-form', 
    config: {closeBtnSelector: '.modal-close-bank'}
  };

  // Aplica a configuração para o modal de bancos
  handleModal(modalConfig.openBtn, modalConfig.modal, modalConfig.form, modalConfig.config);
});

// MODAL OPENING #################################################################################################################################
// MODAL OPENING #################################################################################################################################

// MODAL FOR BANK EDIT ###########################################################################################################################
// MODAL FOR BANK EDIT ###########################################################################################################################

// Edição de banco
// Esta função lida com a abertura do modal ao clicar duas vezes em uma linha da tabela de bancos e preenche os campos do modal com os dados da linha clicada.
document.addEventListener('DOMContentLoaded', function () {
  var bankRows = document.querySelectorAll('.banks-table__body--row');

  bankRows.forEach(function (row) {
    row.addEventListener('dblclick', function () {
      // Abre o modal aqui
      const banksModal = document.querySelector('.banks-modal');
      banksModal.showModal();
      
      // Torna o botão de apagar visível
      document.querySelectorAll(".modal-delete-bank").forEach(button => button.style.display = 'block');

      // Preenche os campos do modal com os dados da linha clicada
      const bank = row.querySelector('.bank-row').textContent.trim();
      const bankBranch = row.querySelector('.bank-branch-row').textContent.trim();
      const bankAccount = row.querySelector('.bank-account-row').textContent.trim();
      const initialBalance = row.getAttribute('data-initial-balance');
      const bankId = row.getAttribute('data-bank-id');
      const statusRow = row.querySelector('.bank-status-row').textContent.trim();

      document.getElementById('bank-name').value = bank;
      document.getElementById('bank-branch').value = bankBranch;
      document.getElementById('bank-account').value = bankAccount;
      document.getElementById('bank-initial-balance').value = "R$ " + initialBalance;
      document.querySelector('[name="bank_id"]').value = bankId;
      const selectStatusRow = document.getElementById('bank-status');
      selectStatusRow.value = statusRow.toLowerCase() === 'ativo' ? 'ativo' : 'inativo';
    });
  });

  // Fechar o modal ao clicar no botão "Cancelar"
  var closeButton = document.querySelector('.modal-close-bank');
  closeButton.addEventListener('click', function () {
    var banksModal = document.querySelector('.banks-modal');
    banksModal.close();
    
    // Torna o botão de apagar invisível
    document.querySelectorAll(".modal-delete-bank").forEach(button => button.style.display = 'none');
  });
});

// Configurações para adicionar ou atualizar um banco
// Esta função lida com o envio do formulário do modal e a exclusão de bancos.
document.addEventListener('DOMContentLoaded', function() {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; // Assume que o token CSRF está disponível

  // Configuração para adicionar ou atualizar um banco
  const banksForm = document.querySelector('.banks-modal-form');
  banksForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.append('csrfmiddlewaretoken', csrftoken); // Adiciona o CSRF token ao formData

    fetch('/configuracoes/salvar_banco/', { // Ajuste o caminho conforme necessário
      method: 'POST',
      body: formData,
      headers: { "X-CSRFToken": csrftoken },
    })
    .then(response => response.json())
    .then(data => {
      alert(data.success ? 'Operação realizada com sucesso.' : 'Erro ao realizar operação.');
      if(data.success) {
        window.location.reload(); // Recarrega a página para mostrar as atualizações
      }
    })
    .catch(error => console.error('Erro:', error));
  });

  // Configuração para apagar um banco
  document.querySelectorAll('.modal-delete-bank').forEach(button => {
    button.addEventListener('click', function() {
      const bankId = document.querySelector('input[name="bank_id"]').value;

      fetch(`/configuracoes/verificar_e_excluir_banco/${bankId}/`, {
        method: 'POST',
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "csrfmiddlewaretoken": csrftoken }) // O corpo da requisição precisa ser um JSON válido
      })
      .then(response => response.json())
      .then(data => {
        alert(data.success ? 'Banco excluído com sucesso.' : 'Erro ao excluir banco.');
        if(data.success) {
          window.location.reload(); // Recarrega a página para remover o banco excluído da listagem
        }
      })
      .catch(error => console.error('Erro:', error));
    });
  });
});

// MODAL FOR BANK EDIT ###########################################################################################################################
// MODAL FOR BANK EDIT ###########################################################################################################################

// UTILITIES #####################################################################################################################################
// UTILITIES #####################################################################################################################################

// Função para formatar o valor de um campo como moeda brasileira
// Esta função formata o valor de um campo de input para o formato de moeda brasileira (R$ 0,00).
function formatAmount(input) {
  let numericValue = input.value.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
  let floatValue = parseFloat(numericValue) / 100;  // Converte para valor decimal
  let formattedValue = floatValue.toFixed(2)
    .replace('.', ',')  // Substitui o ponto por vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');  // Adiciona pontos como separadores de milhar
  input.value = numericValue ? `R$ ${formattedValue}` : 'R$ 0,00';  // Define o valor formatado no campo de input
  if (input.value === 'R$ 0,00') {
    input.value = 'R$ 0,00';  // Garante que o valor seja "R$ 0,00" se o campo estiver vazio
  }
}

// UTILITIES #####################################################################################################################################
// UTILITIES #####################################################################################################################################