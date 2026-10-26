CREATE TABLE `gemini_connections` (
	`user_id` text PRIMARY KEY NOT NULL,
	`ciphertext` text NOT NULL,
	`iv` text NOT NULL,
	`text_model` text NOT NULL,
	`tts_model` text,
	`verified_at` integer NOT NULL
);
