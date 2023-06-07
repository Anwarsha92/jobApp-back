


const express=require("express")

const cors=require("cors")

const ds=require("./service/dataService")

const jwt = require("jsonwebtoken")


const app=express()

app.use(cors({origin:"http://localhost:4200"}))

app.use(express.json())



const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['token']

        const data = jwt.verify(token, "tokenkey")

        console.log(data);

        next()
    }
    catch {
        res.status(422).json({
            status: false,
            message: "Enter valid token",
            statusCode: 404
        })
    }
}



app.post("/register",(req,res)=>{
    ds.register(req.body.uname,req.body.mob,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)

    })
})

app.post("/login",(req,res)=>{
    ds.login(req.body.mob,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post("/submit",(req,res)=>{
    ds.submit(req.body.cname,req.body.quali,req.body.mob,req.body.email,req.body.expe,req.body.appfor).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post("/adlogin",(req,res)=>{
    ds.adlogin(req.body.uname,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.get("/getApplications",(req,res)=>{
    ds.getApplications().then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.post("/accept",(req,res)=>{
    ds.accept(req.body.mob).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.post("/reject",(req,res)=>{
    ds.reject(req.body.mob).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.post("/notification",(req,res)=>{
    ds.notification(req.body.mob).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete("/delete/:mob",jwtMiddleware,(req,res)=>{
    ds.delAcc(req.params.mob).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


app.listen(3000,()=>{
    console.log('port started at 3000');
})