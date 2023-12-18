## introduction
karaoke server-client application used at home

```
The architecture is as follows:
AndroidTV <---> backend <---> frontend
                       | <--- videos
```

## usage
1. build the frontend first
```
# from project root
cd frontend
npm run build
```
2. set the correct path in backend/.env
```
# in .env, edit the line of KARAOKE_VIDEO_DIRECTORY
KARAOKE_VIDEO_DIRECTORY={Your Directory storing mkv files}
```
and put the mkv files into the `KARAOKE_VIDEO_DIRECTORY`
3. run the server
```
# from project root
npm start

Server is running on port 8080.
 You can now view the client in the browser.
 Local:            http://localhost:8080/app
 On Your Network:  http://192.168.xxx.xxx:8080/app
```
4. use your mobile to open "http://192.168.xxx.xxx:8080/app" as mentioned above
5. get the android-app installed on your android-tv or android tablet
6. The server woudl publish the service address to the local network via MDNS (ie. no config is required), you just need to turn on the karaoke tv app and it would work autometically
                  
