import express from 'express';
import bodyParser from 'body-parser';
import * as tf from '@tensorflow/tfjs-node'; // Adjusted for ES Module import
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Load your TensorFlow.js model
const loadModel = async () => {
    const model = await tf.loadLayersModel('file://path/to/your/model.json'); // Adjust path
    return model;
};

app.post('/predict', async (req, res) => {
    const question = req.body.question;
    const preprocessedQuestion = preprocessQuestion(question); // Define this function based on your model's input
    const model = await loadModel();
    const prediction = model.predict(preprocessedQuestion); // Adjust this line as needed
    const answer = postprocessPrediction(prediction); // Define this function based on your model's output

    res.json({ answer });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
