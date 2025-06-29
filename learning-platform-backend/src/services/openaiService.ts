import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY?.trim();

export const generateLesson = async (prompt: string): Promise<string> => {
  if (!apiKey) throw new Error('Missing OpenAI API Key');

  try {
    console.log('🧠 Sending prompt to OpenAI:', prompt);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
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

    const message = response.data?.choices?.[0]?.message?.content;
    if (!message) {
      console.error('❌ Invalid OpenAI response:', response.data);
      throw new Error('Invalid response from OpenAI');
    }

    return message.trim();
  } catch (error: any) {
    console.error('❌ OpenAI API Error:', error.response?.data || error.message);
    throw new Error('Failed to generate lesson from AI');
  }
};
