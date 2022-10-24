let family = {
    //perons data type = array
        //starting money value 
        name: "",
        bankAccount: 2000,
        //instances may not be valid
        //does let vs var make a difference here? 
        //sarah: new HeadOfFamily("Sarah"),
        //let tessa = new FamilyMember("Tessa"),
        //riley: new FamilyMember("Riley"),
        //e: new FamilyMember("E")
        setName: function(){
            this.name = document.getElementById("familyName").value;
            document.getElementById("familyTitle").innerHTML = "The " + this.name + " Family";
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

//correct this below by not making family accesible to the window?
