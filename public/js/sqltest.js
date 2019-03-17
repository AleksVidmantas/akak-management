window.onload = updateTable;

function updateTable(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", '/sub', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
			complaints = JSON.parse(this.responseText);
			console.log(complaints);
			console.log(complaints[0]);
//			console.log(complaints[id]);
			table = document.getElementById("sql-table");	
			for(i = 0; i < complaints.length; i++){
				table.insertRow();
				for(j = 0; j < 3; j++){
					table.rows[i+1].insertCell();
				}
				console.log("Complaint: " + complaints[i]);
				//table.insertRow();
				console.log(complaints[i].id + " is the id");	
				table.rows[i+1].cells[0].innerHTML = complaints[i].roll_number;
				table.rows[i+1].cells[1].innerHTML = complaints[i].issue;
				table.rows[i+1].cells[2].innerHTML = complaints[i].date_filed;
			}			
        }
    }   
	xhr.send("type=update");
	console.log("Table updating");
}


function fillData(){ //used for posting data to mysql
	console.log("Called");
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/sub', true);

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { // Call a function when the state changes.
    	if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        	// Request finished. Do processing here.
    	}
	}
	var dat;
	dat+="role="+document.getElementById("role");
	dat+="&";
	dat+="issue="+document.getElementById("complaint"); 
	console.log("Testdat="+  dat + "-end ");
	xhr.send("role="+document.getElementById("role").value+"&"+ "issue="+document.getElementById("complaint").value);
	updateTable();
	// xhr.send(new Int8Array()); 
	// xhr.send(document);
}
