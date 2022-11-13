import Express from "express";
import ytdl from "ytdl-core";
import { Config } from "./config.js"
import cors from "cors"

const app: Express.Application = Express();

app.use(cors())

app.get("/", async (_req: Express.Request, res: Express.Response) => {
    res.send(`Current running on port ${process.env.PORT ?? Config.port ?? "3000"}`)
})

app.get('/stream', async (req: Express.Request, res: Express.Response) => {
    const username: String | String[] = req.headers?.usernames
    const password: String | String[] = req.headers?.password
    const streamingURL: any = req.query?.stream
    const streamOption: any = req.query?.option
    if(!username || !password) return res.status(401).send("ERROR: No username or password provided")
    if(username !== Config.auth.username || password !== Config.auth.password) return res.status(403).send("ERROR: Invalid username or password")
    if(!["soundcloud", "youtube"].includes(streamOption)) return res.status(400).send("ERROR: Bad Request")
    const stream: NodeJS.ReadableStream = ytdl(streamingURL, {
        filter: "audioonly"
    })
    res.setHeader("Content-Type", "audio/mp3")
    stream.pipe(res)
})

app.listen(process.env.PORT ?? Config.port ?? 3000, () => console.log(`Currently listening on port ${process.env.PORT ?? Config.port ?? "3000"}`))