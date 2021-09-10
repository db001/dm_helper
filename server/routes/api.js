const requireLogin = require("../middleware/requireLogin");
const pool = require("../database/db");

module.exports = (app) => {
	app.get("/api/campaigns/", requireLogin, async (req, res) => {
		try {
			const campaigns = await pool.query(
				"SELECT * FROM campaigns WHERE dm_id = $1",
				[req.user.dm_id]
			);

			if (campaigns.rows.length == 0) {
				return res.send(null);
			}

			res.send(campaigns.rows);
		} catch (error) {
			console.error("Error in get campaigns");
			console.error(error);
			res.send(error.message);
		}
	});

	app.post("/api/campaigns/add", requireLogin, async (req, res) => {
		try {
			const campaign = await pool.query(
				"SELECT * FROM campaigns WHERE dm_id = $1 AND campaign_name = $2",
				[req.user.dm_id, req.body.name]
			);

			if (campaign.rows.length > 0) {
				return res.status(401).json("Campaign already exists");
			}

			const newCampaign = await pool.query(
				"INSERT INTO campaigns (dm_id, campaign_name) VALUES ($1, $2) RETURNING *",
				[req.user.dm_id, req.body.name]
			);

			res.send(newCampaign.rows[0]);
		} catch (error) {
			console.error("Error in add campaign");
			console.error(error);
			res.send(error.message);
		}
	});

	app.delete("/api/campaigns/delete/:id", requireLogin, async (req, res) => {
		try {
			const campaign = await pool.query(
				"SELECT FROM campaigns WHERE dm_id = $1 AND campaign_id = $2",
				[req.user.dm_id, req.params.id]
			);

			if (campaign.rows.length === 0) {
				return res.status(401).send("This campaign is not yours");
			}

			const deletedCampaign = await pool.query(
				"DELETE FROM campaigns WHERE dm_id = $1 AND campaign_id = $2 RETURNING *",
				[req.user.dm_id, req.params.id]
			);

			res.json(deletedCampaign.rows[0]);
		} catch (err) {
			console.error(err.message);
			res.send(err.message);
		}
	});
};
