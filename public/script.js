function findAnswer() {
    const passage = document.getElementById('passage').innerText;
    const question = document.getElementById('user-question').value;
    qna.load().then(model => {
        model.findAnswers(question, passage).then(answers => {
            console.log(answers);
            if (answers.length > 0) {
                document.getElementById('answer').innerHTML = "Agent AI: " + answers[0].text;
            } else {
                document.getElementById('answer').innerHTML = "No answer found.";
            }
        });
    });
}