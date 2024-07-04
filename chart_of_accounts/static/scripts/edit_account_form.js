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
  

document.addEventListener('DOMContentLoaded', async function() {
    const groupSelect = document.getElementById('group');
    const subgroupSelect = document.getElementById('subgroup');
    const accountInput = document.getElementById('account');
    const getGroupsUrl = '/configuracoes/plano_de_contas/get-groups/';
    const getSubgroupsUrl = '/configuracoes/plano_de_contas/get-subgroups/';
    const accountData = JSON.parse(localStorage.getItem('accountEditData') || '{}');

    async function loadGroupsAndSelect() {
        const response = await fetch(getGroupsUrl);
        const groups = await response.json();
        groupSelect.innerHTML = '<option value="" disabled>Selecione um grupo</option>';
        groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.name;
            option.text = group.name;
            option.dataset.nature = group.nature;
            if (accountData.group === group.name) {
                option.selected = true;
            }
            groupSelect.appendChild(option);
        });
        // Se um grupo já está selecionado, carregue os subgrupos correspondentes
        if (accountData.group) {
            loadSubgroups(accountData.group, groupSelect.querySelector('option:checked').dataset.nature, accountData.subgroup);
        }
    }

    async function loadSubgroups(group, nature, selectedSubgroup = '') {
        const url = `${getSubgroupsUrl}?group=${encodeURIComponent(group)}&nature=${encodeURIComponent(nature)}`;
        const response = await fetch(url);
        const subgroups = await response.json();
        subgroupSelect.innerHTML = '<option value="" disabled>Selecione um subgrupo</option>';
        subgroups.forEach(subgroup => {
            const option = document.createElement('option');
            option.value = subgroup;
            option.text = subgroup;
            if (subgroup === selectedSubgroup) {
                option.selected = true;
            }
            subgroupSelect.appendChild(option);
        });
        subgroupSelect.disabled = false;
    }

    groupSelect.addEventListener('change', () => {
        const selectedGroup = groupSelect.value;
        const nature = groupSelect.options[groupSelect.selectedIndex].dataset.nature;
        loadSubgroups(selectedGroup, nature);
    });

    if (accountData.account) {
        accountInput.value = accountData.account;
    }

    // Carrega os grupos e, se necessário, os subgrupos e a conta
    await loadGroupsAndSelect();

    // Adicione um ouvinte para o evento de submissão do formulário
    document.querySelector('form').addEventListener('submit', function() {
        // Aqui, você remove os dados do localStorage, pois eles não são mais necessários
        localStorage.removeItem('accountEditData');
    });
});