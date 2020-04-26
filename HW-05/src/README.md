# GET:

## getAll()
- /api/directors
- /api/movies
- /api/genres
## getById()
- /api/directors?id=
- /api/movies?id=
- /api/genres?id=
## getMoviesByDirector()
- /api/movies?directorId=
## getMoviesByGenre()
- /api/movies?genre=

# POST:

## save()
- /api/directors/save {"fullName": "Dannil", "yearOfBirth": "1997"}
- /api/movies/save {"name": "Uncharted", "directorId": 2 }
- /api/genres/save {"title": "comedy"}

## setGenreToMovie()
- /api/movies/set-genre {"genre": "drama", "name": "Uncharted"}

# PUT:

## update()
- /api/directors/update {"id": 1, "fullName": "Daniil Drobot", "yearOfBirth": "1997-01-07"}
- /api/movies/update {"name": "Onward"}
- /api/genres/update {"id": 1, "title": "drama"}

# DELETE:

- /api/directors/delete?id=
- /api/movies/delete?id=
- /api/genres/delete?id=
