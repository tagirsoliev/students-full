const postStudents = async (newStudent) => {
    const res = await fetch('http://127.0.0.1:8000/api/post_student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 7bFIqaKXSCe5L5CwKQLdZvEVZjqordd81q6E9WaAj1UTWZsVbX0GujLaxqrm',
        },
        body: JSON.stringify(newStudent)
    })
    if (!res.ok) alert("Ошибка запроса")
    const json = await res.json()
    return (json)
}
export default postStudents