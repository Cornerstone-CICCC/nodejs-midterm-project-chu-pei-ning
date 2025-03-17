import { v4 as uuidv4 } from "uuid"
import { User } from "../types/user"
import bcrypt from "bcrypt"

class UserModel {
  private users: User[] = [
    { id: uuidv4(), username: 'amy', password: '12345', firstname: 'Amy', lastname: 'Lui' },
    { id: uuidv4(), username: 'cindy', password: '54321', firstname: 'Cindy', lastname: 'Kuo' }
  ]

  findAll() {
    return this.users
  }

  async findByUsername(username: string) {
    const user = this.users.find(u => u.username === username)
    if (!user) return null
    return user
  }

  async login(username: string, password: string) {
    const user = this.users.find(u => u.username === username)
    if (!user) return false
    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (!isMatch) return false
    return user
  }
}

export default new UserModel 