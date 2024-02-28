ALTER TABLE "aith_links" RENAME TO "auth_links";--> statement-breakpoint
ALTER TABLE "auth_links" DROP CONSTRAINT "aith_links_code_unique";--> statement-breakpoint
ALTER TABLE "auth_links" DROP CONSTRAINT "aith_links_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auth_links" ADD CONSTRAINT "auth_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "auth_links" ADD CONSTRAINT "auth_links_code_unique" UNIQUE("code");