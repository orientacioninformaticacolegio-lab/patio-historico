const DATA_URL = 'data/arboles.json';

function hasDocumentedHistory(tree) {
    return Boolean(tree.historia && tree.historia.trim());
}

function getTypeClass(tree) {
    return tree.tipo.startsWith('Exótica') ? 'exotica' : '';
}

function createTreeCard(tree) {
    return `
        <article class="card">
            <a href="arbol.html?id=${tree.id}" aria-label="Ver ficha de ${tree.nombre}">
                <div class="card-media">
                    <img src="${tree.fotos[0]}" alt="${tree.nombre}" loading="lazy">
                </div>
            </a>

            <div class="card-body">
                <span class="tag ${getTypeClass(tree)}">${tree.tipo}</span>
                <h3>${tree.nombre}</h3>
                <div class="latin">${tree.cientifico}</div>
                <p>${tree.informacionPrincipal}</p>
                <a class="card-link" href="arbol.html?id=${tree.id}">Abrir ficha →</a>
            </div>
        </article>
    `;
}

async function loadTrees() {
    const response = await fetch(DATA_URL);

    if (!response.ok) {
        throw new Error(`No se pudo cargar ${DATA_URL}.`);
    }

    return response.json();
}

async function initIndex() {
    const grid = document.querySelector('#grid');

    if (!grid) {
        return;
    }

    const trees = await loadTrees();
    let currentFilter = 'Todos';

    function render() {
        const filteredTrees = trees.filter((tree) => {
            return currentFilter === 'Todos'
                || (currentFilter === 'Nativa' && tree.tipo.startsWith('Nativa'))
                || (currentFilter === 'Exótica' && tree.tipo.startsWith('Exótica'))
                || (currentFilter === 'historia' && hasDocumentedHistory(tree));
        });

        grid.innerHTML = filteredTrees.map(createTreeCard).join('');
    }

    document.querySelectorAll('.filter').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            render();
        });
    });

    render();
}

function createFact(label, value, extraClass = '') {
    if (!value) {
        return '';
    }

    return `
        <div class="fact ${extraClass}">
            <small>${label}</small>
            <strong>${value}</strong>
        </div>
    `;
}

function createGallery(tree) {
    return tree.fotos.map((photo, index) => `
        <img src="${photo}" alt="${tree.nombre}, imagen ${index + 1}" loading="lazy">
    `).join('');
}

function createInformationSection(title, text) {
    if (!text) {
        return '';
    }

    return `
        <section class="information-block">
            <h2>${title}</h2>
            <p>${text}</p>
        </section>
    `;
}

function createHistoryBox(tree) {
    if (!hasDocumentedHistory(tree)) {
        return '';
    }

    return `
        <div class="history-box">
            <span class="eyebrow eyebrow-accent">Historia en el Colegio</span>
            <p>${tree.historia}</p>
        </div>
    `;
}

function createTreeDetail(tree) {
    return `
        <section class="detail-hero" style="background-image: url('${tree.fotos[0]}')">
            <div class="wrap">
                <span class="tag ${getTypeClass(tree)}">${tree.tipo}</span>
                <h1>${tree.nombre}</h1>
                <div class="latin">${tree.cientifico}</div>
            </div>
        </section>

        <div class="wrap">
            <a class="back" href="index.html#especies">← Volver a todas las especies</a>

            <section class="detail-content">
                <aside>
                    <div class="fact-grid">
                        ${createFact('Origen', tree.origen)}
                        ${createFact('Altura', tree.altura)}
                        ${createFact('Follaje', tree.follaje)}
                        ${createFact('Floración', tree.floracion)}
                        ${createFact('Familia', tree.familia, 'fact-wide')}
                    </div>
                </aside>

                <article class="detail-copy">
                    <p class="lead-text">${tree.informacionPrincipal}</p>
                    ${createHistoryBox(tree)}
                    ${createInformationSection('Características del ejemplar', tree.descripcion)}
                    ${createInformationSection('Flores y frutos', tree.floresYFrutos)}
                    ${createInformationSection('Usos y valor', tree.usos)}
                    ${createInformationSection('Conservación', tree.conservacion)}
                    ${createInformationSection('Observaciones', tree.observacion)}
                    ${createInformationSection('Para conocer un poco más', tree.curiosidad)}
                </article>
            </section>

            <section class="section gallery-section">
                <div class="section-head">
                    <div>
                        <span class="eyebrow eyebrow-accent">Detalles botánicos</span>
                        <h2>Galería</h2>
                    </div>
                </div>

                <div class="gallery">${createGallery(tree)}</div>
            </section>
        </div>
    `;
}

async function initDetail() {
    const main = document.querySelector('#detail');

    if (!main) {
        return;
    }

    const id = new URLSearchParams(window.location.search).get('id');
    const trees = await loadTrees();
    const tree = trees.find((item) => item.id === id) || trees[0];

    document.title = `${tree.nombre} · Patio Histórico`;
    main.innerHTML = createTreeDetail(tree);
}

initIndex().catch(console.error);
initDetail().catch(console.error);
