'use strict';

//may be useful for xml: https://reactjs.org/docs/faq-ajax.html
//all the events that react can respond to: https://reactjs.org/docs/events.html

const family = {
    //perons data type = array
        //starting money value 
        name: "",
        bankAccount: 2000,
        familyMembers: null,
        //instances may not be valid
        //does let vs var make a difference here? 
        setName: function(event){
            this.name = event.target.value;
            changeHomeTitle();
        },

        familyOf4: function(){
            this.familyMembers = 
            [new FamilyMember("Sarah"),
            new FamilyMember("Tessa"),
            new FamilyMember("Riley"),
            new FamilyMember("E")];
            console.log(this.familyMembers);
        },
        submitPayment: function(event){
            this.bankAccount -= event.target.dataset.cost;
            changeBankAccount();
            event.target.disabled = true; 
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


/**Below are all the html pages to load.
 *After they work, find a more efficient/modern way to load them.
 **/

/**this may be something that should be done with lifecycle functions once I implement
 * store. This as well as the bank account change and all other stats. 
 */
 const changeHomeTitle = function(){
    //document.querySelector("body").innerHTML = "<h1>happy<\h1>";
    $(document).ready(function(){
        $("#homeTitle").text("The " + family.name + " Family");
    })
}
const changeBankAccount = function(){
    $(document).ready(function(){
        $('#bankValue').text("Current Account: $" + family.bankAccount);
    })
}

class Webpage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            day: 0
        }

        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(){
        this.setState({day: 1});
    }
    render(){
        return <div>
            <Title day = {this.state.day}/>
            {/**
             * rethink location of stats, and the rest in general
             */}
            <Stats day = {this.state.day}/>
            <DescpriptionParagraph day = {this.state.day}/>
            <UserInteraction day = {this.state.day}/>
            <button onClick = {this.handleClick}>Next</button>
        </div>
    }
}


const Title = (props) => {
    if(props.day == 0){
        //figure out how to change the props.name
        return <h1 id = "homeTitle">The Family</h1>
    }
    else {
        return <h1>{"Day " + props.day}</h1>
    }
}

const Stats = (props) => {
    return <div>
        <h2 id = "bankValue">Current Account: ${family.bankAccount}</h2>
    </div>
}

const DescpriptionParagraph = (props) => {
    switch(props.day){
        case 0:
            return <IntroDescription/>
        case 1:
            return <p>
                Rent is due today ($1450 for a 3 bedroom apt in Palatine). Riley has basketball tryouts today! Good luck, Riley! Usually, Riley walks to the elementary school and picks E. up on the way home after E. meets with their math tutor (free from the school). Today, Riley can't walk E. home. Tessa has a club meeting after school, and Sarah has work. How should E. get home? 

                {/**Task: Pay rent ($1450)

                Task: Choose one option for E.'s transportation:

                    Option 1: E. should skip math tutoring and take the school bus ($0.00)
                    Option 2: Tessa should skip her club meeting to get E. ($0.00)
    Option 3: Sarah should get someone to sub for her at work ($30.00)*/}
            </p>
    }
}

const UserInteraction = (props) => {
    switch(props.day){
        case 0:
            return <div>
                <input type = "text" onInput = {(event) => family.setName(event)} placeholder ="Family Name"/>
                {/**Need to require users to choose one family creation if more family size
                 * options are made. Otherwise, must initialize familyMembers without familyOf4 function
                 */}
                <button onClick = {() => family.familyOf4()}>Create Family of 4</button>
            </div>
        case 1:
            return <div>
                {/**
                 * should use store to control the unmounting of this button once it is paid.
                 * https://stackoverflow.com/questions/36985738/how-to-unmount-unrender-or-remove-a-component-from-itself-in-a-react-redux-typ
                 */}
                <button onClick = {(event) => family.submitPayment(event)} data-cost = "1450" id = "payTest">Pay Rent ($1450)</button>
                <VotingBlock options = {["E Skip", "Tessa Skip", "Sarah sub"]}/>
                <button onClick = {() => submitVotes()}>Submit Votes</button>
            </div>
    }
}

const VotingBlock = (props) => {
    const members = family.familyMembers.map(i => <th key = {i.name}>{i.name}</th>)
    return <table>
        <thead><tr>
            {/**creates a blank spot to put options under */}
            <th></th>
            {members}
        </tr></thead>
        <tbody>
            <VotingBlockRow options = {props.options} members = {members.length}/>
        </tbody>
    </table>   
}

