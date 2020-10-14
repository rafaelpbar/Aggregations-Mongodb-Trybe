db.trips.aggregate([
  {
    "$match": {
      startTime: {
        $gte: ISODate("2016-03-10"),
        $lt: ISODate("2016-03-11")
      }
    }
  }, 
  {
    "$group": {
      "_id": null,
      "duracaoMedia": {
        "$avg": {
          "$divide": [
            {
              "$subtract": [ "$stopTime", "$startTime" ]
            }, 1000 * 60
          ]
        }
      }
    }
  }, 
  {
    "$project": {
      "_id": 0,
      "duracaoMediaEmMinutos": {"$ceil": "$duracaoMedia"}
    }
  }
]);
