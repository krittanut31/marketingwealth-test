export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift(); // ดึงค่าของ Cookie
  }
  return undefined; // ถ้าไม่มี Cookie คืนค่า undefined
}
