
let button = document.querySelector(".recherche button")
let input = document.querySelector(".recherche input")
let tableau = JSON.parse(localStorage.getItem("tableau")) || []
let ul = document.querySelector("ul")
let select = document.querySelector("select")

function ajouter(e){
	e.preventDefault();

	tableau.push(input.value)
	localStorage.setItem("tableau", JSON.stringify(tableau))

	afficher(tableau)
	
}

function realise(e){
	let tagText = e.currentTarget.previousSibling.previousSibling

	tagText.classList.add("barre");
}
function efface(e){
	e.currentTarget.parentNode.style.display = 'none'

	tableau.splice(tableau.indexOf(e.currentTarget.parentNode.firstChild.nextSibling.innerText), 1)
	localStorage.setItem("tableau", JSON.stringify(tableau))
}

function afficher(tableau){
	let chaine;
	chaine = tableau.map(function(element){
		element = `
			<li>
				<div class="todo">${element}</div>
				<span class="carreVert"></span>
				<span class="carreRouge"></span>
			</li>
		`;
		return element;
	}).join("");

	ul.innerHTML =  chaine;
	
	let realiseTodo = document.querySelector("li .carreVert");
	realiseTodo.addEventListener("click", realise)
	let effaceTodo = document.querySelector("li .carreRouge");
	effaceTodo.addEventListener("click", efface)
}

function filtrer(e){
	let v = e.target.value;
	let lis = document.querySelectorAll("ul li")

	lis.forEach((li)=>{
		switch (v) {
			case "all":
				break;
			case "completed":
				if(li.firstChild.nextSibling.includes("barre")){
					li.style.display = 'none';
				}
				break;
			case "uncompleted":
				if(!li.firstChild.nextSibling.contains("barre")){
					li.style.display = 'none';
				}
				break;
			default:
				// statements_def
				break;
		}
	})
}


afficher(tableau)
button.addEventListener("click", ajouter)
select.addEventListener("input", filtrer)