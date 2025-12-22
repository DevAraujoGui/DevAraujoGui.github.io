document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.querySelector(".site-header-container");
  
  // Lógica de transição de páginas
  function handlePageTransition(e) {
    const link = e.target.closest('a');
    if (!link) return;

    // Verificar se é um link interno e não é apenas um anchor (#)
    if (link.hostname === window.location.hostname && 
        link.pathname !== window.location.pathname &&
        !link.getAttribute('href').startsWith('#') &&
        link.target !== '_blank') {
      
      e.preventDefault();
      const href = link.href;

      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = href;
      }, 400); // Tempo deve corresponder ao CSS (0.4s)
    }
  }

  document.addEventListener('click', handlePageTransition);

  if (!headerContainer) return;

  fetch("../../commons/Header/header.html")
    .then((response) => response.text())
    .then((html) => {
      headerContainer.innerHTML = html;
      
      // Lógica de Header Sticky/Scrolled
      const header = headerContainer.querySelector('.site-header');
      if (header) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
          } else {
            header.classList.remove('header-scrolled');
          }
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar o header:", error);
    });
});


