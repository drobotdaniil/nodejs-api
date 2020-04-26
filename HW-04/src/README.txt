GET: 
  getAll
    /api/managers
    /api/documents
  getById
    /api/managers?id=
    /api/documents?id=

POST: 
  save()
    /api/managers/save {"name": "Lorem"}
    /api/documents/save {"name": "Lorem"}

DELETE: 
  /api/managers/delete?id=
  /api/documents/delete?id=

PUT: 
  update()
    /api/managers/update {"id": 1, "name": "test"}
    /api/documents/update {"id": 1, "content": "test"}
  setManagerToDocument()
    /api/documents/set-manager?id=1&managerId=3
