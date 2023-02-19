const express = require("express");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const body_parser = require("body-parser");
const request = require("request");
const { response } = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(body_parser.urlencoded({ extended: true }))

app.post("/", (req, res) => {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let email = req.body.email;

    mailchimp.setConfig({
        apiKey: "d782a043967edb4d17e1960f2c5ab8ee-us21",
        server: "us21",
    });

    async function getInfo() {
        // const response = await mailchimp.ping.get();
        // console.log(response);

        // const response = await mailchimp.lists.getAllLists();
        // console.log(response);

        const response = await mailchimp.lists.getList("2e1793e030");
        // console.log(response);
       
    }
    // getInfo();

    const addMembers = async () => {
        const response = await mailchimp.lists.addListMember("231e954cb1", {
          email_address: email,
          status: "subscribed",
          merge_fields : {
            FNAME: firstName,
            LNAME: lastName,
          },
        });
        // console.log(response);
    };
    addMembers();
    if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    }else {
        res.sendFile(__dirname + "/failure.html");
    }
});



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.listen(port, () => {
    console.log("server is listerning port no. 3000");
});


// API KEYS
// d782a043967edb4d17e1960f2c5ab8ee-us21

// List ID
// 231e954cb1