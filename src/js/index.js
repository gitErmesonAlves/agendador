
class Despesa {
	
	constructor(nome, valor, data) {
		this.nome = nome
		this.valor = valor
        this.data = data
	}

	validarDados() {
		for (let i in this) {
			if (this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {

		//array de despesas
		let despesas = []
		let id = localStorage.getItem('id')

		//recuperar todas as despesas cadastradas em localStorage
		for (let i = 1; i <= id; i++) {

			//recuperar a despesa
			let despesa = JSON.parse(localStorage.getItem(i))
			
			if (despesa === null) {
				continue
			}
			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}

	remover(id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function cadastrarDespesa() {

	let nome = document.getElementById('nome')
	let valor = document.getElementById('valor')
    let data = document.getElementById('data')

	let despesa = new Despesa(
		nome.value,
		valor.value,
        data.value
		)

        window.location.reload()

	if (despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido !'
		document.getElementById('modal_titulo_div').className = 'alert_modal alert-success'
		document.getElementById('alert_icon').innerHTML = '<i class="fa fa-check-circle"></i>'


		//log de sucesso
		$('#exampleModal').modal('show')
		nome.value = ''
		valor.value = ''
        data.value = ''

		window.location.reload()

	} else {

		document.getElementById('modal_titulo').innerHTML = 'Error ao inserir o produto !'
		document.getElementById('modal_titulo_div').className = 'alert_modal alert-danger'
		document.getElementById('alert_icon').innerHTML = '<i class="fa fa-exclamation-triangle"></i>'

		//log de erro
		$('#exampleModal').modal('show')
	}
}


function carregaListaDespesas(despesas = Array(), filtro = false) {

	if (despesas.length == 0 && filtro == false) {
		despesas = bd.recuperarTodosRegistros()
	}


	let listaDespesas = document.getElementById("listaDespesas")
	listaDespesas.innerHTML = ''
	despesas.forEach(function (d) {

		//Criando a linha (tr)
		var linha = listaDespesas.insertRow();

        let real = 'R$'

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = d.nome
		linha.insertCell(1).innerHTML = `${real} ${d.valor},00`
        linha.insertCell(2).innerHTML = d.data

		//Criar o bot??o de exclus??o
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"  ></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function () {
			let id = this.id.replace('id_despesa_', '')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(3).append(btn)

	})
}
