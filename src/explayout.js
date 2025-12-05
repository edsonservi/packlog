// CONSTANTES
var bloco = null;
var andar = null;
var apartamento = null;

// FUNÇÕES AUXILIARES UTILITÁRIAS

// Função para capitalizar uma string
function primeiraLetra(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// Função para limpar um elemento
function limparDiv(el) {
  if (el && el instanceof HTMLElement) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
}

// FUNÇÕES DE LAYOUT

// Renderizar a NAVBAR
function renderNav(page) {
  const target = document.getElementById("nav");
  const links = [
    "prateleira",
    "sistema",
    "comparar",
    "importar",
    "experimental",
  ];

  const nav = document.createElement("nav");
  nav.classList.add(
    "navbar",
    "navbar-expand-lg",
    "border-bottom",
    "border-3",
    "border-success"
  );

  const container = document.createElement("div");
  container.classList.add("container-fluid");

  const brand = document.createElement("a");
  brand.classList.add("navbar-brand");
  brand.href = "index.html";
  brand.textContent = "Encomendas";

  const button = document.createElement("button");
  button.classList.add("navbar-toggler");
  button.type = "button";
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", "#navbarNavAltMarkup");
  button.setAttribute("aria-controls", "navbarNavAltMarkup");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Toggle navigation");

  const span = document.createElement("span");
  span.classList.add("navbar-toggler-icon");
  button.appendChild(span);

  const collapse = document.createElement("div");
  collapse.classList.add("collapse", "navbar-collapse");
  collapse.id = "navbarNavAltMarkup";

  const navDiv = document.createElement("div");
  navDiv.classList.add("navbar-nav");

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = `${link}.html`;
    a.textContent = primeiraLetra(link);

    if (link === page) {
      a.classList.add(
        "nav-link",
        "active",
        "border-bottom",
        "border-success",
        "border-1"
      );
      a.setAttribute("aria-current", "page");
    } else {
      a.classList.add("nav-link");
    }

    navDiv.appendChild(a);
  });

  collapse.appendChild(navDiv);
  container.appendChild(brand);
  container.appendChild(button);
  container.appendChild(collapse);
  nav.appendChild(container);

  target.appendChild(nav);
}

// Renderizar o rodapé
function renderFooter() {
  const footer = document.getElementById("footer");
  const footerEl = document.createElement("footer");
  footerEl.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "py-3",
    "my-4",
    "border-top"
  );
  const span = document.createElement("span");
  span.classList.add("text-body-secondary");
  span.textContent = "Desenvolvedor: Edson Silva";
  footerEl.appendChild(span);
  footer.appendChild(footerEl);
}

// FUNÇÕES DE RENDERIZAÇÕES

/**
 * Cria e retorna um botão configurado para executar uma ação ao ser clicado.
 * @param {string|number} idButton - Identificador ou texto exibido no botão.
 * @param {Function} action - Função que será chamada quando o botão for clicado.
 *                            Deve aceitar o idButton como parâmetro.
 * @returns {HTMLButtonElement} - Elemento <button> pronto para ser inserido no DOM.
 *
 * @example
 * // Exemplo de uso:
 * const myAction = (id) => alert(`Botão ${id} clicado!`);
 * document.body.appendChild(renderPadButton(1, myAction));
 */
function renderPadButton(idButton, action) {
  const addButton = document.createElement("button");

  // Define atributos básicos do botão
  addButton.type = "button";
  addButton.textContent = String(idButton); // garante que seja string
  addButton.classList.add("btn", "btn-success", "btn-lg");

  // Define ação de clique corretamente
  addButton.onclick = () => cadastrar(idButton, action);

  return addButton;
}

/**
 * Renderiza um teclado numérico dinâmico dentro da div #teclado.
 * O número de botões depende do tipo de controle informado.
 *
 * @param {string} controle - Tipo de controle ("bloco", "andar", "apartamento").
 */
function renderTeclado(controle) {
  const container = document.getElementById("teclado");
  // Limpa o container antes de renderizar novos botões
  limparDiv(container);

  // Configuração de quantidade de botões por controle
  const config = {
    bloco: 5,
    andar: 8,
    apartamento: 10,
  };

  // Define quantidade de botões com base no controle
  const qtNumeros = config[controle] || config.bloco;

  // Cria e adiciona os botões dinamicamente
  for (let i = 1; i <= qtNumeros; i++) {
    const botao = renderPadButton(i, controle);
    container.appendChild(botao);
  }
  renderDisplay();
}

/*
FUNÇÕES DE MANIPULAÇÃO
*/

function cadastrar(numero, destino) {
  if (destino === "apartamento") {
    apartamento = numero;
  } else if (destino === "andar") {
    andar = numero;
  } else if (destino === "bloco") {
    bloco = numero;
  }
  renderizarCondicional();
  console.log(`Bloco: ${bloco}, Andar: ${andar}, Apartamento: ${apartamento}`);
}

function renderizarCondicional() {
  if (bloco === null) {
    renderTeclado("bloco");
    renderTitulo(`Escolha o Bloco`);
  } else {
    if (andar === null) {
      renderTeclado("andar");
      renderTitulo(`Escolha o Andar`);
      renderDisplay();
    } else if (apartamento === null) {
      renderTeclado("apartamento");
      renderTitulo(`Escolha o Apartamento`);
      renderDisplay();
    } else {
      renderTitulo(`Deseja Cadastrar`);
      renderDisplay();
      limparDiv(document.getElementById("teclado"));
    }
  }
}

function renderTitulo(texto) {
  const titulo = document.getElementById("titulo");
  limparDiv(titulo);
  titulo.innerText = texto;
}

/**
 * Renderiza no display o código do endereço (bloco, andar, apartamento).
 * Mostra placeholders "_" quando informações ainda não foram preenchidas.
 */
function renderDisplay() {
  const display = document.getElementById("display");
  limparDiv(display);
  let texto = "____"; // valor padrão
  if (bloco !== null) {
    // Se temos bloco mas não andar/apartamento
    texto = `${bloco}___`;
    if (andar !== null) {
      // Se temos bloco + andar mas não apartamento
      texto = `${bloco}${andar}__`;
      if (apartamento !== null) {
        texto =
          apartamento < 10
            ? `${bloco}${andar}0${apartamento}`
            : `${bloco}${andar}${apartamento}`;
      }
    }
  }
  display.innerText = texto;
}

function limparCadastro() {
  bloco = null;
  andar = null;
  apartamento = null;
  renderizarCondicional();
}

/*
FUNÇÕES TEMPORARIAS
*/
function escrever(texto, destino) {
  console.log(`${primeiraLetra(destino)}: ${texto}`);
}
