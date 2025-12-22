document.addEventListener("DOMContentLoaded", function () {
  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  fetch("../../commons/Footer/footer.html")
    .then((response) => response.text())
    .then((html) => {
      footer.innerHTML = html;
    })
    .catch((error) => {
      console.error("Erro ao carregar o footer:", error);
    });
});


