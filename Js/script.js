
class ContaBancaria {
    constructor(nome, cpf) {
        this.nome = nome;
        this.cpf = cpf;
        this.saldo = 100000.00; // Saldo inicial de R$ 100.000
        this.extrato = [];
    }

    depositar(valor) {
        if (valor > 0) {
            this.saldo += valor;
            this.extrato.push(`Depósito: R$${valor.toFixed(2)}`);
            return `Depósito de R$${valor.toFixed(2)} realizado com sucesso!`;
        } else {
            return 'Valor de depósito inválido!';
        }
    }

    sacar(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            this.extrato.push(`Saque: R$${valor.toFixed(2)}`);
            return `Saque de R$${valor.toFixed(2)} realizado com sucesso!`;
        } else {
            return 'Valor de saque inválido ou saldo insuficiente!';
        }
    }

    transferir(outraConta, valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            outraConta.depositar(valor);
            this.extrato.push(`Transferência: R$${valor.toFixed(2)} para ${outraConta.nome}`);
            return `Transferência de R$${valor.toFixed(2)} para ${outraConta.nome} realizada com sucesso!`;
        } else {
            return 'Valor de transferência inválido ou saldo insuficiente!';
        }
    }

    mostrarExtrato() {
        return this.extrato;
    }
}

const contas = {};
let contaAtual = null;

function login() {
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;

    const chave = `${nome}-${cpf}`; // Chave única para a conta
    if (!contas[chave]) {
        contas[chave] = new ContaBancaria(nome, cpf);
    }
    contaAtual = contas[chave];
    document.getElementById('usuario').innerText = contaAtual.nome;
    document.getElementById('saldo').innerText = contaAtual.saldo.toFixed(2);
    document.getElementById('login').style.display = 'none';
    document.getElementById('banco').style.display = 'block';
}

function depositar() {
    const valor = parseFloat(document.getElementById('valor').value);
    const mensagem = contaAtual.depositar(valor);
    atualizarSaldo();
    alert(mensagem);
}

function sacar() {
    const valor = parseFloat(document.getElementById('valor').value);
    const mensagem = contaAtual.sacar(valor);
    atualizarSaldo();
    alert(mensagem);
}

function transferir() {
    const destinatarioNome = document.getElementById('destinatario').value;
    const destinatarioCpf = document.getElementById('cpfDestinatario').value;
    const chaveDestino = `${destinatarioNome}-${destinatarioCpf}`; // Chave única para a conta do destinatário

    if (!contas[chaveDestino]) {
        contas[chaveDestino] = new ContaBancaria(destinatarioNome, destinatarioCpf);
    }

    const valor = parseFloat(document.getElementById('valor').value);
    const mensagem = contaAtual.transferir(contas[chaveDestino], valor);
    atualizarSaldo();
    alert(mensagem);
}

function mostrarExtrato() {
    const extrato = contaAtual.mostrarExtrato();
    const extratoContainer = document.getElementById('extrato');
    extratoContainer.innerHTML = '';
    extrato.forEach(movimento => {
        const li = document.createElement('li');
        li.innerText = movimento;
        extratoContainer.appendChild(li);
    });
    document.getElementById('extratoContainer').style.display = 'block';
}

function atualizarSaldo() {
    document.getElementById('saldo').innerText = contaAtual.saldo.toFixed(2);
}
