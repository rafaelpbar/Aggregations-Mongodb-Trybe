const time = 60 * 1000;
db.trips.aggregate([
  {
    $match: {
      "startTime": { $exists: true },
      "stopTime": { $exists: true }
    }
  },
  {
    $group: {
      "_id": "$bikeid",
      "duracaoMedia": {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, time]
        }
      }
    }
  },
  {
    $project: {
      "_id": 0,
      "bikeId": "$_id",
      "duracaoMedia": { $ceil: "$duracaoMedia" }
    }
  },
  {
    $sort: {
      "duracaoMedia": -1
    }
  },
  {
    $limit: 5
  }
]);
