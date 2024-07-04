// SIDEBAR SHOW OR RETRACTION #########################################################################################################
// SIDEBAR SHOW OR RETRACTION #########################################################################################################

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

// SIDEBAR SHOW OR RETRACTION #########################################################################################################
// SIDEBAR SHOW OR RETRACTION #########################################################################################################

// BUTTON LABELS HOVER ################################################################################################################
// BUTTON LABELS HOVER ################################################################################################################

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

// BUTTON LABELS HOVER ################################################################################################################
// BUTTON LABELS HOVER ################################################################################################################

// PROFILE DROPDOWN ###################################################################################################################
// PROFILE DROPDOWN ###################################################################################################################

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

// PROFILE DROPDOWN ###################################################################################################################
// PROFILE DROPDOWN ###################################################################################################################

// CASH FLOW TABLE CHECKBOXES SELECTION AND ACTIONS ###################################################################################
// CASH FLOW TABLE CHECKBOXES SELECTION AND ACTIONS ###################################################################################

// Selecionar checkboxes com o shift clicado
let lastClickedCheckbox = null;

document.addEventListener('click', function(e) {
  if (!e.target.classList.contains('custom-checkbox')) return;
  let currentCheckbox = e.target;

  if (e.shiftKey && lastClickedCheckbox) {
    let checkboxes = Array.from(document.querySelectorAll('.custom-checkbox'));
    let startIndex = checkboxes.indexOf(lastClickedCheckbox);
    let endIndex = checkboxes.indexOf(currentCheckbox);
    let invertSelection = currentCheckbox.checked;

    for (let i = Math.min(startIndex, endIndex); i <= Math.max(startIndex, endIndex); i++) {
      let tr = checkboxes[i].closest('tr');
      if (tr && tr.style.display !== 'none') {
        checkboxes[i].checked = invertSelection;
      }
    }
  }

  lastClickedCheckbox = currentCheckbox;
  updateActionButtons();
  updateSelectAllCheckbox();
});

// Selecionar ou desmarcar todas as checkboxes visíveis
document.getElementById('custom-checkbox-select-all').addEventListener('change', function(e) {
  let checkboxes = document.querySelectorAll('.custom-checkbox');
  let selectAllChecked = e.target.checked;

  checkboxes.forEach(function(checkbox) {
    let tr = checkbox.closest('tr');
    if (tr && tr.style.display !== 'none') {
      checkbox.checked = selectAllChecked;
    }
  });
  updateActionButtons();
  calculateTotalAmount();
});

// Função para atualizar a barra de botões
function updateActionButtons() {
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  const actionButtons = document.querySelector('.selected-entries-value-container');
  const cashFlowTable = document.querySelector('.cash-flow-table-wrapper');
  const someCheckedCheckbox = Array.from(checkboxes).some(checkbox => checkbox.checked);

  if (someCheckedCheckbox) {
    actionButtons.style.display = 'flex';
    actionButtons.classList.add('show');
    cashFlowTable.style.marginBottom = '2.35rem';
  } else {
    actionButtons.classList.remove('show');
    cashFlowTable.style.marginBottom = '0';
  }
}

// Evento para esconder a barra de botões ao clicar no botão cancelar
document.querySelector('.list__button--cancel-button').addEventListener('click', function () {
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false;
  });

  updateActionButtons();
  calculateTotalAmount();
  updateSelectAllCheckbox();
});

// Evento para esconder a barra de botões ao clicar no botão excluir
document.querySelector('.list__button--delete-button').addEventListener('click', function () {
  updateActionButtons();
  calculateTotalAmount();
  updateSelectAllCheckbox();
});

// Soma de amounts no campo de liquidar
function calculateTotalAmount() {
  let total = 0;

  // Somar os amounts apenas das rows com checkboxes selecionadas
  document.querySelectorAll('.cash-flow-table__body--row').forEach(row => {
    const checkbox = row.querySelector('.custom-checkbox');

    if (checkbox && checkbox.checked) {
      const credit = row.querySelector('.credito-row').textContent.trim();
      const debit = row.querySelector('.debito-row').textContent.trim();

      if (credit) {
        total += formatAmountBalance(credit);
      }

      if (debit) {
        total -= formatAmountBalance(debit);
      }
    }
  });

  // Atualizar o campo de total a liquidar
  const formatedTotalSettlementAmount = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  document.querySelector('.settlement-consolidated-value label').textContent = formatedTotalSettlementAmount;
}

// Adicionar evento listener para as checkboxes para recalcular o total e atualizar o 'custom-checkbox-select-all' quando uma checkbox é alterada
document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateActionButtons();
    calculateTotalAmount();
    updateSelectAllCheckbox();
  });
});

// Função para atualizar o estado do 'custom-checkbox-select-all'
function updateSelectAllCheckbox() {
  const allCheckboxes = document.querySelectorAll('.custom-checkbox');
  const visibleCheckboxes = Array.from(allCheckboxes).filter(checkbox => {
    let tr = checkbox.closest('tr');
    return tr && tr.style.display !== 'none';
  });
  
  if (visibleCheckboxes.length === 0) {
    document.getElementById('custom-checkbox-select-all').checked = false;
  } else {
    const allVisibleChecked = visibleCheckboxes.every(checkbox => checkbox.checked);
    document.getElementById('custom-checkbox-select-all').checked = allVisibleChecked;
  }
}

// Chamar a função calculateTotalAmount e updateSelectAllCheckbox inicialmente
calculateTotalAmount();
updateSelectAllCheckbox();

// CASH FLOW TABLE CHECKBOXES SELECTION AND ACTIONS ###################################################################################
// CASH FLOW TABLE CHECKBOXES SELECTION AND ACTIONS ###################################################################################

// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ########################################################################################
// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ########################################################################################

// Selecionar os elementos necessários
const checkboxes = document.querySelectorAll('.custom-checkbox');
const selectAllCheckbox = document.getElementById('custom-checkbox-select-all');
const operationsButtons = document.querySelectorAll('.side-navigation__buttons-list--operations');
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

// Função para verificar se alguma checkbox está marcada
function updateButtonsVisibility() {
  const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

  if (anyChecked) {
    showButtons();
  } else {
    hideButtons();
  }
}

// Adicionar evento de clique a cada checkbox
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    updateButtonsVisibility();
    updateSelectAllCheckbox();
    updateSelectedEntries(); // Atualiza a lista de liquidação parcial
  });
});

// Adicionar evento de mudança ao 'custom-checkbox-select-all'
selectAllCheckbox.addEventListener('change', () => {
  const selectAllChecked = selectAllCheckbox.checked;

  checkboxes.forEach(checkbox => {
    let tr = checkbox.closest('tr');
    if (tr && tr.style.display !== 'none') {
      checkbox.checked = selectAllChecked;
    }
  });

  updateButtonsVisibility();
  updateSelectedEntries(); // Atualiza a lista de liquidação parcial
  calculateTotalAmount();
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
  updateSelectedEntries(); // Atualiza a lista de liquidação parcial
});

// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ########################################################################################
// SETTLE, DELETE OR CANCEL BUTTONS ON SIDEBAR ########################################################################################

// CALCULATE BANK BALANCES ############################################################################################################
// CALCULATE BANK BALANCES ############################################################################################################

// Função para formatar o amount de texto para número
function formatAmountBalance(strAmount) {
  // Remove pontos e substitui vírgula por ponto para conversão para número
  // Garante que o strAmount é uma string antes de fazer as substituições
  strAmount = strAmount.toString();
  var numericAmount = strAmount.replace(/\./g, '').replace(',', '.');
  return parseFloat(numericAmount);
}

// Função para calcular o montante total a liquidar dos lançamentos selecionados
function calculateTotalSettlementAmount() {
  let totalAmountToSettle = 0;

  document.querySelectorAll('.cash-flow-table__body--row').forEach(row => {
    const checkbox = row.querySelector('.custom-checkbox');
    if (checkbox && checkbox.checked) {
      const credit = row.querySelector('.credito-row').textContent.trim();
      const debit = row.querySelector('.debito-row').textContent.trim();

      if (credit) {
        totalAmountToSettle += formatAmountBalance(credit);
      }
      if (debit) {
        totalAmountToSettle -= formatAmountBalance(debit);
      }
    }
  });

  return totalAmountToSettle;
}

// CALCULATE BANK BALANCES ############################################################################################################
// CALCULATE BANK BALANCES ############################################################################################################

// CALCULATE BANK BALANCES OF SETTLEMENT ##############################################################################################
// CALCULATE BANK BALANCES OF SETTLEMENT ##############################################################################################

// Função para atualizar o saldo do banco selecionado
function updateBankBalance() {
  let totalAmountToSettle = calculateTotalSettlementAmount();

  document.querySelectorAll('.custom-checkbox-settlement').forEach(checkbox => {
    if (checkbox.checked) {
      let initialBalanceEl = checkbox.closest('.banks-table-settlement__body--row').querySelector('[name="initial_balance"]');
      let initialBalance = formatAmountBalance(initialBalanceEl.textContent);

      let newBalance = initialBalance + totalAmountToSettle;

      document.querySelector('[name="settlement-balance"]').textContent = newBalance.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    }
  });
}


// Adicionar evento listener para as checkboxes dos bancos para atualizar o saldo quando uma checkbox é alterada
document.querySelectorAll('.custom-checkbox-settlement').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    updateBankBalance();
    calculateTotalAmount(); // Recalcular o total a liquidar se necessário
  });
});

// Chamar a função updateBankBalance inicialmente para definir o saldo correto
updateBankBalance();

// CALCULATE BANK BALANCES OF SETTLEMENT ##############################################################################################
// CALCULATE BANK BALANCES OF SETTLEMENT ##############################################################################################

// PARTIAL SETTLEMENT FIELD STYLES ####################################################################################################
// PARTIAL SETTLEMENT FIELD STYLES ####################################################################################################

// Campo de liquidação parcial
document.addEventListener('DOMContentLoaded', function() {
  const containerLancamentosSelecionados = document.getElementById('selected-entries-list');

  containerLancamentosSelecionados.addEventListener('change', function(event) {
    if (event.target.classList.contains('partial-button')) {
      const selectedEntries = event.target.closest('.selected-entries');
      const partialAmountSection = selectedEntries.querySelector('.amount-parcial-liquidacao');
      partialAmountSection.style.display = event.target.checked ? 'block' : 'none';
      
      updateColumnState();
    }
  });
  
  // Função para atualizar o estado das colunas baseada nos checkboxes 'partial-button'
  function updateColumnState() {
    const allPartialButtons = document.querySelectorAll('.partial-button');
    const someEnabled = Array.from(allPartialButtons).some(checkbox => checkbox.checked);
    const partialLabel = document.querySelector('.label-parcial');
    
    const partialSettlementColumn = document.querySelectorAll('.selected-entries, .selected-entries-list-labels');

    partialSettlementColumn.forEach(el => {
      if (someEnabled) {
        el.classList.add('active');
        if (partialLabel) partialLabel.style.display = 'block';
      } else {
        el.classList.remove('active');
        if (partialLabel) partialLabel.style.display = 'none';
      }
    });
  }
});

// PARTIAL SETTLEMENT FIELD STYLES ####################################################################################################
// PARTIAL SETTLEMENT FIELD STYLES ####################################################################################################

// PARTIAL SETTLEMENT AUTOMATED CHECKING AND LOCKING ##################################################################################
// PARTIAL SETTLEMENT AUTOMATED CHECKING AND LOCKING ##################################################################################

document.addEventListener('DOMContentLoaded', function() {
  const settlementButton = document.getElementById('settlement-button');
  const settlementModal = document.getElementById('settlement-modal');

  settlementButton.addEventListener('click', function() {
      settlementModal.showModal(); // Abre o modal

      // Esconde todos os campos de amount parcial inicialmente
      document.querySelectorAll('.amount-parcial-liquidacao').forEach(field => {
          field.style.display = 'none'; // Esconde todos os campos de amount parcial inicialmente
      });

      let somePartialButtonEnabled = false;

      // Busca todos os checkboxes marcados na tabela de lançamentos
      const checkedCheckboxes = document.querySelectorAll('.cash-flow-table .custom-checkbox:checked');

      checkedCheckboxes.forEach(checkbox => {
          const uuidPartialSettlementCorrelation = checkbox.getAttribute('data-uuid-partial-settlement-correlation'); // Pega o UUID do lançamento
          const id = checkbox.getAttribute('data-id'); // Pega o ID do lançamento

          if (uuidPartialSettlementCorrelation !== "None") {
              const partialButton = document.querySelector(`#partial-button-${id}`);
              if (partialButton) {
                  partialButton.checked = true; // Ativa o checkbox
                  somePartialButtonEnabled = true; // Indica que pelo menos um botão parcial foi ativado

                  // Adiciona classe 'freezed' para prevenir desmarcação
                  partialButton.classList.add('freezed');

                  // Encontra o campo de amount parcial específico para este lançamento e o torna visível
                  const partialAmountSection = document.querySelector(`#amount-parcial-liquidacao-${id}`);
                  if (partialAmountSection) {
                      partialAmountSection.style.display = 'block'; // Mostra o campo de amount parcial específico
                  }
              }
          }
      });

      // Prevenir desmarcação dos botões parciais 'freezed'
      document.querySelectorAll('.partial-button.freezed').forEach(button => {
        button.addEventListener('click', function(event) {
              event.preventDefault();
          });
      });

      // Garante que a seção de amount parcial seja visível para botões parciais active
      document.querySelectorAll('.partial-button').forEach(button => {
          const selectedEntries = button.closest('.selected-entries');
          if (button.checked) {
              const partialAmountSection = selectedEntries.querySelector('.amount-parcial-liquidacao');
              if (partialAmountSection) {
                  partialAmountSection.style.display = 'block';
              }
          }
      });

      // Atualiza as classes 'active' conforme necessário
      updadeActivePartialSettlementEntries(somePartialButtonEnabled);
  });

  // Função para atualizar as classes 'active'
  function updadeActivePartialSettlementEntries(active) {
      const activePartialSettlementEntries = document.querySelectorAll('.selected-entries, .selected-entries-list-labels');
      const partialLabel = document.querySelector('.label-parcial');
      activePartialSettlementEntries.forEach(el => {
          el.classList.toggle('active', active);
          partialLabel.style.display = active ? 'block' : 'none';
      });
  }

  const botaoFechar = settlementModal.querySelector('.modal-close-settlement');
  if (botaoFechar) {
      botaoFechar.addEventListener('click', function() {
          settlementModal.close();
      });
  }
});

