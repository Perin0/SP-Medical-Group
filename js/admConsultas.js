document.addEventListener("DOMContentLoaded", function () {
    const consultasForm = document.getElementById("consultasForm");

    consultasForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtém os valores do formulário
        const paciente = document.getElementById("pacSelect").value;
        const medico = document.getElementById("medSelect").value;
        const dateHora = document.getElementById("dataHora").value;

        // Cria um objeto com os dados do usuário
        const consultasData = {
            paciente: paciente,
            medico: medico,
            dateHora: dateHora
        };

        // Envia os dados do formulário para o servidor
        fetch("/consultas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consultasData)
        })
            .then(response => response.text())
            .then(msg => {
                console.log(msg);
                // Exibe uma mensagem para o usuário (por exemplo, em um elemento HTML)
                const messageElement = document.getElementById("msg");
                messageElement.textContent = msg;
            })
            .catch(error => {
                console.error(error);
            });
    });

    document.getElementById("voltar").addEventListener("click", function () {
        window.location.href = "adm.html";
    })
})

document.addEventListener("DOMContentLoaded", function () {
    // Carregar os dados do arquivo JSON (supondo que seu arquivo JSON).
    fetch("../users.json")
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("pacSelect");
            const names = new Set(); // Usado para evitar nomes de médicos duplicados.

            // Loop através dos médicos e preenche o select com opções únicas.
            data.forEach(paciente => {
                if (paciente.type === "pac" && !names.has(paciente.name)) {
                    const option = document.createElement("option");
                    option.value = paciente.name;
                    option.textContent = paciente.name;
                    select.appendChild(option);
                    names.add(paciente.name);
                }
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os dados JSON: " + error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    // Carregar os dados do arquivo JSON (supondo que seu arquivo JSON).
    fetch("../users.json")
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById("medSelect");
            const names = new Set(); // Usado para evitar nomes de médicos duplicados.

            // Loop através dos médicos e preenche o select com opções únicas.
            data.forEach(medico => {
                if (medico.type === "med" && !names.has(medico.name)) {
                    const option = document.createElement("option");
                    option.value = medico.name;
                    option.textContent = medico.name;
                    select.appendChild(option);
                    names.add(medico.name);
                }
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os dados JSON: " + error);
        });
});