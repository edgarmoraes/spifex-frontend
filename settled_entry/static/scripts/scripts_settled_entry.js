// SIDEBAR SHOW OR RETRACTION ###########################################################################################################
// SIDEBAR SHOW OR RETRACTION ###########################################################################################################

document.addEventListener('DOMContentLoaded', function() {
  const expandButton = document.querySelector('.expand-button__container--expand-button');
  const sideNavigation = document.querySelector('.side-navigation');
  const buttonsList = document.querySelector('.side-navigation__buttons-list');
  const svgPath = document.querySelector('.expand-button__svg path');
  const buttons = buttonsList.querySelectorAll('.list__button');

  const filterButton = document.querySelector('.list__button--filter-button');
  const filterTab = document.querySelector('.second-tab');
  
  // Inicializa a .second-tab como invisível
  filterTab.style.visibility = 'hidden';
  filterTab.style.opacity = '0';

  filterButton.addEventListener('click', function() {
      const filterTabWidth = '250px'; 
      const isFilterTabVisible = filterTab.style.width !== '0px' && filterTab.style.width !== '';

      // Toggle entre visível e invisível
      if (isFilterTabVisible) {
          // Inicia o fechamento
          filterTab.style.width = '0px';
      } else {
          // Torna visível antes da animação começar para expansão
          filterTab.style.visibility = 'visible';
          filterTab.style.opacity = '1';
          filterTab.style.width = filterTabWidth;
      }
      
      const sideNavWidth = sideNavigation.offsetWidth;
      filterTab.style.left = `${sideNavWidth}px`;
  });

  // Ouvinte para quando a transição de largura terminar
  filterTab.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'width' && filterTab.style.width === '0px') {
          // Após concluir a animação de fechamento, torna invisível
          filterTab.style.visibility = 'hidden';
          filterTab.style.opacity = '0';
      }
  });

  buttons.forEach(button => {
      const svgDataValue = button.querySelector('svg').getAttribute('data-value-pt');
      const span = document.createElement('span');
      span.textContent = svgDataValue;
      span.style.opacity = "0";
      span.classList.add('list__button--button-label');
      button.appendChild(span);
  });

  expandButton.addEventListener('click', function() {
      toggleSideNavigation();
  });

  document.addEventListener('click', function(event) {
      if (!sideNavigation.contains(event.target) && !filterTab.contains(event.target)) {
          if (sideNavigation.style.width === '250px') {
              toggleSideNavigation();
          }
          if (filterTab.style.width !== '0px') {
              filterTab.style.width = '0px'; // Recolhe o second-tab
          }
      }
  });

  function toggleSideNavigation() {
      const isExpanded = sideNavigation.style.width !== '250px';
      sideNavigation.style.width = isExpanded ? '250px' : '60px';
      buttonsList.style.width = isExpanded ? '250px' : '60px';

      svgPath.setAttribute('d', isExpanded ? 'm6.662 12 8.59 9.664 1.495-1.328L9.338 12l7.41-8.336-1.495-1.328L6.663 12Z' : 'm17.338 12-8.59 9.664-1.495-1.328L14.662 12l-7.41-8.336 1.495-1.328L17.337 12Z');

      buttons.forEach(button => {
          const span = button.querySelector('.list__button--button-label');
          span.style.opacity = isExpanded ? "1" : "0";
      });

      const sideNavWidth = sideNavigation.offsetWidth;
      if (filterTab.style.width !== '0px') {
          filterTab.style.left = `${sideNavWidth}px`;
      }
  }

  sideNavigation.addEventListener('click', function(event) {
      event.stopPropagation();
  });
});

// SIDEBAR SHOW OR RETRACTION ###########################################################################################################
// SIDEBAR SHOW OR RETRACTION ###########################################################################################################

// FILTER TAB SHOW OR RETRACTION ########################################################################################################
// FILTER TAB SHOW OR RETRACTION ########################################################################################################

document.addEventListener('DOMContentLoaded', function() {
  const sideNavigation = document.querySelector('.side-navigation');
  const secondTab = document.querySelector('.second-tab');

  // Função para atualizar a posição da .second-tab
  const updateSecondTabPosition = () => {
      const sideNavWidth = sideNavigation.offsetWidth;
      secondTab.style.left = `${sideNavWidth}px`; // Posiciona a .second-tab à direita da .side-navigation
  };

  // Inicialmente ajusta a posição da .second-tab
  updateSecondTabPosition();

  // Cria um observador para monitorar mudanças de tamanho na .side-navigation
  const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
          // Atualiza a posição da .second-tab com base na nova largura da .side-navigation
          updateSecondTabPosition();
      }
  });

  // Inicia a observação
  resizeObserver.observe(sideNavigation);
});

