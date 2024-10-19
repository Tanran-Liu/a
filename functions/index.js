/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.getRoute = functions.https.onRequest(async (req, res) => {
  const {start, end} = req.body;
  const accessToken = 'pk.eyJ1IjoidGxpdTAwNTgiLCJhIjoiY2x1N3B3emZrMDhmaTJ2bnIyeDkzb2lqZyJ9.ILfUF13AATr3Ud-oXgbZeg';

  try {
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${accessToken}`;
    const response = await axios.get(directionsUrl);
    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching route:", error);
    res.status(500).send("Failed to fetch route");
  }
});

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
