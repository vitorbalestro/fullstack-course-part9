import diaryService from './services/diaries';
import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import DisplayDiaries from './components/DisplayDiary';
import NewEntryForm from './components/NewEntryForm';
import DisplayNotification from './components/DisplayNotification'



const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [errorNotification, setErrorNotification] = useState<string>('')

  useEffect(() => {
    const fetchDiariesList = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    }

    void fetchDiariesList();
  },[]);

  console.log(diaries);

  return ( 
    <div>
      <DisplayNotification errorNotification={errorNotification} />
      <NewEntryForm setDiaries={setDiaries} diaries={diaries} setErrorNotification={setErrorNotification}/>
      <DisplayDiaries entries={diaries}/>
    </div>
  );

};

export default App;
