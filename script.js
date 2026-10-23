const botaoTema = document.querySelector("#alterar-tema");
const pagina = document.documentElement;

function aplicarTema (tema){
const TemaClaroAtivo = tema === "claro";

pagina.dataset.tema = tema;

botaoTema.textContent = TemaClaroAtivo
? "Tema Escuro"
: "Tema Claro";

botaoTema.setAttribute("aria-pressed", String(TemaClaroAtivo));
}
function carregarTemaSalvo() {
  try {
    return localStorage.getItem("tema") ?? "escuro";
  } catch {
    return "escuro";
  }
}

aplicarTema(carregarTemaSalvo());

botaoTema.addEventListener("click", function () {
  const proximoTema = pagina.dataset.tema === "claro"
    ? "escuro"
    : "claro";

  aplicarTema(proximoTema);

  try {
    localStorage.setItem("tema", proximoTema);
  } catch {
    // O botão continua funcionando se o armazenamento estiver bloqueado.
  }
});

const botaoMenu = document.querySelector("#botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");
const telaPequena = window.matchMedia("(max-width: 600px)");

function definirMenuAberto(aberto) {
  menuPrincipal.classList.toggle("aberto", aberto);

  botaoMenu.setAttribute("aria-expanded", String(aberto));
  botaoMenu.textContent = aberto ? "Fechar menu" : "Abrir menu";
}

botaoMenu.addEventListener("click", function () {
  const estaAberto =
    botaoMenu.getAttribute("aria-expanded") === "true";

  definirMenuAberto(!estaAberto);
});

menuPrincipal.addEventListener("click", function (evento) {
  if (telaPequena.matches && evento.target.closest("a")) {
    definirMenuAberto(false);
    botaoMenu.focus();
  }
});

document.addEventListener("keydown", function (evento) {
  const estaAberto =
    botaoMenu.getAttribute("aria-expanded") === "true";

  if (evento.key === "Escape" && telaPequena.matches && estaAberto) {
    definirMenuAberto(false);
    botaoMenu.focus();
  }
});

telaPequena.addEventListener("change", function () {
  definirMenuAberto(false);
});

menuPrincipal.classList.add("menu-recolhivel");
botaoMenu.hidden = false;
