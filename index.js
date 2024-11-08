import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
const app = express()

app.use(cors({
    origin:'*',
    credentials: true
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.post("/send-email", (req,res) => {
    const {username,email,date,phone,destination,message,lookingFor} = req.body

    if(!username && !email && !phone){
        return res.status(500).json({message: "All feilds are our required"})
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adventuresrentaltour@gmail.com',
          pass: 'pdjz fvwr nmqr jfmu',
        },
      });

      const emailBody = `
      <h2>Form Submission Details</h2>
      <table border="1" cellpadding="10" cellspacing="0">
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Username</td>
          <td>${username}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>${date}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>${phone}</td>
        </tr>
        <tr>
          <td>Destination</td>
          <td>${destination}</td>
        </tr>
         <tr>
          <td>Message</td>
          <td>${message}</td>
        </tr>
         <tr>
          <td>Looking For</td>
          <td>${lookingFor}</td>
        </tr>
      </table>
    `;
      const mailOptions = {
        from: 'adventuresrentaltour@gmail.com',
        to: 'adventuresrentaltour@gmail.com',
        subject: `Contact form submission from ${username}`,
        html: emailBody,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({message: "form not sended"});
        }
        res.status(200).json({message: "Form submitted successfully"});
      });

})


app.put("/send-email", (req,res) => {
    const {username,email,date,phone,destination,message,lookingFor} = req.body

    if(!username && !email && !phone && !destination){
        return res.status(500).json({message: "All feilds are our required"})
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adventuresrentaltour@gmail.com',
          pass: 'pdjz fvwr nmqr jfmu',
        },
      });

      const emailBody = `
      <h2>Form Submission Details</h2>
      <table border="1" cellpadding="10" cellspacing="0">
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Username</td>
          <td>${username}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>${date}</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>${phone}</td>
        </tr>
        <tr>
          <td>Destination</td>
          <td>${destination}</td>
        </tr>
         <tr>
          <td>Message</td>
          <td>${message}</td>
        </tr>
         <tr>
          <td>Looking For</td>
          <td>${lookingFor}</td>
        </tr>
      </table>
    `;
      const mailOptions = {
        from: 'adventuresrentaltour@gmail.com',
        to: 'adventuresrentaltour@gmail.com',
        subject: `Contact form submission from ${username}`,
        html: emailBody,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({message: "form not sended"});
        }
        res.status(200).json({message: "Form submitted successfully"});
      });

})





app.listen("3000",() => {
    console.log("listning on 3000")
})

