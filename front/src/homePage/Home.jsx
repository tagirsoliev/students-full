import { useState } from "react"
import styles from './Home.module.css'

function Home() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [sortValue, setSortValue] = useState('alphabetical')
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
        console.log(newStudent);
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
        e.preventDefault();
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
            [name]: value
        });
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
                    <form action="POST" className={styles.addStudentForm}>
                        <label className={styles.labelForm}>
                            Имя:
                            <input type="text" name="name" className={styles.inputForm} />
                        </label>
                        <label className={styles.labelForm}>
                            Фамилия:
                            <input type="text" name="surname" className={styles.inputForm} />
                        </label>
                        <label className={styles.labelForm}>
                            Отчество:
                            <input type="text" name="patronymic" className={styles.inputForm} />
                        </label>
                        <label className={styles.labelForm}>
                            Дата рождения:
                            <input type="date" name="birthDate" className={styles.inputForm} />
                        </label>
                        <label className={styles.labelForm}>
                            Год начала обучения:
                            <input type="number" name="startYear" min="2000" max="2025" className={styles.inputForm} />
                        </label>
                        <label className={styles.labelForm}>
                            Факультет:
                            <input type="text" name="faculty" className={styles.inputForm} />
                        </label>
                        <button type="submit" onClick={createStudent}>Добавить</button>
                    </form>
                </dialog>
                <dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className={styles.dialogs}>
                    <h2>Фильтры</h2>
                    <form action="GET" className={styles.filtersInput}>
                        <label className={styles.labelForm}>
                            ФИО:
                            <input type="text" name="fio" className={styles.inputForm} onChange={changeInputValue} />
                        </label>
                        <label className={styles.labelForm}>
                            Факультет:
                            <input type="text" name="faculty" className={styles.inputForm} />
                        </label>
                        <label className={styles.labelForm}>
                            Год начала обучения:
                            <input type="number" name="startYear" min="2000" max="2025" className={styles.inputForm} />
                        </label>
                        <label className={styles.labelForm}>
                            Год окончания обучения:
                            <input type="number" name="endYear" min="2004" max="2029" className={styles.inputForm} />
                        </label>
                        <button>Подтвердить</button>
                    </form>
                </dialog>
                <table>
                    <caption>Студенты</caption>
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Отчество</th>
                            <th scope="col">Дата рождения</th>
                            <th scope="col">Годы обучения</th>
                            <th scope="col">Факультет</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.surname}</td>
                                    <td>{student.patronymic}</td>
                                    <td>{student.birthDate.replaceAll('-', '.')}</td>
                                    <td>{student.startYear}</td>
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