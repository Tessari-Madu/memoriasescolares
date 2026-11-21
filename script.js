
document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // 1. ABAS DO BLOG
    // =================================

    const tabButtons = document.querySelectorAll(".tab-button");
    const pages = document.querySelectorAll("[data-page]");

    function showTab(tabName) {
        pages.forEach((page) => {
            page.hidden = page.dataset.page !== tabName;
        });

        tabButtons.forEach((button) => {
            const isActive = button.dataset.tab === tabName;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showTab(button.dataset.tab);
        });
    });

    // Botões da barra lateral e da página inicial
    const openTabButtons = document.querySelectorAll("[data-open-tab]");

    openTabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showTab(button.dataset.openTab);
        });
    });

    // Começa na página inicial
    showTab("inicio");


    // =================================
    // 2. ABRIR E FECHAR AS MEMÓRIAS
    // =================================

    const memoryButtons = document.querySelectorAll(".memory-toggle");

    memoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const details = button.nextElementSibling;

            if (!details) return;

            const isOpening = details.hidden;

            details.hidden = !isOpening;

            button.textContent = isOpening
                ? "Fechar lembrança −"
                : "Abrir lembrança +";

            button.setAttribute("aria-expanded", String(isOpening));
        });
    });


    // =================================
    // 3. REDAÇÕES
    // =================================

    // Você pode editar os títulos, temas e textos abaixo.
    // Para adicionar outra redação, copie um dos objetos
    // e coloque uma vírgula entre eles.

    const essays = [
        {
            title: "A importância da educação",
            theme: "Educação e sociedade",
            text: `A educação é uma ferramenta essencial para a formação dos indivíduos e para o desenvolvimento da sociedade.

Ela permite que as pessoas tenham acesso ao conhecimento, desenvolvam o pensamento crítico e compreendam melhor o mundo ao seu redor.

Entretanto, ainda existem desafios relacionados ao acesso e à qualidade do ensino. Por isso, é importante valorizar a escola e garantir oportunidades de aprendizagem para todos.

A educação transforma vidas e contribui para a construção de uma sociedade mais justa.`
        },
        {
            title: "Saúde pública no Brasil",
            theme: "Saúde e cidadania",
            text: `A saúde é um direito de todos e um dever do Estado, conforme estabelecido pela Constituição Federal de 1988.

Nesse contexto, o Sistema Único de Saúde desempenha um papel fundamental ao oferecer atendimento gratuito à população.

Apesar de sua importância, o sistema ainda enfrenta dificuldades, como a falta de profissionais e a demora em determinados atendimentos.

Assim, é necessário fortalecer os serviços públicos de saúde e garantir que esse direito seja respeitado.`
        },
        {
            title: "A estética como imperativo",
            theme: "A estética como imperativo: riscos e implicações do uso indiscriminado de canetas emagrecedoras",
            text: `A tecnologia está cada vez mais presente na sociedade e também transformou a maneira como as pessoas aprendem.

Na educação, ferramentas digitais podem facilitar o acesso à informação e tornar as aulas mais dinâmicas.

No entanto, a desigualdade no acesso à internet e aos equipamentos ainda representa um obstáculo para muitos estudantes.

Dessa forma, é importante ampliar o acesso à tecnologia e utilizá-la de maneira consciente no ambiente escolar.`
        },
        {
            title: "A preservação do meio ambiente",
            theme: "Meio ambiente",
            text: `A preservação ambiental é fundamental para garantir a qualidade de vida das gerações atuais e futuras.

Entretanto, problemas como o desmatamento, a poluição e o descarte incorreto de resíduos demonstram a necessidade de mudanças nos hábitos da sociedade.

Nesse sentido, a educação ambiental e a participação do poder público são importantes para incentivar atitudes sustentáveis.

Cuidar do meio ambiente é uma responsabilidade coletiva.`
        },
        {
            title: "O valor da leitura",
            theme: "Cultura e educação",
            text: `A leitura contribui para o desenvolvimento intelectual, amplia o vocabulário e permite conhecer diferentes realidades.

Por meio dos livros, os leitores podem entrar em contato com novas ideias, culturas e formas de compreender o mundo.

Apesar disso, nem todos possuem acesso facilitado aos livros e aos espaços de leitura.

Por isso, incentivar projetos de leitura e ampliar o acesso às bibliotecas são medidas importantes para aproximar a população da literatura.`
        },
        {
            title: "A importância da ciência",
            theme: "Pesquisa e inovação",
            text: `A ciência está presente em diferentes aspectos da vida cotidiana e contribui para o desenvolvimento da sociedade.

Por meio da pesquisa científica, são desenvolvidas soluções para problemas relacionados à saúde, à educação, à tecnologia e ao meio ambiente.

Entretanto, a falta de investimento e a desvalorização dos pesquisadores podem dificultar o avanço de novas descobertas.

Dessa forma, incentivar a pesquisa é essencial para construir um futuro com mais conhecimento e oportunidades.`
        }
    ];

    const essayGrid = document.getElementById("essay-grid");
    const essaySearch = document.getElementById("essay-search");
    const essayCount = document.getElementById("essay-count");

    const essayModal = document.getElementById("essay-modal");
    const modalClose = document.getElementById("modal-close");

    const modalNumber = document.getElementById("modal-number");
    const modalTitle = document.getElementById("modal-title");
    const modalTheme = document.getElementById("modal-theme");
    const modalText = document.getElementById("modal-text");


    function openEssay(essay, index) {
        modalNumber.textContent = `REDAÇÃO Nº ${String(index + 1).padStart(2, "0")}`;
        modalTitle.textContent = essay.title;
        modalTheme.textContent = `Tema: ${essay.theme}`;
        modalText.textContent = essay.text;

        essayModal.showModal();
    }


    function renderEssays(list) {
        essayGrid.innerHTML = "";

        essayCount.textContent =
            `${list.length} ${list.length === 1 ? "redação encontrada" : "redações encontradas"}`;

        if (list.length === 0) {
            const message = document.createElement("p");

            message.className = "no-essays";
            message.textContent = "Nenhuma redação encontrada. Tente outra palavra! ♡";

            essayGrid.appendChild(message);
            return;
        }

        list.forEach((essay) => {
            const originalIndex = essays.indexOf(essay);

            const card = document.createElement("article");
            card.className = "essay-card";

            const number = document.createElement("span");
            number.className = "essay-number";
            number.textContent =
                `ARQUIVO Nº ${String(originalIndex + 1).padStart(2, "0")}`;

            const title = document.createElement("h3");
            title.textContent = essay.title;

            const theme = document.createElement("p");
            theme.textContent = essay.theme;

            const button = document.createElement("button");
            button.type = "button";
            button.textContent = "Ler redação ♡";

            button.addEventListener("click", () => {
                openEssay(essay, originalIndex);
            });

            card.append(number, title, theme, button);
            essayGrid.appendChild(card);
        });
    }


    if (essaySearch) {
        essaySearch.addEventListener("input", () => {
            const searchText = essaySearch.value
                .trim()
                .toLowerCase();

            const filteredEssays = essays.filter((essay) => {
                return (
                    essay.title.toLowerCase().includes(searchText) ||
                    essay.theme.toLowerCase().includes(searchText) ||
                    essay.text.toLowerCase().includes(searchText)
                );
            });

            renderEssays(filteredEssays);
        });
    }


    if (modalClose) {
        modalClose.addEventListener("click", () => {
            essayModal.close();
        });
    }


    if (essayModal) {
        essayModal.addEventListener("click", (event) => {
            if (event.target === essayModal) {
                essayModal.close();
            }
        });
    }


    // Mostra as redações quando a página carrega
    renderEssays(essays);


    // =================================
    // 4. LIVRO DE RECADINHOS
    // =================================

    const guestbookForm = document.getElementById("guestbook-form");
    const guestbookPosts = document.getElementById("guestbook-posts");

    const STORAGE_KEY = "memoriasEscolaresRecados";


    function getMessages() {
        try {
            const savedMessages = localStorage.getItem(STORAGE_KEY);

            if (!savedMessages) return [];

            const parsedMessages = JSON.parse(savedMessages);

            return Array.isArray(parsedMessages)
                ? parsedMessages.filter((message) => {
                    return (
                        message &&
                        typeof message.name === "string" &&
                        typeof message.text === "string"
                    );
                })
                : [];

        } catch (error) {
            console.error("Erro ao carregar os recadinhos:", error);
            return [];
        }
    }


    function renderMessages() {
        const messages = getMessages();

        guestbookPosts.innerHTML = "";

        if (messages.length === 0) {
            const emptyMessage = document.createElement("p");

            emptyMessage.className = "empty-message";
            emptyMessage.textContent =
                "Seja a primeira pessoa a deixar um recadinho!";

            guestbookPosts.appendChild(emptyMessage);
            return;
        }

        messages.slice().reverse().forEach((message) => {
            const card = document.createElement("article");
            card.className = "guestbook-message";

            const name = document.createElement("strong");
            name.textContent = `${message.name} deixou um recadinho ♡`;

            const text = document.createElement("p");
            text.textContent = message.text;

            card.append(name, text);
            guestbookPosts.appendChild(card);
        });
    }


    if (guestbookForm && guestbookPosts) {

        guestbookForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = document.getElementById("visitor-name");
            const messageInput = document.getElementById("visitor-message");

            const name = nameInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !message) {
                alert("Preencha seu apelido e seu recadinho! ♡");
                return;
            }

            const messages = getMessages();

            messages.push({
                name: name,
                text: message
            });

            try {
                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(messages)
                );

                guestbookForm.reset();
                renderMessages();

            } catch (error) {
                alert(
                    "Não foi possível salvar o recadinho neste navegador."
                );

                console.error("Erro ao salvar recadinho:", error);
            }
        });

        // Recupera os recados já salvos
        renderMessages();
    }

});
