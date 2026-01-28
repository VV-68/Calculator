let box=document.getElementById("display");
let box2=document.getElementById("display2");
let res=0;
box.value ="";
 let flag=0;
function addData(data){
    if(box2.value.length!=0){
        if(box2.value=="Error"){
            clearDisplay(1);
            return;
        }
        if(!(data=="+" || data=="-" || data=="/" || data=="x")){
                clearDisplay(1);
                return;
        }
        else{
            box.value=box2.value;
            box2.value="";
        }      
    }
    let lastChar=box.value[box.value.length-1];
    let lastSec = box.value[box.value.length-2];
    if(data=="0"){
        if(flag){
            box.value+=data;
            return
        }
        
    }
    if(data=="."){
        if(flag) return;
        flag=1;
    }
    if(data=="/"){
        flag=0;
        if(box.value.length==0) return;
        if(lastChar=="x" || lastChar=="-" || lastChar=="+" || lastChar=="/" ){
            if(!(lastSec=="+" || lastSec=="-" || lastSec=="/" || lastSec=="x")){
                box.value=box.value.slice(0,-1)+"/";
                return;
            }
            else
                return;
        }
    }
    if(data=="x"){
        flag=0;
        if(box.value.length==0) return;
        if(lastChar=="/" || lastChar=="-" || lastChar=="+" || lastChar=="x" ){
            if(!(lastSec=="+" || lastSec=="-" || lastSec=="/" || lastSec=="x")){
                box.value=box.value.slice(0,-1)+"x";
                return;
            }
            else{
                return;
            }
        }
    }
    if(data=="+"){
        flag=0;
        if(box.value.length==0) return;
        if(lastChar=="+"|| lastChar=="/" || lastChar=="x"){
            box.value=box.value.slice(0,-1)+"+";
            return;
        } 
        if(lastChar=="-"){
            if(!(lastSec=="/" || lastSec=="x")){
                box.value=box.value.slice(0,-1)+"+";
                return;
            } 
             if(lastSec=="/" || lastSec=="x"){
                box.value=box.value.slice(0,-1);
                return;
            } 
        }
    }
    if(data=="-"){
        flag=0;
        if(lastChar=="+"){
            box.value=box.value.slice(0,-1)+"-";
            return;
        }
        if(lastChar=="-"){
            if(box.value.length==1){
                box.value=box.value.slice(0,-1);
                return;
            }
            if(!(lastSec=="/" || lastSec=="x")){
                box.value=box.value.slice(0,-1)+"+";
                return;
            } 
             if(lastSec=="/" || lastSec=="x" ){
                box.value=box.value.slice(0,-1);
                return;
            } 
        }
    }
    box.value+=data;
}
function calculate(){
    let expression=box.value;
    let lastChar=expression[expression.length-1];
    if(lastChar=="+" || lastChar=="-" || lastChar=="x" || lastChar=="/"|| lastChar=="."){
        expression=expression.slice(0,-1);
        box.value=expression;
    }
    res=Number(eval(expression.replaceAll("x","*")).toFixed(6));
    if(res=="Infinity" || res=="-Infinity" || isNaN(res)){
        box2.value="Error";
        return;
    }
    box2.value=res; 
}

function clearDisplay(type){
    let lastChar=box.value[box.value.length-1];
    if(type){
        flag=0;
        box.value="";
        box2.value="";
    }
    else{
        if(lastChar=="+" || lastChar=="-" || lastChar=="/" || lastChar=="x"){
            flag=1;
        }
        if(lastChar=="."){
            flag=0;
        }
        box.value=box.value.slice(0,-1);
    }
}
body.addEventListener("keydown",function(event){
    let key=event.key;
    if((key>="0" && key<="9") || key=="+" || key=="-" || key=="/" || key=="*" || key=="."){
         event.preventDefault();
        if(key=="*") key="x";
        addData(key);
    }
    else if(key=="Enter"){
         event.preventDefault();
        calculate();
    }
    else if(key=="Backspace"){
         event.preventDefault();
        clearDisplay(0);
    }
    else if(key=="Delete"){
         event.preventDefault();
        clearDisplay(1);
    }
});