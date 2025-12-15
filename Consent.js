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
	
    API.addQuestionsSet('yesno',{
        inherit: 'basicSelect',
        answers: [

            {text:'Yes', value:1},
            {text:'No', value:0}
        ]
    });


	
    /**
	*Specific questions
	*/	

    API.addQuestionsSet('conyn',{
        inherit : 'therm',
        name: 'conyn',
        stem: 'Do you consent to the research?'
    });

    API.addQuestionsSet('ageyn',{
        inherit : 'therm',
        name: 'ageyn',
        stem: 'Are you at least 18 years old?'
    });
    API.addQuestionsSet('usyn',{
        inherit : 'therm',
        name: 'usyn',
        stem: 'Do you currently live in the United States?'
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
                            questions: {inherit:'conyn'}
                        },
                        {
                            inherit:'basicPage', 
                            questions: {inherit:'ageyn'}							
                        },
						{
                            inherit:'basicPage', 
                            questions: {inherit:'usyn'}							
                        }
                    ]
                }
            ]
        }
    ]);

    return API.script;
});