// PARTIAL SETTLEMENT AUTOMATED CHECKING AND LOCKING ##################################################################################
// PARTIAL SETTLEMENT AUTOMATED CHECKING AND LOCKING ##################################################################################

// SETTLEMENT ENVIRONMENT AND FLOW OF INFORMATION #####################################################################################
// SETTLEMENT ENVIRONMENT AND FLOW OF INFORMATION #####################################################################################

// Passa informações do fluxo para o modal de liquidação
document.addEventListener('DOMContentLoaded', function() {
  initializeSelectedEntries();
});

function initializeSelectedEntries() {
  document.querySelectorAll('.cash-flow-table .custom-checkbox')
      .forEach(checkbox => checkbox.addEventListener('change', updateSelectedEntries));
}

function updateSelectedEntries() {
  const container = document.getElementById('selected-entries-list');
  clearContainer(container);
  const checkedCheckboxes = searchCheckedCheckboxes();
  checkedCheckboxes.forEach(createSelectedEntriesRows);
}

function searchCheckedCheckboxes() {
  return document.querySelectorAll('.cash-flow-table .custom-checkbox:checked');
}

function clearContainer(container) {
  container.innerHTML = '';
}

function createSelectedEntriesRows(checkbox) {
  const lancamentoDados = extractDataEntries(checkbox);
  const div = createSettlementList(lancamentoDados);
  document.getElementById('selected-entries-list').appendChild(div);
}

function extractDataEntries(checkbox) {
  const row = checkbox.closest('.cash-flow-table__body--row');
  const id = checkbox.getAttribute('data-id');
  return {
      id: id,
      description: row.querySelector('.description-row').textContent,
      due_date: row.querySelector('.due-date-row').textContent,
      observation: extractObservation(row),
      amount: extractAmount(row),
      transaction_type: extractTransactionType(row)
  };
}

function extractObservation(row) {
  let observation = row.querySelector('.observation-row').textContent.trim();
  return observation.split('Tags:')[0].trim();
}

function extractAmount(row) {
  const debitAmount = row.querySelector('.debito-row').textContent;
  const creditAmount = row.querySelector('.credito-row').textContent;
  return debitAmount || creditAmount;
}

function extractTransactionType(row) {
  return row.querySelector('.debito-row').textContent ? "Débito" : "Crédito";
}

function createSettlementList({id, description, due_date, observation, amount, transaction_type}) {
  const div = document.createElement('div');
  div.classList.add('selected-entries');
  div.innerHTML = `
    <section class="modal-section data-liquidacao">
        <input class="modal-date data-liquidacao" id="data-liquidacao-${id}" type="date" name="data-liquidacao-${id}" value="${formatDateToInput(due_date)}" required>
    </section>
    <section class="modal-section">
        <input class="modal-description" id="description-liquidacao-${id}" maxlength="100" type="text" name="description-liquidacao-${id}" value="${description}" readonly style="background-color: #B5B5B5; color: #FFFFFF;">
    </section>
    <section class="modal-section">
        <input class="modal-observation" id="observation-liquidacao-${id}" maxlength="100" type="text" name="observation-liquidacao-${id}" value="${observation}">
    </section>
    <section class="modal-section">
        <input class="modal-amount amount-liquidacao-total" id="amount-liquidacao-${id}" type="text" name="amount-liquidacao-${id}" oninput="formatAmount(this)" value="R$ ${amount}" readonly required style="background-color: #B5B5B5; color: #FFFFFF;">
    </section>
    <section class="modal-section transaction-type-liquidacao">
        <input class="modal-transaction-type" id="transaction-type-liquidacao-${id}" type="text" name="transaction_type_liquidacao-${id}" value="${transaction_type}" readonly style="background-color: #B5B5B5; color: #FFFFFF;">
    </section>
    <section class="modal-partial-button">
      <div>
      <label class="form-switch"><input id="partial-button-${id}" class="partial-button" type="checkbox"><i></i></label>
      </div>
    </section>
    <section class="modal-section amount-parcial-liquidacao" style="display:none;">
      <input class="modal-amount amount-parcial" id="amount-parcial-liquidacao-${id}" type="text" name="amount-parcial-liquidacao-${id}" oninput="formatAmount(this)" value="R$ " required>
    </section>
    `;
  adjustSettlementDateIfNecessary(div, id, due_date);
  return div;
}

function adjustSettlementDateIfNecessary(div, id, originalDueDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zera o horário para comparar apenas as datas
  const dueDate = convertDataStringToDate(formatDateToInput(originalDueDate));

  if (dueDate > today) {
    const settlementDateField = div.querySelector(`#data-liquidacao-${id}`);
    settlementDateField.value = formatCurrentDateToInput();
  }
}

function formatCurrentDateToInput() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() retorna mês de 0 a 11
  const day = String(currentDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function convertDataStringToDate(dataString) {
  const datePart = dataString.split('-');
  return new Date(datePart[0], datePart[1] - 1, datePart[2]);
}

// Selecionar uma checkbox de cada vez no modal de liquidação
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todas as checkboxes dentro da tabela de bancos para liquidação
  const checkboxes = document.querySelectorAll('.custom-checkbox-settlement');

  // Adiciona um ouvinte de eventos a cada checkbox
  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
          // Quando uma checkbox é marcada, desmarca todas as outras
          if (this.checked) {
              checkboxes.forEach(function(box) {
                  // Desmarca todas as checkboxes exceto a que acionou o evento
                  if (box !== checkbox) {
                      box.checked = false;
                  }
              });
              // Após ajustar as checkboxes, atualiza o saldo
              updateBankBalance();
          }
      });
  });
});

// SETTLEMENT ENVIRONMENT AND FLOW OF INFORMATION #####################################################################################
// SETTLEMENT ENVIRONMENT AND FLOW OF INFORMATION #####################################################################################

// SETTLEMENT PROCESS BUTTON ##########################################################################################################
// SETTLEMENT PROCESS BUTTON ##########################################################################################################

// Botão de Liquidar
document.getElementById('save-settlement').addEventListener('click', async function(event) {
  event.preventDefault();
  
  const selectedSettlement = document.querySelector('.custom-checkbox-settlement:checked');
  if (!selectedSettlement) {
    alert('Por favor, selecione um banco para a liquidação antes de prosseguir.');
    return;
  }

  const selectedBank = selectedSettlement.closest('.banks-table-settlement__body--row').querySelector('.settlement-bank-row').getAttribute('data-bank-name');
  const selectedBankId = selectedSettlement.closest('.banks-table-settlement__body--row').querySelector('.settlement-bank-row').getAttribute('data-bank-id');
  let selectedRows = document.querySelectorAll('.custom-checkbox:checked');
  let dataToSend = [];
  let today = new Date();
  
  today.setHours(0, 0, 0, 0);

  for (let checkbox of selectedRows) {
    console.log('Checkbox:', checkbox); // Verifique se o checkbox é o esperado
    let row = checkbox.closest('.cash-flow-table__body--row');
    console.log('Row:', row); // Verifique se a linha é a esperada
    let id = checkbox.getAttribute('data-id');
    console.log('ID:', id); // Verifique o ID recuperado do checkbox
    let dateField = document.getElementById(`data-liquidacao-${id}`);
    console.log('Campo Data:', dateField); // Verifique se o campo de data foi encontrado

    if (!dateField) {
        console.error(`Elemento de data de liquidação não encontrado para ID: ${id}`);
        continue; // Pule para o próximo checkbox se este estiver faltando
    }

    let settlementDate = new Date(dateField.value);
    if (isNaN(settlementDate.getTime()) || !isValidDate(dateField.value)) {
        alert('Por favor, insira uma data válida de liquidação.');
        dateField.focus();
        return;
    }
    
    if (settlementDate > today) {
      alert('A data de liquidação não pode ser maior do que hoje.');
      dateField.focus();
      return;
    }
    
    let partialButton = document.getElementById(`partial-button-${id}`);
    let partialAmountField = document.getElementById(`amount-parcial-liquidacao-${id}`);
    let partialAmount = 0;

    if (partialAmountField && partialAmountField.value) {
      partialAmount = parseFloat(partialAmountField.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
    }

    if (partialButton.checked && (partialAmount <= 0 || isNaN(partialAmount))) {
      alert('Por favor, preencha o amount parcial para realizar uma liquidação parcial.');
      partialAmountField.focus();
      return;
    }
    
    let totalAmountField = document.getElementById(`amount-liquidacao-${id}`);
    let totalAmount = parseFloat(totalAmountField.value.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
    total = console.log(totalAmount);
    parcial = console.log(partialAmount);
    if (partialAmount > totalAmount) {
      alert('O amount parcial não pode ser maior que o amount total da liquidação.');
      partialAmountField.focus();
      return;
    }
    
    let observationField = document.getElementById(`observation-liquidacao-${id}`);


    let itemData = {
      id: id,
      due_date: row.querySelector('.due-date-row').textContent,
      description: row.querySelector('.description-row').textContent,
      observation: observationField ? observationField.value : '',
      amount: totalAmountField.value,
      partial_amount: partialAmount > 0 ? partialAmount : undefined,
      general_ledger_account: row.getAttribute('data-general-ledger-account'),
      current_installment: row.getAttribute('data-current-installment'),
      total_installments: row.getAttribute('data-total-installments'),
      transaction_type: row.querySelector('.debito-row').textContent ? 'Débito' : 'Crédito',
      settlement_date: dateField ? dateField.value : '',
      settlement_bank: selectedBank,
      settlement_bank_id: selectedBankId,
      uuid_installments_correlation: row.getAttribute('data-uuid-installments-correlation'),
      uuid_general_ledger_account: row.getAttribute('data-uuid-general-ledger-account'),
      uuid_document_type: row.getAttribute('data-uuid-document-type'),
      uuid_department: row.getAttribute('data-department'),
      uuid_project: row.getAttribute('data-uuid-project'),
    };

    dataToSend.push(itemData);
  }

  const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

  if (dataToSend.length > 0) {
    try {
      const response = await fetch('/fluxo_de_caixa/processar_liquidacao/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(dataToSend)
      });
      const data = await response.json();

      if (data.status === 'success') {
        window.location.reload();
      } else {
        console.error('Operação não foi bem-sucedida:', data);
      }
    } catch (error) {
      console.error('Erro na operação:', error);
    }
  }
});

// SETTLEMENT PROCESS BUTTON ##########################################################################################################
// SETTLEMENT PROCESS BUTTON ##########################################################################################################

// DELETE ENTRIES #####################################################################################################################
// DELETE ENTRIES #####################################################################################################################

// Apagar lançamentos da Tabela
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('list__button--delete-button').addEventListener('click', function() {
      var selectedIds = [];
      var selectedCheckboxes = document.querySelectorAll('.custom-checkbox:checked');
      selectedCheckboxes.forEach(function(checkbox) {
          selectedIds.push(checkbox.getAttribute('data-id'));
      });

      fetch('/fluxo_de_caixa/deletar_entradas/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': getCsrfToken()
          },
          body: JSON.stringify({ids: selectedIds})
      })
      .then(response => {
          if (!response.ok) {
              throw response;
          }
          return response.json();
      })
      .then(data => {
          if (data.status === 'success') {
              selectedCheckboxes.forEach(function(checkbox) {
                  var linhaParaRemover = checkbox.closest('tr');
                  linhaParaRemover.remove();
              });
              window.location.reload();
          } else {
              // Trata casos em que a operação não é bem-sucedida
              alert(data.message); // Exibe a mensagem de erro do servidor
              // Desmarca todas as checkboxes selecionadas
              deselectCheckboxes(selectedCheckboxes);
              hideButtons();
          }
      })
      .catch(error => {
          error.json().then(errorMessage => {
              console.error('Erro:', errorMessage);
              alert(errorMessage.message); // Exibe a mensagem de erro para o usuário
              // Desmarca todas as checkboxes selecionadas
              deselectCheckboxes(selectedCheckboxes);
              hideButtons();
          });
      });
  });
});

