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