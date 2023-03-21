import { DiaryEntry } from '../types';

export interface DisplayDiaryProps {
    entries: DiaryEntry[]
}

const DisplaySingleDiary = ({ diary }: {diary: DiaryEntry}) => {
    return (
        <div>
            <h2>{diary.date}</h2>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
        </div>       
    )
}

const DisplayDiaries = (props: DisplayDiaryProps) => {
    return (
        <>
            <h1>Diary entries</h1>    
            {props.entries.map(entry => <DisplaySingleDiary key={entry.date} diary={entry}/>)}
        </>
        
        
    );
}

export default DisplayDiaries;