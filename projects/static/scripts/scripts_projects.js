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


// Função auxiliar para resetar campos específicos de cada modal
function resetModalFields(formSelector) {
  const form = document.querySelector(formSelector);
  form?.reset();
  
  // Reset específico para o modal de project
  document.querySelectorAll(".modal-delete-project").forEach(botao => botao.style.display = 'none');
  
  const inputs = document.querySelectorAll(`${formSelector} input`);
  inputs.forEach(input => {
    if (input.type !== 'submit' && input.name !== 'csrfmiddlewaretoken') {
      input.value = '';
    }
  });
}

// Função unificada para manipular a abertura e fechamento de modais
function handleModal(openBtnSelector, modalSelector, formSelector, config = {}) {
  const openBtn = document.querySelector(openBtnSelector);
  const modal = document.querySelector(modalSelector);

  openBtn.addEventListener('click', () => {
    modal.showModal();
    document.body.style.overflow = 'hidden';
  });

  const closeModalFunc = () => {
    modal.close();
    document.body.style.overflow = '';
    resetModalFields(formSelector);
  };

  const closeBtn = document.querySelector(config.closeBtnSelector);
  closeBtn?.addEventListener('click', closeModalFunc);
  modal.addEventListener('keydown', (e) => e.key === 'Escape' && closeModalFunc());
  modal.addEventListener('close', closeModalFunc);
}

document.addEventListener('DOMContentLoaded', () => {
  // Configuração do modal de bancos
  const modalConfig = {
    openBtn: '.add-project', 
    modal: '.project-modal', 
    form: '.modal-form-project', 
    config: {closeBtnSelector: '.modal-close-project'}
  };

  // Aplicar configuração para o modal de bancos
  handleModal(modalConfig.openBtn, modalConfig.modal, modalConfig.form, modalConfig.config);
});

document.addEventListener('DOMContentLoaded', function() {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; // Assume que o token CSRF está disponível

  // Configuração para adicionar ou atualizar um banco
  const formBancos = document.querySelector('.modal-form-project');
  formBancos.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      formData.append('csrfmiddlewaretoken', csrftoken); // Adiciona o CSRF token ao formData

      fetch('/configuracoes/projetos/salvar_projeto/', { // Ajuste o caminho conforme necessário
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
});
