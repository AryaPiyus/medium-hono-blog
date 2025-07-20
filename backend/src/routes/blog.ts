import { Hono } from "hono";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt , sign , verify , decode} from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string | number
  }
}>()

blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: 1
        }
    })

    return c.json({id:blog.id})

})

blogRouter.put('/' , async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title: body.title,
            content: body.content,
            
        }
    })

    return c.json({id:blog.id})
})

blogRouter.get('/' ,async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const body = await c.req.json()
            const blog = await prisma.blog.findFirst({
                where:{
                    id:body.id
                }
            })

            return c.json({blog})
    }catch(err){
        c.status(411)
        return c.json({message:err})
    }
    

})
// for studying later purposes the concept of pagination
blogRouter.get('/bulk' ,async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany()

    return c.json({blogs})
})




