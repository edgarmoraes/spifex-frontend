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
  

document.addEventListener('DOMContentLoaded', function () {
    const groupSelect = document.getElementById('group');
    const subgroupSelect = document.getElementById('subgroup');
    
    // Assumindo que as URLs estão definidas globalmente ou diretamente no script
    const getGroupsUrl = '/configuracoes/plano_de_contas/get-groups/';
    const getSubgroupsUrl = '/configuracoes/plano_de_contas/get-subgroups/';

    function fetchAndFillGroups() {
        fetch(getGroupsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(groups => {
                groupSelect.innerHTML = '<option value="" disabled selected>Selecione um grupo</option>';
                groups.forEach(group => {
                    const optionElement = document.createElement('option');
                    optionElement.value = group.name;
                    optionElement.dataset.nature = group.nature; // Armazenando a natureza como um data attribute
                    optionElement.text = group.name;
                    groupSelect.appendChild(optionElement);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar grupos:', error);
            });
    }

    function fetchAndFillSubgroups(selectedGroup, nature) {
        fetch(`${getSubgroupsUrl}?group=${encodeURIComponent(selectedGroup)}&nature=${encodeURIComponent(nature)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(subgroups => {
                subgroupSelect.innerHTML = '<option value="" disabled selected>Selecione um subgrupo</option>';
                subgroups.forEach(subgroup => {
                    const optionElement = document.createElement('option');
                    optionElement.value = subgroup;
                    optionElement.text = subgroup;
                    subgroupSelect.appendChild(optionElement);
                });
                subgroupSelect.disabled = false; // Habilitando o select de subgrupos
            })
            .catch(error => {
                console.error('Erro ao buscar subgrupos:', error);
                subgroupSelect.disabled = true; // Desabilita o select se houver um erro
            });
    }

    groupSelect.addEventListener('change', function () {
        const selectedOption = this.options[this.selectedIndex];
        const selectedGroup = selectedOption.value;
        const nature = selectedOption.dataset.nature; // Recuperando a natureza do data attribute
        
        // Limpa subgrupos ao mudar de grupo
        subgroupSelect.innerHTML = '<option value="" disabled selected>Selecione um subgrupo</option>';
        subgroupSelect.disabled = true; // Desabilita até que os subgrupos sejam carregados
        
        fetchAndFillSubgroups(selectedGroup, nature);
    });

    // Carrega os grupos ao inicializar
    fetchAndFillGroups();
});