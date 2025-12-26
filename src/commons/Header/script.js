document.addEventListener("DOMContentLoaded", function () {
  // Forçar o scroll para o topo ao recarregar
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

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

  // Tenta carregar o header de dois caminhos possíveis (raiz ou subpasta)
  // Melhorado para detectar corretamente subpastas mesmo se o arquivo se chamar index.html
  const isRoot = !window.location.pathname.includes('/src/pages/');
  
  const headerPath = isRoot 
    ? "src/commons/Header/index.html" 
    : "../../commons/Header/index.html";

  fetch(headerPath)
    .then((response) => response.text())
    .then((html) => {
      // Se estivermos na raiz, precisamos ajustar os caminhos internos do index.html (header)
      if (isRoot) {
        html = html.replace(/src="\.\.\/\.\.\//g, 'src="src/');
        html = html.replace(/href="\.\.\/\.\.\/\.\.\/index\.html"/g, 'href="index.html"');
        html = html.replace(/href="\.\.\//g, 'href="src/pages/');
      }
      
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

      // Lógica do Menu Mobile
      const mobileMenuToggle = headerContainer.querySelector('.mobile-menu-toggle');
      const mainNav = headerContainer.querySelector('.main-nav');
      
      if (mobileMenuToggle && mainNav) {
        const toggleMenu = () => {
          const isActive = mobileMenuToggle.classList.toggle('active');
          mainNav.classList.toggle('active');
          header.classList.toggle('menu-active', isActive);
          document.body.style.overflow = isActive ? 'hidden' : '';

          // Scroll automático para baixo apenas no modo mobile ao abrir o menu
          if (isActive && window.innerWidth <= 768) {
            setTimeout(() => {
              window.scrollBy({
                top: 200, // Scrolla 50px para baixo
                behavior: 'smooth'
              });
            }, 500); // Espera 0.5s conforme pedido
          }
        };

        mobileMenuToggle.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em um link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            header.classList.remove('menu-active');
            document.body.style.overflow = '';
          });
        });

        // Fechar menu ao clicar no overlay
        mainNav.addEventListener('click', (e) => {
          if (e.target === mainNav || e.target.classList.contains('main-nav')) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            header.classList.remove('menu-active');
            document.body.style.overflow = '';
          }
        });

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            header.classList.remove('menu-active');
            document.body.style.overflow = '';
          }
        });
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar o header:", error);
    });
});


