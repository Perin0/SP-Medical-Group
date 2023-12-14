document.addEventListener("DOMContentLoaded", function () {
    // Identifique o médico logado - supondo que você tem essa informação
    const pacienteLogado = localStorage.getItem("nomeUsuario"); // Isso seria obtido no login
    const greetings = document.getElementById("greetings");
    greetings.textContent += pacienteLogado;

    if (pacienteLogado) {
        // Buscar as consultas do médico logado no arquivo CONSULTAS.JSON
        fetch("../consultas.json")
            .then(response => response.json())
            .then(data => {
                const tabelaConsultas = document.getElementById("consultaTable").getElementsByTagName('tbody')[0];

                // Filtrar as consultas do médico logado
                const consultasPaciente = data.filter(consulta => consulta.paciente === pacienteLogado);

                // Preencher a tabela com as consultas do médico
                consultasPaciente.forEach(consulta => {
                    const newRow = tabelaConsultas.insertRow();
                    const MedicoCell = newRow.insertCell(0);
                    const dataCell = newRow.insertCell(1);
                    const horaCell = newRow.insertCell(2);

                    MedicoCell.innerHTML = consulta.medico;
                    const date = new Date(consulta.dateHora);
                    dataCell.innerHTML = date.toLocaleDateString();
                    horaCell.innerHTML = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                });
            })
            .catch(error => {
                console.error("Erro ao carregar as consultas do médico: " + error);
            });
    }
});
