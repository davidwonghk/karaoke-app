const express = require('express');
const router = express.Router();
const fs = require( 'fs' );

const payload = {
	'result': [],
}

//load all songs
let allSongs = [];
(async () => {
	const dir = await fs.promises.opendir(process.env.VIDEO_DIRECTORY);
	const result = [];
	for await (const {name} of dir) {
		result.push({name});
	}
	return result;
})().then(payload => allSongs = payload);


router.get('/', (req, res) => {
	const {offset, limit, query} = req.query;
	const songs = !!query ? allSongs.filter(s=>s.name.includes(query)) : allSongs;
	return res.json({songs: songs.slice(
		offset||0,
		limit||songs.length
	)});
});

module.exports = {router};
