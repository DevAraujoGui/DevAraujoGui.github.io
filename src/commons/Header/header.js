document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.querySelector(".site-header-container");
  if (!headerContainer) return;

  fetch("../../commons/Header/header.html")
    .then((response) => response.text())
    .then((html) => {
      headerContainer.innerHTML = html;
    })
    .catch((error) => {
      console.error("Erro ao carregar o header:", error);
    });
});