function getCsrfToken() {
  return document.querySelector('input[name="csrfmiddlewaretoken"]').value;
}

function deselectCheckboxes(checkboxes) {
  checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
  });
}

// DELETE ENTRIES #####################################################################################################################
// DELETE ENTRIES #####################################################################################################################

// AVOID EQUAL BANKS WHILE TRANSFERENCE ###############################################################################################
// AVOID EQUAL BANKS WHILE TRANSFERENCE ###############################################################################################

// Evitar bancos iguais e datas futuras no processo de transferência
document.addEventListener("DOMContentLoaded", function() {
  const transferForm = document.querySelector(".transferences-modal-form");

  transferForm.addEventListener("submit", function(e) {
      const withdrawalBankId = document.getElementById("withdrawal-bank").value;
      const depositBankId = document.getElementById("deposit-bank").value;
      const transferDate = new Date(document.getElementById("date-transferences").value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ajusta a data de today para meia-noite para garantir a comparação correta

      // Verifica se o banco de saída é igual ao banco de entrada
      if (withdrawalBankId === depositBankId) {
          e.preventDefault(); // Impede o envio do formulário
          alert("O banco de saída não pode ser igual ao banco de entrada. Por favor, selecione bancos diferentes.");
          return; // Interrompe a execução do evento
      }

      // Verifica se a data de transferência é maior que a data atual
      if (transferDate > today) {
          e.preventDefault(); // Impede o envio do formulário
          alert("A data da transferência não pode ser futura. Por favor, selecione a data de hoje ou uma data passada.");
      }
  });
});

// AVOID EQUAL BANKS WHILE TRANSFERENCE ###############################################################################################
// AVOID EQUAL BANKS WHILE TRANSFERENCE ###############################################################################################

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

// MODALS GENERAL FUNCTIONING #########################################################################################################
// MODALS GENERAL FUNCTIONING #########################################################################################################
document.addEventListener('DOMContentLoaded', () => {
  // Configurações dos modais
  const modalConfigs = [
    { openBtn: '.credit', modal: '.credit-modal', form: '.modal-form.credit-modal-form', transactionType: 'credit', config: { closeBtnSelector: '.modal-close-credit', dropdownId: 'dropdown-button-accounts-credit', tagInputId: 'tagInput-credit', tagsHiddenInputId: 'tagsHiddenInput-credit', tagContainerId: 'tag-container-credit' } },
    { openBtn: '.debit', modal: '.debit-modal', form: '.modal-form.debit-modal-form', transactionType: 'debit', config: { closeBtnSelector: '.modal-close-debit', dropdownId: 'dropdown-button-accounts-debit', tagInputId: 'tagInput-debit', tagsHiddenInputId: 'tagsHiddenInput-debit', tagContainerId: 'tag-container-debit' } },
    {openBtn: '.transferences', modal: '.transference-modal', form: '.transferences-modal-form', config: {closeBtnSelector: '.modal-close-transferences'}},
    {openBtn: '.settlement-button', modal: '.settlement-modal', form: '.settlement-modal-form', config: {closeBtnSelector: '.modal-close-settlement'}},
  ];

  // Aplicar configurações para cada modal
  modalConfigs.forEach(({ openBtn, modal, form, transactionType, config }) => {
      handleModal(openBtn, modal, form, transactionType, config);
  });
});

// Função unificada para manipular a abertura e fechamento de modais
function handleModal(openBtnSelector, modalSelector, formSelector, transactionType, config) {
  const openBtn = document.querySelector(openBtnSelector);
  const modal = document.querySelector(modalSelector);
  const closeModalFunc = closeModal.bind(null, modal, formSelector, transactionType, config);

  openBtn.addEventListener('click', () => openModal(modal, transactionType));
  document.querySelector(config.closeBtnSelector)?.addEventListener('click', closeModalFunc);
  modal.addEventListener('keydown', (event) => handleKeydown(event, closeModalFunc));
  document.addEventListener('click', (event) => handleClickOutside(event, modal, closeModalFunc));
}

// Função para abrir modal
function openModal(modal, transactionType) {
  document.body.classList.add('modal-open');
  setDateField(modal);
  setAmountField(modal);
  showDetailsTab(modal, transactionType);
  modal.showModal();
  console.log(`Opening ${transactionType} modal`); // Log the type of transaction
}

// Função para fechar modal e resetar campos
function closeModal(modal, formSelector, transactionType, config) {
  modal.close();
  document.body.classList.remove('modal-open');
  resetModalFields(formSelector, config.tagInputId, config.tagsHiddenInputId, config.tagContainerId);
  closeAllDropdowns(modal);
  redefineInstallmentsField(transactionType);
  redefineInventoryQuantityField(transactionType);
  showDetailsTab(modal, transactionType);
  console.log(`Closing ${transactionType} modal`); // Log the type of transaction
}

// Função para fechar todos os dropdowns dentro do modal
function closeAllDropdowns(modal) {
  const dropdowns = modal.querySelectorAll('.dropdown-content');
  dropdowns.forEach(dropdown => {
      dropdown.style.display = 'none';
  });
}

function redefineInstallmentsField(transactionType) {
  const recurrenceSelect = document.getElementById(`recurrence-${transactionType}`);
  const installmentsInput = document.getElementById(`installments-number-${transactionType}`);
  const installmentsNumberSection = document.getElementById(`section-installments-number-${transactionType}`);
  const periodsSection = document.getElementById(`section-periods-${transactionType}`);
  const periodsSelect = document.getElementById(`periods-${transactionType}`);
  const weekendSection = document.getElementById(`section-weekend-${transactionType}`);
  const weekendCheckboxes = document.querySelectorAll('.checkbox-weekend');

  installmentsInput.value = recurrenceSelect.value === 'yes' ? '' : '1';
  installmentsNumberSection.style.display = recurrenceSelect.value === 'yes' ? 'block' : 'none';
  periodsSection.style.display = recurrenceSelect.value === 'yes' ? 'block' : 'none';
  weekendSection.style.display = recurrenceSelect.value === 'yes' ? 'block' : 'none';

  recurrenceSelect.disabled = false;
  installmentsInput.disabled = false;
  periodsSelect.disabled = false;

  weekendCheckboxes.forEach(checkbox => {
    checkbox.disabled = false;
    checkbox.checked = false;
  });
}

function redefineInventoryQuantityField(transactionType) {
  const inventoryQuantityInput = document.getElementById(`${transactionType}-modal-form__section--quantity`);
  inventoryQuantityInput.style.display = 'none';
}

// Função para manipular evento de tecla pressionada
function handleKeydown(event, closeModalCallback) {
  if (event.key === 'Escape') {
      closeModalCallback();
  }
}

// Função para fechar modal ao clicar fora
function handleClickOutside(event, modal, closeModalCallback) {
  if (!modal.contains(event.target) && modal.open) {
      closeModalCallback();
  }
}

// Função para configurar campo de data
function setDateField(modal) {
  const dateField = modal.querySelector('.modal-date');
  if (dateField) {
      const now = new Date();
      const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
      dateField.value = localDate;
      dateField.focus();
  }
}

// Função para configurar campo de valor
function setAmountField(modal) {
  const amountField = modal.querySelector('.modal-amount');
  if (amountField && !amountField.value.startsWith("R$ ")) {
      amountField.value = "R$ ";
  }
}

// Função para resetar campos do modal
function resetModalFields(formSelector, tagInputId, tagsHiddenInputId, tagContainerId) {
  const form = document.querySelector(formSelector);
  if (form) {
      form.reset();
      resetDropdowns(form);
      resetTags(tagInputId, tagsHiddenInputId, tagContainerId);
      resetHiddenInputs(form);
      resetTextInputs(form);
  }
}

// Função para resetar dropdowns
function resetDropdowns(form) {
  const dropdowns = form.querySelectorAll('.dropdown-multiselect');
  dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('button');
      if (button) {
          button.textContent = 'Selecione';
      }
      const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
          checkbox.checked = false;
      });
  });
}

// Função para resetar tags
function resetTags(tagInputId, tagsHiddenInputId, tagContainerId) {
  const tagInput = document.getElementById(tagInputId);
  const tagsHiddenInput = document.getElementById(tagsHiddenInputId);
  const tagContainer = document.getElementById(tagContainerId);

  if (tagInput) tagInput.value = '';
  if (tagsHiddenInput) tagsHiddenInput.value = '';
  if (tagContainer) tagContainer.innerHTML = '';
}

// Função para resetar campos ocultos
function resetHiddenInputs(form) {
  const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
  hiddenInputs.forEach(input => {
      input.value = '';
  });
}

// Função para resetar campos de texto
function resetTextInputs(form) {
  const inputs = form.querySelectorAll('input[type="text"], input[type="date"], input[type="number"], textarea');
  inputs.forEach(input => {
      input.value = '';
  });
}

// Função para mostrar aba de detalhes
function showDetailsTab(modal, transactionType) {
  // Seleciona as abas e conteúdos do modal
  const tabs = modal.querySelectorAll('.tab-link');
  const contents = modal.querySelectorAll('.tab-content');

  // Esconde todos os conteúdos de aba
  contents.forEach(content => {
    content.style.display = 'none';
  });

  // Remove a classe 'active' de todos os botões de aba
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // Adiciona a classe 'active' ao botão de aba 'Detalhes' correspondente ao tipo de transação
  const detailsTab = modal.querySelector(`.tab-link[onclick*="modal-details-tab-${transactionType}"]`);
  if (detailsTab) {
    detailsTab.classList.add('active');
  }

  // Mostra o conteúdo correspondente à aba 'Detalhes' do tipo de transação
  const detailsContent = modal.querySelector(`.modal-details-tab-${transactionType}`);
  if (detailsContent) {
    detailsContent.style.display = 'block';
  }
}

// MODALS GENERAL FUNCTIONING #########################################################################################################
// MODALS GENERAL FUNCTIONING #########################################################################################################

// MODALS CONFIGURATIONS #########################################################################################################
// MODALS CONFIGURATIONS #########################################################################################################

// Atualizar valores de general_ledger_account_uuid e general_ledger_account_name
document.querySelectorAll('.general-ledger-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const iscredit = this.name === "accounts_credit";
    const nameFieldId = iscredit ? "general-ledger-account-name-credit" : "general-ledger-account-name-debit";
    const uuidFieldId = iscredit ? "general-ledger-account-uuid-credit" : "general-ledger-account-uuid-debit";
    
    // Verifica se a checkbox está marcada
    if (this.checked) {
      // Atualizar campos ocultos
      document.getElementById(nameFieldId).value = this.dataset.account;
      document.getElementById(uuidFieldId).value = this.dataset.uuidAccount;
    } else {
      // Verifica se alguma checkbox ainda está marcada
      const anyChecked = [...document.querySelectorAll(`.general-ledger-checkbox[name="${this.name}"]`)].some(cb => cb.checked);
      
      // Se nenhuma checkbox estiver marcada, limpa os campos ocultos
      if (!anyChecked) {
        document.getElementById(nameFieldId).value = "";
        document.getElementById(uuidFieldId).value = "";
      }
    }
  });
});

// Atualizar valores de uuid_document_type e document_type
document.querySelectorAll('.document-type-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const iscredit = this.name === "document_type_option_credit";
    const uuidDocumentTypeFieldId = iscredit ? "document-type-uuid-credit" : "document-type-uuid-debit";
    const documentTypeFieldId = iscredit ? "document-type-name-credit" : "document-type-name-debit";
    
    // Verifica se a checkbox está marcada
    if (this.checked) {
      // Atualizar campos ocultos
      document.getElementById(uuidDocumentTypeFieldId).value = this.dataset.uuidDocumentType;
      document.getElementById(documentTypeFieldId).value = this.dataset.documentType;
    } else {
      // Verifica se alguma checkbox ainda está marcada
      const anyChecked = [...document.querySelectorAll(`.document-type-checkbox[name="${this.name}"]`)].some(cb => cb.checked);
      
      // Se nenhuma checkbox estiver marcada, limpa os campos ocultos
      if (!anyChecked) {
        document.getElementById(uuidDocumentTypeFieldId).value = "";
        document.getElementById(documentTypeFieldId).value = "";
      }
    }
  });
});

// Atualizar valores de uuid_project e project
document.querySelectorAll('.project-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const iscredit = this.name === "project_option_credit";
    const uuidProjectFieldId = iscredit ? "project-uuid-credit" : "project-uuid-debit";
    const projectFieldId = iscredit ? "project-name-credit" : "project-name-debit";
    
    // Verifica se a checkbox está marcada
    if (this.checked) {
      // Atualizar campos ocultos
      document.getElementById(uuidProjectFieldId).value = this.dataset.uuidProject;
      document.getElementById(projectFieldId).value = this.dataset.project;
    } else {
      // Verifica se alguma checkbox ainda está marcada
      const anyChecked = [...document.querySelectorAll(`.project-checkbox[name="${this.name}"]`)].some(cb => cb.checked);
      
      // Se nenhuma checkbox estiver marcada, limpa os campos ocultos
      if (!anyChecked) {
        document.getElementById(uuidProjectFieldId).value = "";
        document.getElementById(projectFieldId).value = "";
      }
    }
  });
});

