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
// Esta função redefine os campos de um formulário específico e faz ajustes específicos para o modal de inventário.
function resetModalFields(formSelector) {
  const form = document.querySelector(formSelector);
  form?.reset();  // Redefine todos os campos do formulário

  // Especificidades do modal de inventário
  // Esconde todos os botões de excluir inventário dentro do modal
  document.querySelectorAll(".modal-delete-entity").forEach(button => button.style.display = 'none');
  
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

  // Função que fecha o modal, reativa o scroll da página, redefine os campos do formulário e seleciona a aba principal
  const closeModalFunc = () => {
    modal.close();  // Fecha o modal
    document.body.style.overflow = '';  // Reativa o scroll da página
    resetModalFields(formSelector);  // Reseta os campos do formulário do modal
    changeTab({ currentTarget: document.querySelector(`button[onclick="changeTab(event, 'modal-main-data-tab')"]`) }, 'modal-main-data-tab'); // Seleciona a aba "Dados Principais"
  };

  // Adiciona eventos para fechar o modal ao clicar no botão de fechar, pressionar 'Esc' ou quando o modal é fechado de outra maneira
  const closeBtn = document.querySelector(config.closeBtnSelector);
  closeBtn?.addEventListener('click', closeModalFunc);
  modal.addEventListener('keydown', (e) => e.key === 'Escape' && closeModalFunc());
  modal.addEventListener('close', closeModalFunc);
}

document.addEventListener('DOMContentLoaded', () => {
  // Configuração do modal de inventário
  // Definindo os seletores para o botão de abrir, o modal, o formulário dentro do modal e o botão de fechar do modal de inventário
  const modalConfig = {
    openBtn: '.add-entity', 
    modal: '.entity-modal', 
    form: '.entity-modal-form', 
    config: {closeBtnSelector: '.modal-close-entity'}
  };

  // Aplica a configuração para o modal de inventário
  handleModal(modalConfig.openBtn, modalConfig.modal, modalConfig.form, modalConfig.config);
});

// MODAL OPENING #################################################################################################################################
// MODAL OPENING #################################################################################################################################

// MODAL FOR INVENTORY EDIT ######################################################################################################################
// MODAL FOR INVENTORY EDIT ######################################################################################################################

document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todas as linhas da tabela de entidades
  const entityRows = document.querySelectorAll('.entity-table__body--row');

  // Adiciona o evento de duplo clique em cada linha da tabela de entidades
  entityRows.forEach(row => {
    row.addEventListener('dblclick', function() {
      // Abre o modal de entidade
      const modal = document.querySelector('.entity-modal');
      modal.showModal();  // Abre o modal usando showModal se estiver usando <dialog>

      // Função para preencher o campo ou deixá-lo vazio
      const setValue = (selector, value) => {
        const element = document.querySelector(selector);
        element.value = value !== 'null' && value !== 'None' ? value : '';  // Deixa o campo vazio se não houver valor ou se for 'null' ou 'None'
      };

      // Preenche os campos do formulário com os dados da entidade selecionada
      setValue('input[name="entity_id"]', this.dataset.idEntityItem);
      setValue('input[name="entities_uuid"]', this.dataset.uuidEntityItem);
      setValue('#entity-type', this.dataset.entityType);
      setValue('#full-name', this.dataset.fullName);
      setValue('#tax-id', this.dataset.taxId);
      setValue('#alias-name', this.dataset.aliasName);
      setValue('#area-code', this.dataset.areaCode);
      setValue('#phone-number', this.dataset.phoneNumber);
      setValue('#street', this.dataset.street);
      setValue('#street-number', this.dataset.streetNumber);
      setValue('#state', this.dataset.state);
      setValue('#city', this.dataset.city);
      setValue('#postal-code', this.dataset.postalCode);
      setValue('#email', this.dataset.email);
      setValue('#bank-name', this.dataset.bankName);
      setValue('#bank-branch', this.dataset.bankBranch);
      setValue('#checking-account', this.dataset.checkingAccount);
      setValue('#account-holder-tax-id', this.dataset.accountHolderTaxId);
      setValue('#account-holder-name', this.dataset.accountHolderName);

      // Torna o botão de excluir entidade visível
      document.querySelector('.modal-delete-entity').style.display = 'block';
    });
  });

  // Evento para fechar o modal ao clicar no botão 'Cancelar'
  document.querySelector('.modal-close-entity').addEventListener('click', function() {
    document.querySelector('.entity-modal').close();  // Fecha o modal usando close se estiver usando <dialog>
  });
});

// Configurações para adicionar, atualizar ou apagar uma entidade
// Esta função lida com o envio do formulário do modal e a exclusão de entidades.
document.addEventListener('DOMContentLoaded', function() {
  const entityForm = document.querySelector('.entity-modal-form');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; // Obtém o token CSRF para a requisição

  // Evento para o envio do formulário de entidade
  entityForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);  // Cria um FormData com os dados do formulário
    fetch('/configuracoes/salvar_entidade/', {
      method: 'POST',
      body: formData,
      headers: {"X-CSRFToken": csrftoken},  // Inclui o token CSRF no cabeçalho
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);  // Mostra uma mensagem com o resultado da operação
      if(data.success) {
        window.location.reload();  // Recarrega a página para atualizar as informações
      }
    })
    .catch(error => console.error('Erro:', error));
  });

  const deleteButton = document.querySelector('.modal-delete-entity');
  // Evento para a exclusão de uma entidade
  deleteButton.addEventListener('click', function() {
    const entityId = document.querySelector('input[name="entity_id"]').value;  // Obtém o ID da entidade a ser excluída
    if (entityId) {
      fetch(`/configuracoes/verificar_e_excluir_entidade/${entityId}/`, {
        method: 'POST',
        headers: {
          "X-CSRFToken": csrftoken,  // Inclui o token CSRF no cabeçalho
          "Content-Type": "application/json",  // Define o tipo de conteúdo esperado pelo Django
        },
        body: JSON.stringify({})  // Envia uma requisição POST com um corpo vazio
      })
      .then(response => response.json())
      .then(data => {
        alert(data.success ? 'Entidade excluída com sucesso.' : 'Erro ao excluir entidade.');  // Mostra uma mensagem com o resultado da operação
        if(data.success) {
          window.location.reload();  // Recarrega a página para remover a entidade excluída
        }
      })
      .catch(error => console.error('Erro:', error));
    }
  });
});

// MODAL FOR INVENTORY EDIT ######################################################################################################################
// MODAL FOR INVENTORY EDIT ######################################################################################################################

// UTILITIES #####################################################################################################################################
// UTILITIES #####################################################################################################################################

function formatTaxId(event) {
  const taxIdInput = event.target;
  let value = taxIdInput.value.replace(/\D/g, '');

  if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1/$2');
      value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  taxIdInput.value = value;
}

document.addEventListener('DOMContentLoaded', function() {
  const taxIdInputs = document.querySelectorAll('.modal-tax-id, .modal-account-holder-tax-id');

  taxIdInputs.forEach(input => {
    input.addEventListener('input', formatTaxId);
  });
});

// UTILITIES #####################################################################################################################################
// UTILITIES #####################################################################################################################################

// CHANGE TAB IN MODAL ################################################################################################################
// CHANGE TAB IN MODAL ################################################################################################################

function changeTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// To display the first tab by default
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.tab-link').click();
});

// CHANGE TAB IN MODAL ################################################################################################################
// CHANGE TAB IN MODAL ################################################################################################################