import User from "../models/User.js";
import PDFParser from "pdf2json";
import fs from "fs";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => {
      console.error(err);
      return res.status(500).json({ message: "PDF parsing error" });
    });

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      let extractedText = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((text) => {
          text.R.forEach((run) => {
            try {
              extractedText += decodeURIComponent(run.T) + " ";
            } catch {
              extractedText += run.T + " ";
            }
          });
        });
      });

      const user = await User.findById(req.user._id);

      user.resume = {
        fileUrl: req.file.path,
        extractedText,
      };

      await user.save();

      res.json({
        message: "Resume uploaded successfully",
        extractedTextPreview: extractedText.substring(0, 200),
      });
    });

    pdfParser.loadPDF(req.file.path);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
