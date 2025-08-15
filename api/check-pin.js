export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pin } = req.body;


  if (!pin) {
    return res.status(400).json({ success: false, error: "PIN is required" });
  }

  if (!process.env.ADMIN_PIN) {
    return res.status(500).json({ success: false, error: "Server configuration error" });
  }

  if (pin === process.env.ADMIN_PIN) {
    console.log("PIN authentication successful");
    return res.status(200).json({ success: true });
  } else {
    console.log("PIN authentication failed");
    return res.status(401).json({ success: false, error: "Invalid PIN" });
  }
}
