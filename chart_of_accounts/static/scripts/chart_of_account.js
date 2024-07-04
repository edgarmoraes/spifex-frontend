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
  

document.addEventListener("DOMContentLoaded", function() {
    var coll = document.querySelectorAll(".collapsible, .sub-collapsible");

    // Inicialmente, expande todos os .content e .sub-content
    document.querySelectorAll('.content, .sub-content').forEach(function(content) {
        // Remove a restrição de maxHeight para medir o conteúdo naturalmente
        content.style.maxHeight = "none";
        content.style.display = "block"; // Garante que o conteúdo esteja visível
    });

    coll.forEach(function(collItem) {
        // Marca inicialmente todos os collapsible como ativos
        collItem.classList.add("active");

        collItem.addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight !== "0px") {
                // Se estiver aberto, recolhe
                content.style.maxHeight = "0px";
            } else {
                // Expande
                content.style.maxHeight = content.scrollHeight + "px";
                if (this.classList.contains('sub-collapsible')) {
                    var parentContent = this.closest('.content');
                    if (parentContent) {
                        // Ajusta para acomodar o subconteúdo
                        var extraHeight = parentContent.scrollHeight + content.scrollHeight;
                        parentContent.style.maxHeight = extraHeight + "px";
                    }
                }
            }
        });
    });

    // Depois de inicializar, ajusta o maxHeight de todos .content e .sub-content para permitir animação
    document.querySelectorAll('.content, .sub-content').forEach(function(content) {
        content.style.maxHeight = content.scrollHeight + "px";
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.edit-account-btn').forEach(button => {
        button.addEventListener('click', function () {
            // Limpa qualquer dado antigo
            localStorage.clear();

            // Extrai os dados da conta a partir dos atributos data-*
            const accountData = {
                nature: button.dataset.nature,
                group: button.dataset.group,
                subgroup: button.dataset.subgroup,
                account: button.dataset.account,
                uuid: button.dataset.uuid
            };

            // Salva os dados da conta no localStorage
            localStorage.setItem('accountEditData', JSON.stringify(accountData));
        });
    });
});