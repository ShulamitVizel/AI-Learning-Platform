import axios from 'axios';

export const generateLesson = async (promptText: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: promptText,
      max_tokens: 150,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].text.trim();
};
