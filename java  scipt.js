document.addEventListener("DOMContentLoaded", function () {
	const questions = document.querySelectorAll("article");
	const bonnesReponses = [0, 0, 1, 1, 2];

	const zoneResultat = document.createElement("p");
	zoneResultat.id = "resultat";
	zoneResultat.setAttribute("aria-live", "polite");

	const boutonValider = document.createElement("button");
	boutonValider.type = "button";
	boutonValider.textContent = "Valider le quiz";

	const boutonRecommencer = document.createElement("button");
	boutonRecommencer.type = "button";
	boutonRecommencer.textContent = "Recommencer";
	boutonRecommencer.hidden = true;

	document.querySelector("footer").before(zoneResultat, boutonValider, boutonRecommencer);

	function nettoyerCorrections() {
		questions.forEach(function (question) {
			question.querySelectorAll("input").forEach(function (reponse) {
				reponse.parentElement.style.color = "";
				reponse.parentElement.style.fontWeight = "";
			});
		});
	}

	boutonValider.addEventListener("click", function () {
		let score = 0;
		let oublis = 0;

		nettoyerCorrections();

		questions.forEach(function (question, index) {
			const reponses = question.querySelectorAll("input");
			const reponseChoisie = question.querySelector("input:checked");

			reponses[bonnesReponses[index]].parentElement.style.color = "green";
			reponses[bonnesReponses[index]].parentElement.style.fontWeight = "bold";

			if (!reponseChoisie) {
				oublis += 1;
				return;
			}

			const choix = Array.from(reponses).indexOf(reponseChoisie);
			if (choix === bonnesReponses[index]) {
				score += 1;
			} else {
				reponseChoisie.parentElement.style.color = "crimson";
			}
		});

		zoneResultat.textContent = "Score : " + score + "/" + questions.length +
			(oublis ? " - Questions sans réponse : " + oublis : "");
		boutonValider.hidden = true;
		boutonRecommencer.hidden = false;
	});

	boutonRecommencer.addEventListener("click", function () {
		questions.forEach(function (question) {
			question.querySelectorAll("input").forEach(function (reponse) {
				reponse.checked = false;
			});
		});
		nettoyerCorrections();
		zoneResultat.textContent = "";
		boutonValider.hidden = false;
		boutonRecommencer.hidden = true;
	});
});
