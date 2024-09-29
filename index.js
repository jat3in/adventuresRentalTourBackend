import express from "express";
import cors from "cors";
import mongoose, {Schema} from "mongoose";

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
    date:{
        type: Date,
        default: new Date()
    }
})

const Contact = mongoose.model("contact",contactSchema)

const app = express()

app.use(cors({
    origin: '*',
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
    const {username,email,date,phone} = req.body
    console.log(username,email,phone)
    if(!username && !email && !phone){
        return res.status(500).json({message: "All feilds are our required"})
    }

    const contact = await Contact.create({
        username,
        email,
        date,
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


app.listen("3000",() => {
    console.log("listning on 3000")
    connectDb()
})