const VotingBlockRow = (props) => {
    let rows = [];
    for(let i = 0; i < props.options.length; i++){
        rows.push(<tr key = {"row" + i}><VotingBlockChecks options = {props.options[i]} members = {props.members} optionNum = {i}/></tr>)
    }
    return rows;
}

//checkSubmit(props.optionNum, i)
const VotingBlockChecks = (props) => {
    let checks = [<td key = {"option" + props.optionNum}>{props.options}</td>];
    for(let i = 0; i < props.members; i++){
        //'() => function' ensures that the function is only passed and not called at the same time 
        //answer to input in functional componet: https://stackoverflow.com/questions/56122523/how-to-pass-arguments-to-function-in-functional-component-in-react
        checks.push(<td key = {"box" + props.optionNum + i}>
            <input type = "checkbox" onChange = {(event) => checkBoxSubmit(event)} 
            data-option-num = {props.optionNum} data-i ={i} id = {"box" + props.optionNum + i}/></td>)
    }
    return checks; 
} 


const checkBoxSubmit = (event) => {
    //console.log(event)
    //event.target.dataset: https://bobbyhadz.com/blog/react-get-data-attribute-from-event
    //console.log(event.target.dataset)
    //console.log(event.target.dataset.optionNum)
    let member = event.target.dataset.i;
    let option = event.target.dataset.optionNum
    /**resets the previosly checked checkbox, if there is one
     * try to figure out a way to do this without gEBI (making the columns interdependent?)
     * will be an error if more than one votingBlock per page
     */ 
    if(family.familyMembers[member].vote != null){
        document.getElementById("box" + family.familyMembers[member].vote + member).checked = false;
    } 
    family.familyMembers[member].vote = option;
}

const submitVotes = () => {

}

const IntroDescription = (props) => {
    return <p>Before you begin, decide who will play which role in your family: 

    Mom: Sarah works full time in retail, and makes $652/week after taxes. Sarah is your HEAD OF HOUSEHOLD, who will have the final decision on all matters if the group is ever split/undecided. In a group of 5, you may double Sarah's role and thus gain more income.
    
    Child: Tessa is a high school senior going through the college app process. Tessa is your TIME KEEPER, who needs a careful eye on the clock.
    
    Child: Riley is a high school freshman who loves basketball. Riley is your RECORD KEEPER, who will need notes + math skills to keep track of finances. 
    
    Child: E. is a 5th grader who loves basketball and video games. E. is your TASK MANAGER, who will need paper or your iPad to keep notes on choices the group makes and general feelings/attitudes/reactions you notice (this will help you lead discussion later)

    Before you begin, read through the directions that follow. 

    You are about to go through a simulation that will show you life from this family's perspective for 30 minutes at a time. Each 30 minute period is equal to 1 week (we'll see 1 week Wednesday + 1 week Thursday). 

    Your TIMEKEEPER must keep an eye on the clock to let the family know when the week is close to ending so they can work to get what they need for the week. 

    Each slide is one day in the 2 weeks, and you may move through them at your own pace. It might be helpful to have 1 family member have the slides on their iPad so the family can examine the day's task(s) together. As a family, discuss how to achieve the day's task(s). Take time to read the sources at the bottom as well.

    TASK MANAGER, keep a list of the options your family chooses along the way, either on paper or on your iPad. At the end of the process, you will be in charge of leading the reflection discussion using these notes.

    RECORD KEEPER, each day will prompt you to remind the family of how much money you have to spend. Keep careful track of your finances so this is accurate. 

    This simulation is not perfect, in that the choices you make are not directly programmed into explicitly consequences. This is purposeful, as it avoids making this experience too much of a "game." 

    As you make choices, you should discuss how they might impact a family. Which choices would cause distress? What might have happened had you made a different choice? Do you see options that this simulation didn't allow for?

    You may also make decisions that aren't options here. For instance, you may choose to search for a cheaper apartment on your own as a way to save money on rent. You would have to make this choice on your own, and use your own research to follow through.

    A final note on this activity:


    Please keep in mind that this is only a simulation. You will soon see a quote in chapter 1 of this book that states: "'You should hang out, get to know what [people] do, how they do it'" (Venkatesh 21). We can't get to know exactly what the Dalton family would do, so this is an attempt to get only a glimpse. Every person is different and will make choices based on their personal background and opinions, and we can't forget that. 

    The intent of this activity is not to get a perfect idea of what life for a family like the Daltons might be like. It is only to make us think from a different perspective for a while. 

    The Dalton family experience is based on recent research. If you end early, take a look through this research to give you more context as you prepare to read our next book.
    </p>
}


const domContainer = document.getElementById('react_tester');
const root = ReactDOM.createRoot(domContainer);
root.render(<Webpage />);