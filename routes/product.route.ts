import { Router } from "express";
import { prisma } from "../appDataSource";
import jwt from 'jsonwebtoken'

const app = Router()

app.get("/barcode", async(req, res)=>{
    let product = await prisma.product.findMany({orderBy: {
        createAt: "desc"
    }, include:{
        trashCategory: true
    }})

    res.status(200).send({success: true, product})
})

app.get("/barcode/:barcode", async (req, res) => {
    let { barcode } = req.params

    console.log(barcode)

    console.log("Come")

    let product = await prisma.product.findFirst({
        where: {
            OR: [
                { barcode: barcode },
                { name: barcode }
            ]
        },
        include: {
            trashCategory: true
        }
    })

    res.status(200).send({ success: true, product })


})

app.post("/barcode", async (req, res) => {
    let { barcode, name, trashCategoryId } = req.body

    console.log(barcode, name, trashCategoryId)

    let product = await prisma.product.create({
        data: {
            barcode: barcode,
            name: name,
            trashCategoryId: trashCategoryId
        }
    })

    res.status(200).send({ success: true, product })


})

app.patch("/barcode", async(req, res) => {

    let { barcode, name ,trashCategoryId } = req.body

    await prisma.product.update({
        where: {
            barcode: barcode
        },
        data: {
            name: name,
            trashCategoryId: Number(trashCategoryId)
        }
    })

    res.status(200).send({ success: true, message: "Update Successfully!" })
})

app.delete("/barcode/:barcode", async(req, res)=>{
    let {barcode} = req.params

    console.log(barcode)

    await prisma.product.delete({where:{
        barcode: barcode
    }})

    res.status(200).send({success: true, message: "Delete Successfully!"})
})

export default app