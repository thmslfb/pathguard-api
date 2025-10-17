CREATE TABLE "verifications" (
	"verification_id" varchar(50) PRIMARY KEY NOT NULL,
	"status" varchar(20) NOT NULL,
	"risk_score" numeric(5, 3) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