// Atualizar valores de uuid_entity e entity
document.querySelectorAll('.entity-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const iscredit = this.name === "entity_option_credit";
    const uuidEntityFieldId = iscredit ? "entity-uuid-credit" : "entity-uuid-debit";
    const taxIdEntityFieldId = iscredit ? "entity-tax-id-credit" : "entity-tax-id-debit";
    const entityFieldId = iscredit ? "entity-name-credit" : "entity-name-debit";
    
    // Verifica se a checkbox está marcada
    if (this.checked) {
      // Atualizar campos ocultos
      document.getElementById(uuidEntityFieldId).value = this.dataset.uuidEntity;
      document.getElementById(taxIdEntityFieldId).value = this.dataset.entityTaxId;
      document.getElementById(entityFieldId).value = this.dataset.entity;
    } else {
      // Verifica se alguma checkbox ainda está marcada
      const anyChecked = [...document.querySelectorAll(`.entity-checkbox[name="${this.name}"]`)].some(cb => cb.checked);
      
      // Se nenhuma checkbox estiver marcada, limpa os campos ocultos
      if (!anyChecked) {
        document.getElementById(uuidEntityFieldId).value = "";
        document.getElementById(taxIdEntityFieldId).value = "";
        document.getElementById(entityFieldId).value = "";
      }
    }
  });
});

// Função para lidar com a mudança do tipo de entidade
function handleEntityTypeChange(event, transaction_type) {
  const selectedType = event.target.value;
  const entityDropdownSection = document.querySelector(`.${transaction_type}-modal-form__section--entity`);
  const entityCheckboxes = entityDropdownSection.querySelectorAll('.entity-checkbox');

  // Atualizar o texto da label de acordo com o tipo selecionado
  const entityLabel = document.querySelector(`label[for="dropdown-button-entity-${transaction_type}"]`);
  switch (selectedType) {
    case 'customer':
      entityLabel.textContent = 'Cliente';
      break;
    case 'supplier':
      entityLabel.textContent = 'Fornecedor';
      break;
    case 'employee':
      entityLabel.textContent = 'Funcionário';
      break;
    default:
      entityLabel.textContent = 'Selecione';
  }

  // Mostrar/ocultar opções de acordo com o tipo selecionado
  entityCheckboxes.forEach(checkbox => {
      if (selectedType && checkbox.dataset.entityType !== selectedType) {
          checkbox.closest('.label-filters').style.display = 'none';
          checkbox.closest('.label-filters').dataset.originalDisplay = 'none';
      } else {
          checkbox.closest('.label-filters').style.display = '';
          checkbox.closest('.label-filters').dataset.originalDisplay = '';
      }
  });

  // Atualizar a visibilidade da seção do dropdown
  entityDropdownSection.style.display = selectedType ? '' : 'none';

  // Limpar checkboxes e valores ocultos
  clearCheckboxesAndHiddenFields(transaction_type);
}

// Função para limpar checkboxes e valores ocultos
function clearCheckboxesAndHiddenFields(transaction_type) {
  const entityCheckboxes = document.querySelectorAll(`.entity-checkbox[name="entity_option_${transaction_type}"]`);
  entityCheckboxes.forEach(checkbox => checkbox.checked = false);

  const hiddenFields = [
      `entity-name-${transaction_type}`,
      `entity-tax-id-${transaction_type}`,
      `entity-uuid-${transaction_type}`
  ];
  hiddenFields.forEach(fieldId => document.getElementById(fieldId).value = '');

  document.getElementById(`dropdown-button-entity-${transaction_type}`).textContent = 'Selecione';
}

// Função para atualizar a lista de departamentos e proporções
function updateDepartmentList(transactionType) {
  const departmentListContainer = document.getElementById(`department-list-${transactionType}`);
  const selectedUuids = JSON.parse(document.getElementById(`department-uuid-${transactionType}`).value || '[]');
  const selectedNames = JSON.parse(document.getElementById(`department-name-${transactionType}`).value || '[]');

  const totalDepartments = selectedNames.length;
  const percentage = (100 / totalDepartments).toFixed(2);

  // Primeiro, remover os departamentos que não estão mais selecionados
  Array.from(departmentListContainer.children).forEach(child => {
    const name = child.querySelector('.department-name').innerText;
    if (!selectedNames.includes(name)) {
      departmentListContainer.removeChild(child);
    }
  });

  // Depois, adicionar os departamentos que ainda não estão na lista
  selectedNames.forEach((name, index) => {
    if (!Array.from(departmentListContainer.children).some(child => child.querySelector('.department-name').innerText === name)) {
      departmentListContainer.innerHTML += `
        <div class="department-row">
          <div class="department-item">
            <span class="department-name">${name}</span>
            <input type="number" class="department-percentage" data-index="${index}" value="${percentage}" min="0" max="100" step="0.01" onblur="formatPercentage(this)">
            <span class="percentage-name">%</span>
          </div>
        </div>
      `;
    }
  });

  document.getElementById(`department-percentage-${transactionType}`).value = JSON.stringify(Array(totalDepartments).fill(percentage));
}

// Função para recalcular e atualizar as proporções automaticamente
function updatePercentages(transactionType) {
  const selectedNames = JSON.parse(document.getElementById(`department-name-${transactionType}`).value || '[]');
  const totalDepartments = selectedNames.length;
  const percentage = (100 / totalDepartments).toFixed(2);

  document.querySelectorAll(`.department-percentage`).forEach(input => {
    if (input.closest(`#department-list-${transactionType}`)) {
      input.value = percentage;
    }
  });

  document.getElementById(`department-percentage-${transactionType}`).value = JSON.stringify(Array(totalDepartments).fill(percentage));
}

// Função para atualizar proporções manualmente
function manualUpdatePercentages(transactionType) {
  const percentages = Array.from(document.querySelectorAll(`#department-list-${transactionType} .department-percentage`)).map(input => input.value);
  document.getElementById(`department-percentage-${transactionType}`).value = JSON.stringify(percentages);
}

// Função para formatar as porcentagens para exibição com duas casas decimais ao sair do campo
function formatPercentage(input) {
  input.value = parseFloat(input.value).toFixed(2);
}

// Atualizar valores de uuid_department e department
document.querySelectorAll('.department-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const isCredit = this.name === "department_option_credit";
    const transactionType = isCredit ? "credit" : "debit";
    const uuidDepartmentFieldId = `department-uuid-${transactionType}`;
    const departmentFieldId = `department-name-${transactionType}`;

    let selectedUuids = JSON.parse(document.getElementById(uuidDepartmentFieldId).value || '[]');
    let selectedNames = JSON.parse(document.getElementById(departmentFieldId).value || '[]');

    if (this.checked) {
      selectedUuids.push(this.dataset.uuidDepartment);
      selectedNames.push(this.dataset.department);
    } else {
      const index = selectedUuids.indexOf(this.dataset.uuidDepartment);
      selectedUuids.splice(index, 1);
      selectedNames.splice(index, 1);
    }

    document.getElementById(uuidDepartmentFieldId).value = JSON.stringify(selectedUuids);
    document.getElementById(departmentFieldId).value = JSON.stringify(selectedNames);

    updateDepartmentList(transactionType);
    updatePercentages(transactionType);
  });
});

// Função para verificar se a soma das porcentagens dos departamentos não ultrapassa 100%
function checkPercentages(transactionType) {
  const percentages = Array.from(document.querySelectorAll(`#department-list-${transactionType} .department-percentage`))
    .map(input => parseFloat(input.value) || 0);
  const total = percentages.reduce((sum, value) => sum + value, 0);

  // Se a soma é exatamente 100, vazio ou 0, está válido
  return total === 100 || total === 0;
}

// Adicionando evento ao botão 'modal-save-button'
document.querySelectorAll('.modal-save-button').forEach(button => {
  button.addEventListener('click', function(event) {
    const isCredit = this.name === "modal_save_credit";
    const transactionType = isCredit ? "credit" : "debit";

    const percentages = Array.from(document.querySelectorAll(`#department-list-${transactionType} .department-percentage`))
      .map(input => parseFloat(input.value) || 0);
    const total = percentages.reduce((sum, value) => sum + value, 0);

    const quantityInput = document.getElementById(`inventory-quantity-${transactionType}`);
    const inventoryQuantity = parseFloat(quantityInput.value);
    const checkboxes = document.querySelectorAll(`.inventory-checkbox[name="inventory_option_${transactionType}"]`);
    const anyCheckboxChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    // Verifica as condições para o campo de quantidade do inventário
    if (anyCheckboxChecked) {
      if (isNaN(inventoryQuantity) || inventoryQuantity <= 0) {
        event.preventDefault();
        alert("O valor da quantidade de inventário deve ser maior que 0.");
        return;
      }
    } else if (!isNaN(inventoryQuantity) && inventoryQuantity <= 0) {
      event.preventDefault();
      alert("O valor da quantidade de inventário deve ser maior que 0.");
      return;
    }

    if (!checkPercentages(transactionType)) {
      event.preventDefault();
      alert("A soma das porcentagens dos departamentos deve ser exatamente 100%. Atual: " + total.toFixed(2) + "%.");
    }
  });
});

// Filtrar as opções dentro dos dropdowns
function filterOptions(inputElement, dropdownId) {
    var filter = inputElement.value.toUpperCase();
    var dropdown = document.getElementById(dropdownId);
    var labels = dropdown.querySelectorAll('.label-filters');
    var subgroups = dropdown.querySelectorAll('.subgroup-label');

    if (filter) {
        // Há algum texto no filtro, mostrar apenas labels correspondentes que estão visíveis e ocultar subgrupos
        labels.forEach(function(label) {
            var txtValue = label.textContent || label.innerText;
            if (label.dataset.originalDisplay === undefined) {
                label.dataset.originalDisplay = label.style.display;
            }
            if (label.dataset.originalDisplay !== 'none') {
                label.style.display = (txtValue.toUpperCase().indexOf(filter) > -1) ? "" : "none";
            }
        });
        // Ocultar todos os subgrupos enquanto filtrando
        subgroups.forEach(function(group) {
            if (group.dataset.originalDisplay === undefined) {
                group.dataset.originalDisplay = group.style.display;
            }
            group.style.display = "none";
        });
    } else {
        // O filtro está vazio, restaurar visibilidade original
        labels.forEach(function(label) {
            if (label.dataset.originalDisplay !== undefined) {
                label.style.display = label.dataset.originalDisplay;
            }
        });
        subgroups.forEach(function(group) {
            if (group.dataset.originalDisplay !== undefined) {
                group.style.display = group.dataset.originalDisplay;
            }
        });
    }
}

// Verifica se as checkboxes de conta contábil e document type estão selecionadas
function validateCheckboxes() {
  // Seleciona todas as checkboxes de cada categoria
  var accountCheckboxes = document.querySelectorAll('.general-ledger-checkbox');
  // var documentTypeCheckboxes = document.querySelectorAll('.document-type-checkbox');
  
  // Verifica se pelo menos uma checkbox está marcada em cada categoria
  var isAccountChecked = Array.from(accountCheckboxes).some(checkbox => checkbox.checked);
  // var isDocumentTypeChecked = Array.from(documentTypeCheckboxes).some(checkbox => checkbox.checked);
  
  // Exibe alerta se nenhuma checkbox estiver marcada em alguma das categorias
  if (!isAccountChecked || !isDocumentTypeChecked) {
      alert('Por favor, marque pelo menos uma opção em Conta Contábil e Tipo de Documento.');
      return false; // Impede o envio do formulário
  }
  
  return true; // Permite o envio do formulário se tudo estiver correto
}

// Garante selecionar só uma checkbox de cada vez no final de semana
document.addEventListener('DOMContentLoaded', function() {
  var checkboxes = document.querySelectorAll('.checkbox-weekend');

  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
          // Quando uma checkbox é marcada, desmarcar todas as outras
          if (checkbox.checked) {
              checkboxes.forEach(function(box) {
                  if (box !== checkbox) {
                      box.checked = false;
                  }
              });
          }
      });
  });
});

// Atualizar valor de weekend_action
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.checkbox-weekend').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const isCredit = this.id.includes('credit');
      const transactionType = isCredit ? 'credit' : 'debit';
      const weekendActionInputId = `weekend-action-${transactionType}`;
      const otherCheckboxId = this.id.includes('antedate') ? `custom-checkbox-postpone-${transactionType}` : `custom-checkbox-antedate-${transactionType}`;
      const weekendActionInput = document.getElementById(weekendActionInputId);
      const otherCheckbox = document.getElementById(otherCheckboxId);

      if (this.checked) {
        otherCheckbox.checked = false;
      }

      const checkedValue = this.checked ? (this.id.includes('antedate') ? 'antedate' : 'postpone') : '';
      weekendActionInput.value = checkedValue;
    });
  });
});

