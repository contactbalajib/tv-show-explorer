export function v4(): string {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000000);
  return `uuid-${timestamp}-${random}`;
}
