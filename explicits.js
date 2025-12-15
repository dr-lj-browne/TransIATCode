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
            {text:'10 - Extremely warm', value:10},
            {text:'9 - Very warm', value:9},
            {text:'8 - Moderately warm', value:8},
            {text:'7 - Somewhat warm', value:7},
            {text:'6 - Slightly warm', value:6},
            {text:'5 - Neither warm nor cold', value:5},
            {text:'4 - Slightly cold', value:4},
            {text:'3 - Somewhat cold', value:3},
            {text:'2 - Moderately cold', value:2},
            {text:'1 - Very cold', value:1},
            {text:'0 - Extremely cold', value:0}
        ]
    });


	
    /**
	*Specific questions
	*/	
    API.addQuestionsSet('attributes7',{
        inherit : 'basicSelect',
        name: 'attributes7',
        stem: 'Which statement best describes you?',
        answers: [
            {text:'I strongly prefer <%= global.FemLabels %> to <%= global.MascLabels %>.',value:7},
            {text:'I moderately prefer <%= global.FemLabels %> to <%= global.MascLabels %>.',value:6},
            {text:'I slightly prefer <%= global.FemLabels %> to <%= global.MascLabels %>.',value:5},
            {text:'I like <%= global.FemLabels %> and <%= global.MascLabels %> equally.',value:4},
            {text:'I slightly prefer <%= global.MascLabels %> to <%= global.FemLabels %>.',value:3},
            {text:'I moderately prefer <%= global.MascLabels %> to <%= global.FemLabels %>.',value:2},
            {text:'I strongly prefer <%= global.MascLabels %> to <%= global.FemLabels %>.',value:1}
        ]
    });
	
    API.addQuestionsSet('thermMasc',{
        inherit : 'therm',
        name: 'thermMasc',
        stem: 'How <b>masculine</b> would you say your gender identity is?'
    });

    API.addQuestionsSet('thermFem',{
        inherit : 'therm',
        name: 'thermFem',
        stem: 'How <b>feminine</b> would you say your gender identity is? %></b>?'
    });
    API.addQuestionsSet('thermAndro',{
        inherit : 'therm',
        name: 'thermAndro',
        stem: 'How <b>androgynous or non-binary</b> would you say your gender identity is? %></b>?'
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
