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
// Esta função redefine os campos de um formulário específico e faz ajustes específicos para o modal de departamento.
function resetModalFields(formSelector) {
  const form = document.querySelector(formSelector);
  form?.reset();  // Redefine todos os campos do formulário

  // Especificidades do modal de departamento
  // Esconde todos os botões de excluir departamento dentro do modal
  document.querySelectorAll(".modal-delete-department").forEach(button => button.style.display = 'none');
  
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

  // Função que fecha o modal, reativa o scroll da página e redefine os campos do formulário
  const closeModalFunc = () => {
    modal.close();  // Fecha o modal
    document.body.style.overflow = '';  // Reativa o scroll da página
    resetModalFields(formSelector);  // Reseta os campos do formulário do modal
  };

  // Adiciona eventos para fechar o modal ao clicar no botão de fechar, pressionar 'Esc' ou quando o modal é fechado de outra maneira
  const closeBtn = document.querySelector(config.closeBtnSelector);
  closeBtn?.addEventListener('click', closeModalFunc);
  modal.addEventListener('keydown', (e) => e.key === 'Escape' && closeModalFunc());
  modal.addEventListener('close', closeModalFunc);
}

document.addEventListener('DOMContentLoaded', () => {
  // Configuração do modal de departamento
  // Definindo os seletores para o botão de abrir, o modal, o formulário dentro do modal e o botão de fechar do modal de departamento
  const modalConfig = {
    openBtn: '.add-department', 
    modal: '.department-modal', 
    form: '.department-modal-form', 
    config: {closeBtnSelector: '.modal-close-department'}
  };

  // Aplica a configuração para o modal de departamento
  handleModal(modalConfig.openBtn, modalConfig.modal, modalConfig.form, modalConfig.config);
});

// MODAL OPENING #################################################################################################################################
// MODAL OPENING #################################################################################################################################

// MODAL FOR DEPARTMENT EDIT #####################################################################################################################
// MODAL FOR DEPARTMENT EDIT #####################################################################################################################

document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todas as linhas da tabela de departamentos
  const departmentRows = document.querySelectorAll('.departments-table__body--row');

  // Adiciona o evento de duplo clique em cada linha da tabela de departamentos
  departmentRows.forEach(row => {
    row.addEventListener('dblclick', function() {
      // Abre o modal de departamento
      const modal = document.querySelector('.department-modal');
      modal.showModal();

      // Preenche o campo 'department' com o nome do departamento clicado
      const departmentName = this.querySelector('.department-row').textContent;
      document.querySelector('#department').value = departmentName;

      // Preenche os campos ocultos com os dados da linha selecionada
      document.querySelector('input[name="department_id"]').value = this.dataset.idDepartment;
      document.querySelector('input[name="department_uuid"]').value = this.dataset.uuidDepartment;

      // Torna o botão de excluir departamento visível
      document.querySelector('.modal-delete-department').style.display = 'block';
    });
  });

  // Evento para fechar o modal ao clicar no botão 'Cancelar'
  document.querySelector('.modal-close-department').addEventListener('click', function() {
    document.querySelector('.department-modal').close();
  });
});

// Configurações para adicionar, atualizar ou apagar um departamento
// Esta função lida com o envio do formulário do modal e a exclusão de departamentos.
document.addEventListener('DOMContentLoaded', function() {
  const departmentForm = document.querySelector('.department-modal-form');
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; // Obtém o token CSRF para a requisição

  // Evento para o envio do formulário de departamento
  departmentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this); // Cria um FormData com os dados do formulário
    fetch('/configuracoes/salvar_departamento/', {
      method: 'POST',
      body: formData,
      headers: {"X-CSRFToken": csrftoken}, // Inclui o token CSRF no cabeçalho
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Mostra uma mensagem com o resultado da operação
      if(data.success) {
        window.location.reload(); // Recarrega a página para atualizar as informações
      }
    })
    .catch(error => console.error('Erro:', error));
  });

  const deleteButton = document.querySelector('.modal-delete-department');
  // Evento para a exclusão de um departamento
  deleteButton.addEventListener('click', function() {
    const departmentId = document.querySelector('input[name="department_id"]').value; // Obtém o ID do departamento a ser excluído
    if (departmentId) {
      fetch(`/configuracoes/verificar_e_excluir_departamento/${departmentId}/`, {
        method: 'POST',
        headers: {
          "X-CSRFToken": csrftoken, // Inclui o token CSRF no cabeçalho
          "Content-Type": "application/json", // Define o tipo de conteúdo esperado pelo Django
        },
        body: JSON.stringify({}) // Envia uma requisição POST com um corpo vazio
      })
      .then(response => response.json())
      .then(data => {
        alert(data.success ? 'Departamento excluído com sucesso.' : 'Erro ao excluir departamento.'); // Mostra uma mensagem com o resultado da operação
        if(data.success) {
          window.location.reload(); // Recarrega a página para remover o departamento excluído
        }
      })
      .catch(error => console.error('Erro:', error));
    }
  });
});

// MODAL FOR DEPARTMENT EDIT #####################################################################################################################
// MODAL FOR DEPARTMENT EDIT #####################################################################################################################