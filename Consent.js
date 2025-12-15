define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false, //Change to true if you don't want to show the submit button.
        header: 'Questionnaire',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Decline to Answer', 
        autoFocus:true, 
        progressBar:  'Page <%= pagesMeta.number %> out of 3'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Please select an answer'' 
                : 'Please select an answer''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });
	
	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('cYN',{
        inherit : 'basicSelect',
        name: 'cYN',
        stem: 'Do you agree to the research described above?',
        answers: [
            {text:'Yes.',value:1},
            {text:'No.',value:0},
        ]
    });
	    API.addQuestionsSet('AgeYN',{
        inherit : 'basicSelect',
        name: 'AgeYN',
        stem: 'Are you at least 18 years old?',
        answers: [
            {text:'Yes.',value:1},
            {text:'No.',value:0},
        ]
    });
		    API.addQuestionsSet('TransYN',{
        inherit : 'basicSelect',
        name: 'TransYN',
        stem: 'Do you identify as transgender (including binary and non-binary identities that fall under the transgender umbrella?',
        answers: [
            {text:'Yes.',value:1},
            {text:'No.',value:0},
        ]
    });
		    API.addQuestionsSet('usYN',{
        inherit : 'basicSelect',
        name: 'usYN',
        stem: 'Do you currently live in the United States?',
        answers: [
            {text:'Yes.',value:1},
            {text:'No.',value:0},
        ]
    });
    API.addSequence([
        {
            mixer : 'random', 
            data : [
                {
                    mixer : 'random', 
                    wrapper:true, 
                    data : [
                {
                    inherit:'basicPage', 
                    questions: {inherit:'cYN'}
                }
						                {
                    inherit:'basicPage', 
                    questions: {inherit:'AgeYN'}
                }
						                {
                    inherit:'basicPage', 
                    questions: {inherit:'TransYN'}
                }
						                {
                    inherit:'basicPage', 
                    questions: {inherit:'usYN'}
                }
            ]
        }
    ]);

    return API.script;
});
