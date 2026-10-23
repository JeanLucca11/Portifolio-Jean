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