// Atualizar valores de uuid_inventory, inventory e inventory_item_code
document.querySelectorAll('.inventory-checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const isCredit = this.name === "inventory_option_credit";
    const transactionType = isCredit ? "credit" : "debit";
    const uuidInventoryFieldId = `inventory-uuid-${transactionType}`;
    const inventoryFieldId = `inventory-name-${transactionType}`;
    const inventoryItemCodeFieldId = `inventory-item-code-${transactionType}`;
    const quantitySection = document.querySelector(`.${transactionType}-modal-form__section--quantity`);
    const quantityInput = document.getElementById(`inventory-quantity-${transactionType}`);

    // Verifica se a checkbox está marcada
    if (this.checked) {
      // Atualizar campos ocultos
      document.getElementById(uuidInventoryFieldId).value = this.dataset.uuidInventory;
      document.getElementById(inventoryFieldId).value = this.dataset.inventoryItem;
      document.getElementById(inventoryItemCodeFieldId).value = this.dataset.inventoryItemCode;
    } else {
      // Verifica se alguma checkbox ainda está marcada
      const anyChecked = [...document.querySelectorAll(`.inventory-checkbox[name="${this.name}"]`)].some(cb => cb.checked);
      
      // Se nenhuma checkbox estiver marcada, limpa os campos ocultos
      if (!anyChecked) {
        document.getElementById(uuidInventoryFieldId).value = "";
        document.getElementById(inventoryFieldId).value = "";
        document.getElementById(inventoryItemCodeFieldId).value = "";
      }
    }

    // Verifica se alguma checkbox está marcada para mostrar ou esconder a seção de quantidade
    const anyCheckboxChecked = document.querySelectorAll(`.inventory-checkbox:checked[name="${this.name}"]`).length > 0;
    if (anyCheckboxChecked) {
      quantitySection.style.display = 'block';
      quantityInput.setAttribute('required', 'required');
    } else {
      quantitySection.style.display = 'none';
      quantityInput.value = ''; // Limpa o valor do campo de quantidade
      quantityInput.removeAttribute('required');
    }
  });
});

// Tags
function initializeTagInputs(inputId, containerId, hiddenInputId) {
  document.getElementById(inputId).addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTag(this.value.trim(), containerId, hiddenInputId);
      this.value = ''; // Limpar o campo de entrada após adicionar uma tag
    }
  });
}

function addTag(tag, containerId, hiddenInputId) {
  if (tag !== '') {
    const tagContainer = document.getElementById(containerId);
    const tagElement = document.createElement('div');
    const tagText = document.createElement('span');
    const tagInput = document.createElement('input');

    tagElement.classList.add('tag');
    tagText.classList.add('tag-span');
    tagText.setAttribute('name', 'tag_span');
    tagText.textContent = tag;
    tagElement.appendChild(tagText);

    tagInput.classList.add('tag-input');
    tagInput.setAttribute('name', 'tag_input');
    tagInput.value = tag;
    tagInput.addEventListener('blur', function() {
      saveTagEdit(tagInput, tagText);
      updateHiddenInput(containerId, hiddenInputId);
    });

    tagInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        saveTagEdit(tagInput, tagText);
        updateHiddenInput(containerId, hiddenInputId);
      }
    });
    
    tagElement.addEventListener('click', function() {
      let singleClick = true;
      
      setTimeout(function() {
          if (singleClick) {
              tagInput.style.display = 'inline';
              tagText.style.display = 'none';
              tagInput.focus();
          }
      }, 500); // Tempo de intervalo para contar o click único
  
      tagElement.addEventListener('dblclick', function() {
        const isBeingEdited = tagInput.style.display === 'inline';
    
        setTimeout(() => {
            if (!isBeingEdited) {
                this.remove();
                updateHiddenInput(containerId, hiddenInputId);
            }
        }, 250); // Ajuste o tempo conforme necessário
    });
  });

    tagElement.appendChild(tagInput);
    tagContainer.appendChild(tagElement);
    updateHiddenInput(containerId, hiddenInputId);
  }
}

function saveTagEdit(tagInput, tagText) {
  tagText.textContent = tagInput.value;
  tagInput.style.display = 'none';
  tagText.style.display = 'inline';
}

function updateHiddenInput(containerId, hiddenInputId) {
  const tagsHiddenInput = document.getElementById(hiddenInputId);
  const tagElements = document.querySelectorAll(`#${containerId} .tag span`);
  const tagsArray = Array.from(tagElements).map(tag => tag.textContent);
  tagsHiddenInput.value = tagsArray.join(',');
}

initializeTagInputs('tagInput-credit', 'tag-container-credit', 'tagsHiddenInput-credit');
initializeTagInputs('tagInput-debit', 'tag-container-debit', 'tagsHiddenInput-debit');

// MODALS CONFIGURATIONS #########################################################################################################
// MODALS CONFIGURATIONS #########################################################################################################

// EDIT ENTRIES IN MODALS ###########################################################################################################
// EDIT ENTRIES IN MODALS ###########################################################################################################

// Evento para editar lançamentos ao clicar duas vezes nas células da tabela
let isEditing = false;

// Event Listeners Principais
document.addEventListener('DOMContentLoaded', function() {
  configureEvents();
});

function configureEvents() {
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeModals();
    }
  });

  ['credit', 'debit'].forEach(transactionType => {
    const modal = document.getElementById(`${transactionType}-modal`);
    modal.onclose = () => onModalClose(transactionType);
  });

  configureEventsTable();
}

function configureEventsTable() {
  const cells = document.querySelectorAll('.cash-flow-table__body--row td:not(.checkbox-row)');
  cells.forEach(cell => {
    cell.addEventListener('dblclick', () => handleCellDoubleClick(cell));
  });
}

// Funções de Eventos de Tabela
function handleCellDoubleClick(cell) {
  if (!cell.classList.contains('checkbox-row')) {
    const row = cell.closest('.cash-flow-table__body--row');
    openEditModal(row);
  }
}

function openEditModal(row) {
  isEditing = true;
  const transactionType = getTransactionType(row);
  fillModalData(row, transactionType);
  showInstallments(row, transactionType);
  checkInventoryQuantity(row, transactionType);
  showRelatedInstallments(row);
  const modal = document.getElementById(`${transactionType}-modal`);
  showDetailsTab(modal, transactionType);
  modal.showModal();
  focusOnDateInput(modal);
  initializeEntitySelection(row, transactionType);
}

function getTransactionType(row) {
  const transactionType = row.getAttribute('data-transaction-type');
  return transactionType === 'Crédito' ? 'credit' : 'debit';
}

function focusOnDateInput(modal) {
  const dateInput = modal.querySelector('.modal-date');
  if (dateInput) {
    dateInput.focus(); // Define o foco para o campo de data
  }
}

function closeModals() {
  ['credit', 'debit'].forEach(transactionType => {
    const modal = document.getElementById(`${transactionType}-modal`);
    if (modal.open) {
      const form = modal.querySelector(`.${transactionType}-modal-form`);
      form.reset();
      modal.close();
    }
  });
}
  
function onModalClose(transactionType) {
  isEditing = false;
  configureActiveFields(transactionType, true);
  resetRecurrenceField(transactionType);
  resetAmountField(transactionType);
  resetPeriodsField(transactionType);
  resetDepartmentListContainer(transactionType);
  resetEntitiesField(transactionType);
  clearInstallmentsTable();
}

function clearInstallmentsTable() {
  const installmentsTableBody = document.getElementById('installments-table-body');
  const installmentsTableWrapper = document.querySelector('#installments-list-container .cash-flow-table-wrapper');

  if (installmentsTableBody) {
    installmentsTableBody.innerHTML = '';
    installmentsTableWrapper.style.display = 'none';
  }
}

function resetDepartmentListContainer(transactionType) {
  const departmentListContainer = document.getElementById(`department-list-${transactionType}`);
  departmentListContainer.innerHTML = '';
}

function resetRecurrenceField(transactionType) {
  const recurrenceField = document.getElementById(`recurrence-${transactionType}`);
  recurrenceField.value = "no";
}

function resetAmountField(transactionType) {
  const amountField = document.getElementById(`amount-${transactionType}`);
  amountField.value = "R$ ";
}

function resetPeriodsField(transactionType) {
  const periodsField = document.getElementById(`periods-${transactionType}`);
  periodsField.value = "monthly";
}

function resetEntitiesField(transactionType) {
  document.getElementById(`entity-type-${transactionType}`).value = '';
  handleEntityTypeChange({ target: { value: '' } }, transactionType);
}

// Função auxiliar para ativar ou desativar campos
function configureActiveFields(transactionType, activate) {
  const fields = {
  amount: document.getElementById(`amount-${transactionType}`),
  recurrence: document.getElementById(`recurrence-${transactionType}`),
  accountsDropdownButton: document.getElementById(`dropdown-button-accounts-${transactionType}`),
  documentTypeDropdownButton: document.getElementById(`dropdown-button-document-type-${transactionType}`),
  departmentDropdownButton: document.getElementById(`dropdown-button-department-${transactionType}`),
  projectDropdownButton: document.getElementById(`dropdown-button-project-${transactionType}`),
  inventoryDropdownButton: document.getElementById(`dropdown-button-inventory-${transactionType}`),
  inventoryQuantity: document.getElementById(`inventory-quantity-${transactionType}`),
  entityDropdownButton: document.getElementById(`dropdown-button-entity-${transactionType}`),
  accountsCheckboxes: document.querySelectorAll(`#dropdown-content-accounts-${transactionType} .checkbox-account-modal`),
  documentTypeCheckboxes: document.querySelectorAll(`#dropdown-content-document-type-${transactionType} .document-type-checkbox`),
  departmentCheckboxes: document.querySelectorAll(`#dropdown-content-department-${transactionType} .department-checkbox`),
  projectCheckboxes: document.querySelectorAll(`#dropdown-content-project-${transactionType} .project-checkbox`),
  inventoryCheckboxes: document.querySelectorAll(`#dropdown-content-inventory-${transactionType} .inventory-checkbox`),
  entityCheckboxes: document.querySelectorAll(`#dropdown-content-entity-${transactionType} .entity-checkbox`)
  };
  
  if (activate) {
  fields.amount.readOnly = false;
  configureElement(fields.amount, { backgroundColor: '', color: '', cursor: '' });
  fields.recurrence.disabled = false;
  configureElement(fields.recurrence, { backgroundColor: '', color: '', cursor: '' });
  fields.accountsDropdownButton.disabled = false;
  configureElement(fields.accountsDropdownButton, { backgroundColor: '', color: '', cursor: '' });
  fields.accountsCheckboxes.forEach(checkbox => checkbox.disabled = false);
  fields.documentTypeDropdownButton.disabled = false;
  configureElement(fields.documentTypeDropdownButton, { backgroundColor: '', color: '', cursor: '' });
  fields.documentTypeCheckboxes.forEach(checkbox => checkbox.disabled = false);
  fields.departmentDropdownButton.disabled = false;
  configureElement(fields.departmentDropdownButton, { backgroundColor: '', color: '', cursor: '' });
  fields.departmentCheckboxes.forEach(checkbox => checkbox.disabled = false);
  fields.projectDropdownButton.disabled = false;
  configureElement(fields.projectDropdownButton, { backgroundColor: '', color: '', cursor: '' });
  fields.projectCheckboxes.forEach(checkbox => checkbox.disabled = false);
  fields.inventoryDropdownButton.disabled = false;
  fields.inventoryQuantity.disabled = false;
  configureElement(fields.inventoryDropdownButton, { backgroundColor: '', color: '', cursor: '' });
  fields.inventoryCheckboxes.forEach(checkbox => checkbox.disabled = false);
  fields.entityDropdownButton.disabled = false;
  configureElement(fields.entityDropdownButton, { backgroundColor: '', color: '', cursor: '' });
  fields.entityCheckboxes.forEach(checkbox => checkbox.disabled = false);
  } else {
  fields.amount.readOnly = true;
  configureElement(fields.amount, { backgroundColor: '#B5B5B5', color: '#FFFFFF', cursor: 'not-allowed' });
  fields.recurrence.disabled = true;
  fields.accountsDropdownButton.disabled = true;
  configureElement(fields.accountsDropdownButton, { backgroundColor: '#B5B5B5', color: '#FFFFFF', cursor: 'not-allowed' });
  fields.accountsCheckboxes.forEach(checkbox => checkbox.disabled = true);
  fields.documentTypeDropdownButton.disabled = true;
  configureElement(fields.documentTypeDropdownButton, { backgroundColor: '#B5B5B5', color: '#FFFFFF', cursor: 'not-allowed' });
  fields.documentTypeCheckboxes.forEach(checkbox => checkbox.disabled = true);
  fields.departmentDropdownButton.disabled = true;
  configureElement(fields.departmentDropdownButton, { backgroundColor: '#B5B5B5', color: '#FFFFFF', cursor: 'not-allowed' });
  fields.departmentCheckboxes.forEach(checkbox => checkbox.disabled = true);
  fields.projectDropdownButton.disabled = true;
  configureElement(fields.projectDropdownButton, { backgroundColor: '#B5B5B5', color: '#FFFFFF', cursor: 'not-allowed' });
  fields.projectCheckboxes.forEach(checkbox => checkbox.disabled = true);
  fields.inventoryDropdownButton.disabled = true;
  configureElement(fields.inventoryDropdownButton, { backgroundColor: '#B5B5B5', color: '#FFFFFF', cursor: 'not-allowed' });
  fields.inventoryCheckboxes.forEach(checkbox => checkbox.disabled = true);
  fields.entityDropdownButton.disabled = true;
  configureElement(fields.entityDropdownButton, { backgroundColor: '#B5B5B5', color: '#FFFFFF', cursor: 'not-allowed' });
  fields.entityCheckboxes.forEach(checkbox => checkbox.disabled = true);
  }
}

