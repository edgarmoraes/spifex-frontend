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


document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('cashFlowChart').getContext('2d');
    var cashFlowData = JSON.parse(document.getElementById('cashFlowData').textContent);

    var labels = cashFlowData.map(function(entry) {
        var parts = entry.month.split('-'); // Divide a string de data "YYYY-MM-DD"
        // Ajusta o mês para a indexação baseada em zero do JavaScript
        var date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
    });

    var totals = cashFlowData.map(function(entry) {
        return parseFloat(entry.total);
    });

    var maxValue = Math.max.apply(null, totals);
    var suggestedMaxY = maxValue * 1.5;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Saldo por Mês',
                data: totals,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: suggestedMaxY // Usar o valor calculado
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
});