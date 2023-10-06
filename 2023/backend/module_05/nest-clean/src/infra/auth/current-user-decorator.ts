import { ExecutionContext, createParamDecorator } from '@nestjs/common'

const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user
  },
)

export { CurrentUser }
