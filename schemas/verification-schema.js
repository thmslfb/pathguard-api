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

const verificationIdSchema = z.object({
  id: z
    .string()
    .regex(
      /^ver_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "Invalid verification ID format. Must be in format: ver_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    ),
});

module.exports = { verificationSchema, verificationIdSchema };
