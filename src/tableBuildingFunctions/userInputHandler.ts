export async function userInputHandler<T, V>(
  func: (funcArguments?: T) => Promise<V>,
  funcArguments?: T
): Promise<V> {
  try {
    return await func(funcArguments);
  } catch (error) {
    console.log(error.message);
    return userInputHandler(func, funcArguments);
  }
}
