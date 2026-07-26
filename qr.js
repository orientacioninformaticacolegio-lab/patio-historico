const DATA_URL = "data/arboles.json";
const QR_SERVICE_URL = "https://api.qrserver.com/v1/create-qr-code/";

const form = document.querySelector("#qr-form");
const baseUrlInput = document.querySelector("#base-url");
const urlHelp = document.querySelector("#url-help");
const grid = document.querySelector("#qr-grid");
const printButton = document.querySelector("#print-button");

let especies = [];

function detectedBaseUrl() {
    const current = new URL(window.location.href);
    current.hash = "";
    current.search = "";
    current.pathname = current.pathname.replace(/\/[^/]*$/, "/");
    return current.href;
}

function normalizeBaseUrl(value) {
    const normalized = new URL(value);
    normalized.hash = "";
    normalized.search = "";

    if (!normalized.pathname.endsWith("/")) {
        normalized.pathname += "/";
    }

    return normalized.href;
}

function buildSpeciesUrl(baseUrl, id) {
    const target = new URL("arbol.html", baseUrl);
    target.searchParams.set("id", id);
    return target.href;
}

function buildQrImageUrl(targetUrl) {
    const service = new URL(QR_SERVICE_URL);
    service.searchParams.set("size", "600x600");
    service.searchParams.set("margin", "20");
    service.searchParams.set("ecc", "M");
    service.searchParams.set("data", targetUrl);
    return service.href;
}

function createQrCard(especie, baseUrl) {
    const targetUrl = buildSpeciesUrl(baseUrl, especie.id);
    const article = document.createElement("article");
    article.className = "qr-card";

    const image = document.createElement("img");
    image.className = "qr-image";
    image.src = buildQrImageUrl(targetUrl);
    image.alt = `Código QR de ${especie.nombre}`;
    image.width = 600;
    image.height = 600;

    const name = document.createElement("div");
    name.className = "qr-name";
    name.textContent = especie.nombre;

    const url = document.createElement("div");
    url.className = "qr-url";
    url.textContent = targetUrl;

    article.append(image, name, url);
    return article;
}

function renderQrCodes(baseUrl) {
    grid.replaceChildren();

    especies.forEach((especie) => {
        grid.append(createQrCard(especie, baseUrl));
    });

    urlHelp.textContent = `${especies.length} códigos preparados. Cada QR se imprime a 4 × 4 cm.`;
}

function updateFromInput() {
    try {
        const baseUrl = normalizeBaseUrl(baseUrlInput.value);
        baseUrlInput.value = baseUrl;
        renderQrCodes(baseUrl);
    } catch (error) {
        urlHelp.textContent = "Ingresá una dirección web válida, incluyendo https://";
    }
}

async function init() {
    baseUrlInput.value = detectedBaseUrl();

    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error(`No se pudo leer ${DATA_URL}`);
        }

        especies = await response.json();
        updateFromInput();
    } catch (error) {
        grid.innerHTML = `
            <p class="error">
                No se pudo cargar la lista de especies. Abrí esta herramienta desde el sitio publicado
                o mediante un servidor local, no directamente como archivo.
            </p>
        `;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateFromInput();
});

printButton.addEventListener("click", () => {
    window.print();
});

init();
