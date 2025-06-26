import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY?.trim();

export const generateLesson = async (prompt: string): Promise<string> => {
  if (!apiKey) throw new Error('Missing OpenAI API Key');

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', // ✅ זה ה-URL הנכון
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error('❌ OpenAI API Error:', error.response?.data || error.message);
    throw new Error('Failed to generate lesson from AI');
  }
};
