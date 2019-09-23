const express=require("express")
const server=express()
const router = express.Router()
const pdfMake=require("pdfkit")

router.post("/pdf",(req,res)=>
{
    const fname=req.body.fname
    var docuDefi= {
        content :[
            "first paragraph",
            "another para"
        ]
    };
    const pdfDoc=pdfMake.createPdf(docuDefi).print();
    console.log("jii")
    pdfDoc.getBase64((data)=>{
        res.writeHead(200,{
            "content-type" : "application/pdf",
            "content-disposition" : "attachment;filename=filename.pdf"
        });

        const download=Buffer.from(data.tostring('utf-8'),'base64');
        res.send(download)
    })
})

module.exports = router;