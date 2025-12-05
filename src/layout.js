function primeiraLetra(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderNav(page) {
  const target = document.getElementById("nav");
  const links = [
    "prateleira",
    "sistema",
    "comparar",
    "importar",
    "experimental",
  ];

  // Cria o elemento <nav>
  const nav = document.createElement("nav");
  nav.classList.add(
    "navbar",
    "navbar-expand-lg",
    "border-bottom",
    "border-3",
    "border-success"
  );

  // Container principal
  const container = document.createElement("div");
  container.classList.add("container-fluid");

  // Marca da navbar
  const brand = document.createElement("a");
  brand.classList.add("navbar-brand");
  brand.href = "index.html";
  brand.textContent = "Encomendas";

  // Botão de toggle
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

  // Div collapse
  const collapse = document.createElement("div");
  collapse.classList.add("collapse", "navbar-collapse");
  collapse.id = "navbarNavAltMarkup";

  // Container dos links
  const navDiv = document.createElement("div");
  navDiv.classList.add("navbar-nav");

  // Cria os links dinamicamente
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

  // Monta a estrutura
  collapse.appendChild(navDiv);
  container.appendChild(brand);
  container.appendChild(button);
  container.appendChild(collapse);
  nav.appendChild(container);

  // Adiciona ao destino
  target.appendChild(nav);
}
