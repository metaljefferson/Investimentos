// Variaveis Globais
const input_ipca = document.getElementById('ipca')
const input_cdi = document.getElementById('cdi')
const valor_final_bruto = document.getElementById('valor_final_bruto')
const aliquota_ir = document.getElementById('aliquota_ir')
const valor_pago_ir = document.getElementById('valor_pago_ir')
const valor_final_liquido = document.getElementById('valor_final_liquido')
const valor_total_investido = document.getElementById('valor_total_investido')
const ganho_liquido = document.getElementById('ganho_liquido')
const form_rendimento = document.getElementById('form_rendimento')
const form_tipos_importacao = document.getElementById('form_tipos_importacao')
    // const valor = document.querySelector('.valor')
    // const grafico = document.querySelector('.grafico')
    // const loader = document.querySelector('.loader')

const options = {
    mode: 'cors',
    credentials: 'include',
    method: 'get',
}

// Essa função faz a busca na api pelos indicadores
const returnIndicator = async(search) => {
    const url = `http://localhost:3000/indicadores?${search}`
    return fetch(url, options)
        .then(response => response.json())
        .then(json => json)
        .catch(error => console.log('Authorization failed: ' + error.message));
}

// Essa função faz a busca na api pelos simularadores
const returnSimulation = async(search) => {
    const url = `http://localhost:3000/simulacoes?${search}`
    return fetch(url, options)
        .then(response => response.json())
        .then(json => json)
        .catch(error => console.log('Authorization failed: ' + error.message));
}


const setValuesIndicator = async() => {
    const ipca_value = await returnIndicator('nome=ipca').then(response => response[0].valor);
    const cdi_value = await returnIndicator('nome=cdi').then(response => response[0].valor);
    input_ipca.value = ipca_value
    input_cdi.value = cdi_value
}

const returnFieldsSimulation = async() => {
    const form_rendimento_value = form_rendimento.elements['rendimento'].value;
    const form_tipos_importacao_value = form_tipos_importacao.elements['tipos_importacao'].value;
    return returnSimulation(`tipoIndexacao=${form_tipos_importacao_value}&tipoRendimento=${form_rendimento_value}`).then(response => response);

}

const generateSimulation = async() => {
    const fields = await returnFieldsSimulation()
    valor_final_bruto.value = fields[0].valorFinalBruto
    aliquota_ir.value = fields[0].aliquotaIR
    valor_pago_ir.value = fields[0].valorPagoIR
    valor_final_liquido.value = fields[0].valorFinalLiquido
    valor_total_investido.value = fields[0].valorTotalInvestido
    ganho_liquido.value = fields[0].ganhoLiquido
        // loader.style.display = "block"
        // valor.style.display = "none"
        // grafico.style.display = "none"
        // setTimeout(() => {
        //     loader.style.display = "none"
        //     valor.style.display = "grid"
        //     grafico.style.display = "block"
        // }, 2000);
}

// Função que limpa os campos
const emptyFields = () => {
    input_ipca.value = ""
    input_cdi.value = ""
    valor_final_bruto.value = ""
    aliquota_ir.value = ""
    valor_pago_ir.value = ""
    valor_final_liquido.value = ""
    valor_total_investido.value = ""
    ganho_liquido.value = ""
}



setValuesIndicator()