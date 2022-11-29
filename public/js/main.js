const filtro = document.querySelector(".filtro");
const links = document.querySelectorAll(".link-filtro");
const textFiltro = document.getElementById("text-filter");

filtro.addEventListener("click", () => {
    filtro.classList.toggle("ativo")
})