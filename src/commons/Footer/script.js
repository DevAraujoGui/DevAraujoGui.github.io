document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const isRoot = window.location.pathname === '/' || 
                 window.location.pathname.endsWith('/index.html') || 
                 window.location.pathname.endsWith('/') && !window.location.pathname.includes('/src/');

  const footerPath = isRoot 
    ? "src/commons/Footer/index.html" 
    : "../../commons/Footer/index.html";

  fetch(footerPath)
    .then((response) => response.text())
    .then((html) => {
      // Ajuste de caminhos se estiver na raiz
      if (isRoot) {
        html = html.replace(/src="\.\.\/\.\.\//g, 'src="src/');
      }
      footer.innerHTML = html;

      // Animação de entrada dos elementos do footer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100); // Cascata suave
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const animElements = footer.querySelectorAll('.footer-anim-left, .footer-anim-right');
      animElements.forEach(el => observer.observe(el));
    })
    .catch((error) => {
      console.error("Erro ao carregar o footer:", error);
    });
});


