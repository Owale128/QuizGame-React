export const submitResult = async (username: string, score: number, userAnswers: {}): Promise<void> => {
    try {
        const result = {
            username: username,
            score: score,
            answers: userAnswers
        };
        const response = await fetch('https://quizbackend-9soc.onrender.com/userResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        });
        if (!response.ok) {
            throw new Error('Kunde inte skicka resultat');
        }

    } catch (error) {
        console.error('Fel vid skickning av resultat:', error);
    }
};