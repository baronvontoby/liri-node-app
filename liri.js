var liri = require('dotenv').config();
var Spotify = require('node-spotify-api')
var keys = require('./keys');

var fs = require('fs');
var omdb = require('omdb-client');
var inquirer = require('inquirer');
var axios = require('axios');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);

var search = function() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'list',
            message: 'What Would you like to Search For?',
            choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
        },
        {
            type: 'input',
            name: 'name',
            message: 'What artist, song or movie are you interested in?'
        }
    ]).then(function(response){
        // console.log(response);
        if( response.list == 'concert-this') {
            axios.get('https://rest.bandsintown.com/artists/'+ response.name  +'?app_id=5').then(function(event){
                // console.log(response);
                console.log(
                    event.data.name
                );
            })
            axios.get('https://rest.bandsintown.com/artists/' + response.name + '/events?app_id=5').then(function(event){
                // console.log(event);
                console.log(
                    'This is the country of their next concert: ' + event.data[0].venue.country
                );
                console.log('It is happening on this date: ' + moment(event.data[0].datetime).format('MM/D/YYYY'));
            });
            }   
        else if( response.list == 'spotify-this-song'){
            spotify.search({
                type: 'track',
                query: response.name
            },function(err, data){
                // console.log(data.tracks.items);
                console.log('Here is the song name: ' + data.tracks.items[0].name);
                console.log('Here is a list of the artists: ' + data.tracks.items[0].artists[0].name);
                console.log('Here is a preview link of the song: ' + data.tracks.items[0].preview_url);
                console.log('Here is the album name: ' + data.tracks.items[0].album.name);
            })
        }
        else if( response.list == 'movie-this'){
            var params = {
                apiKey: 'trilogy',
                title: response.name,
            }
            omdb.get(params, function(err, data){
                    console.log(
                    `
                    --------${data.Title}---------
                    release year:       ${data.Year}
                    Imdb rating:        ${data.Ratings[0].Value}
                    rottent tomatoes:   ${data.Ratings[1].Value}
                    country of origin:  ${data.Country}
                    language of movie:  ${data.Language}
                    plot of movie:      ${data.Plot}
                    actors in movie:    ${data.Actors}
                    --------${data.Title}---------

                    `
                );
            })
        }
        else if( response.list == 'do-what-it-says'){
            fs.readFile('random.txt', 'utf8', function(err, data){
                if (err) {
                    console.log("it didn't work");
                }
                // console.log(data);
                var dataArr = data.split(/,|"/);
                // console.log(dataArr);
                var str = dataArr[0];
                var strTwo = dataArr[2];
                
                // console.log(str);
                // console.log(strTwo);
                // console.log(dataArr);
                if( str == 'concert-this') {
                    axios.get('https://rest.bandsintown.com/artists/'+  strTwo +'?app_id=5').then(function(event){
                        // console.log(event);
                        console.log(
                            event.data.name
                        );
                    })
                    axios.get('https://rest.bandsintown.com/artists/' + strTwo + '/events?app_id=5').then(function(event){
                        // console.log(event);
                        console.log(
                            'This is the country of their next concert: ' + event.data[0].venue.country
                            );
                            console.log('It is happening on this date: ' + moment(event.data[0].datetime).format('MM/D/YYYY'));
                        });
                    }   
                else if( str == 'spotify-this-song'){
                    spotify.search({
                        type: 'track',
                        query: strTwo
                    },function(err, data){
                        // console.log(data.tracks.items);
                        console.log('Here is the song name: ' + data.tracks.items[0].name);
                        console.log('Here is a list of the artists: ' + data.tracks.items[0].artists[0].name);
                        console.log('Here is a preview link of the song: ' + data.tracks.items[0].preview_url);
                        console.log('Here is the album name: ' + data.tracks.items[0].album.name);
                    })
                }
                else if( str == 'movie-this'){
                    var params = {
                        apiKey: 'trilogy',
                        title: strTwo,
                    }
                    omdb.get(params, function(err, data){
                        console.log(
                            `
                            --------${data.Title}---------
                            release year:       ${data.Year}
                            Imdb rating:        ${data.Ratings[0].Value}
                            rottent tomatoes:   ${data.Ratings[1].Value}
                            country of origin:  ${data.Country}
                            language of movie:  ${data.Language}
                            plot of movie:      ${data.Plot}
                            actors in movie:    ${data.Actors}
                            --------${data.Title}---------
                            
                            `
                        );
                    });
                }
            })
        } 
    });
}

search();

