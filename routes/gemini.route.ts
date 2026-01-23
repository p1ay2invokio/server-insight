import { Router } from "express";
import { GoogleGenAI } from '@google/genai'

const app = Router()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

app.post("/gemini", async (req, res) => {

    let { img, mimeType } = req.body


    let prompt = `คุณเป็นระบบแยกขยะในประเทศไทยจากรูปภาพ
ตอบกลับเป็น JSON เท่านั้น ห้ามมีข้อความอื่น ห้ามมีโค้ดบล็อก

ต้องมี 4 ค่าเท่านั้น:
1) trash_name: ชื่อสิ่งของในภาพ (สั้นๆ)
2) trash_type: เลือก 1 จาก ["ขยะรีไซเคิล","ขยะเปียก","ขยะทั่วไป","ขยะอันตราย"]
3) material: เลือก 1 จาก ["พลาสติก","กระดาษ","แก้ว","โลหะ","อื่นๆ"]
4) bin_color: เลือก 1 จาก ["เหลือง","เขียว","น้ำเงิน","แดง"]

กฎบังคับ (สำคัญมาก):
- ถ้า trash_type = "ขยะรีไซเคิล" => bin_color ต้องเป็น "เหลือง" เท่านั้น
- ถ้า trash_type = "ขยะเปียก"     => bin_color ต้องเป็น "เขียว" เท่านั้น
- ถ้า trash_type = "ขยะทั่วไป"    => bin_color ต้องเป็น "น้ำเงิน" เท่านั้น
- ถ้า trash_type = "ขยะอันตราย"  => bin_color ต้องเป็น "แดง" เท่านั้น

กฎตัดสินแบบเร็ว:
- แบตเตอรี่/ถ่าน/สเปรย์/หลอดไฟ/สารเคมี/อุปกรณ์อิเล็กทรอนิกส์ => ขยะอันตราย
- เศษอาหาร/เปลือกผลไม้/ก้าง/กระดูก => ขยะเปียก
- กระดาษ/หนังสือ/กล่องกระดาษ (แห้ง สะอาด) => ขยะรีไซเคิล, material="กระดาษ"
- กระป๋องเครื่องดื่ม/กระป๋องอลูมิเนียม/เหล็ก => ขยะรีไซเคิล, material="โลหะ"
- ขวดพลาสติก/แก้วน้ำพลาสติก (แห้งค่อนข้างสะอาด) => ขยะรีไซเคิล, material="พลาสติก"
- ถุงขนม/ซองหลายชั้น/ทิชชู่เปื้อน/โฟมเปื้อน => ขยะทั่วไป

เงื่อนไขความไม่แน่ใจ:
- ถ้าภาพไม่ชัด/มองไม่ออก/ไม่แน่ใจวัสดุ => ให้เลือก trash_type = "ขยะทั่วไป" และ material="อื่นๆ" (ปลอดภัยสุด)

ให้ตอบเป็น JSON รูปแบบตัวอย่างนี้เท่านั้น:
{"trash_name":"...","trash_type":"...","material":"...","bin_color":"..."}
`

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                role: "user",
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            data: img,
                            mimeType: "image/jpeg"
                        }
                    }
                ]
            }
        ]
    })


    const text: any = response.text;
    const cleaned = text.replace(/```json|```/g, "").trim();
    const json = JSON.parse(cleaned);

    res.status(200).send(json)
})

export default app