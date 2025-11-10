import { useState } from "react"
import styles from './Home.module.css'
import { useEffect } from "react"

function Home() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [sortValue, setSortValue] = useState({
        fio: false,
        birthDate: false,
        startYear: false,
        faculty: false
    })
    const [students, setStudents] = useState([
        { name: 'Иван', surname: 'Иванов', patronymic: 'Иванович', birthDate: '2000-01-01', startYear: 2018, faculty: 'Физика' },
    ])
    const [dialogCreate, setDialogCreate] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: '',
        surname: '',
        patronymic: '',
        birthDate: '',
        startYear: '',
        faculty: ''
    })
    const [filters, setFilters] = useState({
        fio: '',
        faculty: '',
        startYear: '',
        endYear: ''
    })
    const [filteredStudents, setFilteredStudents] = useState([])

    useEffect(() => {
        setFilteredStudents(students)
    }, [])

    const openDialog = () => {
        if (dialogOpen) {
            setDialogOpen(false);
            return;
        }
        setDialogOpen(true);
    }


    const openCreateDialog = () => {
        if (dialogCreate) {
            setDialogCreate(false);
            return;
        }
        setDialogCreate(true);
    }


    const createStudent = (e) => {
        e.preventDefault();
        if (validating()) {
            setStudents([...students, newStudent]);
            setNewStudent({
                name: '',
                surname: '',
                patronymic: '',
                birthDate: '',
                startYear: '',
                faculty: ''
            });
            setDialogCreate(false);
        }
    }


    const changeInputValue = (e) => {
        if (e.target.name === 'fio') {
            const fullName = e.target.value.trim();
            const nameParts = fullName.split(' ');
            const name = nameParts[0] || '';
            const surname = nameParts[1] || '';
            const patronymic = nameParts[2] || '';
            setNewStudent({
                ...newStudent,
                name: name,
                surname: surname,
                patronymic: patronymic
            });
            return;
        }
        const { name, value } = e.target;
        console.log(name, value);
        setNewStudent({
            ...newStudent,
            [name]: value.trim()
        });
    }


    const validating = () => {
        for (let key in newStudent) {
            if (newStudent[key] == "") {
                console.log("-");
                alert("Заполните все поля!")
                return (false)
            } else if (key === 'birthDate' && new Date(newStudent.birthDate) > new Date()) {
                console.log(new Date(newStudent.birthDate));
                console.log(new Date());

                alert("Дата рождения не может быть позже текущей даты")
                return (false)
            } else if (key === 'startYear' && new Date(newStudent.startYear) > new Date()) {
                alert("Год начала обучения не может быть позже текущего года")
                return (false)
            }
        }
        return true
    }


    const getYear = (birthDate) => {
        const age = Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
        return age
    }


    const getCourse = (startYear) => {
        if ((Number(startYear) + 4 < new Date().getFullYear()) || (Number(startYear) + 4 == new Date().getFullYear() && new Date().getMonth() > 9)) {
            return ("Закончил")
        } else {
            return `${(new Date().getFullYear() - Number(startYear))} курс`
        }
    }


    const changeSortFio = () => {
        sortValue.fio ? setSortValue({ ...sortValue, fio: false }) : setSortValue({ ...sortValue, fio: true })
    }
    const changeSortBD = () => {
        sortValue.birthDate ? setSortValue({ ...sortValue, birthDate: false }) : setSortValue({ ...sortValue, birthDate: true })
    }
    const changeSortStartYear = () => {
        sortValue.startYear ? setSortValue({ ...sortValue, startYear: false }) : setSortValue({ ...sortValue, startYear: true })
    }
    const changeSortFaculty = () => {
        sortValue.faculty ? setSortValue({ ...sortValue, faculty: false }) : setSortValue({ ...sortValue, faculty: true })
    }

    const filterSubString = (e) => {
        const { name, value } = e.target
        setFilters({
            ...filters,
            [name]: value.trim()
        })
        if (name == 'faculty') {
            setFilteredStudents(students.filter((e) => {
                return `${e.faculty}`.toLowerCase().includes(value.toLowerCase())
            }))
        } else {
            setFilteredStudents(students.filter((e) => {
                return `${e.name} ${e.surname} ${e.patronymic}`.toLowerCase().includes(value.toLowerCase())
            }))
        }
    }

    const filterDate = (e) => {
        const { name, value } = e.target
        setFilters({
            ...filters,
            [name]: value
        })
        if (name == 'startYear') {
            console.log(Number(value));
            setFilteredStudents(students.filter((e) => {
                console.log(e.startYear);
                return e.startYear == Number(value)
            }))
        } else {
            console.log(e.startYear);
            console.log(Number(value));
            setFilteredStudents(students.filter((e) => {
                return e.startYear + 4 == value
            }))
        }
    }



    return (
        <>
            <header>
                <nav className={styles.headerNav}>
                    <div className={styles.sorting}>
                        <p className={styles.fontSize14}>Сортировать по</p>
                        <select name="sorting" id="sorting" className={styles.select}>
                            <option value="">Алфавиту ▲</option>
                            <option value="">Алфавиту ▼</option>
                            <option value="">Дате рождения ▲</option>
                            <option value="">Дате рождения ▼</option>
                            <option value="">Году начала обучения ▲</option>
                            <option value="">Году начала обучения ▼</option>
                            <option value="">Факультету ▲</option>
                            <option value="">Факультету ▼</option>
                        </select>
                    </div>
                    <button onClick={openDialog}>Фильтры</button>
                </nav>
                <button className={styles.createNew} onClick={openCreateDialog}>Добавить нового студента</button>
            </header>
            <div className={styles.main}>
                <dialog open={dialogCreate} onClose={() => setDialogCreate(false)} className={styles.dialogs}>
                    <h2>Добавить нового студента</h2>
                    <form action="#" className={styles.addStudentForm} onSubmit={createStudent}>
                        <label className={styles.labelForm}>
                            Имя:
                            <input type="text" name="name" className={styles.inputForm} onChange={changeInputValue} />
                        </label>
                        <label className={styles.labelForm}>
                            Фамилия:
                            <input type="text" name="surname" className={styles.inputForm} onChange={changeInputValue} />
                        </label>
                        <label className={styles.labelForm}>
                            Отчество:
                            <input type="text" name="patronymic" className={styles.inputForm} onChange={changeInputValue} />
                        </label>
                        <label className={styles.labelForm}>
                            Дата рождения:
                            <input type="date" name="birthDate" min="1900-01-01" className={styles.inputForm} onChange={changeInputValue} />
                        </label>
                        <label className={styles.labelForm}>
                            Год начала обучения:
                            <input type="number" name="startYear" min="2000" className={styles.inputForm} onChange={changeInputValue} />
                        </label>
                        <label className={styles.labelForm}>
                            Факультет:
                            <input type="text" name="faculty" className={styles.inputForm} onChange={changeInputValue} />
                        </label>
                        <button type="submit">Добавить</button>
                    </form>
                </dialog>
                <dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className={styles.dialogs}>
                    <h2>Фильтры</h2>
                    <form action="GET" className={styles.filtersInput}>
                        <label className={styles.labelForm}>
                            ФИО:
                            <input type="text" name="fio" className={styles.inputForm} onChange={filterSubString} />
                        </label>
                        <label className={styles.labelForm}>
                            Факультет:
                            <input type="text" name="faculty" className={styles.inputForm} onChange={filterSubString} />
                        </label>
                        <label className={styles.labelForm}>
                            Год начала обучения:
                            <input type="number" name="startYear" min="2000" max="2025" className={styles.inputForm} onChange={filterDate} />
                        </label>
                        <label className={styles.labelForm}>
                            Год окончания обучения:
                            <input type="number" name="endYear" min="2004" max="2029" className={styles.inputForm} onChange={filterDate} />
                        </label>
                        <button>Подтвердить</button>
                    </form>
                </dialog>
                <table>
                    <caption>Студенты</caption>
                    <thead>
                        <tr>
                            <th scope="col" onClick={changeSortFio}>Имя</th>
                            <th scope="col" onClick={changeSortFio}>Фамилия</th>
                            <th scope="col" onClick={changeSortFio}>Отчество</th>
                            <th scope="col" onClick={changeSortBD}>Дата рождения</th>
                            <th scope="col" onClick={changeSortStartYear}>Годы обучения</th>
                            <th scope="col" onClick={changeSortFaculty}>Факультет</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.surname}</td>
                                    <td>{student.patronymic}</td>
                                    <td>{student.birthDate.replaceAll('-', '.')} (Возраст - {getYear(student.birthDate)})</td>
                                    <td>{Number(student.startYear)}-{Number(student.startYear) + 4} ({getCourse(student.startYear)})</td>
                                    <td>{student.faculty}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Home