function cadastrar() {

    // Obtém os valores do formulário
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const type = document.getElementById("type").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const cep = document.getElementById("cep").value;
    const tel = document.getElementById("tel").value;


    if (type == "null") {
        alert("Selecione uma opção de usuário para completar o cadastro")
    }
    else {
        // Cria um objeto com os dados do usuário
        const userData = {
            name: name,
            password: password,
            type: type,
            email: email,
            cpf: cpf,
            cep: cep,
            tel: tel
        };

        // Envia os dados do formulário para o servidor
        fetch("/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
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
    }
};

document.getElementById("voltar").addEventListener("click", function () {
    window.location.href = "adm.html";
});

function maskCPF() {
    const element = document.getElementById('cpf');
    const maskOptions = {
        mask: '000.000.000-00'
    };
    const mask = IMask(element, maskOptions);
}

function maskCEP() {
    const element = document.getElementById('cep');
    const maskOptions = {
        mask: '00000-000'
    };
    const mask = IMask(element, maskOptions);
}

function maskTEL() {
    const element = document.getElementById('tel');
    const maskOptions = {
        mask: '(00) 00000-0000'
    };
    const mask = IMask(element, maskOptions);
}