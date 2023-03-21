import { useState } from 'react';
import diaryService from '../services/diaries';
import { DiaryEntry, Weather, Visibility } from '../types';


interface NewEntryFormProps {
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>,
    diaries: DiaryEntry[],
    setErrorNotification: React.Dispatch<React.SetStateAction<string>>
}

const NewEntryForm = (props: NewEntryFormProps) => {

    const [date, setDate] = useState<string>('');
    const [weather, setWeather] = useState<string>('');
    const [visibility, setVisibility] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    async function handleClick(event: React.SyntheticEvent){
        event.preventDefault();
        const object = {
            date: date,
            weather: weather,
            visibility: visibility,
            comment: comment
        }
        try{
            const newDiary = await diaryService.create(object);
            props.setDiaries(props.diaries.concat(newDiary));
        } catch(error: unknown) {
            if(error instanceof Error){
                props.setErrorNotification(error.message);
                setTimeout(() => {
                    props.setErrorNotification('')
                }, 3000);
            } else {
                props.setErrorNotification('Some error occurred! Please try again.');
                setTimeout(() => {
                    props.setErrorNotification('')
                }, 3000);
            }
        }
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');


    }

    const WeatherRadioButton = ({ value } : { value: string }) => {
        return (
            <>
                <input type="radio" value={weather} key={value} name="weather" onChange={() => setWeather(value)} />{value}
            </>
        )
    }


    const VisibilityRadioButton = ({ value } : { value: string }) => {
        return (
            <>
                <input type="radio" value={visibility} name="visibility" key={value} onChange={() => setVisibility(value)} />{value}
            </>
        )
    }

    return (
        <form onSubmit={(event) => handleClick(event)}>
            <h1>Add entry</h1>
            <div>
                date <input type="date" value={date} name="date" onChange={({ target }) => setDate(target.value)} />
            </div>
            <div>
                weather {Object.values(Weather).map(value => WeatherRadioButton({ value }))}
            </div>
            <div>
                visibility {Object.values(Visibility).map(value => VisibilityRadioButton({ value }))}
            </div>
            <div>
                comment <input type="comment" value={comment} name="comment" onChange={({ target }) => setComment(target.value)} />
            </div>
            <div>
                <button id='add-entry-button' type="submit">add diary entry</button> 
            </div>

        </form>
    )

}

export default NewEntryForm;