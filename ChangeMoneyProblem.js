const notes = [2000,500,200,100,50,20,10,5,1]
let amount =  2536;
let answers = [];

for (let i = 0; i < notes.length; i++) {
  if(notes[i] <= amount){
    answers[i] = Math.floor(amount/notes[i]);
    amount = amount - (answers[i]*notes[i])
  }
  else{
    answers[i] = 0
  }
}

console.log("\n# Currency Count #\n")
for (let j = 0 ; j < notes.length;j++){
  if(answers[j] != 0){
    console.log(notes[j] + " : " + answers[j] )
  }
}


//Time-Complexity O(1) -->Constant