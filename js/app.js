function Application() {
	this.forms      = [];
	this.stepsForms = [];
	this.data       = {};

	this.windowHeight;
	this.submitForm;

	this.steps   = 0;
	this.current = 0;


	this.closeNotifInterval = null;

	this.preload();
}

Application.prototype = {

	preload: function() {
		this.windowHeight = window.innerHeight;

		window.addEventListener("load", this.init.bind(this));
	},

	init: function() {
		var self = this;

		// -------- MISE EN PLACE DES FORMUMAIRES -------- //
		this.forms      = document.getElementsByTagName("form");
		this.submitForm = document.getElementById("form-submit-form");

		for(var form of this.forms) {
			form.addEventListener("submit", function(e){
				e.preventDefault();
				return false;
			});
		}

		// Affichage du premier formulaire par défaut
		this.stepsForms = document.querySelectorAll(".feedback-form .form-step");
		this.stepsForms[0].style.display = "block";



		// ---------- MISE EN PLACE DES ETAPES ----------- //
		this.steps   = document.querySelectorAll(".steps-tracker .step").length;
		this.current = 0;



		// ----------- MISE EN PLACE DES CHAMPS ----------- //
		var inputs = document.getElementsByTagName("input");
		inputs = concat(inputs, document.getElementsByTagName("textarea"));

		for(var input of inputs) {
			input.addEventListener("focus", function(e) {
				self.printFormNumber( self.getFormNumberOf(this), false, true );
			});
			input.addEventListener("keydown", function(e) {
				// Tab ou touche du bas ou entrée
				if( ( e.keyCode == 9 || e.keyCode == 40 || e.keyCode == 13 ) && this.value.length > 0 ) {
					if( inputValid(this) )
						self.whenFormSubmited(new Event(null), self.forms[self.current]);
					else
						self.verifyInput(this);
				}
						

				// Touche du haut
				if( e.keyCode == 38 )
					self.printFormNumber( self.getFormNumberOf(this) - 1 );

 				// Touche "Retour"
				if( e.keyCode == 8 && this.value.length == 0 )
					self.printFormNumber( self.getFormNumberOf(this) - 1 );


				self.resetInput(this);
			});
			input.addEventListener("keyup", function(e) {
				// Pour éviter que le label se mette par desus le texte dans le champ
				if( this.value.length > 0 )
					this.parentNode.classList.add("filled");
				else
					this.parentNode.classList.remove("filled");
			});
		}


		// ----------- ENVOI DU FORMULAIRE ----------- //
		var submitForm = document.getElementById("form-submit-form");
		submitForm.removeEventListener("submit", this.whenFormSubmited);
		submitForm.addEventListener("submit", function(e) {
			e.preventDefault();
			if( Object.keys(self.data).length < 4 ) return;

			// Remove all hidden inputs
			for(var inp of this.querySelectorAll("input[type=hidden]"))
				inp.parentNode.removeChild(inp);

			// Create hidden inputs for submission
			for(var key of Object.keys(self.data)) {
				var inp = document.createElement("input");
				inp.type  = "hidden";
				inp.name  = key;
				inp.value = self.data[key];

				this.appendChild(inp);
			}

			// Force the submission
			this.submit();
			return false;
		});

		this.initNotifCenter();
	},
	initNotifCenter: function(){
		var notif = document.querySelector(".notif");
		var self  = this;

		if(notif == null) return false;

		notif.classList.add("opened");

		this.closeNotifInterval = setTimeout(function(){
			notif.classList.remove("opened");
		}, 8000);

		notif.querySelector(".close").onclick = function(){
			clearTimeout(self.closeNotifInterval);
			this.parentNode.classList.remove("opened");
		}
	},


	whenFormSubmited: function(event, form) {
		event.preventDefault();

		var inputs = form.getElementsByTagName("input");
		inputs = concat(inputs, form.getElementsByTagName("textarea"));

		for(var input of inputs)
			this.data[input.name] = input.value;

		// On affiche le formulaire suivant
		if( this.current < this.steps - 1 )
			this.nextForm();


		return false;
	},

	printFormNumber: function(n, force, preventFocus) {
		if(n < 0) return false;
		var i = 0;


		// Si le dernier champ est rempli, on ne fait rien, sauf si on souhaite forcer l'action.
		if( !force && this.stepsForms[this.current] != null && this.getFieldIn(this.stepsForms[this.current]) != null
		&& this.getFieldIn(this.stepsForms[this.current]).value.length > 0 )
			return false;

		// On remonte seulement au dernier champ non rempli
		if( !force && this.current != n ) {
			for(var j = this.stepsForms.length - 1; j >= 0; j--) {
				var cForm = this.stepsForms[j];
				var field = this.getFieldIn(cForm);

				if( cForm != null && field != null && field.value.length > 0 && field.value != field.dataset.defaultValue ) {
					n = j;
					break;
				}
			}
		}


		// Affichage des formulaires
		var focusInput;
		for(var form of this.stepsForms) {
			if(i <= n) {
				form.style.display = "block";

				if( !preventFocus && i == n && this.getFieldIn(form) != null ) {
					focusInput = this.getFieldIn(form);
					setTimeout(function(){ focusInput.focus(); }, 50);
				}
			}
			else form.style.display = "none";

			i++;
		}

		// Animation des numéros d'étape
		var steps    = document.querySelectorAll(".steps-tracker .step");
		var progress = document.getElementById("progress-trace"); 
		var maxTop   = 0;

		i = 0;
		for(var step of steps) {
			if(i <= n) {
				if( maxTop < step.offsetTop ) maxTop = step.offsetTop;
				step.classList.add   ("active");
			} 
			else step.classList.remove("active");

			i++;
		}

		progress.style.height = maxTop + "px";

		scrollTo(document.getElementById("main"), Math.max(0, maxTop - 30), 200);
		this.current = n;
	},
	nextForm: function() {
		this.printFormNumber( this.current + 1, true );
	},


	getFormNumberOf: function(input) {
		var n    = -1;
		var i    =  0;
		var form = input.parentNode.parentNode;

		if( form.tagName !== "FORM" ) return n;

		for(var formC of this.forms) {
			if(formC.id == form.id)
				return i;

			i++;
		}

		return n;
	},

	getFieldIn: function(form) {
		if( form == null ) return null;
		if( form.querySelector("input") )    return form.querySelector("input");
		if( form.querySelector("textarea") ) return form.querySelector("textarea");
		if( form.querySelector("button") )   return form.querySelector("button");

		return null;
	},


	verifyInput: function(input) {
		var self = this;
		if(!input.dataset.needVerif) return true;

		function errorMessage(input, message) {
			var p = document.createElement("p");

			input.parentNode.classList.add("error");

			p.className = "error-message";
			p.innerHTML = message;

			input.parentNode.appendChild(p);
		}

		if( input.id == "username" ) {
			var username = input.value;

			input.parentNode.classList.add("waiting");

			// Remise à zéro du champ
			this.resetInput(input);

			input.disabled = true;

			var url = document.getElementById("checkignurl").value;

			doXHRRequest(url.replace("%s", username), function(data) {
				
				try {
					var json = JSON.parse(data);

					if(json.verified) {
						input.parentNode.classList.add("verified");

						input.dataset.verified      = true;
						input.dataset.verifiedValue = input.value;

						setTimeout(function(){
							self.whenFormSubmited(new Event(null), input.parentNode.parentNode);
						}, 200);
					} else {
						errorMessage(input, "Aucun joueur ne s'est connecté avec ce pseudo.");
						setTimeout(function(){ input.focus(); }, 100);
					}
				} catch(ex) {
					errorMessage(input, "Il y a un problème.. De retour bientôt !");
					setTimeout(function(){ input.focus(); }, 100);
				}

				input.parentNode.classList.remove("waiting");
				input.disabled = false;
			});

			return;
		}

		if( input.id == "feedback_priority" ) {
			var val = input.value;

			this.resetInput(input);

			setTimeout(function() {

				if( val != "0" && val != "1" && val != "2" && val != "3" && val != "4" && val != "5" ) {
						errorMessage(input, "La priorité doit être comprise entre 0 et 5 !");
						self.submitForm.style.display = "none";
						setTimeout(function(){ input.focus(); }, 50);
				} else {
					input.parentNode.classList.add("verified");

					input.dataset.verified      = true;
					input.dataset.verifiedValue = input.value;

					setTimeout(function(){
						self.whenFormSubmited(new Event(null), input.parentNode.parentNode);

						self.submitForm.style.display = "block";
						setTimeout(function(){ self.getFieldIn(self.submitForm).focus(); }, 50);
					}, 200);
				}

			}, 50);

		}
	},
	resetInput: function(input) {
		input.parentNode.classList.remove("verified");
		input.parentNode.classList.remove("error");

		// Suppression du message d'erreur
		var pMess = input.parentNode.querySelector("p.error-message");
		if(pMess != null) input.parentNode.removeChild(pMess);

		delete input.dataset.verified;
		delete input.dataset.verifiedValue;
	}

}

new Application();