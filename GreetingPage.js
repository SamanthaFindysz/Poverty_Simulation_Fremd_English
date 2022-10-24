class Family{
    //perons data type = array
    constructor(name){
        //starting money value 
        this.name = name;
        this.bankAccount = 2000;
        //instances may not be valid
        //does let vs var make a difference here? 
        this.sarah = new HeadOfFamily("Sarah");
        this.tessa = new FamilyMember("Tessa");
        this.riley = new FamilyMember("Riley");
        this.e = new FamilyMember("E");
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
let family;
let createFamily = function(){
    family = new Family(document.getElementById("familyName").value);
}