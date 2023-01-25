import { Request, RequestHandler, Response, Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const app = Router()

app.get(
    '/posts', 
    async (req, res) => {
        const posts = await db.post.findMany({
          where: {
            authorId: req.user.id
          }
        })
        return res.status(200).json(posts)
    }
)

app.post(
    '/post',
    body('title').exists().isString().notEmpty(),
    async (req: Request, res: Response) => {
      try {
        validationResult(req).throw()
        const createdPost = await db.post.create({
          data: {
            title: req.body.title,
            content: req.body.content,
            authorId: req.user.id
          }
        })
  
        return res.status(200).json(createdPost)
      } catch(e) {
        console.log(e)
        return res.status(400).json({error: e || 'Cannot create the post'})
      }
    }
)

app.patch(
  '/post_modify/:uuid',
  async (req: Request, res: Response) => {
    try {
      validationResult(req).throw()
      const modifiedPost = await db.post.updateMany({
        where: {
          id: req.params.uuid
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          authorId: req.user.id
        }
      })

      return res.status(200).json(modifiedPost)
    } catch(e) {
      console.log(e)
      return res.status(400).json({error: e || 'Cannot modify the post'})
    }
  }
)
    
export default app

