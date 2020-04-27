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
- /api/directors {"fullName": "Dannil", "yearOfBirth": "1997"}
- /api/movies {"name": "Uncharted", "directorId": 2 }
- /api/genres {"title": "comedy"}

## setGenreToMovie()
- /api/movies/set-genre {"genre": "drama", "name": "Uncharted"}

# PUT:

## update()
- /api/directors {"id": 1, "fullName": "Daniil Drobot", "yearOfBirth": "1997-01-07"}
- /api/movies {"name": "Onward"}
- /api/genres {"id": 1, "title": "drama"}

# DELETE:

- /api/directors?id=
- /api/movies?id=
- /api/genres?id=
