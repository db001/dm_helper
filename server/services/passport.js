const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

const pool = require("../database/db");

passport.serializeUser((user, done) => {
	done(null, user.dm_id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await pool.query(
			"SELECT * FROM dungeon_master WHERE dm_id = $1",
			[id]
		);
		done(null, user.rows[0]);
	} catch (error) {
		console.error(`Deserialize error: ${error.message}`);
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await pool.query(
					"SELECT * FROM dungeon_master WHERE google_id = $1",
					[profile.id]
				);

				if (user.rows.length > 0) {
					console.log("User exists");
					done(null, user.rows[0]);
				} else {
					let newUser = await pool.query(
						"INSERT INTO dungeon_master (google_id, user_name) VALUES ($1, $2) RETURNING *",
						[profile.id, profile.displayName]
					);

					done(null, newUser.rows[0]);
				}
			} catch (err) {
				console.error(`Error in GoogleStrategy: ${err.message}`);
			}
		}
	)
);
