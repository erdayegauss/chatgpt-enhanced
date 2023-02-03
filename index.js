const { Configuration, OpenAIApi } = require("openai")
const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: 'org-TZqf1bQRXckkbayuIuqIr4r7',
//    apiKey: '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',
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080
app.post('/', async (req, res) => {

    const { message, currentModel } = req.body;
//    console.log(message, "message")
//    console.log(currentModel, "currentModel")

    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 3000,
        temperature: 0.1,
    });
    if(response.data.choices[0].text){

        let tmp = response.data.choices[0].text
        //const result = tmp.split(";")[1];
        console.log(response.data)
        console.log("the result is: ", tmp)


    res.json({ message: tmp})
}

})

app.get('/models', async (req, res) => {

    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models: response.data.data
    })
})


app.listen(port, ()=>{
    console.log(`The app listening at http://localhost:${port}`)
})