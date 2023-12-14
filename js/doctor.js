document.addEventListener("DOMContentLoaded", function () {
    // Identifique o médico logado - supondo que você tem essa informação
    const medicoLogado = localStorage.getItem("nomeUsuario"); // Isso seria obtido no login
    console.log(medicoLogado);
    const greetings = document.getElementById("greetings");
    greetings.textContent += medicoLogado;

    if (medicoLogado) {
        // Buscar as consultas do médico logado no arquivo CONSULTAS.JSON
        fetch("../consultas.json")
            .then(response => response.json())
            .then(data => {
                const tabelaConsultas = document.getElementById("consultaTable").getElementsByTagName('tbody')[0];

                // Filtrar as consultas do médico logado
                const consultasMedico = data.filter(consulta => consulta.medico === medicoLogado);

                // Preencher a tabela com as consultas do médico
                consultasMedico.forEach(consulta => {
                    const newRow = tabelaConsultas.insertRow();
                    const pacienteCell = newRow.insertCell(0);
                    const dataCell = newRow.insertCell(1);
                    const horaCell = newRow.insertCell(2);

                    pacienteCell.innerHTML = consulta.paciente;
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
