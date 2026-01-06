import { Router } from "express";
import { prisma } from "../appDataSource";
import jwt from 'jsonwebtoken'

const app = Router()


app.post("/login", async (req, res) => {

    let { email, password } = req.body

    console.log(email, password)
    console.log("Come")

    if (email && password) {
        let userData = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        if (!userData) {
            return res.status(200).send({ success: false, message: 'อีเมลล์หรือรหัสผ่านผิด!' })
        }

        let token = jwt.sign({ id: userData.id, email: userData.email, role: userData.role }, "play2xnxx")

        res.status(200).send({ success: true, token: token })
    } else {
        res.status(200).send({ success: false, message: 'โปรดกรอกข้อมูลให้ครบถ้วน' })
    }
})

app.post("/register", async (req, res) => {

    let { email, password } = req.body

    if (email && password) {
        let userData = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        if (!userData) {

            let userCreated = await prisma.user.create({
                data: {
                    email: email,
                    password: password,
                    role: 0
                }
            })

            let token = jwt.sign({ id: userCreated.id, email: userCreated.email, role: userCreated.role }, "play2xnxx")

            res.status(201).send({ success: true, message: "สร้างบัญชีสำเร็จ!", token: token })

        } else {
            res.status(200).send({ success: false, message: 'อีเมลล์ซ้ำ' })
        }
    } else {
        res.status(200).send({ success: false, message: 'โปรดกรอกข้อมูลให้ครบถ้วน' })
    }
})

export default app