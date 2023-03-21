import { useState, useEffect } from "react";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { Patient,Diagnosis } from "./types";
import patientService from "./services/patients";
import diagnosesService from './services/diagnoses';
import PatientListPage from "./components/PatientListPage";
import DisplaySinglePatient from './components/DisplaySinglePatient/DisplaySinglePatient';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    }

    void fetchPatientList();
    void fetchDiagnosesList();
    setRefetchData(false);
  }, [refetchData]);
  
  const match = useMatch('/patients/:id');
  const patient = match
    ? patients.find(patient => patient.id === match.params.id)
    : null;

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<DisplaySinglePatient patient={patient} diagnoses={diagnoses} setRefetchData={setRefetchData}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
