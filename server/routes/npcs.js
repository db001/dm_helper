const requireLogin = require("../middleware/requireLogin");
const pool = require("../database/db");

module.exports = (app) => {
	app.get("/api/npcs/", requireLogin, async (req, res) => {
		try {
			const npcs = await pool.query("SELECT * FROM npcs WHERE dm_id = $1", [req.user.dm_id]);

			if (npcs.rows.length == 0) {
				return res.send(null);
			}

			res.send(npcs.rows);
		} catch (error) {
			console.error("Error in get npcs");
			console.error(error);
			res.send(error.message);
		}
	});

	app.post("/api/npcs/add", requireLogin, async (req, res) => {
		try {
			const npc = await pool.query("SELECT * FROM npcs WHERE dm_id = $1 AND npc_name = $2", [
				req.user.dm_id,
				req.body.name,
			]);

			if (npc.rows.length > 0) {
				return res.status(401).json("NPC already exists");
			}

			const newPlayer = await pool.query(
				`INSERT INTO npcs (
                    dm_id,
                    npc_name,
                    npc_initiative,
                    npc_dex,
                    npc_armour_class,
                    npc_hit_points
                ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
				[req.user.dm_id, req.body.name, req.body.initiative, req.body.dex, req.body.armourClass, req.body.hitPoints]
			);

			res.send(newPlayer.rows[0]);
		} catch (error) {
			console.error("Error in add campaign");
			console.error(error);
			res.send(error.message);
		}
	});

	app.delete("/api/npcs/delete/:id", requireLogin, async (req, res) => {
		try {
			const npc = await pool.query("SELECT FROM npcs WHERE dm_id = $1 AND npc_id = $2", [
				req.user.dm_id,
				req.params.id,
			]);

			if (npc.rows.length === 0) {
				return res.status(401).send("This npc is not yours");
			}

			const deletedNpc = await pool.query("DELETE FROM npcs WHERE dm_id = $1 AND npc_id = $2 RETURNING *", [
				req.user.dm_id,
				req.params.id,
			]);

			res.json(deletedNpc.rows[0]);
		} catch (err) {
			console.error(err.message);
			res.send(err.message);
		}
	});

	app.get("/api/npcs/campaign/:id", requireLogin, async (req, res) => {
		try {
			const npcs = await pool.query(
				`SELECT DISTINCT * 
                FROM npcs
                INNER JOIN campaign_npcs
                ON campaign_npcs.npc_id = npcs.npc_id
                WHERE campaign_npcs.campaign_id = $1
                AND campaign_npcs.dm_id = $2`,
				[req.params.id, req.user.dm_id]
			);
			return res.status(200).json({ npcs: npcs.rows });
		} catch (error) {
			console.error(error.message);
			res.send(error.message);
		}
	});

	app.get("/api/npcs/nocampaign/:id", requireLogin, async (req, res) => {
		try {
			const npcs = await pool.query(
				`SELECT DISTINCT * FROM npcs WHERE NOT EXISTS (
                    SELECT campaign_npcs.npc_id
                    FROM campaign_npcs
                    WHERE npcs.npc_id = campaign_npcs.npc_id
                    AND campaign_npcs.campaign_id = $1
                    AND npcs.dm_id = $2)`,
				[req.params.id, req.user.dm_id]
			);
			return res.status(200).json({ npcs: npcs.rows });
		} catch (error) {
			console.error(error.message);
			res.send(error.message);
		}
	});

	app.put("/api/npcs/campaign/add/:id", requireLogin, async (req, res) => {
		try {
			const player = await pool.query("SELECT * FROM campaign_npcs WHERE campaign_id = $1 AND npc_id = $2", [
				req.body.campaign_id,
				req.body.player_id,
			]);

			if (player.rows.length > 0) {
				return res.status(200).json({ player: player.rows[0] });
			}
			// Put check in to make sure player hasn't already been added to the campaign
			const addPlayer = await pool.query(
				"INSERT INTO campaign_npcs (campaign_id, npc_id, dm_id) VALUES ($1, $2, $3) RETURNING *",
				[req.body.campaign_id, req.params.id, req.user.dm_id]
			);
			return res.status(200).send(addPlayer.rows[0]);
		} catch (error) {
			console.error(error.message);
			res.send(error.message);
		}
	});

	app.delete("/api/npcs/campaign/remove/:id", requireLogin, async (req, res) => {
		try {
			const player = await pool.query(
				"SELECT FROM campaign_players WHERE dm_id = $1 AND campaign_id = $2 AND npc_id = $3",
				[req.user.dm_id, req.body.campaign_id, req.params.id]
			);

			if (player.rows.length === 0) {
				return res.status(401).send("This player is not yours");
			}

			const deletedPlayer = await pool.query(
				"DELETE FROM campaign_players WHERE dm_id = $1 AND npc_id = $2 RETURNING *",
				[req.user.dm_id, req.params.id]
			);

			res.json(deletedPlayer.rows[0]);
		} catch (err) {
			console.error(err.message);
			res.send(err.message);
		}
	});
};
