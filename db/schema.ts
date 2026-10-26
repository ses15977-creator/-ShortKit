import {sqliteTable,text,integer,primaryKey,index} from 'drizzle-orm/sqlite-core';
export const geminiConnections=sqliteTable('gemini_connections',{
 userId:text('user_id').primaryKey(),
 ciphertext:text('ciphertext').notNull(),
 iv:text('iv').notNull(),
 textModel:text('text_model').notNull(),
 ttsModel:text('tts_model'),
 verifiedAt:integer('verified_at').notNull(),
});

export const sharedAiUsage=sqliteTable('shared_ai_usage',{
 day:text('day').notNull(),
 visitor:text('visitor').notNull(),
 used:integer('used').notNull(),
},table=>[primaryKey({columns:[table.day,table.visitor]})]);

export const aiUsageEvents=sqliteTable('ai_usage_events',{
 id:text('id').primaryKey(),
 day:text('day').notNull(),
 visitor:text('visitor').notNull(),
 action:text('action').notNull(),
 model:text('model').notNull(),
 inputTokens:integer('input_tokens').notNull().default(0),
 outputTokens:integer('output_tokens').notNull().default(0),
 createdAt:integer('created_at').notNull(),
},table=>[index('idx_ai_usage_events_visitor').on(table.visitor)]);

export const siteMembers=sqliteTable('site_members',{
 userId:text('user_id').primaryKey(),
 provider:text('provider').notNull(),
 email:text('email').notNull(),
 displayName:text('display_name').notNull(),
 usageVisitor:text('usage_visitor').notNull(),
 createdAt:integer('created_at').notNull(),
 lastSeenAt:integer('last_seen_at').notNull(),
});

export const siteSettings=sqliteTable('site_settings',{
 key:text('key').primaryKey(),
 ciphertext:text('ciphertext').notNull(),
 iv:text('iv').notNull(),
 updatedAt:integer('updated_at').notNull(),
});
