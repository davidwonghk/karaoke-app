import 'dart:async';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

void main() {
  /// Create the WebSocket channel
  final channel = WebSocketChannel.connect(
    Uri.parse('wss://ws-feed.pro.coinbase.com'),
  );

  /// Listen for all incoming data
  channel.stream.listen(
    (data) {
      print(data);
    },
    onError: (error) => print(error),
  );

  runApp(const KaraokeApp());
}

class KaraokeApp extends StatelessWidget {
  const KaraokeApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple), useMaterial3: true,
      ),
      home: const KaraokeHome(),
    );
  }
}

class KaraokeHome extends StatefulWidget {
  const KaraokeHome({super.key});

  @override
  State<KaraokeHome> createState() => _KaraokeHomeState();
}

class _KaraokeHomeState extends State<KaraokeHome> {
  int _volume = 50;
	bool _accompany = false;
	String _video_path = "http://localhost:8080/video";

  late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;

	@override
	void initState() {
		super.initState();

    _controller = VideoPlayerController.networkUrl(
      Uri.parse(_video_path),
    )
		..addListener(() {
			if (!_controller.value.isPlaying) {
				print("video end");
			}
		})
		..setLooping(true)
		..initialize();
	}

  @override
  void dispose() {
		_controller.dispose();
    super.dispose();
  }

	void _next_song() {
		setState(() {
			_video_path = "";
		});
	}

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      body: Center(
				child: VideoPlayer(_controller),
			),
      floatingActionButton: FloatingActionButton(
        onPressed: _next_song,
        tooltip: 'Play Video',
        child: const Icon(Icons.play_arrow),
      ), 
    );
	}
}
