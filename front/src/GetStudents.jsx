const getStudents = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/get_students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 7bFIqaKXSCe5L5CwKQLdZvEVZjqordd81q6E9WaAj1UTWZsVbX0GujLaxqrm',
        },
    })
    if (!res.ok) alert("Ошибка запроса")
    const json = await res.json()
    return (json)
}
export default getStudents