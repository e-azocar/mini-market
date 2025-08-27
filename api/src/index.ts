import app from './app'
import { PORT } from './config/constants'

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
})
