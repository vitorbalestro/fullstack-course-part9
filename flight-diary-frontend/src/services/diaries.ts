import axios from 'axios';
import { DiaryEntry } from '../types'
import toNewDiaryEntry from '../utils';


const baseUrl = 'http://localhost:3001/api'

const getAll = async () => {
    const { data } = await axios.get<DiaryEntry[]>(
        `${baseUrl}/diaries`
    );
    return data;
}

const create = async (object: unknown) => {
    const newDiaryEntry = toNewDiaryEntry(object);
    const { data } = await axios.post<DiaryEntry>(`${baseUrl}/diaries`, newDiaryEntry);
    return data;
}


export default { getAll, create }