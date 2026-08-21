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
                ? 'Please select an answer, or click \'Decline\'' 
                : 'Please select an answer, or click \'Decline to Answer\''
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
	
    API.addQuestionsSet('basicDropdown',{
        inherit :'basicQ',
        type : 'dropdown',
        autoSubmit:false
    });
	
    API.addQuestionsSet('therm',{
        inherit: 'basicSelect',
        answers: [
            {text:'10', value:10},
            {text:'9', value:9},
            {text:'8', value:8},
            {text:'7', value:7},
            {text:'6', value:6},
            {text:'5', value:5},
            {text:'4', value:4},
            {text:'3', value:3},
            {text:'2', value:2},
            {text:'1', value:1},
            {text:'0', value:0}
        ]
    });

	
    /**
	*Specific questions
	*/	

    API.addQuestionsSet('Masc',{
        inherit : 'therm',
        name: 'Mascul',
        stem: 'On a scale of 1-10, how masculine would you say your gender identity is? </b>?'
    });

    API.addQuestionsSet('Fem',{
        inherit : 'therm',
        name: 'Femin',
        stem: 'On a scale of 1-10, how feminine would you say your gender identity is?</b>?'
    });
	API.addQuestionsSet('And',{
        inherit : 'therm',
        name: 'Andro',
        stem: 'On a scale of 1-10, how androgynous would you say your gender identity is?</b>?'
    });

    API.addSequence([
                {
                    mixer : 'random', 
                    wrapper:true, 
                    data : [
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'Masc'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'Fem'}							
                        },
						{
                            inherit:'basicPage', 
                            questions: {inherit:'And'}							
                        }
						}
            ]
    ]);

    return API.script;
});
