export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pin } = req.body;

  if (pin === process.env.ADMIN_PIN) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, error: "Invalid PIN" });
  }
}
