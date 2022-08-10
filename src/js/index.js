
class Despesa {

	constructor(nome, descri, qtd, valor, data) {
		this.nome = nome
		this.descri = descri
		this.qtd = qtd
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

	gralet(d) {
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
	let descri = document.getElementById('descri')
	let qtd = document.getElementById('qtd')
	let valor = document.getElementById('valor')
	let data = document.getElementById('data')

	let despesa = new Despesa(
		nome.value,
		descri.value,
		qtd.value,
		valor.value,
		data.value
	)

	window.location.reload()

	if (despesa.validarDados()) {
		bd.gralet(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido !'
		document.getElementById('modal_titulo_div').className = 'alert_modal alert-success'
		document.getElementById('alert_icon').innerHTML = '<i class="fa fa-check-circle"></i>'


		//log de sucesso
		$('#exampleModal').modal('show')
		nome.value = ''
		descri.value = ''
		qtd.value = ''
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
		let linha = listaDespesas.insertRow();

		let real = 'R$'

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = d.nome
		linha.insertCell(1).innerHTML = d.descri
		linha.insertCell(2).innerHTML = d.qtd
		linha.insertCell(3).innerHTML = `${real} ${d.valor},00`
		linha.insertCell(4).innerHTML = d.data



		//Criar o botão de exclusão
		let btnEdtion = document.createElement('button')

		btnEdtion.className = 'btn btn-warning'
		btnEdtion.innerHTML = '<i class="fa fa-pencil"></i>'
		btnEdtion.id = `ìd_despesa_${d.id}`
		btn.onclick = function atualizarContato(nome, descri, qtd, valor, data) {

			if (confirm('Deseja editar o produto? ')) {

				despesas = JSON.parse(localStorage.getItem(i));

				let produtoEncontrado;

				for (let i = 0; i < despesas.length; i++) {
					if (despesas[i].nome == nome) {
						produtoEncontrado = despesas[i];

						nome = document.getElementById('nome').value = produtoEncontrado.nome;
						descri = document.getElementById('descri').value = produtoEncontrado.descri;
						qtd = document.getElementById('qtd').value = produtoEncontrado.qtd;
						valor = document.getElementById('valor').value = produtoEncontrado.valor;
						data = document.getElementById('data').value = produtoEncontrado.data;
					}
				}
				mostradespesa();
				window.location.reload()
			}
			linha.insertCell(5).append(btnEdtion)
		}

		let btn = document.createElement('button')
		btn.className = 'btn btn-success'
		btn.innerHTML = '<i class="fa fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function () {
			let id = this.id.replace('id_despesa_', '')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(6).append(btn)

	})
}
