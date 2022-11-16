//import React from "react";

var family = {
    //perons data type = array
        //starting money value 
        name: "",
        bankAccount: 2000,
        familyMembers: null,
        //instances may not be valid
        //does let vs var make a difference here? 
        setName: function(){
            this.name = document.getElementById("familyName").value;
            document.getElementById("homeTitle").innerHTML = "The " + this.name + " Family";
        },

        familyOf4: function(){
            let sarah = new FamilyMember("Sarah");
            let tessa = new FamilyMember("Tessa");
            let riley = new FamilyMember("Riley");
            let e = new FamilyMember("E");
            this.familyMembers = {sarah, tessa, riley, e};
        }
}

class FamilyMember{
    constructor(name){
        this.name = name;
        this.vote = null;
    }
}


class HeadOfFamily extends FamilyMember{
}

let votingBlock = function(title){
    document.getElementById("testVoteBlock").innerHTML = "pizzaSauce";
}
//correct this below by not making family accesible to the window?



/*Below are all the html pages to load.
 *After they work, find a more efficient/modern way to load them.
 */

 
let pageLoaded = function(){
    //document.querySelector("body").innerHTML = "<h1>happy<\h1>";
    $(document).ready(function(){
        $("#introductionParagraph").text("happy");
    })
}

/**class TestRender extends React.Component{
    render(){
        return <h1>React is Working</h1>
    }
}

const testReact = () => {
    ReactDOM.render(<TestRender/>,document.getElementById("reactTester"));
}**/