document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.side-navigation');

  document.querySelectorAll('.side-navigation__buttons-list--list .list__button').forEach(button => {
      const valuePt = button.querySelector('svg').getAttribute('data-value-pt');
      const label = document.createElement('div');

      label.textContent = valuePt;
      label.style.position = 'fixed';
      label.style.backgroundColor = 'black';
      label.style.color = 'white';
      label.style.padding = '4px 8px';
      label.style.borderRadius = '4px';
      label.style.display = 'none';
      label.style.whiteSpace = 'nowrap';
      label.style.zIndex = '1000';
      label.style.fontSize = '12px';
      label.style.transform = 'translateY(-50%)';

      document.body.appendChild(label);

      const setLabelPosition = () => {
          const navRect = nav.getBoundingClientRect();
          const buttonRect = button.getBoundingClientRect();
          label.style.top = `${buttonRect.top + (buttonRect.height / 2) - (label.offsetHeight / 2)}px`;
          label.style.left = `${navRect.right}px`;
      };

      button.addEventListener('mouseenter', () => {
          if (nav.style.width !== '240px') {
              setLabelPosition();
              label.style.display = 'block';
          }
      });

      button.addEventListener('mouseleave', () => {
          label.style.display = 'none';
      });
  });
});

// FILTER TAB SHOW OR RETRACTION ########################################################################################################
// FILTER TAB SHOW OR RETRACTION ########################################################################################################

// PROFILE DROPDOWN #####################################################################################################################
// PROFILE DROPDOWN #####################################################################################################################

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

// PROFILE DROPDOWN #####################################################################################################################
// PROFILE DROPDOWN #####################################################################################################################

// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ##########################################################################################
// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ##########################################################################################

// Selecionar os elementos necessários
const checkboxes = document.querySelectorAll('.custom-checkbox');
const operationsButtons = document.querySelectorAll('.side-navigation__buttons-list--operations ');
const cancelButton = document.querySelector('.list__button--cancel-button');

// Função para mostrar os botões com a transição
function showButtons() {
  operationsButtons.forEach(button => {
    button.style.display = 'flex'; 

    // Aplicar a transição após o botão estar visível
    requestAnimationFrame(() => { 
      button.style.transform = 'translateX(0)';
      button.style.transition = 'transform 0.3s ease-in-out';
    });
  });
}

// Função para ocultar os botões com a transição
function hideButtons() {
  operationsButtons.forEach(button => {
    button.style.transform = 'translateX(-110%)'; 
    button.style.transition = 'transform 0.3s ease-in-out'; // Aplicar a transição

    // Adicionar um ouvinte de evento para ocultar o botão após a transição
    button.addEventListener('transitionend', () => {
      button.style.display = 'none'; 
    }, { once: true }); // Usar 'once: true' para executar o ouvinte apenas uma vez
  });
}

// Adicionar evento de clique a cada checkbox
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    if (anyChecked) {
      showButtons();
    } else {
      hideButtons();
    }
  });
});

// Função para desmarcar todas as checkboxes
function uncheckAllCheckboxes() {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false; 
    });
  }
  
  // Adicionar evento de clique ao botão "Cancelar"
  cancelButton.addEventListener('click', () => {
    uncheckAllCheckboxes();
    hideButtons(); // Ocultar os botões após desmarcar as checkboxes
  });

// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ##########################################################################################
// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ##########################################################################################

// RETURN TO CASH FLOW BUTTON ###########################################################################################################
// RETURN TO CASH FLOW BUTTON ###########################################################################################################

