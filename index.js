import express from "express";
import cors from "cors";
import mongoose, {Schema} from "mongoose";
import nodemailer from "nodemailer"

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://jatinvashishtha053:jatin2003@cluster0.duskd.mongodb.net/tourPlaner")
        console.log(`MongoDb is connected succesfully || DB HOST ${connectionInstance.connection.host}`);    
    } catch (error) {
        console.log("error connecting while db",error)
        process.exit(1);
    }   
}
const adminSchema = Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
})

const Admin = mongoose.model("admin",adminSchema)
const contactSchema = Schema({
    username:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    email:{
        type: String
    },
    destination:{
        type: String

    },
    date:{
        type: Date,
        default: new Date()
    }
})

const Contact = mongoose.model("contact",contactSchema)

const app = express()

app.use(cors({
    origin:'*',
    credentials: true
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

app.get("/contact",( async (req,res) => {
    const contact = await Contact.find()
    if(!contact){
        return res.status(500).json({message: "contact not find"})
    }

    return res.status(201).json({message: "contact fetched successfully", data: contact})
}))

app.post("/contact", ( async (req,res) => {
    const {username,email,date,phone,destination} = req.body
    console.log(username,email,phone)
    if(!username && !email && !phone){
        return res.status(500).json({message: "All feilds are our required"})
    }

    const contact = await Contact.create({
        username,
        email,
        date,
        destination,
        phone
    })

    if(!contact){
        return res.status(500).json({message: "contact not created"})
    }

    return res.status(201).json({message: "contact created successfully", data: contact})
}))



app.put("/contact", ( async (req,res) => {
    const {username,email,date,phone,destination} = req.body
    console.log(username,email,phone)
    if(!username && !email && !phone && !destination){
        return res.status(500).json({message: "All feilds are our required"})
    }

    const contact = await Contact.create({
        username,
        email,
        date,
        destination,
        phone
    })

    if(!contact){
        return res.status(500).json({message: "contact not created"})
    }

    return res.status(201).json({message: "contact created successfully", data: contact})
}))

app.post("/admin",(async (req,res) => {

    const {email,password} = req.body

    if(!email && !password){
        return res.status(500).json({message: "all feild are required"})
    }

    const admin = await Admin.create({
        email,
        password
    })

    if(!admin){
        return res.status(500).json({message: "Admin not created successfully"})
    }

    return res.status(201).json({message: "Admin created successfully", data: admin})

}))


app.post("/login",(async (req,res) => {

    const {email,password} = req.body

    if(!email && !password){
        return res.status(500).json({message: "all feild are required"})
    }

    const admin = await Admin.findOne({email})
    if(!admin){
        return res.status(500).json({message: "Admin not found"})
    }

    if(admin.password === password){
        return res.status(201).json({message: "Login Successfull"})
    }
       
}))

app.post("/send-email", (req,res) => {
    const {username,email,date,phone,destination} = req.body

    if(!username && !email && !phone){
        return res.status(500).json({message: "All feilds are our required"})
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jatinvashishtha053@gmail.com',
          pass: 'sjbh mdla ackg tbzk',
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
      </table>
    `;
      const mailOptions = {
        from: 'jatinvashishtha053@gmail.com',
        to: 'jatinvashishtha053@gmail.com',
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
    connectDb()
})

