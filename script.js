document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('transacao-form');
    const descricaoInput = document.getElementById('descricao');
    const valorInput = document.getElementById('valor');
    const dataInput = document.getElementById('data');
    const tipoSelect = document.getElementById('tipo');
    const listaTransacoes = document.getElementById('transacoes-lista');
    const totalReceitaSpan = document.getElementById('total-receita');
    const totalDespesaSpan = document.getElementById('total-despesa');
    const saldoSpan = document.getElementById('saldo');

    let totalReceitas = 0;
    let totalDespesas = 0;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const descricao = descricaoInput.value;
        const valor = parseFloat(valorInput.value);
        const data = dataInput.value;
        const tipo = tipoSelect.value;

        if (descricao && valor && data && tipo) {
            const li = document.createElement('li');
            li.innerHTML = `
                ${descricao} - R$ ${valor.toFixed(2)} (${tipo}) - ${data}
                <button class="botao-pagar" onclick="marcarComoPago(this)">Pagar</button>
            `;
            listaTransacoes.appendChild(li);

            if (tipo === 'receita') {
                totalReceitas += valor;
            } else {
                totalDespesas += valor;
            }

            atualizarResumo();
            form.reset();
        }
    });

    function atualizarResumo() {
        const saldo = totalReceitas - totalDespesas;
        totalReceitaSpan.textContent = totalReceitas.toFixed(2);
        totalDespesaSpan.textContent = totalDespesas.toFixed(2);
        saldoSpan.textContent = saldo.toFixed(2);
    }

    window.marcarComoPago = function(botao) {
        const li = botao.parentElement;
        li.classList.toggle('pago');
        const valor = parseFloat(li.innerHTML.split('R$ ')[1].split(' ')[0]);
        const tipo = li.innerHTML.split('(')[1].split(')')[0];

        if (tipo === 'despesa') {
            if (li.classList.contains('pago')) {
                totalDespesas -= valor;
            } else {
                totalDespesas += valor;
            }
            atualizarResumo();
        }
    };
});
