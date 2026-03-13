document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  // Melhorado para detectar corretamente subpastas mesmo se o arquivo se chamar index.html
  const isRoot = !window.location.pathname.toLowerCase().includes('/produtos/') && 
                 !window.location.pathname.toLowerCase().includes('/sobre/') && 
                 !window.location.pathname.toLowerCase().includes('/contato/');

  const footerPath = isRoot 
    ? "src/commons/Footer/index.html" 
    : "../src/commons/Footer/index.html";

  fetch(`${footerPath}?v=${new Date().getTime()}`)
    .then((response) => response.text())
    .then((html) => {
      const rootPath = isRoot ? "" : "../";
      
      // Substitui o placeholder {{ROOT}} pelo caminho correto
      html = html.replaceAll('{{ROOT}}', rootPath);
      
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