function configureElement(element, properties) {
  Object.keys(properties).forEach(prop => {
  element.style[prop] = properties[prop];
  });
}

function fillModalData(row, transactionType) {
  const entryId = row.getAttribute('data-id-row');
  document.querySelector(`[name="entry_id_${transactionType}"]`).value = entryId;

  const uuidPartialSettlementCorrelation = row.getAttribute('data-uuid-partial-settlement-correlation');
  document.querySelector(`[name="uuid_partial_settlement_correlation_${transactionType}"]`).value = (uuidPartialSettlementCorrelation === 'None' ? 'null' : uuidPartialSettlementCorrelation);
  configureActiveFields(transactionType, uuidPartialSettlementCorrelation === 'None');

  const dueDate = row.querySelector('.due-date-row').textContent.trim();
  document.getElementById(`date-${transactionType}`).value = formatDateToInput(dueDate);
  document.getElementById(`description-${transactionType}`).value = row.querySelector('.description-row').textContent.trim();
  document.getElementById(`observation-${transactionType}`).value = row.querySelector('.observation-row').childNodes[0].textContent.trim();

  const amount = row.querySelector(`.${transactionType === 'credit' ? 'credito' : 'debito'}-row`).textContent.trim();
  document.getElementById(`amount-${transactionType}`).value = "R$ " + amount;

  const generalLedgerAccount = row.getAttribute('data-general-ledger-account');
  document.getElementById(`general-ledger-account-name-${transactionType}`).value = generalLedgerAccount;
  selectGeneralLedgerAccountDropdown(transactionType, generalLedgerAccount);

  const uuidGeneralLedgerAccount = row.getAttribute('data-uuid-general-ledger-account');
  document.getElementById(`general-ledger-account-uuid-${transactionType}`).value = uuidGeneralLedgerAccount;
  selectGeneralLedgerAccountDropdown(transactionType, uuidGeneralLedgerAccount);

  const documentType = row.getAttribute('data-document-type');
  document.getElementById(`document-type-name-${transactionType}`).value = (documentType === 'None' ? '' : documentType);
  selectDocumentTypeDropdown(transactionType, documentType);

  const uuidDocumentType = row.getAttribute('data-uuid-document-type');
  document.getElementById(`document-type-uuid-${transactionType}`).value = (uuidDocumentType === 'None' ? '' : uuidDocumentType);
  selectDocumentTypeDropdown(transactionType, uuidDocumentType);

  const project = row.getAttribute('data-project');
  document.getElementById(`project-name-${transactionType}`).value = (project === 'None' ? '' : project);
  selectProjectDropdown(transactionType, project);

  const uuidProject = row.getAttribute('data-uuid-project');
  document.getElementById(`project-uuid-${transactionType}`).value = (uuidProject === 'None' ? '' : uuidProject);
  selectProjectDropdown(transactionType, uuidProject);

  const entity = row.getAttribute('data-entity');
  document.getElementById(`entity-name-${transactionType}`).value = (entity === 'None' ? '' : entity);
  selectEntityDropdown(transactionType, entity);

  const entityTaxId = row.getAttribute('data-entity-tax-id');
  document.getElementById(`entity-tax-id-${transactionType}`).value = (entityTaxId === 'None' ? '' : entityTaxId);
  selectEntityDropdown(transactionType, entityTaxId);

  const uuidEntity = row.getAttribute('data-uuid-entity');
  document.getElementById(`entity-uuid-${transactionType}`).value = (uuidEntity === 'None' ? '' : uuidEntity);
  selectEntityDropdown(transactionType, uuidEntity);
  initializeEntitySelection(row, transactionType);

  document.getElementById(`notes-${transactionType}`).value = row.getAttribute('data-notes');

  const tagsString = extractTags(row);
  addTagsToContainer(tagsString, transactionType);

  const periodsValue = row.getAttribute('data-periods');
  const periodsDropdown = document.getElementById(`periods-${transactionType}`);
  if (periodsDropdown && periodsValue) {
    periodsDropdown.value = periodsValue;
  }

  const weekendActionValue = row.getAttribute('data-weekend-action');
  const checkboxAntedate = document.getElementById(`custom-checkbox-antedate-${transactionType}`);
  const checkboxPostpone = document.getElementById(`custom-checkbox-postpone-${transactionType}`);
  checkboxAntedate.checked = weekendActionValue === 'antedate';
  checkboxPostpone.checked = weekendActionValue === 'postpone';

  const originalTotalInstallments = row.getAttribute('data-total-installments');
  document.getElementById(`original-total-installments-${transactionType}`).value = originalTotalInstallments;

  const department = JSON.parse(row.getAttribute('data-department').replace(/'/g, '"'));
  const uuidDepartment = JSON.parse(row.getAttribute('data-uuid-department').replace(/'/g, '"'));
  const percentageDepartment = JSON.parse(row.getAttribute('data-percentage-department').replace(/'/g, '"'));
  document.getElementById(`department-name-${transactionType}`).value = JSON.stringify(department);
  document.getElementById(`department-uuid-${transactionType}`).value = JSON.stringify(uuidDepartment);
  document.getElementById(`department-percentage-${transactionType}`).value = JSON.stringify(percentageDepartment);
  selectDepartmentDropdown(transactionType, uuidDepartment);
  fillDepartmentList(transactionType, department, uuidDepartment, percentageDepartment);

  const inventory = row.getAttribute('data-inventory-item');
  document.getElementById(`inventory-name-${transactionType}`).value = (inventory === 'None' ? '' : inventory);
  selectInventoryDropdown(transactionType, inventory);

  const inventoryItemCode = row.getAttribute('data-inventory-item-code');
  document.getElementById(`inventory-item-code-${transactionType}`).value = (inventoryItemCode === 'None' ? '' : inventoryItemCode);
  selectInventoryDropdown(transactionType, inventoryItemCode);

  const inventoryQuantity = row.getAttribute('data-inventory-quantity');
  document.getElementById(`inventory-quantity-${transactionType}`).value = (inventoryQuantity === 'None' ? '' : inventoryQuantity);
  selectInventoryDropdown(transactionType, inventoryQuantity);

  const uuidInventory = row.getAttribute('data-uuid-inventory');
  document.getElementById(`inventory-uuid-${transactionType}`).value = (uuidInventory === 'None' ? '' : uuidInventory);
  selectInventoryDropdown(transactionType, uuidInventory);
}

function selectGeneralLedgerAccountDropdown(transactionType, uuidGeneralLedgerAccount) {
  const checkboxesGeneralLedgerAccount = document.querySelectorAll(`#dropdown-content-accounts-${transactionType} .general-ledger-checkbox`);
  checkboxesGeneralLedgerAccount.forEach(checkbox => {
    if (checkbox.dataset.uuidAccount === uuidGeneralLedgerAccount) {
      checkbox.checked = true;
      document.getElementById(`dropdown-button-accounts-${transactionType}`).textContent = checkbox.dataset.account;
    } else {
      checkbox.checked = false;
    }
  });
}

function selectDocumentTypeDropdown(transactionType, uuidDocumentType) {
  const checkboxesDocumentType = document.querySelectorAll(`#dropdown-content-document-type-${transactionType} .document-type-checkbox`);
  checkboxesDocumentType.forEach(checkbox => {
    if (checkbox.dataset.uuidDocumentType === uuidDocumentType) {
      checkbox.checked = true;
      document.getElementById(`dropdown-button-document-type-${transactionType}`).textContent = checkbox.dataset.documentType;
    } else {
      checkbox.checked = false;
    }
  });
}

function selectProjectDropdown(transactionType, uuidProject) {
  const checkboxesProject = document.querySelectorAll(`#dropdown-content-project-${transactionType} .project-checkbox`);
  checkboxesProject.forEach(checkbox => {
    if (checkbox.dataset.uuidProject === uuidProject) {
      checkbox.checked = true;
      checkbox.disabled = true;
      document.getElementById(`dropdown-button-project-${transactionType}`).textContent = checkbox.dataset.project;
    } else {
      checkbox.checked = false;
      checkbox.disabled = true;
    }
  });
}

function selectEntityDropdown(transactionType, uuidEntity) {
  const checkboxesEntity = document.querySelectorAll(`#dropdown-content-entity-${transactionType} .entity-checkbox`);
  checkboxesEntity.forEach(checkbox => {
    if (checkbox.dataset.uuidEntity === uuidEntity) {
      checkbox.checked = true;
      document.getElementById(`dropdown-button-entity-${transactionType}`).textContent = checkbox.dataset.entityItem;
    } else {
      checkbox.checked = false;
    }
  });
}

function selectInventoryDropdown(transactionType, uuidInventory) {
  const checkboxesInventory = document.querySelectorAll(`#dropdown-content-inventory-${transactionType} .inventory-checkbox`);
  checkboxesInventory.forEach(checkbox => {
    if (checkbox.dataset.uuidInventory === uuidInventory) {
      checkbox.checked = true;
      document.getElementById(`dropdown-button-inventory-${transactionType}`).textContent = checkbox.dataset.inventoryItem;
    } else {
      checkbox.checked = false;
    }
  });
}

function selectDepartmentDropdown(transactionType, selectedUuids) {
  const selectedUuidsParsed = Array.isArray(selectedUuids) ? selectedUuids : JSON.parse(selectedUuids);
  const checkboxesDepartment = document.querySelectorAll(`#dropdown-content-department-${transactionType} .department-checkbox`);
  checkboxesDepartment.forEach(checkbox => {
    checkbox.checked = selectedUuidsParsed.includes(checkbox.dataset.uuidDepartment);
  });
  updateButtonText(`dropdown-button-department-${transactionType}`, `#dropdown-content-department-${transactionType} .department-checkbox`, 'Selecione');
  checkboxesDepartment.forEach(checkbox => {
    checkbox.disabled = true;
  });
}

// Função de preenchimento de lista de departamentos
function fillDepartmentList(transactionType, departments, uuids, percentages) {
  const departmentListContainer = document.getElementById(`department-list-${transactionType}`);

  // Limpar a lista atual
  departmentListContainer.innerHTML = '';

  // Preencher a lista com os novos dados
  departments.forEach((name, index) => {
    departmentListContainer.innerHTML += `
      <div class="department-row">
        <div class="department-item">
          <span class="department-name">${name}</span>
          <input type="text" class="department-percentage" data-index="${index}" value="${parseFloat(percentages[index]).toFixed(2).replace('.', ',')}%" min="0" max="100" step="0.01" oninput="manualUpdatePercentages('${transactionType}')" disabled>
        </div>
      </div>
    `;
  });

  // Atualizar o campo de porcentagens com os valores atualizados
  document.getElementById(`department-percentage-${transactionType}`).value = JSON.stringify(percentages.map(value => parseFloat(value)));
}

function disableElements(transactionType) {
  const installmentsInput = document.getElementById(`installments-number-${transactionType}`);
  const recurrenceSelect = document.getElementById(`recurrence-${transactionType}`);
  const periodsSelect = document.getElementById(`periods-${transactionType}`);
  const weekendCheckboxes = document.querySelectorAll('.checkbox-weekend');

  installmentsInput.disabled = true;
  recurrenceSelect.disabled = true;
  periodsSelect.disabled = true;

  installmentsInput.style.userSelect = "none";
  recurrenceSelect.style.userSelect = "none";
  periodsSelect.style.userSelect = "none";

  weekendCheckboxes.forEach(checkbox => {
    checkbox.disabled = true;
    checkbox.style.userSelect = "none";
  });
}

// Função para mostrar campo de recorrência
function showInstallments(row, transactionType) {
  const select = document.getElementById(`recurrence-${transactionType}`);
  const input = document.getElementById(`installments-number-${transactionType}`);
  const installmentsNumberSection = document.getElementById(`section-installments-number-${transactionType}`);
  const periodsSection = document.getElementById(`section-periods-${transactionType}`);
  const weekendSection = document.getElementById(`section-weekend-${transactionType}`);

  const isRecurring = select.value === 'yes';

  installmentsNumberSection.style.display = isRecurring ? 'block' : 'none';
  periodsSection.style.display = isRecurring ? 'block' : 'none';
  weekendSection.style.display = isRecurring ? 'block' : 'none';

  if (isEditing && row) {
    const totalInstallments = row.getAttribute('data-total-installments') ? parseInt(row.getAttribute('data-total-installments')) : 1;
    const currentInstallment = row.getAttribute('data-current-installment') ? parseInt(row.getAttribute('data-current-installment')) : 1;
    input.value = currentInstallment;
    input.disabled = totalInstallments > 1;

    if (totalInstallments > 1) {
      select.value = 'yes'; // Selecionar a opção 'yes'
      disableElements(transactionType);
      installmentsNumberSection.style.display = 'block';
      periodsSection.style.display = 'block';
      weekendSection.style.display = 'block';
    }
  } else {
    input.value = isRecurring ? '1' : '';
    input.disabled = false;
  }
}

function showRelatedInstallments(row) {
  const correlationId = row.getAttribute('data-uuid-installments-correlation');
  const installmentsTableBody = document.getElementById('installments-table-body');
  const installmentsTableWrapper = document.querySelector('#installments-list-container .cash-flow-table-wrapper');

  // Clear previous content
  installmentsTableBody.innerHTML = '';
  installmentsTableWrapper.style.display = 'none'; // Hide the table wrapper initially

  if (correlationId && correlationId !== 'None') {
    // Fetch data from the server
    fetch(`/fluxo_de_caixa/pegar_parcelas_relacionadas/${correlationId}/`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          // Sort data by due_date in ascending order
          data.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
          
          const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          });

          data.forEach(entry => {
            const listItem = document.createElement('tr');
            const formattedAmount = formatter.format(entry.amount);
            const debitCredit = entry.transaction_type === 'Débito' ? `Débito: ${formattedAmount}` : `Crédito: ${formattedAmount}`;
            
            // Format the due_date from yyyy/mm/dd to dd/mm/yyyy
            const formattedDate = formatDate(entry.due_date);
            
            listItem.innerHTML = `
              <td class="due-date-col">${formattedDate}</td>
              <td class="description-col">${entry.description}</td>
              <td class="installment-col">${entry.current_installment}/${entry.total_installments}</td>
              <td class="amount-col">${debitCredit}</td>
            `;
            installmentsTableBody.appendChild(listItem);
          });

          // Show the table wrapper if there are installments
          installmentsTableWrapper.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error fetching related installments:', error);
      });
  }
}

// Função para inicializar a seleção de entidade ao abrir o modal
function initializeEntitySelection(row, transactionType) {
  const entityType = row.getAttribute('data-entity-type');
  const uuidEntity = row.getAttribute('data-uuid-entity');

  if (entityType && entityType !== 'None' && uuidEntity && uuidEntity !== 'None') {
    const entityTypeField = document.getElementById(`entity-type-${transactionType}`);
    entityTypeField.value = entityType;

    // Atualiza a exibição das opções de acordo com o tipo de entidade selecionado
    handleEntityTypeChange({ target: { value: entityType } }, transactionType);

    // Seleciona a entidade correta de acordo com o UUID
    const entityCheckboxes = document.querySelectorAll(`.entity-checkbox[name="entity_option_${transactionType}"]`);
    entityCheckboxes.forEach(checkbox => {
      if (checkbox.dataset.uuidEntity === uuidEntity) {
        checkbox.checked = true;
        const dropdownButton = document.getElementById(`dropdown-button-entity-${transactionType}`);
        dropdownButton.textContent = checkbox.dataset.entity;
      }
    });

    // Exibe a seção de dropdown de entidade
    const entityDropdownSection = document.querySelector(`.${transactionType}-modal-form__section--entity`);
    entityDropdownSection.style.display = '';
  }
}

// Function to format date from yyyy/mm/dd to dd/mm/yyyy
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

// Função para verificar quantidade de inventário
function checkInventoryQuantity(row, transactionType) {
  const quantitySection = document.querySelector(`.${transactionType}-modal-form__section--quantity`);
  const quantityInput = document.getElementById(`inventory-quantity-${transactionType}`);

  const inventoryQuantity = parseInt(row.getAttribute('data-inventory-quantity'));

  if (inventoryQuantity > 0) {
    quantitySection.style.display = 'block';
    quantityInput.setAttribute('required', 'required');
  } else {
    quantitySection.style.display = 'none';
    quantityInput.value = ''; // Limpa o valor do campo de quantidade
    quantityInput.removeAttribute('required');
  }
}

function extractTags(row) {
  const tagsContainer = row.querySelector('.tag-row');
  return tagsContainer ? tagsContainer.textContent.trim().replace(/^Tags:\s*/, '') : '';
}

function addTagsToContainer(tagsString, transactionType) {
  const containerId = `tag-container-${transactionType}`;
  const hiddenInputId = `tagsHiddenInput-${transactionType}`;
  const tagContainer = document.getElementById(containerId);
  while (tagContainer.firstChild) {
      tagContainer.removeChild(tagContainer.firstChild);
  }
  const tags = tagsString.split(',');
  tags.forEach(tag => {
      if (tag.trim()) {
          addTag(tag.trim(), containerId, hiddenInputId);
      }
  });
}

function formatDateToInput(date) {
  const dateParts = date.split('/');
  return dateParts.reverse().join('-');
}

function simulateEnter(elementId) {
  const event = new KeyboardEvent('keydown', {'key': 'Enter'});
  document.getElementById(elementId).dispatchEvent(event);
}

// EDIT ENTRIES IN MODALS ###########################################################################################################
// EDIT ENTRIES IN MODALS ###########################################################################################################

// UTILITIES ##########################################################################################################################
// UTILITIES ##########################################################################################################################

// Função para formatar o amount de um campo como moeda brasileira
function formatAmount(input) {
  let numericAmount = input.value.replace(/\D/g, '');
  let floatAmount = parseFloat(numericAmount) / 100;
  let formatedAmount = floatAmount.toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  input.value = numericAmount ? `R$ ${formatedAmount}` : 'R$ 0,00';
  if (input.value === 'R$ 0,00') {
    input.value = 'R$ 0,00';
  }
}

// Verifica se a tecla 'Shift' foi pressionada juntamente com 'D'
document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'D') {
        var focusedElement = document.activeElement;
        if (focusedElement && focusedElement.type === 'date') {
            var now = new Date();
            // Ajusta a data para remover o deslocamento de fuso horário e formatá-la corretamente
            var localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            focusedElement.value = localDate;
            event.preventDefault();
            moveToNextField(focusedElement);
        }
    }
});

