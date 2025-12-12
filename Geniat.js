define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : global.MascLabels, //Will appear in the data.
            title : {
                media : {word : global.MascLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: 'Man'},
                {word: 'Masculine'},
                {word: 'He'},
                {word: 'Him'},
                {word: 'His'},                 
                {word: 'Guy'}     
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },    
        category2 : {
            name : global.FemLabels, //Will appear in the data.
            title : {
                media : {word : global.FemLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: 'Woman'},
                {word: 'Feminine'},
                {word: 'She'},
                {word: 'Her'},
                {word: 'Hers'},
                {word: 'Lady'}
            ],
            //Stimulus css (style)
            stimulusCss : {color:'#31940F','font-size':'2.3em'}
        },
        attribute1 : {
            name : 'Others',
            title : {
                media : {word : 'Other words'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.OthWords[0]},
                {word: global.OthWords[1]},
                {word: global.OthWords[2]},
                {word: global.OthWords[3]},
                {word: global.OthWords[4]},
                {word: global.OthWords[5]},
                {word: global.OthWords[6]},
                {word: global.OthWords[7]}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        attribute2 : {
            name : 'Self words',
            title : {
                media : {word : 'Self words'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.SlfWords[0]},
                {word: global.SlfWords[1]},
                {word: global.SlfWords[2]},
                {word: global.SlfWords[3]},
                {word: global.SlfWords[4]},
                {word: global.SlfWords[5]},
                {word: global.SlfWords[6]},
                {word: global.SlfWords[7]}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        base_url : {//Where are your words at?
            word : global.baseURL
        },
        isTouch : global.$isTouch
    });
});

