# liri-node-app
a language recognition application

welcome to the future!

this program was designed and created to allow you to search 3 databases for information on your favorite songs, favorite artists and favorite movies.  This readme will help you understand how to use the application and give you a short 40 second demo video of someone demoing it's capabilities.

The main features:

before you can begin utilizing this application you will need to secure your own .env file with a spotify key and spotify secret.  Follow the direction at spotify to get those keys and add your own '.env' file to the program after you pull.

https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app

step 1:

type in your command line: node liri.js

step 2: follow the listed options
    you will be prompted by 1 of 4 options.  Depending on which one you pick you will be given a second prompt

step 3: follow the second prompt
    if you select item 1 concert-this, follow up on the second prompt with the name of your favorite artist
    if you select item 2 spotfiy-this, follow up on the second prompt with the name of your favorite song
    if you select item 3 movie-this, follow up on the second prompt with the name of your favorite movie
    if you select item 4 do-what-this-says, just press enter on the second prompt and it will populate an answer according to the text file "random.txt"
        bonus: if you want to get creative with the last option, change out the first portion to one of the three options of concert-this, spotify-this and movie-this and replace the second part of the random.txt file with either an artist, song or moive.
            example: movie-this,"lion king"

after you are done and you have found your information your program is ready to run again.  Follow the link below to see a cool live demonstration.

Live demo!: https://youtu.be/KW6I4isnixU
