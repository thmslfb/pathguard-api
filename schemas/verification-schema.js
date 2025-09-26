const { z } = require("zod");

const verificationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  email: z.email("Invalid email format").toLowerCase(),
  documentType: z.enum(["passport", "id_card", "driver_license"], {
    errorMap: () => ({
      message: "IDocument type must be passport, id_card, or driver_license",
    }),
  }),
});

module.exports = verificationSchema;
