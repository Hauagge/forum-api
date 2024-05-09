import { randomUUID } from 'crypto'

class UniqueEntityId {
  private value: string

  toString(): string {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}

export { UniqueEntityId }
