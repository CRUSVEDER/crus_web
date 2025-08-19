import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean;
  message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { password } = req.body;
  const correctPassword = process.env.PDF_PASSWORD || "1234";

  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  if (password === correctPassword) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: "Invalid password" });
  }
}