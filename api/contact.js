module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const b = req.body || {};
  const name       = b.name       || '';
  const phone      = b.phone      || '';
  const email      = b.email      || '';
  const company    = b.company    || '';
  const objectType = b['object-type'] || '';
  const area       = b.area       || '';
  const budget     = b.budget     || '';
  const message    = b.message    || '';
  const howFound   = b['how-found'] || '';

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  const OBJ = { office:'Офис', retail:'Торговый зал', restaurant:'Ресторан/кафе', medical:'Медицина', warehouse:'Склад/производство', other:'Другое' };
  const BUD = { to3m:'до 3 млн ₽', '3to10m':'3–10 млн ₽', '10to30m':'10–30 млн ₽', '30plus':'более 30 млн ₽' };
  const SRC = { search:'Поисковик', recommend:'Рекомендация', social:'Соцсети', other:'Другое' };

  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' });

  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  const lines = [
    '🔔 <b>НОВАЯ ЗАЯВКА — DUMAEV</b>',
    `🕐 <i>${now} (Екб)</i>`,
    '',
    `👤 <b>Имя:</b> ${esc(name)}`,
    `📞 <b>Телефон:</b> ${esc(phone)}`,
    email   ? `📧 <b>Email:</b> ${esc(email)}` : null,
    company ? `🏢 <b>Компания:</b> ${esc(company)}` : null,
    objectType ? `🏗 <b>Объект:</b> ${OBJ[objectType] || esc(objectType)}` : null,
    area    ? `📐 <b>Площадь:</b> ${esc(area)} м²` : null,
    budget  ? `💰 <b>Бюджет:</b> ${BUD[budget] || esc(budget)}` : null,
    message ? `\n💬 <b>Задача:</b>\n${esc(message)}` : null,
    howFound ? `\n🔍 <b>Источник:</b> ${SRC[howFound] || esc(howFound)}` : null,
  ];

  const text = lines.filter(Boolean).join('\n');

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
    const data = await r.json();
    if (!data.ok) {
      console.error('Telegram error:', data);
      return res.status(500).json({ error: 'Telegram delivery failed' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Network error' });
  }
};
