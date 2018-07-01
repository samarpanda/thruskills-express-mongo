var matches = []

var makeTemplate = function(data){
	console.log(data)
	var li = document.createElement('li')
	var matchList = document.querySelector('.match-list')
	li.innerHTML = `<h3>${data.teamA} Vs ${data.teamB}</h3><p>Date: ${data.date}, ${data.time}</p>`
	matchList.insertBefore(li, matchList.firstChild);
}

var getAllMatches = function(){
	fetch('/matches')
	.then((res) => {
		return res.json()
	})
	.then((data) => {
		matches = matches.concat(data)
		makeMatchList()
	})
}

var makeMatchList = function(){
	matches.forEach((match) => {
		makeTemplate(match)
	})
}

var updateMatchList = function(){
	var matchData = matches[matches.length - 1]
	makeTemplate(matchData)
}

function getValues(){
	var date = document.querySelector('input[name=date]').value
	var time = document.querySelector('input[name=time]').value
	var teamA = document.querySelector('select[name=teamA]')
	teamA = teamA.options[teamA.selectedIndex].value;
	var teamB = document.querySelector('select[name=teamB]')
	teamB = teamB.options[teamB.selectedIndex].value;

	return {
		date,
		time,
		teamA,
		teamB
	}
}



(function(){

	getAllMatches()

	var form = document.querySelector('form')
	form.addEventListener('submit', (event) => {
		event.preventDefault()

		var values = getValues()
		console.log(values)
		fetch('/matches', {
			method: 'POST',
			headers: {
				'Accept':'application/json',
				'Content-Type':'application/json'
			},
			body: JSON.stringify(values)
		})
		.then((resp) => {
			return resp.json()
		})
		.then((data) => {
			matches.push(data)
			updateMatchList()
		})

		return false
	})

}())

