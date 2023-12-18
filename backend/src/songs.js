const express = require('express');
const router = express.Router();
const fs = require( 'fs' );

const payload = {
	'result': [],
}

//load all songs
let allSongs = [];
(async () => {
	const videoDir = process.env.KARAOKE_VIDEO_DIRECTORY;
	if (!videoDir) return [];

	const dir = await fs.promises.opendir(videoDir);
	const result = [];
	for await (const d of dir) {
		const loc = d.name;
		const name = loc.endsWith('.mkv') ? loc.slice(0, -4) : loc;
		result.push({loc, name});
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

function findSong(name) {
	return allSongs.find(song=>song.name === name)
}

module.exports = {router, findSong};