// Botão de Retornar
document.getElementById('list__button--return-button').addEventListener('click', function() {
    let selectedRows = document.querySelectorAll('.custom-checkbox:checked');
    let dataToSend = [];
    
    selectedRows.forEach(function(checkbox) {
        let row = checkbox.closest('.settled-table__body--row');
        let debito = row.querySelector('.debito-row').textContent.trim();
        let credito = row.querySelector('.credito-row').textContent.trim();
        dataToSend.push({
            id: checkbox.getAttribute('data-id'),
            due_date: row.querySelector('.due_date-row').textContent,
            description: row.querySelector('.description-row').textContent,
            totalAmount: debito || credito,
            general_ledger_account: row.getAttribute('data-general-ledger-account'),
            current_installment: row.getAttribute('data-current-installment'),
            total_installments: row.getAttribute('data-total-installments'),
            transaction_type: debito ? 'Débito' : 'Crédito',
            uuid_installments_correlation: row.getAttribute('data-uuid-installments-correlation'),
            uuid_general_ledger_account: row.getAttribute('data-uuid-general-ledger-account'),
            uuid_document_type: row.getAttribute('data-uuid-document-type'),
            uuid_department: row.getAttribute('data-department'),
            uuid_project: row.getAttribute('data-uuid-project'),
            uuid_transference: row.getAttribute('data-uuid-correlation-transference'),
            uuid_partial_settlement_correlation: row.getAttribute('data-uuid-partial-settlement-correlation'),
        });
    });

    fetch('/realizado/processar_retorno/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    }).then(response => response.json())
      .then(data => {
          if(data.status === 'success') {
              // Remove as linhas da tabela no frontend
              selectedRows.forEach(checkbox => {
                  let row = checkbox.closest('.settled-table__body--row');
                  row.remove();
              });
              // Recarrega a página para refletir as mudanças no backend
              window.location.reload();
          }
      }).catch(error => console.error('Erro ao processar retorno:', error));
});

// RETURN TO CASH FLOW BUTTON ###########################################################################################################
// RETURN TO CASH FLOW BUTTON ###########################################################################################################

// SETTLED MODALS GENERAL FUNCTIONING ###################################################################################################
// SETTLED MODALS GENERAL FUNCTIONING ###################################################################################################

// Modal realizado
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.settled-table__body--row').forEach(row => {
      row.addEventListener('dblclick', function(event) {
          // Verifica se o clique duplo ocorreu dentro de um elemento com a classe 'checkbox-row'
          if (!event.target.closest('.checkbox-row')) {
              abrirModalEdicao(this);
          }
      });
  });

  // Adiciona lógica para fechar o modal e resetar o formulário com a tecla Esc
  document.addEventListener('keydown', function(event) {
      if (event.key === "Escape") {
          const modal = document.getElementById('modal-realizado');
          if (modal.open) {
              fecharModal(modal);
          }
      }
  });
});

function abrirModalEdicao(row) {
  const id = row.getAttribute('data-id-row');
  const due_date = row.querySelector('.due_date-row').textContent.trim();
  const description = row.querySelector('.description-row').textContent.trim();
  const observation = row.querySelector('.observation-row').textContent.split('Tags:')[0].trim().replace(/\s+/g, ' ');
  const totalAmount = row.querySelector('.debito-row').textContent.trim() || row.querySelector('.credito-row').textContent.trim();
  const generalLedgerAccount = row.getAttribute('data-general-ledger-account');
  const tags = row.querySelector('.observation-row').textContent.trim().split('Tags:')[1];
  const currentInstallment = row.getAttribute('data-current-installment');
  const installmentsTotal = row.getAttribute('data-total-installments');
  const uuidTransference = row.getAttribute('data-uuid-correlation-transference');
  const uuidPartialSettlementCorrelation = row.getAttribute('data-uuid-partial-settlement-correlation');

  preencherDadosModalRealizado(id, due_date, description, observation, totalAmount, generalLedgerAccount, tags, currentInstallment, installmentsTotal, uuidTransference, uuidPartialSettlementCorrelation);

  document.getElementById('modal-realizado').showModal();
}

function preencherDadosModalRealizado(id, due_date, description, observation, totalAmount, generalLedgerAccount, tags, currentInstallment, installmentsTotal, uuidTransference, uuidPartialSettlementCorrelation) {
  document.querySelector('.modal-form-realizado [name="lancamento_id_realizado"]').value = id;
  document.getElementById('data-realizado').value = formatarDataParaInput(due_date);
  document.getElementById('description-realizado').value = description;
  document.getElementById('observation-realizado').value = observation;
  document.getElementById('amount-realizado').value = "R$ "+ totalAmount;
  document.getElementById('general-ledger-account-realizado').value = generalLedgerAccount;
  document.getElementById('installments-realizado').value = `${currentInstallment}/${installmentsTotal}`;
  document.querySelector('.modal-form-realizado [name="uuid_transference"]').value = uuidTransference;
  document.querySelector('.modal-form-realizado [name="uuid_partial_settlement_correlation"]').value = uuidPartialSettlementCorrelation;

  // Limpa o container de tags antes de adicionar novas
  const tagContainer = document.getElementById('tag-container-realizado');
  tagContainer.innerHTML = '';
  tags && tags.split(',').forEach(tag => {
      if (tag.trim()) {
          adicionarTag(tag.trim(), 'tag-container-realizado');
      }
  });
}

