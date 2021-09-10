-- CREATE DATABASE dmhelper;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE dungeon_master(
  dm_id UUID DEFAULT uuid_generate_v4(),
  google_id VARCHAR(255) NOT NULL UNIQUE,
  user_name VARCHAR(255),
  PRIMARY KEY (dm_id)
);

CREATE TABLE campaigns(
  campaign_id UUID DEFAULT uuid_generate_v4(),
  campaign_name VARCHAR(255) NOT NULL UNIQUE,
  dm_id UUID,
  PRIMARY KEY (campaign_id),
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id)
);

CREATE TABLE player_characters(
  character_id UUID DEFAULT uuid_generate_v4(),
  character_name VARCHAR(255),
  dnd_beyond_ref INT,
  player_initiative INT NOT NULL,
  player_dex INT NOT NULL,
  player_armour_class INT NOT NULL,
  player_hit_points INT NOT NULL,
  dm_id UUID,
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id),
  PRIMARY KEY (character_id)
);

CREATE TABLE campaign_players(
  campaign_id UUID,
  character_id UUID,
  dm_id UUID,
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id),
  FOREIGN KEY (character_id) REFERENCES player_characters(character_id),
  FOREIGN KEY (campaign_id) REFERENCES campaigns(campaign_id)
);

CREATE TABLE dm_players(
  dm_id UUID,
  character_id UUID,
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id),
  FOREIGN KEY (character_id) REFERENCES player_characters(character_id)
);

CREATE TABLE npcs(
  npc_id UUID DEFAULT uuid_generate_v4(),
  npc_initiative INT NOT NULL,
  npc_dex INT NOT NULL,
  npc_armour_class INT NOT NULL,
  npc_hit_points INT NOT NULL,
  dm_id UUID,
  PRIMARY KEY (npc_id),
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id)
);

CREATE TABLE dm_npcs (
  dm_id UUID,
  npc_id UUID,
  FOREIGN KEY (dm_id) REFERENCES dungeon_master(dm_id),
  FOREIGN KEY (npc_id) REFERENCES npcs(npc_id)
);