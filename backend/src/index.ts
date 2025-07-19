import { Hono } from 'hono'

const app = new Hono()


app.post('/api/v1/signup', (c):any=>{

} )

app.post('/api/v1/signin',(c):any=>{

})

app.post('/api/v1/blog',(c):any=>{

})

app.put('/api/v1/blog' , (c):any=>{

})

app.get('/api/v1/blog/:id' , (c):any=>{

})

export default app
