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

            {text:'I strongly prefer <%= response.ageyn %>.',value:7},
            {text:'I moderately prefe<%= response.ageyn %>.',value:6},
       
        ]
    });


	
    /**
	*Specific questions
	*/	

    API.addQuestionsSet('thermMasc',{
        inherit : 'therm',
        name: 'thermMasc',
        stem: 'How <b>masculine</b> would you say your gender identity is?'
    });

    API.addQuestionsSet('thermFem',{
        inherit : 'therm',
        name: 'thermFem',
        stem: 'How <b>feminine</b> would you say your gender identity is?'
    });
    API.addQuestionsSet('thermAndro',{
        inherit : 'therm',
        name: 'thermAndro',
        stem: 'How <b>androgynous or non-binary</b> would you say your gender identity is?'
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
                            questions: {inherit:'thermMasc'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'thermFem'}							
                        },
						{
                            inherit:'basicPage', 
                            questions: {inherit:'thermAndro'}							
                        }
                    ]
                },
                {
                    inherit:'basicPage', 
                    questions: {inherit:'attributes7'}
                }
            ]
        }
    ]);

    return API.script;
});