function formatarDataParaInput(data) {
  const [dia, mes, ano] = data.split('/');
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

function adicionarTag(tag, containerId) {
  const container = document.getElementById(containerId);
  const tagElement = document.createElement('span');
  tagElement.classList.add('tag');
  tagElement.textContent = tag;
  container.appendChild(tagElement);
}

// Função para fechar o modal e voltar às configurações iniciais
function fecharModal(modal) {
  const form = document.querySelector(".modal-form-realizado");
  document.getElementById('tag-container-realizado').innerHTML = '';
  modal.close();
  form.reset();
}

document.querySelector('.modal-close-realizado').addEventListener('click', function() {
  const modal = document.getElementById('modal-realizado');
  fecharModal(modal);
});

// SETTLED MODALS GENERAL FUNCTIONING ###################################################################################################
// SETTLED MODALS GENERAL FUNCTIONING ###################################################################################################

// EDIT SETTLED MODAL ###################################################################################################################
// EDIT SETTLED MODAL ###################################################################################################################

// Edição de realizado
// Variável de bloqueio para evitar recarregamentos múltiplos
let isUpdating = false;

document.addEventListener('DOMContentLoaded', function() {
  const formRealizado = document.querySelector('.modal-form-realizado');

  formRealizado.addEventListener('submit', function(e) {
      e.preventDefault(); // Impede a submissão padrão do formulário

      if (isUpdating) {
          console.warn("Uma atualização já está em progresso.");
          return;
      }

      isUpdating = true;

      const lancamentoId = document.querySelector('[name="lancamento_id_realizado"]').value;
      const dataRealizado = document.getElementById('data-realizado').value;
      const settledDescription = document.getElementById('description-realizado').value;
      const settledObservation = document.getElementById('observation-realizado').value;
      const uuidTransference = document.querySelector('[name="uuid_transference"]').value;
      const uuidPartialSettlementCorrelation = document.querySelector('[name="uuid_partial_settlement_correlation"]').value;

      const today = new Date();
      const dataRealizadoDate = new Date(dataRealizado);
      today.setHours(0, 0, 0, 0);

      if (dataRealizadoDate > today) {
          alert('A data não pode ser futura. Por favor, selecione a data de hoje ou uma anterior.');
          isUpdating = false;
          return;
      }

      if (uuidTransference !== 'None' && uuidPartialSettlementCorrelation === 'None') {
        atualizarDataLancamentosRelacionados(uuidTransference, dataRealizado)
            .then(response => response.json())
            .then(data => {
                console.log('Lançamentos relacionados atualizados:', data);
                return atualizarLancamento(lancamentoId, dataRealizado, settledDescription, settledObservation);
            })
            .then(response => response.json())
            .then(data => {
                console.log('Lançamento atualizado com sucesso:', data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro:', error);
                isUpdating = false;
            });
      } else {
        atualizarLancamento(lancamentoId, dataRealizado, settledDescription, settledObservation)
            .then(response => response.json())
            .then(data => {
                console.log('Lançamento atualizado com sucesso:', data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao atualizar o lançamento:', error);
                isUpdating = false;
            });
      }
  });
});

function atualizarDataLancamentosRelacionados(uuidTransference, novaData) {
  return fetch(`/realizado/atualizar-lancamentos-uuid/${uuidTransference}/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': document.querySelector('[name="csrfmiddlewaretoken"]').value
      },
      body: JSON.stringify({ novaData: novaData })
  });
}

function atualizarLancamento(lancamentoId, dataRealizado, settledDescription, settledObservation) {
  const dados = { due_date: dataRealizado, description: settledDescription, observation: settledObservation };
  const url = `/realizado/atualizar-lancamento/${lancamentoId}/`;

  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': document.querySelector('[name="csrfmiddlewaretoken"]').value
      },
      body: JSON.stringify(dados)
  });
}

// EDIT SETTLED MODAL ###################################################################################################################
// EDIT SETTLED MODAL ###################################################################################################################

// FILTER MONTHS ########################################################################################################################
// FILTER MONTHS ########################################################################################################################

// Filtro de months
function selectCurrentMonthAndFilter() {
  const checkboxes = document.querySelectorAll('#dropdown-content-months .checkbox-month');

  // Verifica se há checkboxes disponíveis
  if (checkboxes.length === 0) {
    console.log('Nenhum checkbox de mês disponível.');
    return; // Para a execução do script
  }

  const today = new Date();
  let currentMonth = today.getMonth(); // 0-11
  let currentYear = today.getFullYear();
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

  let checkboxFound = null;

  // Tenta encontrar o checkbox para o mês/ano atual ou para os months anteriores, se necessário
  while (!checkboxFound && currentMonth >= 0) {
    let currentMonthYear = `${months[currentMonth]}/${currentYear}`;
    checkboxFound = Array.from(checkboxes).find(checkbox => checkbox.value.toLowerCase() === currentMonthYear.toLowerCase());

    if (!checkboxFound) {
      currentMonth -= 1; // Vai para o mês anterior
      if (currentMonth < 0) {
        // Se chegou a dezembro do ano anterior
        currentMonth = 11; // Mês de dezembro
        currentYear -= 1; // Ano anterior
      }
    }
  }

  // Se encontrar o checkbox, marca como selecionado e atualiza
  if (checkboxFound) {
    checkboxFound.checked = true;
    updateButtonTextMonths();
    filterTable();
  } else {
    console.error('Nenhum checkbox correspondente ao mês atual ou aos anteriores foi encontrado.');
  }
}

document.addEventListener('DOMContentLoaded', selectCurrentMonthAndFilter);

// FILTER MONTHS ########################################################################################################################
// FILTER MONTHS ########################################################################################################################

// FILTER FIELDS ########################################################################################################################
// FILTER FIELDS ########################################################################################################################

// Adiciona listeners para checkboxes
function addListenerAndUpdate(selector, updateFunction, filterFunction = null, isExclusive = false) {
  document.querySelectorAll(selector).forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (isExclusive && checkbox.checked) {
        // Se é exclusivo e a checkbox é selecionada, desmarque todas as outras
        document.querySelectorAll(selector).forEach(box => {
          if (box !== checkbox) box.checked = false;
        });
      }
      // A função de atualização é chamada após um atraso se necessário
      if (selector.includes('recebimentos') || selector.includes('pagamentos')) {
        setTimeout(updateFunction, 0);
      } else {
        updateFunction();
      }
      // Chama a função de filtragem se for fornecida
      if (filterFunction) {
        filterFunction();
      }
    });
  });
}

// Adicionando os listeners para cada grupo de checkboxes
addListenerAndUpdate('#dropdown-content-accounts .checkbox-account', updateButtonTextAccounts, filterTable);
addListenerAndUpdate('#dropdown-content-months .checkbox-month', updateButtonTextMonths, filterTable);
addListenerAndUpdate('#dropdown-content-banks .checkbox-bank', updateButtonTextBanks, collectSelectedBanks);
addListenerAndUpdate('#dropdown-content-transaction_type .transaction_type-checkbox', updateButtonTextTransactionType, filterTable);

// Adiciona o listener para click fora do dropdown
document.addEventListener('click', function(event) {
  const dropdowns = [
      {button: "#dropdown-button-accounts", content: "dropdown-content-accounts"},
      {button: "#dropdown-button-months", content: "dropdown-content-months"},
      {button: "#dropdown-button-banks", content: "dropdown-content-banks"},
      {button: "#dropdown-button-transaction_type", content: "dropdown-content-transaction_type"},
      {button: "#dropdown-button-accounts-recebimentos", content: "dropdown-content-accounts-recebimentos"},
      {button: "#dropdown-button-accounts-pagamentos", content: "dropdown-content-accounts-pagamentos"}
  ];

  dropdowns.forEach(function(dropdown) {
      if (!event.target.closest(dropdown.button) && !event.target.closest(`#${dropdown.content}`)) {
          const content = document.getElementById(dropdown.content);
          if (content && content.classList.contains('show')) {
              content.classList.remove('show');
          }
      }
  });
});

