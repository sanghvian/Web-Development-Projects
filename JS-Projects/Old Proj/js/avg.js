var subj = ["English","Maths","Science","Economics"];
var sum = 0;

function math()
{
  for(var counter = 0; counter<subj.length; counter++)
  {
  var x = prompt("What are your marks in " + subj[counter]);
  sum += x;
  } 
  
document.write(sum/avg.length);
}