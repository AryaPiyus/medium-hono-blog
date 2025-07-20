import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt , sign , verify , decode} from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string ,
    
  }
}>()

blogRouter.use('/*' , async (c , next)=>{
    const authHeader = c.req.header('Authorization') || ''
    const user = await verify(authHeader , c.env.JWT_SECRET)
    if(!user){
        c.status(403)
        return c.json({message:"you're not logged in "})
    }
    c.set('userId' , user.id)
    await next()
})


blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const userId = c.get('userId')
    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
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


// for studying later purposes the concept of pagination
blogRouter.get('/bulk' ,async (c)=>{
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany()

    return c.json({blogs})
})


blogRouter.get('/:id' ,async (c)=>{
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





