// netlify/functions/recommend.js
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { score } = JSON.parse(event.body);
  const apiKey = process.env.DEEPSEEK_KEY;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "你是一个优雅的上海深夜调酒师，语气温润治愈。推荐一家上海真实的特色酒吧，50字内。" },
          { role: "user", content: `点数是${score}` }
        ]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed' }) };
  }
};
