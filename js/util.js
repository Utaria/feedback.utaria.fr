function concat(arr1, arr2) {
	var arrFinal = [];

	for(var el of arr1)
		arrFinal.push(el);
	for(var el of arr2)
		arrFinal.push(el);

	return arrFinal;
}

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

function inputValid(input) {
    if(input == null) return false;
    
    return input.dataset.needVerif === undefined || (input.dataset.verified == "true" && input.dataset.verifiedValue == input.value);
}

function getXMLHttpRequest() {
    var xhr = null;
    
    if (window.XMLHttpRequest || window.ActiveXObject) {
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } else {
            xhr = new XMLHttpRequest(); 
        }
    } else {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }
    
    return xhr;
}

function doXHRRequest(url, callback) {
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
        }
    };

    xhr.open("GET", url, true);
    xhr.send(null);
}