function moveToNextField(currentField) {
  var form = currentField.form;
  var index = Array.prototype.indexOf.call(form, currentField) + 1; // Começa no próximo elemento
  var nextField;

  // Percorre os campos subsequentes do formulário até encontrar um que seja editável
  while (index < form.elements.length) {
      nextField = form.elements[index];
      if (nextField && !nextField.disabled && !nextField.readOnly && !nextField.hidden && nextField.tabIndex >= 0) {
          nextField.focus();
          break; // Sai do loop assim que encontra um campo editável
      }
      index++; // Move para o próximo campo no formulário
  }
}

// Função para verificar a validade da data
function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;  // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
}

// UTILITIES ##########################################################################################################################
// UTILITIES ##########################################################################################################################

// FILTER MONTHS ######################################################################################################################
// FILTER MONTHS ######################################################################################################################

// Filtro de months
const config = {
  months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  today: new Date(),
};

function getCurrentMonthIndex() {
  return config.today.getMonth();
}

function getCurrentYear() {
  return config.today.getFullYear();
}

function markPreviousMonthsToCurrent(index, currentYear) {
  const checkboxesMonths = document.querySelectorAll('#dropdown-content-months .checkbox-month');
  checkboxesMonths.forEach(checkbox => {
    const [monthCheckbox, yearCheckbox] = checkbox.value.split('/');
    const monthIndex = config.months.indexOf(monthCheckbox);
    const year = parseInt(yearCheckbox, 10);
    checkbox.checked = (year < currentYear) || (year === currentYear && monthIndex <= index);
  });
  updateButtonTextMonths();
  filterTable();
}

function findAndMarkCurrentMonthOrNext() {
  let currentMonthIndex = getCurrentMonthIndex();
  let currentYear = getCurrentYear();
  const checkboxesMonths = document.querySelectorAll('#dropdown-content-months .checkbox-month');

  for (let attempts = 0; attempts < 12; attempts++) {
    const monthYearSearched = `${config.months[currentMonthIndex]}/${currentYear}`;
    const monthYearFound = [...checkboxesMonths].some(checkbox => checkbox.value === monthYearSearched);

    if (monthYearFound) {
      markPreviousMonthsToCurrent(currentMonthIndex, currentYear);
      return;
    }

    currentMonthIndex = (currentMonthIndex + 1) % 12;
    if (currentMonthIndex === 0) currentYear++;
  }

  console.log('Nenhum mês válido encontrado. Considere revisar os amounts dos checkboxes.');
}

document.addEventListener('DOMContentLoaded', findAndMarkCurrentMonthOrNext);

// FILTER MONTHS ######################################################################################################################
// FILTER MONTHS ######################################################################################################################

// FILTER FIELDS ######################################################################################################################
// FILTER FIELDS ######################################################################################################################

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
      if (selector.includes('credit') || selector.includes('debit')) {
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

// Função para fechar todos os dropdowns exceto o especificado
function closeAllDropdowns(exceptId) {
  const dropdowns = document.querySelectorAll('.dropdown-content');
  dropdowns.forEach(dropdown => {
      if (dropdown.id !== exceptId && dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
      }
  });
}

// Função genérica para alternar dropdowns, utilizável tanto para filtros quanto para modais
function toggleDropdown(dropdownId, event) {
  event.stopPropagation();  // Evita que o evento se propague e dispare outros listeners
  const dropdown = document.getElementById(dropdownId);
  const searchInput = dropdown.querySelector('.modal-dropdown-button-search');
  const button = event.target.closest('.dropdown-button');

  // Armazena a posição inicial do dropdown
  if (!button.dataset.initialLeft) {
    const buttonRect = button.getBoundingClientRect();
    button.dataset.initialLeft = `${window.scrollX + buttonRect.left}px`;
    button.dataset.initialTop = `${window.scrollY + buttonRect.bottom}px`;
  }

  // Fecha todos os outros dropdowns e alterna o estado do atual
  if (!dropdown.classList.contains('show')) {
    closeAllDropdowns(dropdownId);
    dropdown.classList.add('show');

    // Ajustes adicionais para modais
    if (searchInput) {
      Object.assign(dropdown.style, {
        position: 'fixed',
        left: button.dataset.initialLeft,
        top: button.dataset.initialTop,
        maxHeight: '250px',
        overflowY: 'auto'
      });
      searchInput.focus(); // Foca no input de busca quando o dropdown é aberto
    }
  } else {
    dropdown.classList.remove('show');
    if (searchInput) {
      Object.assign(dropdown.style, {
        maxHeight: null,
        position: null,
        top: null,
        left: null,
        overflowY: null
      });
    }
  }
}

// Listener para clicar fora dos dropdowns
document.addEventListener('click', function(event) {
  if (!event.target.closest('.dropdown-button') && !event.target.closest('.dropdown-content')) {
      closeAllDropdowns(null); // Fecha todos os dropdowns
  }
});

// Adiciona os listeners para cada grupo de checkboxes e manipulação de textos dos botões
addListenerAndUpdate('#dropdown-content-accounts .checkbox-account', updateButtonTextAccounts, filterTable);
addListenerAndUpdate('#dropdown-content-months .checkbox-month', updateButtonTextMonths, filterTable);
addListenerAndUpdate('#dropdown-content-banks .checkbox-bank', updateButtonTextBanks, filterBanks);
addListenerAndUpdate('#dropdown-content-transaction-type .transaction-type-checkbox', updateButtonTextTransactionType, filterTable);
addListenerAndUpdate('#dropdown-content-accounts-credit .general-ledger-checkbox', updateButtonTextAccountsCredit, null, true);
addListenerAndUpdate('#dropdown-content-accounts-debit .general-ledger-checkbox', updateButtonTextAccountsDebit, null, true);
addListenerAndUpdate('#dropdown-content-document-type-credit .document-type-checkbox', updateButtonTextDocumentTypeCredit, null, true);
addListenerAndUpdate('#dropdown-content-document-type-debit .document-type-checkbox', updateButtonTextDocumentTypeDebit, null, true);
addListenerAndUpdate('#dropdown-content-department-credit .department-checkbox', updateButtonTextDepartmentCredit, null, false);
addListenerAndUpdate('#dropdown-content-department-debit .department-checkbox', updateButtonTextDepartmentDebit, null, false);
addListenerAndUpdate('#dropdown-content-project-credit .project-checkbox', updateButtonTextProjectCredit, null, true);
addListenerAndUpdate('#dropdown-content-project-debit .project-checkbox', updateButtonTextProjectDebit, null, true);
addListenerAndUpdate('#dropdown-content-inventory-credit .inventory-checkbox', updateButtonTextInventoryCredit, null, true);
addListenerAndUpdate('#dropdown-content-inventory-debit .inventory-checkbox', updateButtonTextInventoryDebit, null, true);
addListenerAndUpdate('#dropdown-content-entity-credit .entity-checkbox', updateButtonTextEntityCredit, null, true);
addListenerAndUpdate('#dropdown-content-entity-debit .entity-checkbox', updateButtonTextEntityDebit, null, true);

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
      filterBanks();
      break;
    case '#dropdown-content-transaction-type':
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

// Chamadas específicas para cada dropdown
function updateButtonTextAccounts() {
  updateButtonText('dropdown-button-accounts', '#dropdown-content-accounts .checkbox-account', 'Selecione');
}

function updateButtonTextMonths() {
  updateButtonText('dropdown-button-months', '#dropdown-content-months .checkbox-month', 'Selecione');
}

function updateButtonTextBanks() {
  updateButtonText('dropdown-button-banks', '#dropdown-content-banks .checkbox-bank', 'Selecione');
}

// Chamadas para department
function updateButtonTextDepartmentCredit() {
  updateButtonText('dropdown-button-department-credit', '#dropdown-content-department-credit .department-checkbox', 'Selecione');
}

function updateButtonTextDepartmentDebit() {
  updateButtonText('dropdown-button-department-debit', '#dropdown-content-department-debit .department-checkbox', 'Selecione');
}

// Chamadas para transaction type
function updateButtonTextTransactionType() {
  const checkboxes = document.querySelectorAll('#dropdown-content-transaction-type .transaction-type-checkbox');
  const selectedCheckboxes = document.querySelectorAll('#dropdown-content-transaction-type .transaction-type-checkbox:checked');
  const selectedCount = selectedCheckboxes.length;
  const totalOptions = checkboxes.length;
  let buttonText = "Crédito, Débito";
  if (selectedCount > 0 && selectedCount < totalOptions) {
    buttonText = Array.from(selectedCheckboxes).map(cb => cb.nextSibling.textContent.trim()).join(", ");
  }
  document.getElementById('dropdown-button-transaction-type').textContent = buttonText;
}

// Chamadas para account
function updateButtonTextAccountsCredit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-accounts-credit .general-ledger-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-accounts-credit').textContent = selectedText;
}

