'use strict';

var familyF = {
    name: "",
    setName: function(name){
        this.name = name
    }
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
            <DescpriptionParagraph day = {this.state.day}/>
            <UserInteraction day = {this.state.day}/>
            <button onClick = {this.handleClick}>Next</button>
        </div>
    }
}

const Title = (props) => {
    if(props.day == 0){
        return <h1 id = "homeTitle">The Family</h1>
    }
    else {
        return <h1>{"Day " + props.day}</h1>
    }
}

const DescpriptionParagraph = (props) => {
    switch(props.day){
        case 0:
            return <IntroDescription/>
        case 1:
            return <p>
                Rent is due today ($1450 for a 3 bedroom apt in Palatine). Riley has basketball tryouts today! Good luck, Riley! Usually, Riley walks to the elementary school and picks E. up on the way home after E. meets with their math tutor (free from the school). Today, Riley can't walk E. home. Tessa has a club meeting after school, and Sarah has work. How should E. get home? 

                Task: Pay rent ($1450)

                Task: Choose one option for E.'s transportation:

                    Option 1: E. should skip math tutoring and take the school bus ($0.00)
                    Option 2: Tessa should skip her club meeting to get E. ($0.00)
                    Option 3: Sarah should get someone to sub for her at work ($30.00)
            </p>
    }
}

const UserInteraction = (props) => {
    switch(props.day){
        case 0:
            return <div>
                <input type = "text" onInput = "familyF.setName()" placeholder ="Family Name"/>
            </div>
        case 1:
            return <div>
                <button>E Skip</button>
                <button>Tess Skip</button>
                <button>Sarah Sub</button>
            </div>
    }
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


const domContainer = document.querySelector('#react_tester');
const root = ReactDOM.createRoot(domContainer);
root.render(<Webpage />);