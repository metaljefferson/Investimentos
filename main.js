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
const grafico = document.getElementById('grafico')

// Está variavel adiciona as intruções para trazer os resultados da api atráves da utilização do método get
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


// Função Seta os valores dos indicadores
const setValuesIndicator = async() => {
        const ipca_value = await returnIndicator('nome=ipca').then(response => response[0].valor);
        const cdi_value = await returnIndicator('nome=cdi').then(response => response[0].valor);
        input_ipca.value = ipca_value
        input_cdi.value = cdi_value
    }
    // Função retorna os valores dependendo do input setado E faz um fetch no returnsimulaton passando como parâmetro os valores setados desses inputs
const returnFieldsSimulation = async() => {
        const form_rendimento_value = form_rendimento.elements['rendimento'].value;
        const form_tipos_importacao_value = form_tipos_importacao.elements['tipos_importacao'].value;
        return returnSimulation(`tipoIndexacao=${form_tipos_importacao_value}&tipoRendimento=${form_rendimento_value}`).then(response => response);

    }
    // Função Gera a simulação e retorna os dados da api que foi setado os valores da input
const generateSimulation = async() => {
    const fields = await returnFieldsSimulation()
    valor_final_bruto.value = fields[0].valorFinalBruto
    aliquota_ir.value = fields[0].aliquotaIR
    valor_pago_ir.value = fields[0].valorPagoIR
    valor_final_liquido.value = fields[0].valorFinalLiquido
    valor_total_investido.value = fields[0].valorTotalInvestido
    ganho_liquido.value = fields[0].ganhoLiquido
}

// Essa Função Gera o Grafico
const generateChart = async() => {
    const fields = await returnFieldsSimulation()
    try {
        deleteChart()
    } catch (error) {
        console.log(error)
    }
    try {
        createChart(fields)
    } catch (error) {
        console.log(error)
    }
}


// Função que cria o grafico
const createChart = (fields) => {
    const comAporte = fields[0].graficoValores.comAporte
    const semAporte = fields[0].graficoValores.semAporte
    const comAporteLength = Object.entries(comAporte).length
    const semAporteLength = Object.entries(semAporte).length
    const verifyLength = comAporteLength > semAporteLength ? comAporteLength : semAporteLength
    const divContainer = document.createElement('div')
    divContainer.classList.add('divContainer')
    divContainer.setAttribute("id", "divContainer")
    for (let index = 0; index < verifyLength; index++) {
        const divConteudo = document.createElement('div')
        const divBarras = document.createElement('div')
        const divComAporte = document.createElement('div')
        const divSemAporte = document.createElement('div')
        const numeroBarra = document.createElement('p')
        divConteudo.classList.add('divConteudo')
        divBarras.classList.add('divBarras')
        divComAporte.classList.add('divComAporte')
        divSemAporte.classList.add('divSemAporte')
        divComAporte.style.height = Object.entries(comAporte)[index][1] / 14 + 'px'
        divSemAporte.style.height = Object.entries(semAporte)[index][1] / 14 + 'px'
        numeroBarra.innerHTML = index
        divBarras.appendChild(divComAporte)
        divBarras.appendChild(divSemAporte)
        divConteudo.appendChild(divBarras)
        divConteudo.appendChild(numeroBarra)
        divContainer.appendChild(divConteudo)
    }

    grafico.appendChild(divContainer)
    grafico.insertAdjacentHTML('beforeend', ' <div id="legendas"> <p class="tempo_meses">Tempo (meses)</p><div class="legenda_aporte"><span class="com_aporte">Com aporte</span><span class="sem_aporte">Sem aporte</span></div> </div>')
}

// Função que limpa os campos
const deleteChart = () => {
    const divContainer = document.getElementById('divContainer')
    divContainer.remove()
    const divLegendas = document.getElementById('legendas')
    divLegendas.remove()
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
        aponte_inicial.value = ""
        prazo.value = ""
        aponte_mensal.value = ""
        rentabilidade.value = ""
        deleteChart()
    }
    // Função que valida apenas numeros no input
function checkInp(e) {
    var x = e.value;
    let validator = e.parentNode.getElementsByClassName('validators')[0]
    var regex = /^[0-9]+$/;
    if (x.match(regex)) {
        validator.style.display = 'none'
    } else {
        validator.style.display = 'block'
    }
}

setValuesIndicator()