import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt , sign , verify , decode} from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string | number
  }
}>()


app.route('/api/v1/user' , userRouter)
app.route('/api/v1/blog' , blogRouter)


app.use('/api/v1/blog/*' , async (c, next)=>{
  const header = c.req.header("Authorization") || ""
  if(!header){
    c.status(401)
    return c.json({error: "authorization token missing"})
  }
  const token = header.split(' ')[1]
  if(!token){
    c.status(401)
    return c.json({error:"unauthorized"})
  }

  const response = await verify( token , c.env.JWT_SECRET)
  if(!response.id){
    c.status(403)
    return c.json({error:"user does not exist"})
  }
  c.set('userId' , String(response.id))
  await next()
})


app.post('/api/v1/blog',async (c)=>{

})

app.put('/api/v1/blog' , (c):any=>{

})

app.get('/api/v1/blog/:id' , (c):any=>{

})

export default app
