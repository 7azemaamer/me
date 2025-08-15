import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { pin, id, title, slug, content, excerpt, cover_image, tags } =
    req.body;

  if (pin !== process.env.ADMIN_PIN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = createClient(
    process.env.PROJECT_URL,
    process.env.SUPABASE_KEY
  );

  const { data, error } = await supabase
    .from("blogs")
    .update({
      title,
      slug,
      content,
      excerpt: excerpt || null,
      cover_image: cover_image || null,
      tags: tags || [],
    })
    .eq("id", id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ success: true, data });
}