function updateButtonTextAccountsDebit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-accounts-debit .general-ledger-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-accounts-debit').textContent = selectedText;
}

// Chamadas para document type
function updateButtonTextDocumentTypeCredit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-document-type-credit .document-type-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-document-type-credit').textContent = selectedText;
}

function updateButtonTextDocumentTypeDebit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-document-type-debit .document-type-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-document-type-debit').textContent = selectedText;
}

// Chamadas para project
function updateButtonTextProjectCredit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-project-credit .project-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-project-credit').textContent = selectedText;
}

function updateButtonTextProjectDebit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-project-debit .project-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-project-debit').textContent = selectedText;
}

// Chamadas para entity
function updateButtonTextEntityCredit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-entity-credit .entity-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-entity-credit').textContent = selectedText;
}

function updateButtonTextEntityDebit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-entity-debit .entity-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-entity-debit').textContent = selectedText;
}

// Chamadas para inventory
function updateButtonTextInventoryCredit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-inventory-credit .inventory-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-inventory-credit').textContent = selectedText;
}

function updateButtonTextInventoryDebit() {
  const selectedCheckbox = document.querySelector('#dropdown-content-inventory-debit .inventory-checkbox:checked');
  const selectedText = selectedCheckbox ? selectedCheckbox.nextSibling.textContent.trim() : "Selecione";
  document.getElementById('dropdown-button-inventory-debit').textContent = selectedText;
}

// Filtros
function filterTable() {
  const uuidsGeneralLedgerAccountFilter = Array.from(document.querySelectorAll('#dropdown-content-accounts .checkbox-account:checked')).map(checkbox => checkbox.value);
  const monthsIntervalFilter = Array.from(document.querySelectorAll('#dropdown-content-months .checkbox-month:checked')).map(checkbox => ({
    start: new Date(checkbox.getAttribute('data-start-of-month')),
    end: new Date(checkbox.getAttribute('data-end-of-month'))
  }));
  const transactionTypeFilter = Array.from(document.querySelectorAll('#dropdown-content-transaction-type .transaction-type-checkbox:checked'), cb => cb.value);

  // Verificações de seleção total ou nenhuma seleção simplificadas
  const selectAllMonths = monthsIntervalFilter.length === 0;
  const selectAllTransactionType = transactionTypeFilter.length === 0;

  // Obtenção dos filtros de texto e datas
  const descriptionFilter = document.getElementById("search-bar-box").value.toUpperCase();
  const tagsFilter = document.getElementById("search-tags-bar-box").value.toUpperCase();
  const startDateObj = document.getElementById("start-date").value ? new Date(document.getElementById("start-date").value) : null;
  const endDateObj = document.getElementById("end-date").value ? new Date(document.getElementById("end-date").value) : null;
  let visibleMonthsYears = new Set();

  document.querySelectorAll(".cash-flow-table__body .cash-flow-table__body--row").forEach(row => {
    const uuidGeneralLedgerAccount = row.getAttribute('data-uuid-general-ledger-account');
    const description = row.querySelector(".description-row").textContent.toUpperCase();
    const observationElement = row.querySelector(".observation-row").cloneNode(true);
    const tagsObj = observationElement.querySelector(".tag-row");
    if (tagsObj) observationElement.removeChild(tagsObj);
    const observation = observationElement.textContent.toUpperCase();
    const tags = tagsObj ? tagsObj.textContent.toUpperCase() : "";
    const dueDate = new Date(row.querySelector(".due-date-row").textContent.split('/').reverse().join('-'));
    const transactionType = row.getAttribute('data-transaction-type');

    // Centraliza a lógica de correspondência
    const generalLedgerAccountMatch = uuidsGeneralLedgerAccountFilter.length === 0 || uuidsGeneralLedgerAccountFilter.includes(uuidGeneralLedgerAccount);
    const descriptionObservationMatch = descriptionFilter === "" || description.includes(descriptionFilter) || observation.includes(descriptionFilter);
    const tagMatch = tagsFilter === "" || tags.includes(tagsFilter);
    const monthMatch = selectAllMonths || monthsIntervalFilter.some(intervalo => dueDate >= intervalo.start && dueDate <= intervalo.end);
    const dataMatch = (!startDateObj || dueDate >= startDateObj) && (!endDateObj || dueDate <= endDateObj);
    const transactionTypeMatch = selectAllTransactionType || transactionTypeFilter.includes(transactionType);

    row.style.display = descriptionObservationMatch && tagMatch && monthMatch && transactionTypeMatch && dataMatch && generalLedgerAccountMatch ? "" : "none";

    if (row.style.display === "") {
      function toYearMonthString(date) {
        const year = date.getUTCFullYear().toString();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        return `${month}/${year}`;
      }
      
      let monthYear = toYearMonthString(dueDate);
      visibleMonthsYears.add(monthYear);
    }
  });

  // Simplificação na filtragem das rows de total do mês
  document.querySelectorAll(".cash-flow-table__body .month-totals-row").forEach(row => {
    let monthYearText = row.querySelector("td:nth-child(2)").textContent;
    let monthYearMatch = monthYearText.match(/\d{2}\/\d{4}$/);
    row.style.display = monthYearMatch && visibleMonthsYears.has(monthYearMatch[0]) ? "" : "none";
  });

  calculateAccumulatedBalance();
}

// Event listeners para os elementos de filtro
document.getElementById('search-bar-box').addEventListener('keyup', filterTable);
document.getElementById('search-tags-bar-box').addEventListener('keyup', filterTable);
document.getElementById('start-date').addEventListener('change', filterTable);
document.getElementById('end-date').addEventListener('change', filterTable);

// Calcula o saldo total dos bancos, sem filtragem
document.addEventListener("DOMContentLoaded", function() {
  updateTotalBanksBalance();
});

function updateTotalBanksBalance() {
  var bankRows = document.querySelectorAll(".banks-table__body--row");
  var totalBanksBalance = 0;

  bankRows.forEach(function(row) {
    var bankBalance = row.querySelector(".bank-balance-row");
    if (bankBalance) {
      var balance = parseSaldo(bankBalance.textContent);
      totalBanksBalance += balance;
    }
  });

  // Formata o saldo total como moeda
  var formatedBalance = formatAsCurrency(totalBanksBalance);

  // Atualiza o saldo total na interface do usuário
  var totalBanksBalanceRow = document.querySelector(".total-banks-balance");
  if (totalBanksBalanceRow) {
    totalBanksBalanceRow.textContent = formatedBalance;
  }

  // Atualiza o saldo total no campo de liquidação
  var totalSettlementBanksBalanceRow = document.querySelector(".total-banks-settlement-balance");
  if (totalSettlementBanksBalanceRow) {
    totalSettlementBanksBalanceRow.textContent = formatedBalance;
  }

  // Atualizar os saldos do fluxo de caixa com o novo saldo total
  updateCashFlowBalance(totalBanksBalance);
}

// Função para atualizar os saldos do fluxo de caixa
function updateCashFlowBalance(initialBalance) {
  var cashFlowRows = document.querySelectorAll(".cash-flow-table__body .cash-flow-table__body--row");
  var currentBalance = initialBalance;

  cashFlowRows.forEach(function(row) {
    var debitRow = row.querySelector(".debito-row");
    var creditRow = row.querySelector(".credito-row");
    var debit = debitRow && debitRow.textContent ? parseSaldo(debitRow.textContent) : 0;
    var credit = creditRow && creditRow.textContent ? parseSaldo(creditRow.textContent) : 0;
    
    currentBalance += credit - debit;
    
    var balanceRow = row.querySelector(".balance-row");
    if (balanceRow) {
      balanceRow.textContent = formatAsCurrency(currentBalance);
    }
    else {
      row.style.display = "none"; 
    }
  });
}

// Calcular o saldo total dos bancos que estão sendo filtrados
function filterBanks() {
  console.log
  var selectedBankCheckboxes = document.querySelectorAll('.dropdown-options .checkbox-bank:checked');
  var selectedBanks = Array.from(selectedBankCheckboxes).map(checkbox => checkbox.value);
  var selectedAllBanks = selectedBanks.length === 0 || selectedBanks.includes('Todos');

  var banksTable = document.getElementById("banks-table-wrapper").querySelector("tbody");
  var rows = banksTable.querySelectorAll(".banks-table__body--row");

  var totalBanksBalance = 0;

  rows.forEach(row => {
      var bankRowId = row.getAttribute("data-bank-id");
      
      if (selectedAllBanks || selectedBanks.includes(bankRowId)) {
          row.style.display = ""; // Mostra a linha
          var bankBalance = parseSaldo(row.querySelector(".bank-balance-row").textContent);
          totalBanksBalance += bankBalance;
      } else {
          row.style.display = "none"; // Esconde a linha
      }
  });

  var totalBanksBalanceRow = document.querySelector(".total-banks-balance");
  if (totalBanksBalanceRow) {
      totalBanksBalanceRow.textContent = formatAsCurrency(totalBanksBalance);
  }

  // Agora updateCashFlowBalance é chamada dentro do escopo de filterBanks
  // Remova ou comente esta linha se não deseja atualizar saldos de fluxo de caixa baseado na filtragem de bancos
updateCashFlowBalance(totalBanksBalance);
}

// Calcular saldo no fluxo de caixa
function calculateAccumulatedBalance() {
  // Obtem o saldo inicial total dos bancos.
  var totalBanksBalanceRow = document.querySelector(".total-banks-balance");
  var initialBalance = totalBanksBalanceRow ? parseSaldo(totalBanksBalanceRow.textContent) : 0;
  var currentBalance = initialBalance;
  
  // Seleciona todas as rows visíveis do fluxo de caixa.
  var cashFlowRows = document.querySelectorAll(".cash-flow-table__body .cash-flow-table__body--row");
  
  cashFlowRows.forEach(function(row) {
    if (row.style.display !== "none") {
      var debitRow = row.querySelector(".debito-row");
      var creditRow = row.querySelector(".credito-row");
      var debit = debitRow && debitRow.textContent ? parseSaldo(debitRow.textContent) : 0;
      var credit = creditRow && creditRow.textContent ? parseSaldo(creditRow.textContent) : 0;
      
      // Calcula o saldo atual baseado no saldo anterior, créditos e débitos.
      currentBalance += credit - debit;
      
      // Atualiza a célula de saldo da linha atual.
      var balanceRow = row.querySelector(".balance-row");
      if (balanceRow) {
        balanceRow.textContent = formatAsCurrency(currentBalance);
      }
    }
  });
}

function parseSaldo(balance) {
  var amount = balance.replace('R$', '').trim().replace(/\./g, '').replace(',', '.');
  return parseFloat(amount) || 0;
}

function formatAsCurrency(amount) {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.querySelectorAll('.total-balance-row').forEach(function(cell) {
  var balanceText = cell.textContent.replace(/\s/g, '');
  var monthlyBalance = parseFloat(balanceText.replace('.', '').replace(',', '.'));
    if (!isNaN(monthlyBalance) && monthlyBalance < 0) {
        cell.style.color = '#740000';
    }
    else {
      cell.style.color = '#000acf';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const rows = document.querySelectorAll('.cash-flow-table__body--row');
  if (rows.length === 0) {
    console.log("Nenhum dado para exibir. A página não irá carregar dados.");

    const emptyMessage = document.createElement('div');
    emptyMessage.textContent = 'Adicione seus lançamentos.';
    emptyMessage.classList.add('empty-message');
    document.querySelector('.cash-flow-table-wrapper').appendChild(emptyMessage);
    return;
  }
});

// FILTER FIELDS ######################################################################################################################
// FILTER FIELDS ######################################################################################################################


// Mobile Buttons
function toggleFilters() {
  var form = document.getElementById('form-filters');
  form.classList.toggle('show-filters');
}

function toggleBanks() {
  var form = document.getElementById('banks-table-wrapper');
  form.classList.toggle('show-filters');
}

function toggleNav() {
  var navBar = document.querySelector('.nav-bar');
  if (navBar.style.left === '0px') {
      navBar.style.left = '-100%';
  } else {
      navBar.style.left = '0px';
  }
}