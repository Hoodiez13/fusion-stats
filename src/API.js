// client code    947fb77e-d193-4b50-825f-e881cd028a79
// client sercret XQ2RP725NGgaqb26avLHtoh4THwara72AWOj7Uui
import axios from "axios";

export default axios.create({
  baseURL: "",
});

//lasts 60 days
//9/27/21 - stt - expires 11/26/21
export const authToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NDdmYjc3ZS1kMTkzLTRiNTAtODI1Zi1lODgxY2QwMjhhNzkiLCJqdGkiOiJlMzdiYzUwOTU4ZTU0ZDQ3ZDJjOGIxYjQ3YTAyODFlOTA5OGM4YmFhMTNmNmEzZDgyN2JhNGM4MGRhZTk5NmJiMWZmMWVhYTM4YzAzYzhkZSIsImlhdCI6MTczNDExMDIxNS4wODQ0MjQsIm5iZiI6MTczNDExMDIxNS4wODQ0MjcsImV4cCI6MTc2NTIxNDIxNS4wNzEyNTMsInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.U5kBkBpdiGYOE5BkO7c7Y5wr1mQdV10843xuWAxiMrZRg6nRQiCDmpNqc7yGf8Y-0GP6pMNr7BR0Uiub2_e3FW0HZw4JJe4hjnRObQ81jkH6qQNk-X1RjChrfuQ89TybojQXaaFd8OTjEPJaSUZX7ch4z2nssI_9Dx3HGLLaDaEAHHKTO8zIlGM2SMN2JcjUXnBO69UR0KD3b_UGoLFrfS1drmzZLKIGdCHgl3tixj8oOpLwvF73IGKQIkQaviL9A4Tfu33MI6FuXF4GLox9M-4fWceRcZS3FGjn33cLYUzrlC4DPHzyRcfs4Tp_CPtNDPzPCSkXH_b22-fsEg99C5mVF0x_HVe2ID1gppY3n61sqc6QjuIgPjhIXoSEoe04smEYbM4V28zZNs2bqOm7exY6h77MjsXnvyDw1kLzakv3p-5-Nqq7KznxcES95p-sHADF5aaY8SEl3EsbfHclkpkwfV1Rkbwb1IMLCbAStMeUCTrg00kl1TOvO9lAHjqTZROSZIAhZ6FCGt4WtKUhExwbCbm8zeQDqgq3AtXt-AportAXH_FSVrPxBDR-VzXZcqHG0Tx9h_mCc6Roe0BxRRQCpiz04MMtyZs8lDVKlbBuo3CXb_V60GRfhr9IxtTcovRkaCH4MbhI3OmF3CXsaXR0qTkHNTp_sm462DIdDUA";

export const getToken = () => {
  axios
    .request({
      url: "/oauth/token",
      method: "post",
      baseURL: "https://www.warcraftlogs.com/",
      auth: {
        username: "947fb77e-d193-4b50-825f-e881cd028a79",
        password: "XQ2RP725NGgaqb26avLHtoh4THwara72AWOj7Uui",
      },
      data: {
        grant_type: "client_credentials",
      },
    })
    .then(function (res) {
      if (res.data.access_token) {
        console.log(res.data.access_token);
      }
    });
};