// Funções para manipular os eventos de abertura dos dropdowns
function toggleDropdown(dropdownId, event) {
  event.stopPropagation();
  const dropdown = document.getElementById(dropdownId);
  dropdown.classList.toggle("show");
}

function toggleDropdownModals(dropdownId, event) {
  event.stopPropagation();
  const dropdown = document.getElementById(dropdownId);
  const buttonRect = event.target.getBoundingClientRect();

  if (dropdown.classList.contains("show")) {
    // Hide the dropdown
    dropdown.classList.remove("show");
    // Reset styles
    Object.assign(dropdown.style, {
      maxHeight: null,
      position: null,
      top: null,
      left: null,
      overflowY: null
    });
  } else {
    // Show the dropdown and adjust its position and styles
    dropdown.classList.add("show");
    Object.assign(dropdown.style, {
      position: 'fixed',
      left: `${window.scrollX + buttonRect.left}px`,
      maxHeight: '250px',
      overflowY: 'auto'
    });
  }
}

// Funções para selecionar e desmarcar todos os checkboxes
function toggleAllCheckboxes(containerSelector, shouldCheck) {
  const checkboxes = document.querySelectorAll(`${containerSelector} .dropdown-options input[type="checkbox"]`);
  checkboxes.forEach(checkbox => checkbox.checked = shouldCheck);
  
  // Atualiza o texto do botão e filtra a tabela conforme o container
  switch (containerSelector) {
    case '#dropdown-content-accounts':
      updateButtonTextAccounts();
      filterTable();
      break;
    case '#dropdown-content-months':
      updateButtonTextMonths();
      filterTable();
      break;
    case '#dropdown-content-banks':
      updateButtonTextBanks();
      collectSelectedBanks();
      break;
    case '#dropdown-content-transaction_type':
      updateButtonTextTransactionType();
      filterTable();
      break;
  }
}

