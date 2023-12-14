function login() {
    // Obtém os valores de nome de usuário e senha dos campos de entrada
    const message = document.getElementById("msg");
    const cpf_forms = document.getElementById("cpf").value;
    const password_forms = document.getElementById("senha").value;

    // Simula autenticação usando um arquivo JSON
    fetch("users.json")
        .then((response) => response.json())
        .then((data) => {
            // Procura por um usuário que corresponda a preenchida pelo usuario
            const user = data.find((user) => user.cpf == cpf_forms && user.password == password_forms);

            console.log(user);
            // Verifica se um usuário válido foi encontrado
            if (user) {
                //propriedade que quero salvar no local storage
                const userNome = user.name;
                localStorage.setItem("nomeUsuario", userNome);
                // Validação de tipo de usuário
                const userTipo = user.type;
                console.log("Tipo de usuário:" + userTipo)

                if (userTipo == "adm") {
                    window.location.href = "user_pages/adm.html";
                }
                else if (userTipo == "med") {
                    window.location.href = "user_pages/doctor.html"
                }
                else if (userTipo == "pac") {
                    window.location.href = "user_pages/paciente.html"
                }

                message.textContent = "Login bem-sucedido!";
                message.style.color = "green";
            } else {
                // Exibe uma mensagem de erro
                message.textContent = "Usuário ou senha incorretos.";
                message.style.color = "red";
            }
        });
}

function maskCPF() {
    const element = document.getElementById('cpf');
    const maskOptions = {
        mask: '000.000.000-00'
    };
    const mask = IMask(element, maskOptions);
}