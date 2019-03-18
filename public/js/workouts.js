window.onload = onStart;

function onStart(){
	updateTable(colorRow);
	
}
function updateTable(callback){

	var xhr = new XMLHttpRequest();
	xhr.open("GET", '/subworkouts', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
			workouts  = JSON.parse(this.responseText);
			console.log(workouts);
			console.log(workouts[0]);
//			console.log(complaints[id]);
			table = document.getElementById("sql-table");	
			for(i = 0; i < workouts.length; i++){
				table.insertRow();
				for(j = 0; j < 4; j++){
					table.rows[i+1].insertCell();
				}
				console.log("workouts: " + workouts[i]);
				//table.insertRow();
				console.log(workouts[i].id + " is the id");	
				table.rows[i+1].cells[0].innerHTML = workouts[i].name;
				table.rows[i+1].cells[1].innerHTML = workouts[i].reps;
				table.rows[i+1].cells[2].innerHTML = workouts[i].weight;
				table.rows[i+1].cells[3].innerHTML = workouts[i].date;
			}			
        }
    }   
	xhr.send("type=update");
	console.log("Table updating");
	setTimeout(callback(), 2000);


}


function fillData(){ //used for posting data to mysql
	console.log("Called");
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", '/subworkouts', true);

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() { // Call a function when the state changes.
    	if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        	// Request finished. Do processing here.
    	}
	}
	var dat;
	dat+="name="+document.getElementById("name").value;
	dat+="&";
	dat+="reps="+document.getElementById("reps").value;
	dat+="&";
	dat+="weight="+document.getElementById("weight").value; 
	console.log();
	xhr.send("name="+document.getElementById("name").value+"&reps="+document.getElementById("reps").value+"&weight="+document.getElementById("weight").value);

	updateTable();
table.rows[i+1].cells[1].innerHTML = workouts[i].reps;
	// xhr.send(new Int8Array()); 
	// xhr.send(document);
}
let ind = 0;	
function up(){
//	console.log(ind++);
	let table = document.getElementById("sql-table");
	if(ind > 1){
		ind--;
		for(i = 0; i < table.rows.length; i++){
			if(i!=ind){
				//table.rows[i].classList.add("unselected");
				for(j = 0; j < table.rows[i].cells.length; j++){
                    table.rows[i].cells[j].style.background = "#231f20";
                }   

			}else{
				for(j = 0; j < table.rows[i].cells.length; j++){
					table.rows[i].cells[j].style.background = "blue";
				}
				//table.rows[i],classList.add("selected");
			}
		}
	}
}

//colors starter row onstart
function colorRow(){
	

	let table = document.getElementById("sql-table");
		console.log("Table size: " + table.rows.length);

	for(let j = 0; j < table.rows[i].cells.length; j++){
    	table.rows[1].cells[j].style.background = "blue";
	}  	
}
function down(){
//  console.log(ind++);
    let table = document.getElementById("sql-table");
    if(ind <  table.rows.length-2){
        ind++;
        for(i = 0; i < table.rows.length; i++){
            if(i!=ind){
                //table.rows[i].classList.add("unselected");
                for(j = 0; j < table.rows[i].cells.length; j++){
                    table.rows[i].cells[j].style.background = "#231f20";
                } 

            }else{
                for(j = 0; j < table.rows[i].cells.length; j++){
                    table.rows[i].cells[j].style.background = "blue";
                }   
                //table.rows[i],classList.add("selected");
            }   
        }   
    }   
}
function deleteActive(){
	//ind is active
	var xhr = new XMLHttpRequest();
    xhr.open("POST", '/subworkoutsdelete', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    }   
    var dat;
    dat+="name="+document.getElementById("name").value;
    dat+="&";
    dat+="reps="+document.getElementById("reps").value;
    dat+="&";
    dat+="weight="+document.getElementById("weight").value; 
    console.log();
    xhr.send("index="+ind);
	updateTable();
	
}