// Função para atualizar o texto dos botões de dropdown
function updateButtonText(dropdownId, checkboxesSelector, defaultText, allSelectedText = "Todos Selecionados") {
  const selectedCount = document.querySelectorAll(`${checkboxesSelector}:checked`).length;
  const totalOptions = document.querySelectorAll(checkboxesSelector).length;
  const buttonText = selectedCount === 0 ? defaultText : 
                     selectedCount === totalOptions ? allSelectedText : 
                     `${selectedCount} Selecionado(s)`;
  document.getElementById(dropdownId).textContent = buttonText;
}

function updateButtonTextAccounts() {
  updateButtonText('dropdown-button-accounts', '#dropdown-content-accounts .checkbox-account', 'Selecione');
}

function updateButtonTextMonths() {
  updateButtonText('dropdown-button-months', '#dropdown-content-months .checkbox-month', 'Selecione');
}

function updateButtonTextBanks() {
  updateButtonText('dropdown-button-banks', '#dropdown-content-banks .checkbox-bank', 'Selecione');
}

function updateButtonTextTransactionType() {
  const checkboxes = document.querySelectorAll('#dropdown-content-transaction_type .transaction_type-checkbox');
  const selectedCheckboxes = document.querySelectorAll('#dropdown-content-transaction_type .transaction_type-checkbox:checked');
  const selectedCount = selectedCheckboxes.length;
  const totalOptions = checkboxes.length;
  let buttonText = "Crédito, Débito";
  if (selectedCount > 0 && selectedCount < totalOptions) {
    buttonText = Array.from(selectedCheckboxes).map(cb => cb.nextSibling.textContent.trim()).join(", ");
  }
  document.getElementById('dropdown-button-transaction_type').textContent = buttonText;
}

let bancosSelecionados = [];
function collectSelectedBanks() {
  bancosSelecionados = Array.from(document.querySelectorAll('.checkbox-bank:checked')).map(el => el.value);
  filterTable(); // Filtra a tabela de lançamentos
  // Filtra a tabela de bancos
  document.querySelectorAll('.banks-table .banks-table__body--row').forEach(row => {
    const idBanco = row.getAttribute('data-bank-id');
    row.style.display = bancosSelecionados.length === 0 || bancosSelecionados.includes(idBanco) ? '' : 'none';
  });
  updateTotalBanksBalance(); // Atualiza o saldo total
}

