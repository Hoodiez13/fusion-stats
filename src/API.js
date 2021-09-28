// client code    947fb77e-d193-4b50-825f-e881cd028a79
// client sercret XQ2RP725NGgaqb26avLHtoh4THwara72AWOj7Uui
import axios from "axios";

export default axios.create({
    baseURL: ''
})

//lasts 60 days
//9/27/21 - stt - expires 11/26/21
export const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NDdmYjc3ZS1kMTkzLTRiNTAtODI1Zi1lODgxY2QwMjhhNzkiLCJqdGkiOiIzYmI4ZjY1YjNjZjNiNTdmMmMzMjRhNzc0MWI0MTBjYTc3MmFjNGFiOTQ4MTQ1OTk5NjljOGFkMDdhYzYyZjA2YmNkOTVlNzc1NDM0MDgzOSIsImlhdCI6MTYzMjc3NjA0NywibmJmIjoxNjMyNzc2MDQ3LCJleHAiOjE2NDMxNDQwNDcsInN1YiI6IiIsInNjb3BlcyI6WyJ2aWV3LXVzZXItcHJvZmlsZSIsInZpZXctcHJpdmF0ZS1yZXBvcnRzIl19.owCN48Sg69DGDkzBr3B6nbfMriMD4hsTSN-gIqxyycoBauwfKKtz8sH_k_WB8-yej-Ac_uJwSp-M4NMpZKW_KcJgDvaZPix9ZDhStYgL4E3l3wigG-cQiqo3xeCTQxvHava6A85yIcuvUpk1XssZ9DWhWeQ0NfNfO5ctD6oksQMIYl7i6K6xkqcDBR7QbnrZ2ef3VdDpkuBtQGHJy315Qz8FbuU_JN-BrDWbWHbkGG7gISNmYWfd6jcW5pOV3k1GF4wjfocdibQfXj6vfXhAr444HEf-6hgUcyc1d4ktZ5NKlxUIICkHpn6sl1y63OMmiS2ODhQOJnGDT8Dg1nNYp71jgFHBgZqzVwscPvmno-8s8bs7svou8VUGsqamtq1cdfVK0juNsWJlwchu2QYbhijXLU86XpQrgVGhrLcAub7K7c2QP9jMJy6tcLwHZGP0oAxUb2CVyPbv1jr1Nq6TlgXsG9MzlqdKCKOR1WcoRLUhVJJhhxqXE8qVQ9vRmzWU9Qk_0coStr2t0wtKq7hWnnOcbvmC6x6iwPZJOU84Fhf98nsk6Vmi2GoU1HCewPyZaMU9nNwg9vgjnRsm_46vhnbtt_9UoM2gbPsE1yJtAGw83cvCkTTAjhX5fhB-rDszQTTGgAL79-l2DtXzs6m-k0XfZUeq9lbhvT-FJiJa14k'

export const getToken = () =>{
    axios.request({
      url: "/oauth/token",
      method: "post",
      baseURL: "https://www.warcraftlogs.com/",
      auth: {
        username: "947fb77e-d193-4b50-825f-e881cd028a79",
        password: "XQ2RP725NGgaqb26avLHtoh4THwara72AWOj7Uui"
      },
      data: {
        "grant_type": "client_credentials"
      }
    }).then(function(res) {
      if(res.data.access_token){
        console.log(res.data.access_token)
      }
    })
  }