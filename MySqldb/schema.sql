CREATE TABLE sw_favorite_character (
character_id VARCHAR(50) NOT NULL,
name VARCHAR(200) NOT NULL,
notes TEXT,
created_at DATETIME DEFAULT NOW(),
PRIMARY KEY (character_id)
);