// Filtros
function filterTable() {
  const uuidsGeneralLedgerAccountFilter = Array.from(document.querySelectorAll('#dropdown-content-accounts .checkbox-account:checked')).map(checkbox => checkbox.value);
  const monthsIntervalFilter = Array.from(document.querySelectorAll('#dropdown-content-months .checkbox-month:checked')).map(checkbox => ({
    start: new Date(checkbox.getAttribute('data-start-of-month')),
    end: new Date(checkbox.getAttribute('data-end-of-month'))
  }));
  const transactionTypeFilter = Array.from(document.querySelectorAll('#dropdown-content-transaction_type .transaction_type-checkbox:checked'), cb => cb.value);

  // Verificações de seleção total ou nenhuma seleção simplificadas
  const selectAllMonths = monthsIntervalFilter.length === 0;
  const selectAllTransactionType = transactionTypeFilter.length === 0;
  
  // Obtenção dos filtros de texto e datas
  const descriptionFilter = document.getElementById("search-bar-box").value.toUpperCase();
  const tagsFilter = document.getElementById("search-tags-bar-box").value.toUpperCase();
  const startDateObj = document.getElementById("start-date").value ? new Date(document.getElementById("start-date").value) : null;
  const endDateObj = document.getElementById("end-date").value ? new Date(document.getElementById("end-date").value) : null;
  let visibleMonthsYears = new Set();

  document.querySelectorAll('.settled-table__body--row').forEach(function(row) {
    const uuidGeneralLedgerAccount = row.getAttribute('data-uuid-general-ledger-account');
    const description = row.querySelector(".description-row").textContent.toUpperCase();
    const observationElement = row.querySelector(".observation-row").cloneNode(true);
    const tagsObj = observationElement.querySelector(".tag-row");
    if (tagsObj) observationElement.removeChild(tagsObj);
    const observation = observationElement.textContent.toUpperCase();
    const tags = tagsObj ? tagsObj.textContent.toUpperCase() : "";
    const dueDate = new Date(row.querySelector(".due_date-row").textContent.split('/').reverse().join('-'));
    const transactionType = row.getAttribute('data-transaction-type');
    const bankIdEntry = row.getAttribute('data-settlement-bank-id');

    
    const generalLedgerAccountMatch = uuidsGeneralLedgerAccountFilter.length === 0 || uuidsGeneralLedgerAccountFilter.includes(uuidGeneralLedgerAccount);
    const descriptionObservationMatch = descriptionFilter === "" || description.includes(descriptionFilter) || observation.includes(descriptionFilter);
    const tagMatch = tagsFilter === "" || tags.includes(tagsFilter);
    const monthMatch = selectAllMonths || monthsIntervalFilter.some(intervalo => dueDate >= intervalo.start && dueDate <= intervalo.end);
    const dataMatch = (!startDateObj || dueDate >= startDateObj) && (!endDateObj || dueDate <= endDateObj);
    const transactionTypeMatch = selectAllTransactionType || transactionTypeFilter.includes(transactionType);
    const bancoMatch = bancosSelecionados.length === 0 || bancosSelecionados.includes(bankIdEntry);

    row.style.display = descriptionObservationMatch && tagMatch && monthMatch && transactionTypeMatch && dataMatch && generalLedgerAccountMatch && bancoMatch ? "" : "none";

    if (row.style.display === "") {
      function toYearMonthString(date) {
        const year = date.getUTCFullYear().toString();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        return `${month}/${year}`;
      }

      let mesAno = toYearMonthString(dueDate);
      visibleMonthsYears.add(mesAno);
    }
  });

  // Simplificação na filtragem das linhas de total do mês
  document.querySelectorAll(".settled-table__body .month-totals-row").forEach(row => {
    let textoMesAno = row.querySelector("td:nth-child(2)").textContent;
    let mesAnoMatch = textoMesAno.match(/\d{2}\/\d{4}$/);
    row.style.display = mesAnoMatch && visibleMonthsYears.has(mesAnoMatch[0]) ? "" : "none";
  });

  updateTotalBanksBalance();
}

document.getElementById('search-bar-box').addEventListener('input', filterTable);
document.getElementById('search-tags-bar-box').addEventListener('input', filterTable);
document.getElementById('start-date').addEventListener('change', filterTable);
document.getElementById('end-date').addEventListener('change', filterTable);

// Inicializa listeners de mudança para os checkboxes dos bancos
document.querySelectorAll('.checkbox-bank').forEach(checkbox => {
  checkbox.addEventListener('change', collectSelectedBanks);
});

// Atualizar saldo total dos bancos
function updateTotalBanksBalance() {
  let newTotalBalance = 0;
  const linhasBancos = document.querySelectorAll('.banks-table .banks-table__body--row');

  linhasBancos.forEach(row => {
    const idBanco = row.getAttribute('data-bank-id');
    if (bancosSelecionados.length === 0 || bancosSelecionados.includes(idBanco)) {
      let strAmount = row.querySelector('.bank-balance-row').textContent;
      strAmount = strAmount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
      const balance = parseFloat(strAmount);
      newTotalBalance += balance;
    }
  });

  // Atualiza o saldo total global e na interface
  saldoTotal = newTotalBalance;
  const saldoTotalFormatado = saldoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  document.querySelector('.total-banks-balance').textContent = saldoTotalFormatado;

  // Chama a função para atualizar os saldos das linhas com o novo saldo total
  atualizarSaldosDasLinhas();
}

document.addEventListener('DOMContentLoaded', function() {
  const linhas = document.querySelectorAll('.settled-table__body--row');
  if (linhas.length === 0) {
    console.log("Nenhum dado para exibir. A página não irá carregar dados.");

    const mensagemVazia = document.createElement('div');
    mensagemVazia.textContent = 'Nenhum lançamento para exibir.';
    mensagemVazia.classList.add('empty-message');
    document.querySelector('.settled-table-wrapper').appendChild(mensagemVazia);
    return;
  }
});

// Função para atualizar os saldos de cada linha na tabela de lançamentos
function atualizarSaldosDasLinhas() {
  let saldoAtual = saldoTotal;

  // Obtém todas as linhas de lançamento e as converte para um array
  const linhas = Array.from(document.querySelectorAll('.settled-table__body--row'));

  // Itera sobre as linhas de lançamento de baixo para cima
  for (let i = linhas.length - 1; i >= 0; i--) {
    const row = linhas[i];
    const bankIdEntry = row.getAttribute('data-settlement-bank-id');

    // Se um único banco está selecionado e esta linha não pertence a ele, pular para a próxima
    if (bancosSelecionados.length === 1 && bancosSelecionados[0] !== bankIdEntry) {
      continue;
    }

    // Obter a transaction_type da linha e ajustar o saldo
    const transaction_type = row.getAttribute('data-transaction-type').trim();
    let amount = 0;

    if (transaction_type === 'Crédito') {
      const creditAmount = row.querySelector('.credito-row').textContent;
      amount = parseFloat(creditAmount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
      saldoAtual -= amount; // Crédito subtrai do saldo
    } else if (transaction_type === 'Débito') {
      const debitAmount = row.querySelector('.debito-row').textContent;
      amount = parseFloat(debitAmount.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
      saldoAtual += amount; // Débito soma ao saldo
    }
    
    // Atualizar o saldo da linha
    row.querySelector('.balance-row').textContent = saldoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}

// Adicionar event listeners para atualizar o saldo quando a seleção de bancos mudar
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.checkbox-bank').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      collectSelectedBanks();
      updateTotalBanksBalance(); // Isso irá recalcular o saldo total e atualizar as linhas de lançamento
    });
  });

  // Chamada inicial para configurar o saldo
  collectSelectedBanks();
  updateTotalBanksBalance();
});

document.querySelectorAll('.total-balance-row').forEach(function(cell) {
  var saldoTexto = cell.textContent.replace(/\s/g, '');
  var saldo = parseFloat(saldoTexto.replace('.', '').replace(',', '.'));
    if (!isNaN(saldo) && saldo < 0) {
        cell.style.color = '#740000';
    }
    else {
      cell.style.color = '#000acf';
  }
});

// FILTER FIELDS ########################################################################################################################
// FILTER FIELDS ########################################################################################################################

// UTILITIES ############################################################################################################################
// UTILITIES ############################################################################################################################

// Mobile Buttons
function toggleFilters() {
  var formulario = document.getElementById('form-filters');
  formulario.classList.toggle('show-filters');
}

function toggleBanks() {
  var formulario = document.getElementById('box-grid-bancos');
  formulario.classList.toggle('show-filters');
}

function toggleNav() {
  var navBar = document.querySelector('.nav-bar');
  if (navBar.style.left === '0px') {
      navBar.style.left = '-100%';
  } else {
      navBar.style.left = '0px';
  }
}


// Selecionar checkboxes com o shift clicado
document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('custom-checkbox')) return;
  let checkboxAtual = e.target;

  if (e.shiftKey && ultimoCheckboxClicado) {
      let checkboxes = Array.from(document.querySelectorAll('.custom-checkbox'));
      let startIndex = checkboxes.indexOf(ultimoCheckboxClicado);
      let endIndex = checkboxes.indexOf(checkboxAtual);
      let inverterSelecao = checkboxAtual.checked;

      for (let i = Math.min(startIndex, endIndex); i <= Math.max(startIndex, endIndex); i++) {
          // Verificar se a linha da tabela onde o checkbox está localizado é visível
          let tr = checkboxes[i].closest('tr');
          if (tr && tr.style.display !== 'none') {
              checkboxes[i].checked = inverterSelecao;
          }
      }
  }

  ultimoCheckboxClicado = checkboxAtual;
});


// Verifica se a tecla 'Shift' foi pressionada juntamente com 'D'
document.addEventListener('keydown', function(event) {
  if (event.shiftKey && event.key === 'D') {
      var elementoFocado = document.activeElement;
      if (elementoFocado && elementoFocado.type === 'date') {
          var dataAtual = new Date().toISOString().split('T')[0];
          elementoFocado.value = dataAtual;
          event.preventDefault();
          moverParaProximoCampo(elementoFocado);
      }
  }
});

function moverParaProximoCampo(campoAtual) {
  var form = campoAtual.form;
  var index = Array.prototype.indexOf.call(form, campoAtual) + 1; // Começa no próximo elemento
  var proximoCampo;

  // Percorre os campos subsequentes do formulário até encontrar um que seja editável
  while (index < form.elements.length) {
      proximoCampo = form.elements[index];
      if (proximoCampo && !proximoCampo.disabled && !proximoCampo.readOnly && !proximoCampo.hidden && proximoCampo.tabIndex >= 0) {
          proximoCampo.focus();
          break; // Sai do loop assim que encontra um campo editável
      }
      index++; // Move para o próximo campo no formulário
  }
}

// UTILITIES ############################################################################################################################
// UTILITIES ############################################################################################################################